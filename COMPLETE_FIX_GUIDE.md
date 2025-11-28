# 🔧 COMPLETE FIX GUIDE - Scan Not Predicting

## ✅ FIXES APPLIED:

1. **Added extensive logging** to backend views
2. **Fixed user assignment** in scan (now optional)
3. **Made authentication optional** for scans
4. **Added error tracking** with full stack traces

## 🚀 TO APPLY FIXES:

### Step 1: Restart Backend (CRITICAL!)
```powershell
# Stop backend (Ctrl+C in backend terminal)
cd merged-krishi-project\backend
python manage.py runserver
```

### Step 2: Restart Frontend
```powershell
# Stop frontend (Ctrl+C in frontend terminal)
cd merged-krishi-project\frontend
npm run dev
```

### Step 3: Test the Scan

1. Open http://localhost:5173/scan
2. Click "স্ক্যান শুরু করুন"
3. Upload an image
4. Click "ফসলের স্বাস্থ্য বিশ্লেষণ করুন"

## 📊 What to Check:

### In Backend Terminal:
You should now see detailed logs:
```
=== Scan Request Received ===
Request method: POST
Request FILES: dict_keys(['image'])
Image file received: image.jpg, Size: 123456 bytes
Calling HuggingFace API...
Image hash: abc123...
Calling HuggingFace API with model: google/vit-base-patch16-224
HuggingFace API Response Status: 200
Predictions received: [...]
Converting prediction - Label: ..., Confidence: ...
Final status: fresh
API Result: {'status': 'fresh', 'confidence': 0.85, ...}
Saving to database...
Scan saved with ID: ...
=== Scan Complete ===
POST /api/scan/ 200 OK
```

### In Browser Console (F12):
```
=== Starting Image Analysis ===
File name: image.jpg
[API] Preparing scan request
[API] Scan response received
=== Analysis Complete ===
```

## 🐛 Common Issues & Solutions:

### Issue 1: "Failed to fetch"
**Cause:** Backend not running
**Solution:**
```powershell
cd merged-krishi-project\backend
python manage.py runserver
```

### Issue 2: "No image file provided"
**Cause:** Image not uploading correctly
**Check:** Browser console for upload errors

### Issue 3: HuggingFace API Error
**Cause:** Invalid API key or model loading
**Check:** Backend terminal for API response
**Solution:** Wait 15-30 seconds for model to load

### Issue 4: Database Error
**Cause:** Migrations not run
**Solution:**
```powershell
cd merged-krishi-project\backend
python manage.py makemigrations
python manage.py migrate
```

## 🧪 Test Backend Directly:

### Test 1: Check if backend is running
```powershell
curl http://localhost:8000/api/history/
```
Should return: `[]` or list of scans

### Test 2: Test scan endpoint with curl
```powershell
curl -X POST http://localhost:8000/api/scan/ -F "image=@path\to\test.jpg"
```
Should return JSON with scan result

### Test 3: Check backend logs
Look in backend terminal for:
- "=== Scan Request Received ==="
- "Calling HuggingFace API..."
- "=== Scan Complete ==="

## 📋 Debugging Checklist:

- [ ] Backend running on port 8000
- [ ] Frontend running on port 5173
- [ ] Both servers restarted after code changes
- [ ] Browser console open (F12)
- [ ] Backend terminal showing logs
- [ ] No errors in either console
- [ ] .env file has VITE_API_URL=http://localhost:8000/api
- [ ] HuggingFace API key in backend .env

## 🎯 Expected Flow:

1. **Upload Image** → Frontend sends to backend
2. **Backend Receives** → Logs "Scan Request Received"
3. **Call HuggingFace** → Logs "Calling HuggingFace API"
4. **Get Prediction** → Logs "Predictions received"
5. **Save to DB** → Logs "Scan saved with ID"
6. **Return Result** → Frontend shows result
7. **Update History** → Sidebar updates

## 💡 Pro Tips:

1. **Always check BOTH terminals** (backend + frontend)
2. **Restart both servers** after code changes
3. **Check browser console** (F12) for frontend errors
4. **Check backend terminal** for API errors
5. **Use small test images** first (< 1MB)
6. **Wait for model to load** (first request may take 15-30 seconds)

## 🔍 If Still Not Working:

### Collect This Information:

1. **Backend Terminal Output** (last 50 lines)
2. **Browser Console Output** (F12 → Console)
3. **Network Tab** (F12 → Network → /scan/ request)
4. **Backend .env file** (hide API key)
5. **Frontend .env file**

### Test Commands:

```powershell
# Test backend
curl http://localhost:8000/api/history/

# Check Python version
python --version

# Check if port 8000 is in use
netstat -ano | findstr :8000

# Check if port 5173 is in use
netstat -ano | findstr :5173
```

## ✅ Success Indicators:

- Backend logs show "=== Scan Complete ==="
- Frontend shows result with Fresh/Rotten status
- History sidebar updates with new scan
- No errors in either console
- Response time < 10 seconds

---

**Most Common Issue:** Servers not restarted after code changes!

**Solution:** 
1. Stop both servers (Ctrl+C)
2. Start backend: `cd backend && python manage.py runserver`
3. Start frontend: `cd frontend && npm run dev`
4. Try scan again!
