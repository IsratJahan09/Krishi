# Django Admin Verification Guide

## ✓ Setup Status
Your Django admin is properly configured! Here's how to verify users are showing up:

## Step 1: Start the Backend Server
```bash
cd merged-krishi-project/backend
python manage.py runserver
```

## Step 2: Access Django Admin
1. Open browser: http://localhost:8000/admin/
2. Login with superuser credentials:
   - Username: `israt`
   - Password: (your admin password)

## Step 3: Check Users
1. Look for **"SCANNER"** section in admin
2. Click on **"Users"**
3. You should see all registered users with:
   - Phone number
   - Name
   - Role (farmer/admin)
   - Language
   - Created date

## Step 4: Test Registration
### Option A: Using Frontend
1. Start frontend: `cd merged-krishi-project/frontend && npm run dev`
2. Register a new user through the app
3. Check Django admin - user should appear immediately

### Option B: Using API Directly
```bash
# Test registration API
curl -X POST http://localhost:8000/api/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "phone_number": "01712345678",
    "name": "Test User",
    "password": "test123456",
    "role": "farmer",
    "language": "bangla"
  }'
```

## Step 5: Verify in Database
Run this script to check users directly:
```bash
cd merged-krishi-project/backend
python check_admin_setup.py
```

## Current Status
- ✓ Admin superuser exists: `israt`
- ✓ User model registered in admin
- ✓ ScanResult model registered in admin
- ✓ Test user created: "Test Farmer (01700000999)"

## Troubleshooting

### Users not showing in admin?
1. Refresh the admin page (Ctrl+F5)
2. Check if you're logged in as superuser
3. Verify backend server is running
4. Run: `python check_admin_setup.py` to verify database

### Registration not working?
1. Check backend console for error messages
2. Look for "=== User Registration Request ===" in logs
3. Verify frontend is sending correct data format
4. Check network tab in browser DevTools

### Can't login to admin?
Reset superuser password:
```bash
python manage.py changepassword israt
```

Or create new superuser:
```bash
python manage.py createsuperuser
```

## What's Been Fixed
1. ✓ Added detailed logging to registration endpoint
2. ✓ Verified User model is properly registered in admin
3. ✓ Confirmed database is working correctly
4. ✓ Added verification scripts for testing

## Next Steps
1. Start the backend server
2. Try registering a new user from frontend
3. Check Django admin to see the new user
4. If user doesn't appear, check backend console logs for debugging info
