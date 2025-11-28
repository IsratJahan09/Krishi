# 🔧 FIX BACKEND ERROR

## 🔴 Error You're Getting

```
ModuleNotFoundError: No module named 'rest_framework_simplejwt'
```

## ✅ SOLUTION - Install Missing Dependencies

### Option 1: Use Batch File (EASIEST)

**Navigate to backend folder and double-click:**
```
merged-krishi-project/backend/INSTALL_DEPENDENCIES.bat
```

This will:
1. Install all required packages
2. Run migrations
3. Set up the database

### Option 2: Manual Installation

**Open PowerShell in backend folder:**

```powershell
cd merged-krishi-project\backend
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
```

### Option 3: Install Packages One by One

```powershell
cd merged-krishi-project\backend

pip install Django==4.2.7
pip install djangorestframework==3.14.0
pip install djangorestframework-simplejwt==5.3.0
pip install django-cors-headers==4.3.1
pip install requests==2.31.0
pip install Pillow==12.0.0
pip install python-dotenv==1.0.0

python manage.py makemigrations
python manage.py migrate
```

## 🎯 After Installation

**Start the backend:**
```powershell
python manage.py runserver
```

**Expected Output:**
```
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.
```

## ✅ Verify It's Working

**Test in browser:**
- http://localhost:8000/admin (should show Django admin login)
- http://localhost:8000/api/history/ (should return [] or list)

## 🐛 If Still Not Working

### Check Python Version
```powershell
python --version
```
Should be Python 3.8 or higher

### Check pip is working
```powershell
pip --version
```

### Upgrade pip
```powershell
python -m pip install --upgrade pip
```

### Clear pip cache
```powershell
pip cache purge
pip install -r requirements.txt --no-cache-dir
```

## 📝 What Happened?

The backend needs several Python packages to work:
- `djangorestframework-simplejwt` - For JWT authentication
- `django-cors-headers` - For CORS support
- `Pillow` - For image processing
- And others...

These weren't installed, causing the error.

## 🚀 Complete Setup Steps

1. **Install dependencies:**
   ```powershell
   cd merged-krishi-project\backend
   pip install -r requirements.txt
   ```

2. **Run migrations:**
   ```powershell
   python manage.py makemigrations
   python manage.py migrate
   ```

3. **Create superuser (optional):**
   ```powershell
   python manage.py createsuperuser
   ```

4. **Start server:**
   ```powershell
   python manage.py runserver
   ```

## ✅ Success Checklist

- [ ] All packages installed without errors
- [ ] Migrations completed successfully
- [ ] Server starts on port 8000
- [ ] Can access http://localhost:8000/admin
- [ ] No error messages in console

---

**TL;DR:** Run `INSTALL_DEPENDENCIES.bat` in the backend folder!
