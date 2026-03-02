from rest_framework import serializers
from .models import Category, MilkType, Quantity, Product

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