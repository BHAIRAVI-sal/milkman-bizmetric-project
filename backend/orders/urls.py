from django.urls import path
from .views import checkout_cod, create_razorpay_order, verify_razorpay

urlpatterns = [
    path('checkout/cod/', checkout_cod),
    path('payment/razorpay/create-order/', create_razorpay_order),
    path('payment/razorpay/verify/', verify_razorpay),
]
