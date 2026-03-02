from django.db import models
from django.contrib.auth.models import User
from subscriptions.models import Subscription

class DeliverySchedule(models.Model):
    delivery_boy = models.ForeignKey(User, on_delete=models.CASCADE)
    subscription = models.ForeignKey(Subscription, on_delete=models.CASCADE)
    delivery_date = models.DateField()
    status = models.CharField(max_length=20, choices=(('pending','Pending'),('delivered','Delivered')), default='pending')

    def __str__(self):
        return f"{self.subscription.user.username} - {self.delivery_date}"