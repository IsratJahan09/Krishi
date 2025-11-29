# Integration Guide - Adding Krishi to Your Main Website

## Overview
This guide explains how to integrate the Krishi Crop Health Scanner into your existing website.

## Integration Options

### Option 1: Standalone Application (Recommended)
Deploy as a separate subdomain or path:
- `https://yourdomain.com/krishi/`
- `https://krishi.yourdomain.com/`

### Option 2: Embedded Component
Integrate specific features into existing pages.

### Option 3: API Integration
Use only the backend API with your own frontend.

---

## Option 1: Standalone Deployment

### Step 1: Backend Integration

1. **Copy Backend Files**
   ```bash
   cp -r backend/ /path/to/your/project/krishi-backend/
   ```

2. **Update Django Settings**
   ```python
   # settings.py
   ALLOWED_HOSTS = ['yourdomain.com', 'www.yourdomain.com']
   
   CORS_ALLOWED_ORIGINS = [
       "https://yourdomain.com",
       "https://www.yourdomain.com",
   ]
   
   # Use PostgreSQL in production
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.postgresql',
           'NAME': 'krishi_db',
           'USER': 'your_db_user',
           'PASSWORD': 'your_db_password',
           'HOST': 'localhost',
           'PORT': '5432',
       }
   }
   ```

3. **Deploy Backend**
   ```bash
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py collectstatic
   gunicorn crop.wsgi:application --bind 0.0.0.0:8000
   ```

### Step 2: Frontend Integration

1. **Build Frontend**
   ```bash
   cd frontend
   npm install
   npm run build
   ```

2. **Update API URL**
   ```env
   # .env.production
   VITE_API_URL=https://yourdomain.com/api
   ```

3. **Deploy Frontend**
   - Copy `dist/` folder to your web server
   - Configure nginx/apache to serve the files
   - Set up routing for SPA

### Step 3: Nginx Configuration

```nginx
# Backend API
location /api/ {
    proxy_pass http://localhost:8000/api/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}

# Media files
location /media/ {
    alias /path/to/backend/media/;
}

# Frontend
location /krishi/ {
    alias /path/to/frontend/dist/;
    try_files $uri $uri/ /krishi/index.html;
}
```

---

## Option 2: Embedded Component

### Integrate Scan Feature Only

1. **Install as npm package** (if you package it)
   ```bash
   npm install @yourorg/krishi-scanner
   ```

2. **Import and use**
   ```tsx
   import { CropScanner } from '@yourorg/krishi-scanner';
   
   function YourPage() {
     return (
       <div>
         <h1>Your Existing Content</h1>
         <CropScanner apiUrl="https://yourdomain.com/api" />
       </div>
     );
   }
   ```

### Copy Components Directly

1. **Copy required components**
   ```
   frontend/src/components/ImageUpload.tsx
   frontend/src/components/AnalysisResult.tsx
   frontend/src/components/ScanHistory.tsx
   ```

2. **Copy dependencies**
   ```json
   {
     "dependencies": {
       "lucide-react": "^0.462.0",
       "@radix-ui/react-*": "latest"
     }
   }
   ```

3. **Use in your pages**
   ```tsx
   import ImageUpload from './components/ImageUpload';
   
   function FarmingPage() {
     const [image, setImage] = useState(null);
     
     return (
       <ImageUpload onImageSelect={setImage} />
     );
   }
   ```

---

## Option 3: API Only Integration

Use the backend API with your existing frontend.

### API Endpoints

```typescript
// Authentication
POST /api/auth/register/
POST /api/auth/login/
POST /api/auth/token/refresh/

// Crop Scanning
POST /api/scan/
GET /api/history/
DELETE /api/history/clear/

// User Profile
GET /api/user/profile/
PUT /api/user/profile/
```

### Example Integration

```typescript
// Your existing frontend code
async function analyzeCrop(imageFile: File) {
  const formData = new FormData();
  formData.append('image', imageFile);
  
  const response = await fetch('https://yourdomain.com/api/scan/', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${yourJWTToken}`
    },
    body: formData
  });
  
  const result = await response.json();
  return result; // { status: 'fresh', confidence: 0.85, ... }
}
```

---

## Database Migration

### From SQLite to PostgreSQL

1. **Dump existing data**
   ```bash
   python manage.py dumpdata > data.json
   ```

2. **Update database settings**
   ```python
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.postgresql',
           ...
       }
   }
   ```

3. **Migrate and load data**
   ```bash
   python manage.py migrate
   python manage.py loaddata data.json
   ```

---

## Environment Variables

### Production Backend
```env
SECRET_KEY=your-production-secret-key
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
DATABASE_URL=postgresql://user:pass@localhost/dbname
HUGGINGFACE_API_KEY=your-api-key
```

### Production Frontend
```env
VITE_API_URL=https://yourdomain.com/api
VITE_OPENWEATHER_API_KEY=your-api-key
```

---

## Security Checklist

- [ ] Set `DEBUG=False` in production
- [ ] Use strong `SECRET_KEY`
- [ ] Configure `ALLOWED_HOSTS`
- [ ] Set up HTTPS/SSL
- [ ] Configure CORS properly
- [ ] Use environment variables for secrets
- [ ] Set up database backups
- [ ] Configure rate limiting
- [ ] Set up monitoring/logging
- [ ] Use secure password hashing
- [ ] Validate all user inputs
- [ ] Sanitize file uploads

---

## Performance Optimization

### Backend
- Use Redis for caching
- Enable database connection pooling
- Optimize database queries
- Use CDN for media files
- Enable gzip compression

### Frontend
- Code splitting
- Lazy loading
- Image optimization
- Bundle size optimization
- Use production build

---

## Monitoring

### Backend Monitoring
```python
# Install
pip install django-prometheus

# Add to INSTALLED_APPS
INSTALLED_APPS = [
    ...
    'django_prometheus',
]

# Add middleware
MIDDLEWARE = [
    'django_prometheus.middleware.PrometheusBeforeMiddleware',
    ...
    'django_prometheus.middleware.PrometheusAfterMiddleware',
]
```

### Frontend Monitoring
```typescript
// Add error tracking
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: "production",
});
```

---

## Backup Strategy

### Database Backup
```bash
# Automated daily backup
0 2 * * * pg_dump krishi_db > /backups/krishi_$(date +\%Y\%m\%d).sql
```

### Media Files Backup
```bash
# Sync to cloud storage
rsync -avz /path/to/media/ user@backup-server:/backups/media/
```

---

## Scaling Considerations

### Horizontal Scaling
- Use load balancer (nginx, HAProxy)
- Deploy multiple backend instances
- Use shared database
- Use shared media storage (S3, etc.)

### Vertical Scaling
- Increase server resources
- Optimize database
- Use caching layer
- CDN for static files

---

## Support & Maintenance

### Regular Tasks
- Update dependencies monthly
- Review security patches
- Monitor error logs
- Check API usage
- Backup verification
- Performance monitoring

### Troubleshooting
- Check logs: `/var/log/nginx/`, Django logs
- Monitor database performance
- Check API response times
- Review error tracking dashboard

---

## Contact

For integration support or questions:
- Open an issue on GitHub
- Email: support@yourdomain.com
- Documentation: https://docs.yourdomain.com/krishi
