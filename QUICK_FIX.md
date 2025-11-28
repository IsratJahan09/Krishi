# ⚡ QUICK FIX - Scan Not Working

## 🔴 Problem
Image uploads but doesn't scan / Analysis button doesn't work

## ✅ Solution (3 Steps)

### Step 1: Stop Frontend Server
Press `Ctrl + C` in the terminal running frontend

### Step 2: Verify .env File
Check `merged-krishi-project/frontend/.env` contains:
```
VITE_API_URL=http://localhost:8000/api
```

**✅ Already Fixed!** This line has been added.

### Step 3: Restart Frontend
```bash
cd merged-krishi-project/frontend
npm run dev
```

## 🧪 Test Now

1. Open http://localhost:5173/scan
2. Click "স্ক্যান শুরু করুন"
3. Upload an image
4. Click "ফসলের স্বাস্থ্য বিশ্লেষণ করুন"
5. Wait 2-5 seconds
6. ✅ Results should appear!

## 🔍 Still Not Working?

### Check Backend is Running
```bash
# Open new terminal
cd merged-krishi-project/backend
python manage.py runserver
```

Should see:
```
Starting development server at http://127.0.0.1:8000/
```

### Check Browser Console (F12)
Look for errors. Common ones:

**"Failed to fetch"** → Backend not running
**"CORS error"** → Check settings.py CORS config
**"404 Not Found"** → Check API URL in .env

### Test API Directly
```bash
curl http://localhost:8000/api/history/
```

Should return: `[]` or list of scans

## 📝 What Was Fixed

1. ✅ Added `VITE_API_URL=http://localhost:8000/api` to frontend/.env
2. ✅ Fixed confidence calculation to handle both formats
3. ✅ Improved error handling in scan function

## 🎯 Expected Flow

```
1. Upload Image → ✅ Preview shows
2. Click Analyze → ✅ Button shows "বিশ্লেষণ করা হচ্ছে..."
3. Backend Processing → ✅ Console shows "Analyzing image..."
4. Results Appear → ✅ Shows Fresh/Rotten with confidence
5. History Updates → ✅ New scan in sidebar
```

## 💡 Remember

**Always restart frontend after .env changes!**

The `VITE_` environment variables are only loaded when the dev server starts.

---

**Need more help?** Check `TROUBLESHOOTING.md` for detailed debugging steps.
