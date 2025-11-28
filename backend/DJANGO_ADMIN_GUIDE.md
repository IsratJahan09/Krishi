# 🔧 DJANGO ADMIN GUIDE

## ✅ Admin Panel Fixed!

The Django admin is now properly configured to show:
- ✅ Users (with registration data)
- ✅ Scan Results (with images and thumbnails)

## 🚀 How to Access Admin Panel:

### Step 1: Create Superuser (First Time Only)

```powershell
cd merged-krishi-project\backend
python manage.py createsuperuser
```

You'll be asked:
```
Username: admin
Email: (leave blank or enter email)
Password: (enter password)
Password (again): (confirm password)
```

### Step 2: Start Backend

```powershell
python manage.py runserver
```

### Step 3: Access Admin Panel

Open browser:
```
http://localhost:8000/admin
```

Login with the superuser credentials you created.

## 📊 What You'll See:

### Admin Dashboard:
```
┌─────────────────────────────────────┐
│ Django administration               │
├─────────────────────────────────────┤
│ SCANNER                             │
│   • Users                           │
│   • Scan results                    │
└─────────────────────────────────────┘
```

### Users List:
```
Phone Number | Name      | Role   | Language | Created At
01712345678  | John Doe  | farmer | bangla   | 2025-11-28
01798765432  | Jane Doe  | admin  | english  | 2025-11-28
```

### Scan Results List:
```
ID      | User          | Status | Confidence | Thumbnail | Created At
abc123  | John Doe (...) | Fresh  | 85.0%     | [image]   | 2025-11-28
def456  | Anonymous     | Rotten | 72.5%     | [image]   | 2025-11-28
```

## 🔍 Admin Features:

### User Admin:
- **List Display:** phone_number, name, role, language, created_at
- **Filters:** role, language, created_at
- **Search:** phone_number, name
- **Fields:** All user information organized in sections

### Scan Result Admin:
- **List Display:** id, user, status, confidence, thumbnail, created_at
- **Filters:** status, created_at, user
- **Search:** status, id, user phone/name
- **Image Preview:** Click on scan to see full image
- **Thumbnail:** Small preview in list view

## 🎯 How to Use:

### View All Users:
1. Go to http://localhost:8000/admin
2. Click "Users"
3. See all registered users

### View All Scans:
1. Go to http://localhost:8000/admin
2. Click "Scan results"
3. See all scans with thumbnails

### Filter Scans:
- By status (Fresh/Rotten)
- By date
- By user

### Search:
- Search by user phone number
- Search by user name
- Search by scan ID

### View Details:
- Click on any scan to see full details
- See full-size image preview
- See all metadata

## 🔧 Troubleshooting:

### Issue 1: Can't Access Admin
**Error:** "Page not found"
**Solution:** Make sure backend is running on port 8000

### Issue 2: No Superuser
**Error:** "Invalid credentials"
**Solution:** Create superuser:
```powershell
python manage.py createsuperuser
```

### Issue 3: No Data Showing
**Cause:** No users or scans in database
**Solution:** 
- Register a user via API
- Do some scans
- Refresh admin page

### Issue 4: Images Not Showing
**Cause:** MEDIA_URL not configured
**Check:** settings.py has:
```python
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
```

## 📋 Admin Checklist:

- [ ] Superuser created
- [ ] Backend running on port 8000
- [ ] Can access http://localhost:8000/admin
- [ ] Can login with superuser credentials
- [ ] Users section visible
- [ ] Scan results section visible
- [ ] Can see registered users
- [ ] Can see scan results
- [ ] Images/thumbnails showing

## 💡 Admin Capabilities:

### What You Can Do:
- ✅ View all users
- ✅ View all scans
- ✅ Filter and search
- ✅ See image thumbnails
- ✅ View full scan details
- ✅ Delete users/scans manually
- ✅ Edit user information
- ✅ Export data

### What's Displayed:

**Users:**
- Phone number (unique identifier)
- Name
- Role (farmer/admin)
- Language (english/bangla)
- Registration date

**Scans:**
- Scan ID
- User (or "Anonymous")
- Status (Fresh/Rotten)
- Confidence percentage
- Image thumbnail
- Scan date/time

## 🚀 Quick Start:

```powershell
# 1. Create superuser (first time only)
cd merged-krishi-project\backend
python manage.py createsuperuser

# 2. Start backend
python manage.py runserver

# 3. Access admin
# Open: http://localhost:8000/admin
# Login with superuser credentials
```

## ✅ Success:

After logging in, you should see:
- "Users" section with all registered users
- "Scan results" section with all scans
- Image thumbnails in scan list
- Full image preview when viewing scan details

---

**Admin panel is now fully functional!**
**Create superuser and access at http://localhost:8000/admin**
