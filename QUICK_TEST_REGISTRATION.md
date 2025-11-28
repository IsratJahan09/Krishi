# Quick Test: User Registration

## 🚀 Fast Setup (2 minutes)

### Terminal 1 - Backend
```bash
cd merged-krishi-project/backend
python manage.py runserver
```

### Terminal 2 - Frontend
```bash
cd merged-krishi-project/frontend
npm run dev
```

## ✅ Test Registration

### 1. Open Registration Page
```
http://localhost:5173/register
```

### 2. Fill Form
- Phone: `01712345678`
- Name: `Test Farmer`
- Password: `test123456`
- Confirm: `test123456`
- Role: `Farmer`
- Language: `Bangla`

### 3. Click Register Button

### 4. Check Django Admin
```
http://localhost:8000/admin/
```
Login: `israt` (your admin password)

Go to: **Scanner → Users**

✅ Your new user should be there!

## 🔍 Verify Backend Logs

In backend terminal, you should see:
```
=== User Registration Request ===
Request data: {'phone_number': '01712345678', ...}
✓ User saved: Test Farmer (01712345678)
=== Registration Successful ===
```

## 📱 Test Login

### 1. Go to Login Page
```
http://localhost:5173/login
```

### 2. Enter Credentials
- Phone: `01712345678`
- Password: `test123456`

### 3. Click Login

✅ Should redirect to home page with authentication!

## 🎯 What's Working Now

✅ User registration through frontend
✅ Users saved to database
✅ Users visible in Django admin
✅ JWT authentication
✅ Login/logout functionality
✅ Bilingual support (Bengali/English)

## 🐛 Troubleshooting

### Registration not working?
1. Check backend console for errors
2. Check browser console (F12)
3. Verify both servers are running
4. Try: `python check_admin_setup.py`

### User not in admin?
1. Refresh admin page (Ctrl+F5)
2. Check if you're logged in as superuser
3. Look under "Scanner" section, not "Authentication"

### Can't access admin?
```bash
cd merged-krishi-project/backend
python manage.py createsuperuser
```

## 📊 Check Database Directly
```bash
cd merged-krishi-project/backend
python check_admin_setup.py
```

This shows:
- All registered users
- Admin configuration status
- Database connection

---

**That's it! Registration is now fully working! 🎉**
