from django.contrib import admin
from .models import InventoryItem, AppleDevice

admin.site.register(AppleDevice)
admin.site.register(InventoryItem)
