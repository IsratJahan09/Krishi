import requests
import json

print("=== Testing Registration API ===\n")

# API endpoint
url = "http://localhost:8000/api/register/"

# Test data
test_data = {
    "phone_number": "01711223344",
    "name": "API Test User",
    "password": "test123456",
    "role": "farmer",
    "language": "bangla"
}

print(f"1. Sending registration request to: {url}")
print(f"   Data: {json.dumps(test_data, indent=2)}")

try:
    response = requests.post(url, json=test_data, timeout=10)
    
    print(f"\n2. Response Status: {response.status_code}")
    print(f"   Response Body:")
    print(f"   {json.dumps(response.json(), indent=2)}")
    
    if response.status_code == 201:
        print("\n✓ Registration successful!")
        
        # Now check if user is in database
        print("\n3. Verifying user in database...")
        import os
        import django
        import sys
        
        sys.path.insert(0, os.path.dirname(__file__))
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'crop.settings')
        django.setup()
        
        from scanner.models import User
        
        try:
            user = User.objects.get(phone_number=test_data['phone_number'])
            print(f"   ✓ User found: {user.name} ({user.phone_number})")
            print(f"   - ID: {user.id}")
            print(f"   - Role: {user.role}")
            print(f"   - Language: {user.language}")
        except User.DoesNotExist:
            print("   ✗ User NOT found in database!")
    else:
        print("\n✗ Registration failed!")
        
except requests.exceptions.ConnectionError:
    print("\n✗ Error: Cannot connect to server!")
    print("   Make sure Django server is running on http://localhost:8000")
except Exception as e:
    print(f"\n✗ Error: {str(e)}")

print("\n=== Test Complete ===")
