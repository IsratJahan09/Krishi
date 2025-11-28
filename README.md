# Krishi - Complete Agricultural Platform

A full-stack agricultural platform with AI-powered crop health scanning, weather alerts, storage advice, and farmer management.

## 🏗️ Project Structure

```
merged-krishi-project/
├── backend/                 # Django REST API
│   ├── crop/               # Django project settings
│   ├── scanner/            # Main app (models, views, APIs)
│   ├── media/              # Uploaded images
│   ├── manage.py
│   └── requirements.txt
├── frontend/               # React + Vite frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # API utilities
│   │   └── ...
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## ✨ Features

### Backend (Django)
- ✅ **Phone-based Authentication** - Register/Login with phone number (no email)
- ✅ **JWT Authentication** - Secure token-based auth
- ✅ **User Management** - Farmer/Admin roles, English/Bangla language
- ✅ **Crop Health Scanning** - AI-powered image analysis using HuggingFace
- ✅ **Scan History** - Track all crop scans
- ✅ **Django Admin** - Full admin panel for user management

### Frontend (React)
- ✅ **Landing Page** - Beautiful hero section with feature cards
- ✅ **Crop Health Scanner** - Upload/capture images for AI analysis
- ✅ **Weather Alerts** - 5-day weather forecasts
- ✅ **Storage Advice** - Local storage recommendations
- ✅ **Crop Protection** - Damage prevention tips
- ✅ **Farmer Dashboard** - Profile and batch management
- ✅ **Responsive Design** - Mobile-optimized UI

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. **Navigate to backend folder**
```bash
cd merged-krishi-project/backend
```

2. **Create virtual environment**
```bash
python -m venv venv
```

3. **Activate virtual environment**
- Windows: `venv\Scripts\activate`
- Mac/Linux: `source venv/bin/activate`

4. **Install dependencies**
```bash
pip install -r requirements.txt
```

5. **Create .env file**
```bash
# Create .env in backend folder
SECRET_KEY=your-secret-key-here
DEBUG=True
HUGGINGFACE_API_KEY=your-huggingface-api-key
```

6. **Run migrations**
```bash
python manage.py makemigrations
python manage.py migrate
```

7. **Create superuser (optional)**
```bash
python manage.py createsuperuser
```

8. **Run backend server**
```bash
python manage.py runserver
```

Backend will run on: **http://localhost:8000**

### Frontend Setup

1. **Navigate to frontend folder**
```bash
cd merged-krishi-project/frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env file**
```bash
# Copy .env.example to .env
cp .env.example .env

# Edit .env
VITE_API_URL=http://localhost:8000/api
```

4. **Run frontend server**
```bash
npm run dev
```

Frontend will run on: **http://localhost:5173**

## 📡 API Endpoints

### Authentication
- `POST /api/register/` - Register new user
  ```json
  {
    "phone_number": "01712345678",
    "name": "John Doe",
    "password": "password123",
    "role": "farmer",
    "language": "bangla"
  }
  ```

- `POST /api/login/` - Login user
  ```json
  {
    "phone_number": "01712345678",
    "password": "password123"
  }
  ```

- `GET /api/profile/` - Get user profile (requires JWT token)
  ```
  Headers: Authorization: Bearer <access_token>
  ```

### Crop Scanning
- `POST /api/scan/` - Upload and analyze crop image
  ```
  Content-Type: multipart/form-data
  Body: image file
  ```

- `GET /api/history/` - Get scan history
  ```
  Returns: Array of scan results
  ```

## 🔐 Authentication Flow

1. **Register**: User registers with phone number, name, and password
2. **Login**: User logs in and receives JWT access & refresh tokens
3. **Store Tokens**: Frontend stores tokens in localStorage
4. **API Requests**: Include `Authorization: Bearer <token>` header
5. **Profile Access**: Access protected routes with valid token

## 🎨 Frontend Routes

- `/` - Landing page
- `/scan` or `/crop-health-scan` - Crop health scanner
- `/weather-alert` - Weather alerts
- `/storage-advice` - Storage advice
- `/crop-protection` - Crop protection tips
- `/farmer` - Farmer registration
- `/farmer/profile` - Farmer profile
- `/farmer/new-batch` - New batch management

## 🛠️ Tech Stack

### Backend
- Django 4.2.7
- Django REST Framework
- djangorestframework-simplejwt
- django-cors-headers
- Pillow (image processing)
- HuggingFace API (AI model)

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Router
- TanStack Query

## 📝 User Model

```python
class User(models.Model):
    id = UUIDField (primary key)
    phone_number = CharField (unique, max 15 chars)
    name = CharField (max 100 chars)
    password = CharField (hashed, max 255 chars)
    role = CharField (farmer/admin)
    language = CharField (english/bangla)
    created_at = DateTimeField
    updated_at = DateTimeField
```

## 🔧 Development Commands

### Backend
```bash
# Run server
python manage.py runserver

# Make migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Access admin panel
http://localhost:8000/admin
```

### Frontend
```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🐛 Troubleshooting

### Backend Issues
- **ModuleNotFoundError**: Install missing packages with `pip install -r requirements.txt`
- **Database errors**: Delete `db.sqlite3` and run migrations again
- **CORS errors**: Check `CORS_ALLOWED_ORIGINS` in `settings.py`

### Frontend Issues
- **API connection failed**: Check `VITE_API_URL` in `.env`
- **Module not found**: Run `npm install`
- **Build errors**: Clear `node_modules` and reinstall

## 📦 Deployment

### Backend (Django)
1. Set `DEBUG=False` in production
2. Configure proper `SECRET_KEY`
3. Set up PostgreSQL database
4. Configure static files serving
5. Use gunicorn or uwsgi

### Frontend (React)
1. Build: `npm run build`
2. Deploy `dist` folder to hosting service
3. Configure environment variables
4. Set up proper API URL

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

Developed for agricultural communities to improve crop management and reduce losses.

## 🙏 Acknowledgments

- HuggingFace for AI models
- shadcn/ui for beautiful components
- Django & React communities
