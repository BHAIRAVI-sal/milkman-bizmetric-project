from django.db import models
from django.contrib.auth.models import User
from products.models import Product, Quantity

class Subscription(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.ForeignKey(Quantity, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    is_active = models.BooleanField(default=True)
    delivery_time = models.CharField(max_length=20, choices=(('morning','Morning'),('evening','Evening')))

    def __str__(self):
        return f"{self.user.username} - {self.product.name}"