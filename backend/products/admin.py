from django.contrib import admin
from .models import Category, MilkType, Quantity, Product, ProductStock

admin.site.register(Category)
admin.site.register(MilkType)
admin.site.register(Quantity)
admin.site.register(Product)
admin.site.register(ProductStock)