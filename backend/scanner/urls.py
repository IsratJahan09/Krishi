from django.urls import path
from .views import (
    ScanImageView, 
    ScanHistoryView,
    RegisterView,
    LoginView,
    ProfileView
)

urlpatterns = [
    # Authentication endpoints
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('profile/', ProfileView.as_view(), name='profile'),
    
    # Scan endpoints
    path('scan/', ScanImageView.as_view(), name='scan_image'),
    path('history/', ScanHistoryView.as_view(), name='scan_history'),
]
