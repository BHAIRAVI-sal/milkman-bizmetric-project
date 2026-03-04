from rest_framework import serializers
from .models import Category, MilkType, Quantity, Product, ProductStock

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class MilkTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = MilkType
        fields = '__all__'

class QuantitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Quantity
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    milk_type = MilkTypeSerializer()
    quantities = QuantitySerializer(many=True)

    class Meta:
        model = Product
        fields = '__all__'

class ProductStockSerializer(serializers.ModelSerializer):
    product_id = serializers.IntegerField(source="product.id", read_only=True)
    product_name = serializers.CharField(source="product.name", read_only=True)
    quantity_label = serializers.CharField(source="quantity.label", read_only=True)

    class Meta:
        model = ProductStock
        fields = ["id", "product_id", "product_name", "quantity", "quantity_label", "stock_count"]