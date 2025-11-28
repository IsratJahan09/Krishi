# 🔧 FINAL TROUBLESHOOTING - "Failed to Fetch" Error

## The Problem:
You're getting "Failed to fetch" error when clicking the analyze button.

## Root Cause:
The frontend **cannot connect** to the backend. This means:
1. Backend is not running, OR
2. Backend is running on wrong port, OR
3. Frontend is looking at wrong URL

## ✅ STEP-BY-STEP FIX:

### STEP 1: Verify Backend is Running

Open PowerShell and run:
```powershell
curl http://localhost:8000/api/history/
```

**Expected Result:** `[]` or a list

**If you get an error:**
- "Connection refused" → Backend NOT running
- "Could not resolve host" → Wrong URL

### STEP 2: Start Backend (If Not Running)

```powershell
cd "C:\Users\HP\Desktop\krishi - Copy\Krishi\merged-krishi-project\backend"
python manage.py runserver
```

**You MUST see:**
```
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.
```

**Keep this terminal open!**

### STEP 3: Test Backend Again

```powershell
curl http://localhost:8000/api/history/
```

Should now return: `[]`

### STEP 4: Check Frontend .env

```powershell
cd merged-krishi-project\frontend
type .env
```

**MUST contain:**
```
VITE_API_URL=http://localhost:8000/api
```

**If missing, add it!**

### STEP 5: Restart Frontend

```powershell
# Stop frontend (Ctrl+C)
cd merged-krishi-project\frontend
npm run dev
```

### STEP 6: Test Scan

1. Open http://localhost:5173/scan
2. Press F12 (open console)
3. Upload image
4. Click analyze
5. **Watch BOTH consoles** (browser + backend terminal)

## 🔍 What to Look For:

### In Backend Terminal:
```
=== Scan Request Received ===
Image file received: image.jpg, Size: 123456 bytes
Calling HuggingFace API...
=== Scan Complete ===
POST /api/scan/ 200 OK
```

### In Browser Console (F12):
```
=== Starting Image Analysis ===
[API] Preparing scan request
[API] API URL: http://localhost:8000/api
[API] Scan response received
=== Analysis Complete ===
```

## ❌ Common Errors & Solutions:

### Error 1: "Failed to fetch"
**Meaning:** Cannot connect to backend
**Check:**
```powershell
curl http://localhost:8000/api/history/
```
**Solution:** Start backend

### Error 2: "Connection refused"
**Meaning:** Backend not running
**Solution:**
```powershell
cd merged-krishi-project\backend
python manage.py runserver
```

### Error 3: "404 Not Found"
**Meaning:** Wrong URL
**Check:** Frontend .env has `VITE_API_URL=http://localhost:8000/api`
**Solution:** Add/fix .env and restart frontend

### Error 4: "CORS policy"
**Meaning:** CORS not configured
**Check:** backend/crop/settings.py has:
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
]
```

### Error 5: "500 Internal Server Error"
**Meaning:** Backend error
**Check:** Backend terminal for Python errors
**Solution:** Fix the error shown in backend terminal

## 🧪 Test Backend Manually:

### Test 1: History Endpoint
```powershell
curl http://localhost:8000/api/history/
```
Expected: `[]`

### Test 2: Admin Page
Open browser: http://localhost:8000/admin
Expected: Django admin login page

### Test 3: Run Test Script
```powershell
cd merged-krishi-project\backend
python test_scan_api.py
```

## 📋 Complete Checklist:

- [ ] Backend terminal shows "Starting development server at http://127.0.0.1:8000/"
- [ ] `curl http://localhost:8000/api/history/` returns `[]`
- [ ] Frontend .env has `VITE_API_URL=http://localhost:8000/api`
- [ ] Frontend terminal shows "Local: http://localhost:5173/"
- [ ] Both terminals are open (not closed)
- [ ] Browser console (F12) shows no errors
- [ ] Backend .env has HUGGINGFACE_API_KEY

## 🎯 Quick Test Commands:

```powershell
# Test if backend is accessible
curl http://localhost:8000/api/history/

# Check if port 8000 is in use
netstat -ano | findstr :8000

# Check if port 5173 is in use
netstat -ano | findstr :5173

# Test frontend .env
cd merged-krishi-project\frontend
type .env | findstr VITE_API_URL
```

## 💡 Most Common Issues:

### Issue #1: Backend Not Running (90% of cases)
**Symptom:** "Failed to fetch"
**Solution:** Start backend with `python manage.py runserver`

### Issue #2: Wrong API URL
**Symptom:** 404 errors
**Solution:** Check .env has correct URL

### Issue #3: Frontend Not Restarted
**Symptom:** Old code running
**Solution:** Restart frontend with `npm run dev`

## 🚀 Complete Restart Procedure:

```powershell
# Terminal 1 - Backend
cd "C:\Users\HP\Desktop\krishi - Copy\Krishi\merged-krishi-project\backend"
python manage.py runserver

# Terminal 2 - Frontend (NEW window)
cd "C:\Users\HP\Desktop\krishi - Copy\Krishi\merged-krishi-project\frontend"
npm run dev

# Terminal 3 - Test (NEW window)
curl http://localhost:8000/api/history/
```

## 📞 If Still Not Working:

Provide these details:

1. **Output of:** `curl http://localhost:8000/api/history/`
2. **Backend terminal output** (last 20 lines)
3. **Browser console output** (F12 → Console, copy all)
4. **Network tab** (F12 → Network → /scan/ request, screenshot)
5. **Frontend .env content** (hide sensitive keys)

---

**TL;DR:**
1. Start backend: `cd backend && python manage.py runserver`
2. Verify: `curl http://localhost:8000/api/history/` returns `[]`
3. Start frontend: `cd frontend && npm run dev`
4. Test scan at http://localhost:5173/scan

**The backend MUST be running for scan to work!**
