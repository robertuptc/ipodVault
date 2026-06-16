from django.urls import path
from .views import *

urlpatterns = [
    path('devices/', AppleDeviceListView.as_view(), name="device-list"),
    path('inventory/', InventoryListCreateView.as_view()),
    path('inventory/<int:pk>/', InventoryDetailView.as_view()),
    path('public/for-sale/', PublicForSaleView.as_view()),
    path('auth/login/', CustomTokenView.as_view(), name="token_obtain_pair"),
    path("ipods/", ipod_lineup)
] 
