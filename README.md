# 🌾 Krishi - Smart Agricultural Platform

<div align="center">

**AI-Powered Crop Health Monitoring & Weather Intelligence for Bangladeshi Farmers**

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Django](https://img.shields.io/badge/Django-4.2.7-green.svg)](https://www.djangoproject.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [API](#-api-documentation) • [Contributing](#-contributing)

</div>

---

## 📖 About

**Krishi** (কৃষি) is a comprehensive agricultural platform designed specifically for Bangladeshi farmers. It combines cutting-edge AI technology with local agricultural knowledge to help farmers:

- 🔍 **Detect crop diseases** using AI-powered image analysis
- 🌤️ **Monitor weather** with 5-day forecasts and real-time alerts
- 📦 **Optimize storage** with crop-specific preservation advice
- 🛡️ **Protect crops** with preventive measures and best practices
- 📊 **Track progress** through personalized farmer dashboards

The platform supports both **Bangla** and **English** languages, making it accessible to farmers across Bangladesh.

---

## ✨ Features

### 🔐 Authentication & User Management
- Phone number-based registration (no email required)
- JWT token authentication
- Role-based access (Farmer/Admin)
- Bilingual support (Bangla/English)

### 🌿 Crop Health Scanner
- AI-powered disease detection using HuggingFace models
- Image upload or camera capture
- Real-time analysis with confidence scores
- Detailed treatment recommendations
- Scan history tracking

### 🌦️ Weather Intelligence
- 5-day weather forecasts
- Real-time weather updates
- Location-based predictions
- Weather alerts and warnings
- Bangla weather descriptions

### 📦 Storage & Protection
- Crop-specific storage advice
- Temperature and humidity guidelines
- Pest prevention strategies
- Best practices for crop protection

### 👨‍🌾 Farmer Dashboard
- Personal profile management
- Crop batch tracking
- Scan history with filters
- Achievement badges system
- Progress analytics

---

## 🛠️ Technology Stack

### Backend
- **Django** 4.2.7 - Web framework
- **Django REST Framework** 3.14.0 - API development
- **JWT Authentication** - Secure token-based auth
- **Pillow** 12.0.0 - Image processing
- **HuggingFace API** - AI crop disease detection

### Frontend
- **React** 18.3.1 - UI library
- **TypeScript** 5.8.3 - Type safety
- **Vite** 5.4.19 - Build tool
- **Tailwind CSS** 3.4.17 - Styling
- **shadcn/ui** - Component library
- **React Router** 6.30.1 - Routing
- **TanStack Query** 5.83.0 - Data fetching

---

## 📁 Project Structure

```
krishi/
├── backend/                    # Django REST API
│   ├── crop/                  # Django project config
│   ├── scanner/               # Main application
│   │   ├── models.py         # Database models
│   │   ├── views.py          # API endpoints
│   │   ├── serializers.py    # DRF serializers
│   │   └── authentication.py # JWT auth
│   ├── media/                # User uploads
│   ├── manage.py
│   └── requirements.txt
│
├── frontend/                   # React Frontend
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── ui/          # shadcn/ui components
│   │   │   └── ...          # Custom components
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utilities & API client
│   │   ├── utils/           # Helper functions
│   │   └── integrations/    # External services
│   ├── public/              # Static assets
│   ├── package.json
│   └── vite.config.ts
│
├── README.md                  # This file
├── START_SERVERS.bat         # Quick start script
└── start-project.bat         # Alternative start script
```

---

## 🚀 Installation

### Prerequisites

- **Python** 3.8 or higher
- **Node.js** 16 or higher
- **npm** or **yarn**
- **Git**

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/krishi.git
   cd krishi/backend
   ```

2. **Create virtual environment**
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**
   
   Create `.env` file in `backend/` folder:
   ```env
   SECRET_KEY=your-django-secret-key
   DEBUG=True
   HUGGINGFACE_API_KEY=your-huggingface-api-key
   WEATHER_API_KEY=your-openweather-api-key
   CORS_ALLOWED_ORIGINS=http://localhost:5173
   ```

5. **Run migrations**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. **Create superuser (optional)**
   ```bash
   python manage.py createsuperuser
   ```

7. **Start backend server**
   ```bash
   python manage.py runserver
   ```
   
   ✅ Backend running at: `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create `.env` file in `frontend/` folder:
   ```env
   VITE_API_URL=http://localhost:8000
   VITE_SUPABASE_URL=your-supabase-url (optional)
   VITE_SUPABASE_ANON_KEY=your-supabase-key (optional)
   ```

4. **Start frontend server**
   ```bash
   npm run dev
   ```
   
   ✅ Frontend running at: `http://localhost:5173`

### Quick Start (Windows)

```bash
# Start both servers at once
START_SERVERS.bat
```

---

## 📖 Usage

### Register & Login
1. Navigate to `http://localhost:5173/register`
2. Enter phone number (e.g., `01712345678`)
3. Provide name and password
4. Select role and language
5. Login at `/login`

### Scan Crop Health
1. Go to `/scan` page
2. Upload crop image or capture with camera
3. Wait for AI analysis
4. View results with confidence score
5. Get treatment recommendations

### Check Weather
1. Visit `/weather-alert` page
2. View 5-day forecast
3. Check temperature, humidity, conditions
4. Read weather-based farming advice

### Manage Profile
1. Access farmer dashboard at `/farmer`
2. View scan history
3. Track achievement badges
4. Manage crop batches

---

## 📡 API Documentation

### Base URL
```
http://localhost:8000/api
```

### Authentication

#### Register User
```http
POST /api/register/
Content-Type: application/json

{
  "phone_number": "01712345678",
  "name": "আব্দুল করিম",
  "password": "securepass123",
  "role": "farmer",
  "language": "bangla"
}
```

#### Login
```http
POST /api/login/
Content-Type: application/json

{
  "phone_number": "01712345678",
  "password": "securepass123"
}
```

#### Get User Profile
```http
GET /api/user/
Authorization: Bearer <access-token>
```

### Crop Scanning

#### Upload and Scan Image
```http
POST /api/scan/
Authorization: Bearer <access-token>
Content-Type: multipart/form-data

image: <file>
```

#### Get Scan History
```http
GET /api/scan-history/
Authorization: Bearer <access-token>
```

#### Delete Scan
```http
DELETE /api/scan-history/<scan-id>/
Authorization: Bearer <access-token>
```

### Weather

#### Get Weather Forecast
```http
GET /api/weather/?location=Dhaka
Authorization: Bearer <access-token>
```

---

## 🗺️ Frontend Routes

| Route | Description | Auth Required |
|-------|-------------|---------------|
| `/` | Landing page | No |
| `/login` | User login | No |
| `/register` | User registration | No |
| `/scan` | Crop health scanner | Yes |
| `/weather` | Weather page | No |
| `/weather-alert` | Weather alerts | No |
| `/storage-advice` | Storage tips | No |
| `/crop-protection` | Protection tips | No |
| `/farmer` | Farmer dashboard | Yes |
| `/farmer/profile` | User profile | Yes |
| `/farmer/new-batch` | Add crop batch | Yes |

---

## 🗄️ Database Schema

### User Model
```python
class User(models.Model):
    id = UUIDField(primary_key=True)
    phone_number = CharField(max_length=15, unique=True)
    name = CharField(max_length=100)
    password = CharField(max_length=255)  # Hashed
    role = CharField(max_length=20)  # farmer/admin
    language = CharField(max_length=10)  # bangla/english
    created_at = DateTimeField(auto_now_add=True)
```

### ScanResult Model
```python
class ScanResult(models.Model):
    id = UUIDField(primary_key=True)
    user = ForeignKey(User, on_delete=CASCADE)
    image = ImageField(upload_to='scans/')
    result = CharField(max_length=50)  # healthy/diseased
    confidence = FloatField()
    recommendations = TextField()
    created_at = DateTimeField(auto_now_add=True)
```

---

## 💻 Development

### Backend Commands
```bash
# Run server
python manage.py runserver

# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run tests
python manage.py test

# Access admin panel
# http://localhost:8000/admin
```

### Frontend Commands
```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Type check
npx tsc --noEmit
```

---

## 🚀 Deployment

### Backend (Django)

1. **Set production settings**
   ```python
   DEBUG = False
   ALLOWED_HOSTS = ['yourdomain.com']
   ```

2. **Use PostgreSQL**
   ```bash
   pip install psycopg2-binary
   ```

3. **Collect static files**
   ```bash
   python manage.py collectstatic
   ```

4. **Deploy with Gunicorn**
   ```bash
   pip install gunicorn
   gunicorn crop.wsgi:application --bind 0.0.0.0:8000
   ```

### Frontend (React)

1. **Build the app**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**
   ```bash
   npm install -g vercel
   vercel --prod
   ```

3. **Or deploy to Netlify**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=dist
   ```

4. **Set environment variables**
   ```env
   VITE_API_URL=https://api.yourdomain.com
   ```

---

## 🐛 Troubleshooting

### Backend Issues

**ModuleNotFoundError**
```bash
pip install -r requirements.txt
```

**Database errors**
```bash
rm db.sqlite3
python manage.py migrate
```

**CORS errors**
```python
# Check settings.py
CORS_ALLOWED_ORIGINS = ["http://localhost:5173"]
```

### Frontend Issues

**API connection failed**
```bash
# Check .env file
VITE_API_URL=http://localhost:8000
```

**Module not found**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Build errors**
```bash
rm -rf node_modules/.vite
npm run build
```

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```
5. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Create a Pull Request**

### Contribution Guidelines

- Follow PEP 8 for Python, ESLint for TypeScript
- Write clear commit messages
- Update documentation for new features
- Add tests for new functionality
- Check existing issues before creating new ones

### Areas for Contribution

- 🐛 Bug fixes
- ✨ New features
- 📝 Documentation improvements
- 🌐 Translations (more languages)
- 🎨 UI/UX enhancements
- ⚡ Performance optimizations

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2024 Krishi Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Acknowledgments

### Technologies
- [Django](https://www.djangoproject.com/) - Web framework
- [React](https://reactjs.org/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Component library
- [HuggingFace](https://huggingface.co/) - AI models
- [OpenWeatherMap](https://openweathermap.org/) - Weather API

### Community
- Django & React communities
- Open source contributors
- Bangladeshi farmers for inspiration

---

## 📞 Support

- 📧 **Email**: support@krishi.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/krishi/issues)
- 📖 **Documentation**: Full docs in this README

---

## 🗺️ Roadmap

### Current Version (v1.0)
- ✅ Crop health scanning with AI
- ✅ Weather forecasts and alerts
- ✅ Storage and protection advice
- ✅ Farmer dashboard
- ✅ Bangla language support

### Upcoming Features (v2.0)
- 🔄 Offline mode support
- 📱 Mobile app (React Native)
- 🌾 More crop types
- 📊 Advanced analytics
- 🤝 Community forum
- 💰 Market price integration

### Future Plans (v3.0)
- 🤖 Chatbot assistant
- 🛰️ Satellite imagery
- 📈 Yield prediction
- 🌍 Multi-country support

---

<div align="center">

**Made with ❤️ for Bangladeshi Farmers**

⭐ Star this repo if you find it helpful!

[⬆ Back to Top](#-krishi---smart-agricultural-platform)

</div>
