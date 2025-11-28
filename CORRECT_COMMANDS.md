# ✅ CORRECT COMMANDS TO START

## 🔴 Your Error
```
PS C:\Users\HP\Desktop\krishi - Copy\Krishi\merged-krishi-project> python manage.py runserver
can't open file 'manage.py': [Errno 2] No such file or directory
```

**Problem:** You're in the wrong directory! `manage.py` is inside the `backend` folder.

## ✅ CORRECT WAY - Option 1: Use Batch File (EASIEST)

### Just double-click this file:
```
merged-krishi-project/START_SERVERS.bat
```

This will automatically start both backend and frontend in separate windows!

## ✅ CORRECT WAY - Option 2: Manual Commands

### Terminal 1 - Backend
```powershell
cd merged-krishi-project\backend
python manage.py runserver
```

### Terminal 2 - Frontend (Open NEW terminal)
```powershell
cd merged-krishi-project\frontend
npm run dev
```

## 📁 Directory Structure

```
merged-krishi-project/          ← You are here
├── backend/                    ← manage.py is HERE
│   ├── manage.py              ← Django file
│   ├── crop/
│   └── scanner/
└── frontend/                   ← package.json is HERE
    ├── package.json           ← React file
    └── src/
```

## 🎯 Step-by-Step Guide

### Step 1: Navigate to Project Root
```powershell
cd C:\Users\HP\Desktop\krishi - Copy\Krishi\merged-krishi-project
```

### Step 2: Start Backend
```powershell
cd backend
python manage.py runserver
```

**Expected Output:**
```
Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).
November 28, 2025 - 04:00:00
Django version 4.2.7, using settings 'crop.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.
```

### Step 3: Start Frontend (NEW Terminal)
```powershell
cd C:\Users\HP\Desktop\krishi - Copy\Krishi\merged-krishi-project\frontend
npm run dev
```

**Expected Output:**
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h + enter to show help
```

## 🚀 Quick Start (Copy-Paste)

### Backend Terminal:
```powershell
cd "C:\Users\HP\Desktop\krishi - Copy\Krishi\merged-krishi-project\backend"
python manage.py runserver
```

### Frontend Terminal (NEW window):
```powershell
cd "C:\Users\HP\Desktop\krishi - Copy\Krishi\merged-krishi-project\frontend"
npm run dev
```

## ⚠️ Common Mistakes

### ❌ WRONG:
```powershell
cd merged-krishi-project
python manage.py runserver    # ← manage.py not here!
```

### ✅ CORRECT:
```powershell
cd merged-krishi-project\backend
python manage.py runserver    # ← manage.py is here!
```

## 🔍 Verify You're in Right Directory

### For Backend:
```powershell
dir manage.py
```
Should show: `manage.py` file exists

### For Frontend:
```powershell
dir package.json
```
Should show: `package.json` file exists

## 💡 Pro Tip

**Use the batch file!** Just double-click:
```
START_SERVERS.bat
```

It will:
1. ✅ Navigate to correct directories automatically
2. ✅ Start both servers in separate windows
3. ✅ Show you the URLs

## 🎯 After Starting

1. **Backend running?** Check http://localhost:8000/admin
2. **Frontend running?** Check http://localhost:5173
3. **Test scan:** Go to http://localhost:5173/scan

## 📞 Still Having Issues?

### Check Python is installed:
```powershell
python --version
```
Should show: `Python 3.x.x`

### Check Node is installed:
```powershell
node --version
```
Should show: `v16.x.x` or higher

### Check you're in project folder:
```powershell
pwd
```
Should show: `...\merged-krishi-project`

---

**TL;DR:** Use `START_SERVERS.bat` or navigate to `backend` folder first!
