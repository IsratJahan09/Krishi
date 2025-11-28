import os
import django
import sys

# Setup Django
sys.path.insert(0, os.path.dirname(__file__))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'crop.settings')
django.setup()

from scanner.models import User

print("=== Testing User Registration ===\n")

# Check existing users
print("1. Checking existing users in database:")
users = User.objects.all()
print(f"   Total users: {users.count()}")
for user in users:
    print(f"   - {user.name} ({user.phone_number}) - Role: {user.role}")

print("\n2. Creating a test user:")
test_phone = "01700000999"

# Delete if exists
User.objects.filter(phone_number=test_phone).delete()

# Create new user
test_user = User(
    phone_number=test_phone,
    name="Test Farmer",
    role="farmer",
    language="bangla"
)
test_user.set_password("test123")
test_user.save()

print(f"   ✓ Created user: {test_user.name} ({test_user.phone_number})")
print(f"   - ID: {test_user.id}")
print(f"   - Role: {test_user.role}")
print(f"   - Language: {test_user.language}")

print("\n3. Verifying user was saved:")
saved_user = User.objects.get(phone_number=test_phone)
print(f"   ✓ User found in database: {saved_user.name}")
print(f"   - Password check: {saved_user.check_password('test123')}")

print("\n4. All users after test:")
users = User.objects.all()
print(f"   Total users: {users.count()}")
for user in users:
    print(f"   - {user.name} ({user.phone_number})")

print("\n=== Test Complete ===")
