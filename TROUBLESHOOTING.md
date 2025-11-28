# 🔧 Troubleshooting Guide

## ❌ Scan Not Working After Upload

### Issue: Image uploads but doesn't scan

#### ✅ Fix Applied:
1. **Added VITE_API_URL to frontend/.env**
   ```
   VITE_API_URL=http://localhost:8000/api
   ```

2. **Fixed confidence calculation** in CropHealthScan.tsx
   - Now handles both decimal (0.85) and percentage (85) formats

### Steps to Verify Fix:

1. **Restart Frontend Server**
   ```bash
   cd merged-krishi-project/frontend
   # Press Ctrl+C to stop current server
   npm run dev
   ```

2. **Check Backend is Running**
   ```bash
   # In another terminal
   cd merged-krishi-project/backend
   python manage.py runserver
   ```

3. **Test the Scan**
   - Open http://localhost:5173/scan
   - Upload an image
   - Click "ফসলের স্বাস্থ্য বিশ্লেষণ করুন"
   - Check browser console (F12) for errors

## 🐛 Common Errors & Solutions

### Error 1: "Failed to fetch" or "Network Error"

**Cause:** Backend not running or wrong API URL

**Solution:**
```bash
# Check backend is running
cd merged-krishi-project/backend
python manage.py runserver

# Verify .env has correct URL
cat frontend/.env | grep VITE_API_URL
# Should show: VITE_API_URL=http://localhost:8000/api
```

### Error 2: "CORS Error"

**Cause:** Frontend URL not in CORS allowed origins

**Solution:**
Check `backend/crop/settings.py`:
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",  # ← Must have this
    "http://127.0.0.1:5173",
]
```

### Error 3: "404 Not Found" on /api/scan/

**Cause:** Backend URLs not configured

**Solution:**
Check `backend/crop/urls.py`:
```python
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('scanner.urls')),  # ← Must have this
]
```

### Error 4: "500 Internal Server Error"

**Cause:** Database migration not run or HuggingFace API issue

**Solution:**
```bash
# Run migrations
cd merged-krishi-project/backend
python manage.py makemigrations
python manage.py migrate

# Check HuggingFace API key in .env
cat .env | grep HUGGINGFACE_API_KEY
```

### Error 5: Image uploads but analysis hangs

**Cause:** HuggingFace API timeout or model loading

**Solution:**
- Wait 15-30 seconds (model may be loading)
- Check backend console for logs
- Verify HuggingFace API key is valid
- Backend will use mock prediction if API fails

## 🔍 Debugging Steps

### 1. Check Browser Console (F12)

Look for errors like:
```
Failed to fetch
CORS error
404 Not Found
500 Internal Server Error
```

### 2. Check Backend Console

Look for:
```
Image hash: ...
Calling HuggingFace API...
HuggingFace API Response Status: 200
Predictions received: [...]
```

### 3. Test API Directly

**Test Scan Endpoint:**
```bash
curl -X POST http://localhost:8000/api/scan/ \
  -F "image=@path/to/your/image.jpg"
```

**Test History Endpoint:**
```bash
curl http://localhost:8000/api/history/
```

### 4. Check Network Tab (F12 → Network)

- Look for `/api/scan/` request
- Check request payload (should have image file)
- Check response (should have status, confidence, etc.)

## 📋 Checklist

Before reporting an issue, verify:

- [ ] Backend running on port 8000
- [ ] Frontend running on port 5173
- [ ] `.env` file has `VITE_API_URL=http://localhost:8000/api`
- [ ] CORS configured in `settings.py`
- [ ] Migrations run: `python manage.py migrate`
- [ ] HuggingFace API key in backend `.env`
- [ ] Browser console shows no errors
- [ ] Backend console shows API calls

## 🔄 Fresh Start

If nothing works, try a fresh start:

```bash
# 1. Stop all servers (Ctrl+C)

# 2. Backend fresh start
cd merged-krishi-project/backend
rm db.sqlite3
python manage.py migrate
python manage.py runserver

# 3. Frontend fresh start (new terminal)
cd merged-krishi-project/frontend
rm -rf node_modules
npm install
npm run dev
```

## 📞 Getting Help

If issue persists, provide:

1. **Browser Console Errors** (F12 → Console)
2. **Backend Console Output**
3. **Network Tab** (F12 → Network → /api/scan/ request)
4. **Environment**:
   - OS: Windows/Mac/Linux
   - Node version: `node --version`
   - Python version: `python --version`

## ✅ Expected Behavior

When working correctly:

1. **Upload Image** → Shows preview
2. **Click Analyze** → Button shows "বিশ্লেষণ করা হচ্ছে..."
3. **Wait 2-5 seconds** → Results appear
4. **Results Show**:
   - Status: Fresh or Rotten
   - Confidence: XX%
   - Image preview
5. **History Updates** → New scan appears in sidebar

## 🎯 Quick Test

Test if API is working:

```bash
# Terminal 1: Start backend
cd merged-krishi-project/backend
python manage.py runserver

# Terminal 2: Test API
curl http://localhost:8000/api/history/

# Should return: [] or list of scans
```

If this works, the backend is fine. Issue is in frontend connection.

## 💡 Pro Tips

1. **Always check both consoles** (browser + backend)
2. **Clear browser cache** if changes don't apply
3. **Restart servers** after .env changes
4. **Use incognito mode** to test without cache
5. **Check file permissions** on uploaded images

---

**Most Common Fix:** Restart frontend server after adding `VITE_API_URL` to `.env`!
