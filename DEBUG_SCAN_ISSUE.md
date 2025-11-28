# 🔍 DEBUG SCAN ISSUE

## Problem: Scan button not working after clicking

### ✅ UPDATED CODE WITH DEBUG LOGS

I've added extensive console logging to help identify the issue.

### 🔧 Steps to Debug:

#### 1. **Restart Frontend** (IMPORTANT!)
```powershell
# Stop frontend (Ctrl+C)
cd merged-krishi-project\frontend
npm run dev
```

**Why?** The code changes need to be reloaded.

#### 2. **Open Browser Console** (F12)
- Open http://localhost:5173/scan
- Press F12 to open Developer Tools
- Go to "Console" tab

#### 3. **Test the Scan**
1. Click "স্ক্যান শুরু করুন" (Start Scan)
2. Upload an image
3. Click "ফসলের স্বাস্থ্য বিশ্লেষণ করুন" (Analyze)
4. **Watch the console logs**

### 📊 What to Look For in Console:

#### ✅ GOOD - You should see:
```
=== Starting Image Analysis ===
File name: image.jpg
File size: 123456 bytes
File type: image/jpeg
API module loaded
[API] Preparing scan request
[API] Image file: image.jpg 123456 bytes
[API] API URL: http://localhost:8000/api
[API] FormData created, sending request to /scan/
[API] Scan response received: {id: "...", status: "fresh", ...}
=== Analysis Result Received ===
Full response: {...}
Formatted result: {...}
=== Analysis Complete ===
```

#### ❌ BAD - Error scenarios:

**Scenario 1: Network Error**
```
Error: Failed to fetch
```
**Solution:** Backend not running. Start it:
```powershell
cd merged-krishi-project\backend
python manage.py runserver
```

**Scenario 2: CORS Error**
```
Access to fetch at 'http://localhost:8000/api/scan/' from origin 'http://localhost:5173' has been blocked by CORS policy
```
**Solution:** Check backend settings.py has:
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
]
```

**Scenario 3: 404 Not Found**
```
Error: Request failed
Status: 404
```
**Solution:** Backend URL wrong. Check frontend/.env:
```
VITE_API_URL=http://localhost:8000/api
```

**Scenario 4: 500 Internal Server Error**
```
Error: Request failed
Status: 500
```
**Solution:** Check backend console for Python errors.

### 🔍 Additional Checks:

#### Check 1: Verify Backend is Running
```powershell
curl http://localhost:8000/api/history/
```
Should return: `[]` or list of scans

#### Check 2: Verify Frontend .env
```powershell
cd merged-krishi-project\frontend
type .env
```
Should show:
```
VITE_API_URL=http://localhost:8000/api
```

#### Check 3: Test API Directly
```powershell
# Create a test image file first, then:
curl -X POST http://localhost:8000/api/scan/ -F "image=@test.jpg"
```

### 🎯 Common Issues & Solutions:

| Issue | Symptom | Solution |
|-------|---------|----------|
| Backend not running | "Failed to fetch" | Start backend: `python manage.py runserver` |
| Wrong API URL | 404 error | Check .env has `VITE_API_URL=http://localhost:8000/api` |
| CORS error | CORS policy error | Add localhost:5173 to CORS_ALLOWED_ORIGINS |
| Frontend not restarted | Old code running | Restart frontend with `npm run dev` |
| Image too large | Request timeout | Use smaller image (< 5MB) |

### 📝 Step-by-Step Debugging:

1. **Open Console (F12)**
2. **Clear Console** (click trash icon)
3. **Try scan again**
4. **Copy all console output**
5. **Look for the error message**

### 🚀 Quick Test Commands:

**Test Backend:**
```powershell
curl http://localhost:8000/api/history/
```

**Test Frontend .env:**
```powershell
cd merged-krishi-project\frontend
type .env | findstr VITE_API_URL
```

**Restart Everything:**
```powershell
# Terminal 1
cd merged-krishi-project\backend
python manage.py runserver

# Terminal 2
cd merged-krishi-project\frontend
npm run dev
```

### 💡 Pro Tips:

1. **Always check BOTH consoles** (browser + backend terminal)
2. **Restart frontend after .env changes**
3. **Use small test images first** (< 1MB)
4. **Check Network tab** (F12 → Network) to see actual requests
5. **Look for red errors** in console

### 📞 What to Report:

If still not working, provide:
1. **Browser console output** (copy all text)
2. **Backend terminal output** (copy last 20 lines)
3. **Network tab screenshot** (F12 → Network → /scan/ request)
4. **Frontend .env content** (hide sensitive keys)

---

**Most likely issue:** Frontend not restarted after code changes!
**Solution:** Stop frontend (Ctrl+C) and run `npm run dev` again.
