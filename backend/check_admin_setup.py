import os
import django
import sys

# Setup Django
sys.path.insert(0, os.path.dirname(__file__))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'crop.settings')
django.setup()

from django.contrib.auth.models import User as DjangoUser
from scanner.models import User as CustomUser
from django.contrib import admin

print("=== Checking Django Admin Setup ===\n")

# Check if Django admin superuser exists
print("1. Django Admin Superusers:")
superusers = DjangoUser.objects.filter(is_superuser=True)
if superusers.exists():
    for su in superusers:
        print(f"   ✓ {su.username} (email: {su.email})")
else:
    print("   ✗ No superuser found!")
    print("   Run: python manage.py createsuperuser")

# Check custom User model
print("\n2. Custom User Model (scanner.User):")
custom_users = CustomUser.objects.all()
print(f"   Total users: {custom_users.count()}")
for user in custom_users:
    print(f"   - {user.name} ({user.phone_number}) - Role: {user.role}")

# Check if User model is registered in admin
print("\n3. Admin Registration:")
if CustomUser in admin.site._registry:
    print("   ✓ User model is registered in admin")
    admin_class = admin.site._registry[CustomUser]
    print(f"   - Admin class: {admin_class.__class__.__name__}")
    print(f"   - List display: {admin_class.list_display}")
else:
    print("   ✗ User model is NOT registered in admin")

# Check ScanResult model
from scanner.models import ScanResult
if ScanResult in admin.site._registry:
    print("   ✓ ScanResult model is registered in admin")
else:
    print("   ✗ ScanResult model is NOT registered in admin")

print("\n4. Instructions:")
print("   - Access admin at: http://localhost:8000/admin/")
print("   - Login with Django superuser credentials")
print("   - Look for 'Scanner' section with 'Users' and 'Scan Results'")

print("\n=== Check Complete ===")
