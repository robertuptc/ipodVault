import re
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import AppleDevice, InventoryItem
from .serializers import AppleDeviceSerializer, InventoryItemSerializer
from .device_utils import get_refined_name
# Permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers_auth import CustomTokenSerializer

class AppleDeviceListView(generics.ListCreateAPIView):
    queryset = AppleDevice.objects.all()
    serializer_class = AppleDeviceSerializer

"""
- This above is a ready-made CRUD logic blocks - NEW WAY
- Instead of manually writing GET, POST, query handling, validation, serialization
- OLD WAY:

class IpodModelView(APIView):
    def get(self, request):
        ipods = IpodModel.objects.all()
        serializer = IpodModelSerializer(ipods, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = IpodModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
"""

class InventoryListCreateView(generics.ListCreateAPIView):
    serializer_class = InventoryItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return InventoryItem.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class InventoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    def get_queryset(self):
        return InventoryItem.objects.filter(owner=self.request.user)

    serializer_class = InventoryItemSerializer
    permission_classes = [IsAuthenticated]

class CustomTokenView(TokenObtainPairView):
    serializer_class = CustomTokenSerializer


class PublicForSaleView(generics.ListCreateAPIView):
    serializer_class = InventoryItemSerializer

    def get_queryset(self):
        return InventoryItem.objects.filter(status="FOR_SALE")
    

@api_view(["GET"])
def ipod_lineup(request):

    devices = AppleDevice.objects.filter(device_type__icontains="ipod")

    CLASSIC_REFINEMENT = {
        "M8541": "iPod Classic (1st generation)",
        "A1019": "iPod Classic (2nd generation)",
        "A1040": "iPod Classic (3rd generation)",
        "A1059": "iPod Classic (4th generation)",
        "A1099": "iPod Classic U2 Edition (4th generation)",
        "A1136": "iPod Classic (5th generation)",
        "A1238": "iPod Classic (6th generation)",
    }

    blocked_words = [
        "edition",
        "hp",
        "harry potter",
        "beck",
        "madonna",
        "tony hawk",
        "adapter",
        "remote",
        "battery",
        "socks",
        "hi-fi",
        "receiver",
        "sensor"
    ]

    cleaned = []
    seen = set()

    for device in devices:
        identifier = device.identifier.lower()

        if "revision" in identifier:
            continue
        name_lower = device.name.lower()

        if any(word in name_lower for word in blocked_words):
            continue

        model_numbers = device.model or []

        # =========================
        # 🔥 CLASSIC REFINEMENT
        # =========================
        classic_handled = False

        for model in model_numbers:
            if model in CLASSIC_REFINEMENT:
                device.name = get_refined_name(device)
                fingerprint = f"classic-{model}"
                classic_handled = True
                break

        if classic_handled:
            if fingerprint in seen:
                continue
            seen.add(fingerprint)
            cleaned.append(device)
            continue

        # =========================
        # NORMAL GENERATION LOGIC
        # =========================
        generation_match = re.search(
            r"(\d+(st|nd|rd|th)\s+generation)",
            device.name,
            re.IGNORECASE
        )

        if generation_match:
            generation = generation_match.group(1).lower()
            fingerprint = f"{device.device_type.lower()}-{generation}"
        else:
            fingerprint = f"{device.device_type.lower()}-{device.release_year}"

        if fingerprint in seen:
            continue

        seen.add(fingerprint)
        cleaned.append(device)

    cleaned.sort(key=lambda x: x.release_year or 0)

    # =============================
    # GROUPING IPODS BY CATEGORIES
    # =============================
    grouped = {
        "Classic": [],
        "Mini": [],
        "Nano": [],
        "Shuffle": [],
        "Touch": [],
    }

    for device in cleaned:
        name_lower = device.name.lower()

        if "classic" in name_lower:
            grouped["Classic"].append(device)
        elif "mini" in name_lower:
            grouped["Mini"].append(device)
        elif "nano" in name_lower:
            grouped["Nano"].append(device)
        elif "shuffle" in name_lower:
            grouped["Shuffle"].append(device)
        elif "touch" in name_lower:
            grouped["Touch"].append(device)
    
    # Serializing each group
    response_data = {}

    for family, items in grouped.items():
        serializer = AppleDeviceSerializer(items, many=True)
        response_data[family] = serializer.data
        
    return Response(response_data)