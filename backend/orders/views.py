from decimal import Decimal
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from products.models import Product, Quantity
from .models import Order, OrderItem

try:
    import razorpay
except Exception:  # pragma: no cover
    razorpay = None


def _calc_total(cart_items):
    total = Decimal("0.00")
    for item in cart_items:
        product_id = item.get("product_id")
        quantity_label = item.get("quantity_label")
        count = int(item.get("count", 1))
        try:
            product = Product.objects.get(id=product_id)
            qty = Quantity.objects.get(label=quantity_label)
        except (Product.DoesNotExist, Quantity.DoesNotExist):
            continue
        total += qty.price * count
    return total


@api_view(["POST"])
@permission_classes([AllowAny])
def checkout_cod(request):
    items = request.data.get("items", [])
    total = _calc_total(items)
    order = Order.objects.create(user=request.user if request.user.is_authenticated else None, total_price=total, is_paid=False)
    for item in items:
        try:
            p = Product.objects.get(id=item.get("product_id"))
            q = Quantity.objects.get(label=item.get("quantity_label"))
            OrderItem.objects.create(order=order, product=p, quantity=q, count=int(item.get("count", 1)))
        except Exception:
            continue
    return Response({"order_id": order.id, "total": str(order.total_price), "status": "cod_created"})


@api_view(["POST"])
@permission_classes([AllowAny])
def create_razorpay_order(request):
    if razorpay is None:
        return Response({"error": "razorpay package not installed"}, status=400)
    items = request.data.get("items", [])
    total = _calc_total(items)
    amount_paise = int(total * 100)
    order = Order.objects.create(user=request.user if request.user.is_authenticated else None, total_price=total, is_paid=False)
    client = razorpay.Client(auth=(getattr(settings, "RAZORPAY_KEY_ID", ""), getattr(settings, "RAZORPAY_KEY_SECRET", "")))
    rzp_order = client.order.create(dict(amount=amount_paise, currency="INR", payment_capture=1, notes={"order_id": order.id}))
    return Response({"razorpay_order_id": rzp_order["id"], "order_id": order.id, "amount": amount_paise, "currency": "INR", "key": getattr(settings, "RAZORPAY_KEY_ID", "")})


@api_view(["POST"])
@permission_classes([AllowAny])
def verify_razorpay(request):
    if razorpay is None:
        return Response({"error": "razorpay package not installed"}, status=400)
    rzp_order_id = request.data.get("razorpay_order_id")
    rzp_payment_id = request.data.get("razorpay_payment_id")
    rzp_signature = request.data.get("razorpay_signature")
    order_id = request.data.get("order_id")
    client = razorpay.Client(auth=(getattr(settings, "RAZORPAY_KEY_ID", ""), getattr(settings, "RAZORPAY_KEY_SECRET", "")))
    try:
        client.utility.verify_payment_signature({
            "razorpay_order_id": rzp_order_id,
            "razorpay_payment_id": rzp_payment_id,
            "razorpay_signature": rzp_signature
        })
        order = Order.objects.get(id=order_id)
        order.is_paid = True
        order.save()
        return Response({"status": "payment_verified"})
    except Exception as e:
        return Response({"error": str(e)}, status=400)

# Create your views here.
