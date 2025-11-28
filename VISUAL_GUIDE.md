# 📸 Visual Guide - How to Use the Merged Project

## 🎯 Home Page

When you open http://localhost:5173, you'll see:

```
┌─────────────────────────────────────────────────┐
│                    🌱 কৃষি                      │
│              আপনার ফসল রক্ষা করুন              │
│                                                 │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐       │
│  │ ☁️   │  │ 📦   │  │ 🌱   │  │ 🍃   │       │
│  │আবহাওয়া│  │সংরক্ষণ│  │ফসল   │  │স্বাস্থ্য│       │
│  │সতর্কতা │  │পরামর্শ │  │রক্ষা  │  │স্ক্যানার│       │
│  └──────┘  └──────┘  └──────┘  └──────┘       │
│                                                 │
│     [শুরু করুন]  [স্ক্যান করুন]  [আরও জানুন]  │
│                      ↑                          │
│                  NEW BUTTON!                    │
└─────────────────────────────────────────────────┘
```

## 🔍 Scan Page Flow

### Step 1: Click "স্ক্যান করুন" Button
```
Home Page → Click Button → Navigate to /scan
```

### Step 2: Scan Page Loads
```
┌─────────────────────────────────────────────────┐
│         🍃 ফসলের স্বাস্থ্য স্ক্যানার           │
│                                                 │
│  ┌──────┐  ┌──────┐  ┌──────┐                 │
│  │📱    │  │✨    │  │✅    │                 │
│  │মোবাইল │  │এআই   │  │তাৎক্ষণিক│                 │
│  └──────┘  └──────┘  └──────┘                 │
│                                                 │
│         [স্ক্যান শুরু করুন] ← Click this       │
└─────────────────────────────────────────────────┘
```

### Step 3: Scanner Interface Appears
```
┌─────────────────────────────────────────────────┐
│  Upload Area                    │  History      │
│  ┌─────────────────┐            │  ┌─────────┐ │
│  │                 │            │  │ Scan 1  │ │
│  │  📷 Upload or   │            │  │ Fresh   │ │
│  │  Capture Image  │            │  │ 85%     │ │
│  │                 │            │  └─────────┘ │
│  └─────────────────┘            │  ┌─────────┐ │
│                                 │  │ Scan 2  │ │
│  [ফসলের স্বাস্থ্য বিশ্লেষণ করুন]  │  │ Rotten  │ │
│                                 │  │ 92%     │ │
│                                 │  └─────────┘ │
└─────────────────────────────────────────────────┘
```

### Step 4: Analysis Results
```
┌─────────────────────────────────────────────────┐
│  Results                        │  History      │
│  ┌─────────────────┐            │  ┌─────────┐ │
│  │  ✅ Fresh!      │            │  │ Scan 1  │ │
│  │  Confidence: 85%│            │  │ Fresh   │ │
│  │                 │            │  │ 85%     │ │
│  │  [Image]        │            │  └─────────┘ │
│  └─────────────────┘            │  ┌─────────┐ │
│                                 │  │ Scan 2  │ │
│  [Scan Another]                 │  │ Rotten  │ │
│                                 │  │ 92%     │ │
│                                 │  └─────────┘ │
└─────────────────────────────────────────────────┘
```

## 🔐 Authentication Flow (Backend)

### Register User
```
POST /api/register/
{
  "phone_number": "01712345678",
  "name": "John Doe",
  "password": "password123",
  "role": "farmer",
  "language": "bangla"
}

Response:
{
  "message": "User registered successfully",
  "user": { ... },
  "tokens": {
    "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
  }
}
```

### Login User
```
POST /api/login/
{
  "phone_number": "01712345678",
  "password": "password123"
}

Response:
{
  "message": "Login successful",
  "user": { ... },
  "tokens": {
    "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
  }
}
```

### Get Profile
```
GET /api/profile/
Headers: Authorization: Bearer <access_token>

Response:
{
  "id": "uuid",
  "phone_number": "01712345678",
  "name": "John Doe",
  "role": "farmer",
  "language": "bangla",
  "created_at": "2025-11-28T..."
}
```

## 📱 Scan API Flow

### Upload & Analyze Image
```
POST /api/scan/
Content-Type: multipart/form-data
Body: image file

Response:
{
  "id": "uuid",
  "status": "fresh",
  "confidence": 0.85,
  "image_url": "http://localhost:8000/media/scans/...",
  "timestamp": "2025-11-28 12:00:00"
}
```

### Get Scan History
```
GET /api/history/

Response:
[
  {
    "id": "uuid",
    "status": "fresh",
    "confidence": 0.85,
    "image_url": "http://...",
    "timestamp": "2025-11-28 12:00:00",
    "user_name": "John Doe"
  },
  ...
]
```

## 🗂️ File Structure Visual

```
merged-krishi-project/
│
├── 📁 backend/                    Django REST API
│   ├── 📁 crop/                   Project settings
│   │   ├── settings.py           ✅ JWT configured
│   │   └── urls.py               ✅ API routes
│   │
│   ├── 📁 scanner/                Main app
│   │   ├── models.py             ✅ User + ScanResult
│   │   ├── views.py              ✅ Auth + Scan APIs
│   │   ├── serializers.py        ✅ Data serialization
│   │   ├── urls.py               ✅ Endpoints
│   │   ├── admin.py              ✅ Admin panel
│   │   └── authentication.py     ✅ JWT auth
│   │
│   ├── manage.py                 Django CLI
│   └── requirements.txt          Dependencies
│
├── 📁 frontend/                   React + Vite
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   │   ├── LandingHero.tsx   ✅ Scan button added
│   │   │   ├── ImageUpload.tsx   ✅ Upload component
│   │   │   ├── AnalysisResult.tsx ✅ Results display
│   │   │   └── ScanHistory.tsx   ✅ History sidebar
│   │   │
│   │   ├── 📁 pages/
│   │   │   ├── CropHealthScan.tsx ✅ Main scan page
│   │   │   └── ...               Other pages
│   │   │
│   │   ├── 📁 lib/
│   │   │   └── api.ts            ✅ API utilities
│   │   │
│   │   └── App.tsx               ✅ Routes configured
│   │
│   ├── package.json              Dependencies
│   └── .env                      Configuration
│
├── 📄 README.md                   Complete docs
├── 📄 START.md                    Quick start
├── 📄 MERGE_COMPLETE.md          Merge details
├── 📄 VISUAL_GUIDE.md            This file
└── 🚀 start-project.bat          Startup script
```

## 🎨 Color Coding

- ✅ = New or Updated file
- 📁 = Folder
- 📄 = Documentation
- 🚀 = Executable script
- 🌱 = Crop/Agriculture related
- 🔐 = Authentication related
- 📡 = API related

## 🚦 Traffic Light System

### Backend Status
```
🟢 Running on port 8000
🟡 Starting up...
🔴 Not running
```

### Frontend Status
```
🟢 Running on port 5173
🟡 Building...
🔴 Not running
```

### API Connection
```
🟢 Connected to backend
🟡 Connecting...
🔴 Connection failed
```

## 📊 Data Flow Diagram

```
User Browser (Frontend)
        ↓
    [Click Scan Button]
        ↓
    Navigate to /scan
        ↓
    [Upload Image]
        ↓
    POST /api/scan/
        ↓
Django Backend (API)
        ↓
    [Process Image]
        ↓
    HuggingFace AI Model
        ↓
    [Get Prediction]
        ↓
    Save to Database
        ↓
    Return JSON Response
        ↓
Frontend (Display Results)
        ↓
    [Show Fresh/Rotten]
        ↓
    Update History Sidebar
```

## 🎯 Quick Navigation

### Frontend Routes
- `/` → Home page with scan button
- `/scan` → Crop health scanner
- `/weather-alert` → Weather forecasts
- `/storage-advice` → Storage tips
- `/crop-protection` → Protection methods
- `/farmer` → Farmer registration
- `/farmer/profile` → Profile page

### Backend Endpoints
- `/api/register/` → Register user
- `/api/login/` → Login user
- `/api/profile/` → Get profile
- `/api/scan/` → Scan crop image
- `/api/history/` → Get scan history
- `/admin/` → Django admin panel

## 💡 Pro Tips

1. **Always start backend first**, then frontend
2. **Check console logs** for API errors
3. **Use Django admin** to manage users
4. **Test with Postman** for API debugging
5. **Read START.md** for quick commands

---

**Happy Scanning! 🌱**
