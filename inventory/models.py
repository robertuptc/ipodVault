from django.db import models
from django.contrib.auth.models import User

class AppleDevice(models.Model):
    identifier = models.CharField(max_length=100)  # iPod7,1
    name = models.CharField(max_length=200)       # iPod Touch 6th Gen
    device_type = models.CharField(max_length=100) # iPod / iPhone / etc
    release_year = models.IntegerField(null=True, blank=True)
    image = models.ImageField(upload_to="devices/", null=True, blank=True)
    model = models.JSONField(blank=True, null=True)

    def __str__(self):
        return f"{self.name} ({self.identifier})"


class InventoryItem(models.Model):

    class Status(models.TextChoices):
            DAMAGED = "DAMAGED", "Damaged"
            ACTIVE ="ACTIVE", "Active"
            FOR_SALE = "FOR_SALE", "For Sale"
            SOLD = "SOLD", "Sold"
            PERSONAL = "PERSONAL", "Personal Collection"
    
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    device = models.ForeignKey(
        AppleDevice, on_delete=models.CASCADE, related_name="inventory_items")
    color = models.CharField(max_length=50)
    storage_gb = models.IntegerField()
    condition = models.CharField(max_length=50)
    notes = models.TextField(blank=True, null=True)
    purchase_price = models.DecimalField(
        max_digits=10, decimal_places=2, blank=True, null=True)
    sale_price = models.DecimalField(
        max_digits=10, decimal_places=2, blank=True, null=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.ACTIVE)
    sold_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.device.name} - {self.color} - {self.storage_gb}GB"