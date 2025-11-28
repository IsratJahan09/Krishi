# 🧪 TEST SCAN SYSTEM

## Quick Test Steps

### Step 1: Restart Frontend (MUST DO!)
```powershell
# In frontend terminal, press Ctrl+C to stop
cd merged-krishi-project\frontend
npm run dev
```

### Step 2: Open Browser with Console
1. Open http://localhost:5173/scan
2. Press **F12** to open Developer Tools
3. Click **Console** tab
4. Keep it open!

### Step 3: Test Scan
1. Click "স্ক্যান শুরু করুন" button
2. Upload a crop image
3. Click "ফসলের স্বাস্থ্য বিশ্লেষণ করুন" button
4. **Watch the console!**

## What You Should See:

### In Browser Console (F12):
```
=== Starting Image Analysis ===
File name: your-image.jpg
File size: 123456 bytes
[API] Preparing scan request
[API] Sending request to /scan/
[API] Scan response received
=== Analysis Complete ===
```

### In Backend Terminal:
```
Image hash: abc123...
Calling HuggingFace API...
HuggingFace API Response Status: 200
Predictions received: [...]
Final status: fresh
POST /api/scan/ 200 OK
```

## If Nothing Happens:

### Check 1: Is Backend Running?
```powershell
curl http://localhost:8000/api/history/
```
Should return: `[]` or list

### Check 2: Is Frontend Using Correct URL?
Open browser console and type:
```javascript
console.log(import.meta.env.VITE_API_URL)
```
Should show: `http://localhost:8000/api`

### Check 3: Any Errors in Console?
Look for red text in browser console (F12)

## Common Problems:

### Problem 1: Button Does Nothing
**Cause:** Frontend not restarted
**Fix:** Stop frontend (Ctrl+C) and run `npm run dev`

### Problem 2: "Failed to fetch"
**Cause:** Backend not running
**Fix:** Start backend: `python manage.py runserver`

### Problem 3: CORS Error
**Cause:** CORS not configured
**Fix:** Check backend/crop/settings.py has:
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
]
```

### Problem 4: 404 Error
**Cause:** Wrong API URL
**Fix:** Check frontend/.env has:
```
VITE_API_URL=http://localhost:8000/api
```

## Debug Checklist:

- [ ] Backend running on port 8000
- [ ] Frontend running on port 5173
- [ ] Frontend restarted after code changes
- [ ] Browser console open (F12)
- [ ] No errors in browser console
- [ ] Backend console shows requests
- [ ] .env file has correct VITE_API_URL

## Quick Fix Commands:

```powershell
# Terminal 1 - Backend
cd merged-krishi-project\backend
python manage.py runserver

# Terminal 2 - Frontend (NEW window)
cd merged-krishi-project\frontend
npm run dev
```

## Test with curl:

```powershell
# Test history endpoint
curl http://localhost:8000/api/history/

# Test scan endpoint (need image file)
curl -X POST http://localhost:8000/api/scan/ -F "image=@test.jpg"
```

---

**IMPORTANT:** Always restart frontend after code changes!
The debug logs won't appear until you restart with `npm run dev`.
