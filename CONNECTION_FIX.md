# 🔌 CONNECTION FIX GUIDE

## Test Backend-Frontend Connection

### Step 1: Test Connection Page

I've created a connection test page. Access it at:
```
http://localhost:5173/test-connection
```

This will automatically test:
- ✅ API URL configuration
- ✅ Backend connectivity
- ✅ CORS settings

### Step 2: Manual Connection Test

Run these commands to verify connection:

```powershell
# Test 1: Check if backend is running
curl http://localhost:8000/api/history/

# Test 2: Check if frontend can reach backend
# Open browser console (F12) and run:
fetch('http://localhost:8000/api/history/').then(r => r.json()).then(console.log)
```

## ✅ If Connection Works:

You should see:
- Test page shows all green checkmarks
- `curl` command returns `[]`
- Browser fetch returns empty array

## ❌ If Connection Fails:

### Fix 1: Start Backend

```powershell
cd merged-krishi-project\backend
python manage.py runserver
```

**Must see:** "Starting development server at http://127.0.0.1:8000/"

### Fix 2: Check CORS Settings

File: `backend/crop/settings.py`

Should have:
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
```

### Fix 3: Check Frontend .env

File: `frontend/.env`

Should have:
```
VITE_API_URL=http://localhost:8000/api
```

### Fix 4: Restart Frontend

```powershell
# Stop frontend (Ctrl+C)
cd merged-krishi-project\frontend
npm run dev
```

## 🧪 Complete Test Procedure:

### Terminal 1 - Backend:
```powershell
cd merged-krishi-project\backend
python manage.py runserver
```

### Terminal 2 - Frontend:
```powershell
cd merged-krishi-project\frontend
npm run dev
```

### Terminal 3 - Test:
```powershell
# Test backend
curl http://localhost:8000/api/history/

# Should return: []
```

### Browser:
1. Open http://localhost:5173/test-connection
2. Click "Run Connection Test"
3. All tests should pass (green checkmarks)

## 📊 Expected Results:

### Backend Terminal:
```
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.
```

### Frontend Terminal:
```
VITE v5.x.x  ready in xxx ms
➜  Local:   http://localhost:5173/
```

### Test Page:
```
✅ API URL Configuration
✅ History Endpoint
✅ CORS Configuration
```

### curl Command:
```
[]
```

## 🔍 Debugging:

### Check 1: Backend Running?
```powershell
netstat -ano | findstr :8000
```
Should show a process using port 8000

### Check 2: Frontend Running?
```powershell
netstat -ano | findstr :5173
```
Should show a process using port 5173

### Check 3: Firewall Blocking?
Try accessing:
- http://127.0.0.1:8000/api/history/
- http://localhost:8000/api/history/

Both should work

### Check 4: Browser Console Errors?
1. Open http://localhost:5173/scan
2. Press F12
3. Try to scan
4. Look for errors in Console tab

## 💡 Common Issues:

### Issue: "Failed to fetch"
**Cause:** Backend not running
**Fix:** Start backend

### Issue: "CORS policy"
**Cause:** CORS not configured
**Fix:** Add localhost:5173 to CORS_ALLOWED_ORIGINS

### Issue: "404 Not Found"
**Cause:** Wrong API URL
**Fix:** Check .env has correct URL

### Issue: "Connection refused"
**Cause:** Backend not listening
**Fix:** Restart backend

## ✅ Success Checklist:

- [ ] Backend shows "Starting development server"
- [ ] Frontend shows "Local: http://localhost:5173/"
- [ ] `curl http://localhost:8000/api/history/` returns `[]`
- [ ] Test page shows all green checkmarks
- [ ] No errors in browser console
- [ ] No errors in backend terminal

## 🎯 Final Test:

1. Visit: http://localhost:5173/test-connection
2. Click "Run Connection Test"
3. All tests should pass
4. Then try scan at: http://localhost:5173/scan

---

**If test page shows all green, connection is working!**
**If scan still fails, the issue is in the scan logic, not connection.**
