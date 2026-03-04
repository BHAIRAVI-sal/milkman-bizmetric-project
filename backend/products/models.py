from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='categories/', blank=True, null=True)

    def __str__(self):
        return self.name


class MilkType(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Quantity(models.Model):
    label = models.CharField(max_length=50)   # 250ml, 500ml, 1L
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.label} - ₹{self.price}"


class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="products")
    milk_type = models.ForeignKey(MilkType, on_delete=models.SET_NULL, null=True, blank=True)
    name = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='products/')
    quantities = models.ManyToManyField(Quantity)
    is_subscription_available = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class ProductStock(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="stock_items")
    quantity = models.ForeignKey(Quantity, on_delete=models.CASCADE)
    stock_count = models.IntegerField(default=0)

    class Meta:
        unique_together = ("product", "quantity")

    def __str__(self):
        return f"{self.product.name} - {self.quantity.label}: {self.stock_count}"