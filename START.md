# Quick Start Guide

## 🚀 Start the Application

### Step 1: Start Backend (Terminal 1)

```bash
cd merged-krishi-project/backend
python -m venv venv
venv\Scripts\activate          # Windows
# source venv/bin/activate     # Mac/Linux
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

**Backend running at:** http://localhost:8000

### Step 2: Start Frontend (Terminal 2)

```bash
cd merged-krishi-project/frontend
npm install
npm run dev
```

**Frontend running at:** http://localhost:5173

## 🎯 Test the Application

1. **Open browser**: http://localhost:5173
2. **Click "স্ক্যান করুন" (Scan)** button on home page
3. **Upload a crop image** or use camera
4. **Click analyze** to get AI results
5. **View scan history** in the sidebar

## 📱 Features to Test

### Crop Health Scanner
- Navigate to: http://localhost:5173/scan
- Upload image → Analyze → View results

### Weather Alerts
- Navigate to: http://localhost:5173/weather-alert
- View 5-day forecast

### Storage Advice
- Navigate to: http://localhost:5173/storage-advice
- Read storage tips

### Crop Protection
- Navigate to: http://localhost:5173/crop-protection
- Learn protection methods

## 🔐 Test Authentication (Optional)

### Register New User
```bash
curl -X POST http://localhost:8000/api/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "phone_number": "01712345678",
    "name": "Test User",
    "password": "password123",
    "role": "farmer",
    "language": "bangla"
  }'
```

### Login
```bash
curl -X POST http://localhost:8000/api/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "phone_number": "01712345678",
    "password": "password123"
  }'
```

### Get Profile (with token)
```bash
curl -X GET http://localhost:8000/api/profile/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## 🛠️ Admin Panel

1. Create superuser:
```bash
cd merged-krishi-project/backend
python manage.py createsuperuser
```

2. Access admin: http://localhost:8000/admin

3. Manage users and scans

## ⚡ Quick Commands

### Backend
```bash
# Run server
python manage.py runserver

# Make migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate
```

### Frontend
```bash
# Dev server
npm run dev

# Build
npm run build

# Preview build
npm run preview
```

## 🐛 Common Issues

### Backend not starting?
- Check if port 8000 is free
- Activate virtual environment
- Install requirements: `pip install -r requirements.txt`

### Frontend not starting?
- Check if port 5173 is free
- Install dependencies: `npm install`
- Check Node.js version: `node --version` (need 16+)

### API connection failed?
- Ensure backend is running on port 8000
- Check `.env` file in frontend folder
- Verify `VITE_API_URL=http://localhost:8000/api`

### CORS errors?
- Backend `settings.py` should have:
  ```python
  CORS_ALLOWED_ORIGINS = [
      "http://localhost:5173",
  ]
  ```

## 📝 Environment Variables

### Backend (.env)
```
SECRET_KEY=your-secret-key
DEBUG=True
HUGGINGFACE_API_KEY=your-api-key
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:8000/api
```

## ✅ Success Checklist

- [ ] Backend running on port 8000
- [ ] Frontend running on port 5173
- [ ] Can access home page
- [ ] Can click "স্ক্যান করুন" button
- [ ] Can upload and analyze images
- [ ] Can view scan history
- [ ] All navigation links work

## 🎉 You're Ready!

The application is now fully functional. Explore all features and test the crop health scanning system!
