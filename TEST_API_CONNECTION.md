# API Connection Test

## ✅ Configuration Fixed

### Changes Made:

1. **Added Proxy to vite.config.ts**
   ```typescript
   proxy: {
     '/api': {
       target: 'http://localhost:8000',
       changeOrigin: true,
       secure: false,
     },
     '/media': {
       target: 'http://localhost:8000',
       changeOrigin: true,
       secure: false,
     },
   }
   ```

2. **Frontend restarted** - Now running on port 8082

---

## 🔍 Current Status

### Backend
- **URL**: http://localhost:8000
- **API Endpoint**: http://localhost:8000/api/risk-prediction/
- **Status**: ✅ RUNNING

### Frontend
- **URL**: http://localhost:8082 (changed from 8080)
- **Risk Page**: http://localhost:8082/risk-prediction
- **Status**: ✅ RUNNING

---

## 🧪 Test the Connection

### Method 1: Browser Test
1. Open: **http://localhost:8082/risk-prediction**
2. Open Browser DevTools (F12) → Network tab
3. Enter data:
   - Moisture: 15.5
   - Temperature: 34
   - Location: Dhaka
4. Click "ঝুঁকি বিশ্লেষণ করুন"
5. Check Network tab for:
   - Request to `/api/risk-prediction/`
   - Status: 200 OK
   - Response with data

### Method 2: Direct API Test
Open browser and go to:
```
http://localhost:8000/api/risk-prediction/
```

You should see:
```
{"detail":"Method \"GET\" not allowed."}
```
This is correct! The endpoint only accepts POST requests.

### Method 3: cURL Test
```bash
curl -X POST http://localhost:8000/api/risk-prediction/ \
  -H "Content-Type: application/json" \
  -d "{\"moisture\": 15.5, \"temperature\": 34, \"location\": \"Dhaka\"}"
```

Expected response:
```json
{
  "batch_id": "BATCH-...",
  "location": "Dhaka",
  "etcl_hours": 72.5,
  "risk_category": "High Risk",
  "weather_forecast_7d": [...],
  "advisory_bangla": {...}
}
```

---

## 🔧 Troubleshooting

### If API call fails:

1. **Check Backend is Running**
   ```
   http://localhost:8000/admin
   ```
   Should show Django admin login

2. **Check CORS Settings**
   In `backend/crop/settings.py`:
   ```python
   CORS_ALLOWED_ORIGINS = [
       "http://localhost:3000",
       "http://127.0.0.1:3000",
       "http://localhost:5173",
       "http://127.0.0.1:5173",
       "http://localhost:8080",  # Add this
       "http://localhost:8082",  # Add this
   ]
   ```

3. **Check Browser Console**
   - Open DevTools (F12)
   - Look for errors
   - Check Network tab for failed requests

4. **Check Backend Logs**
   - Look at Django terminal
   - Should show incoming requests

---

## 📝 Quick Fix Commands

### Restart Frontend
```bash
cd frontend
npm run dev
```

### Restart Backend
```bash
cd backend
python manage.py runserver
```

### Test API Directly
```bash
# Windows PowerShell
Invoke-RestMethod -Uri "http://localhost:8000/api/risk-prediction/" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"moisture": 15.5, "temperature": 34, "location": "Dhaka"}'
```

---

## ✅ Expected Behavior

1. **Open**: http://localhost:8082/risk-prediction
2. **Enter data** and click calculate
3. **See**:
   - Loading spinner
   - Risk summary appears
   - 7 weather cards appear
   - General advisory at bottom
4. **No errors** in console

---

## 🎯 Access URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:8082 |
| Risk Prediction | http://localhost:8082/risk-prediction |
| Backend API | http://localhost:8000/api |
| Risk API | http://localhost:8000/api/risk-prediction/ |
| Admin | http://localhost:8000/admin |

---

**The proxy is now configured. Try accessing:**
**http://localhost:8082/risk-prediction**
