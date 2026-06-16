from rest_framework import serializers
from .models import AppleDevice, InventoryItem
from urllib.parse import quote
from .device_utils import get_refined_name
class AppleDeviceSerializer(serializers.ModelSerializer):

    class Meta:
        model = AppleDevice
        fields = '__all__'
    
class InventoryItemSerializer(serializers.ModelSerializer):

    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())
    
    # device_name = serializers.CharField(
    #     source="device.name",
    #     read_only=True
    # )
    device_name = serializers.SerializerMethodField()
    def get_device_name(self, obj):
        return get_refined_name(obj.device)

    status_display = serializers.CharField(
        source="get_status_display",
        read_only=True
    )

    # Writeable field (for POST)
    device = serializers.PrimaryKeyRelatedField(
        queryset = AppleDevice.objects.all()
    )

    # Read only display field
    ipod_model_display = serializers.StringRelatedField(
        source = "device",
        read_only = True
    )
    
    release_year = serializers.IntegerField(
        source = "device.release_year",
        read_only=True
    )

    device_image = serializers.ImageField(
        source = "device.image",
        read_only = True
    )

    profit = serializers.SerializerMethodField()

    class Meta:
        model = InventoryItem
        fields = '__all__'
    
    def get_profit(self, obj):
        if obj.purchase_price and obj.sale_price:
            return obj.sale_price - obj.purchase_price
        return None