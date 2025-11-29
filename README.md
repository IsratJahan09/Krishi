# 🌾 Krishi - Crop Health Scanner

AI-powered crop health monitoring system with user authentication, scan history, and weather integration.

## 🚀 Features

- **AI Crop Health Detection** - HuggingFace-powered image analysis
- **User Authentication** - JWT-based secure login/registration
- **Scan History** - Track all crop health scans with images
- **Weather Integration** - Real-time weather data for farming decisions
- **Admin Dashboard** - Manage users and view all scans
- **Responsive Design** - Works on desktop and mobile

## 📋 Tech Stack

### Backend
- Django 4.2.7
- Django REST Framework
- JWT Authentication
- HuggingFace API
- SQLite Database

### Frontend
- React 18 + TypeScript
- Vite
- TailwindCSS + shadcn/ui
- React Router
- React Query
- Supabase (optional)

## 🛠️ Installation

### Prerequisites
- Python 3.8+
- Node.js 16+
- pip
- npm

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser for admin
python manage.py createsuperuser

# Start server
python manage.py runserver
```

Backend runs on: http://localhost:8000

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs on: http://localhost:5173

## 🔑 Environment Variables

### Backend (.env)
```env
SECRET_KEY=your-django-secret-key
DEBUG=True
HUGGINGFACE_API_KEY=your-huggingface-api-key
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000/api
VITE_OPENWEATHER_API_KEY=your-openweather-api-key
VITE_SUPABASE_URL=your-supabase-url (optional)
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-key (optional)
```

## 📱 Usage

1. **Register/Login** - Create account or login
2. **Upload Crop Image** - Take photo or upload from device
3. **Analyze** - AI analyzes crop health (fresh/rotten)
4. **View History** - See all previous scans
5. **Check Weather** - View weather data for farming

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register/` - Register new user
- `POST /api/auth/login/` - Login user
- `POST /api/auth/token/refresh/` - Refresh JWT token

### Crop Scanning
- `POST /api/scan/` - Upload and analyze crop image
- `GET /api/history/` - Get scan history
- `DELETE /api/history/clear/` - Clear scan history

### User Profile
- `GET /api/user/profile/` - Get user profile
- `PUT /api/user/profile/` - Update profile

## 🏗️ Project Structure

```
krishi/
├── backend/
│   ├── crop/              # Django project settings
│   ├── scanner/           # Crop scanning app
│   │   ├── models.py      # Database models
│   │   ├── views.py       # API endpoints
│   │   ├── serializers.py # Data serialization
│   │   └── admin.py       # Admin interface
│   ├── media/             # Uploaded images
│   ├── manage.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utilities
│   │   └── hooks/         # Custom React hooks
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
python manage.py test
```

### Frontend Tests
```bash
cd frontend
npm run lint
```

## 🚀 Production Deployment

### Backend
1. Set `DEBUG=False` in .env
2. Configure allowed hosts
3. Set up PostgreSQL database
4. Collect static files: `python manage.py collectstatic`
5. Use gunicorn/uwsgi for serving
6. Set up nginx reverse proxy

### Frontend
1. Build production bundle: `npm run build`
2. Deploy `dist/` folder to hosting (Vercel, Netlify, etc.)
3. Update API URL in .env

## 🔧 Troubleshooting

### Backend Issues
- **Port 8000 in use**: Change port with `python manage.py runserver 8001`
- **Database errors**: Delete `db.sqlite3` and run migrations again
- **HuggingFace API fails**: Check API key and internet connection

### Frontend Issues
- **CORS errors**: Verify backend CORS settings allow frontend URL
- **API connection fails**: Check `VITE_API_URL` in .env
- **Build errors**: Delete `node_modules` and reinstall

## 📝 License

MIT License - feel free to use for personal or commercial projects

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

**Built with ❤️ for farmers**
