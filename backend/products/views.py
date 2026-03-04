from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from django.db import transaction

from .models import Category, Product, ProductStock, Quantity
from .serializers import CategorySerializer, ProductSerializer, ProductStockSerializer


def _require_admin(user):
    role = getattr(getattr(user, "profile", None), "role", None)
    if role != "admin":
        raise PermissionDenied("Admin access required")


class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductByCategoryView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        category_id = self.kwargs['category_id']
        return Product.objects.filter(category_id=category_id)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def admin_stock_list(request):
    _require_admin(request.user)
    with transaction.atomic():
        for product in Product.objects.prefetch_related("quantities").all():
            for qty in product.quantities.all():
                ProductStock.objects.get_or_create(product=product, quantity=qty, defaults={"stock_count": 0})
    qs = ProductStock.objects.select_related("product", "quantity").all().order_by("product__id", "quantity__label")
    return Response(ProductStockSerializer(qs, many=True).data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def admin_stock_upsert(request):
    _require_admin(request.user)
    items = request.data.get("items", [])
    updated = 0
    for item in items:
        product_id = item.get("product_id")
        quantity_id = item.get("quantity_id")
        stock_count = item.get("stock_count")
        if product_id is None or quantity_id is None or stock_count is None:
            continue
        try:
            stock_count = int(stock_count)
        except Exception:
            continue
        try:
            qty = Quantity.objects.get(id=quantity_id)
            product = Product.objects.get(id=product_id)
        except Exception:
            continue
        ProductStock.objects.update_or_create(
            product=product,
            quantity=qty,
            defaults={"stock_count": stock_count},
        )
        updated += 1
    return Response({"updated": updated})