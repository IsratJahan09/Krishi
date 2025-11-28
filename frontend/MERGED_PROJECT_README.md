# Krishi - Complete Agricultural Platform

This project is the result of merging **crop-health-scan** and **krishi-shashon-bogota** into a unified agricultural platform.

## Features

### From krishi-shashon-bogota:
- **Weather Alerts** - 5-day weather forecasts
- **Storage Advice** - Local storage recommendations
- **Crop Protection** - Damage prevention tips
- **Farmer Registration** - User profile management
- **Batch Management** - Track crop batches
- **Supabase Integration** - Backend database

### From crop-health-scan:
- **Crop Health Scanner** - AI-powered crop analysis
- **Image Upload** - Upload or capture crop images
- **Analysis Results** - Instant health detection
- **Scan History** - Track previous scans

## Project Structure

```
krishi-shashon-bogota/
├── src/
│   ├── components/
│   │   ├── ImageUpload.tsx (NEW - from crop-health-scan)
│   │   ├── AnalysisResult.tsx (NEW - from crop-health-scan)
│   │   ├── ScanHistory.tsx (NEW - from crop-health-scan)
│   │   └── ... (existing components)
│   ├── pages/
│   │   ├── CropHealthScan.tsx (NEW - merged feature)
│   │   └── ... (existing pages)
│   └── ...
└── ...
```

## New Routes

- `/crop-health-scan` - Crop health scanning interface

## Getting Started

```bash
cd krishi-shashon-bogota
npm install
npm run dev
```

## Backend Integration

The crop health scanner requires the Django backend from the `Backend` folder to be running:

```bash
cd Backend
python manage.py runserver
```

The scanner expects these API endpoints:
- `POST /api/scan/` - Upload and analyze crop images
- `GET /api/history/` - Retrieve scan history

## Environment Variables

Make sure `.env` file contains:
```
VITE_SUPABASE_PROJECT_ID=your_project_id
VITE_SUPABASE_PUBLISHABLE_KEY=your_key
VITE_SUPABASE_URL=your_url
```

## Technologies

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Supabase
- React Router
- TanStack Query

## Next Steps

1. Test the merged application
2. Update navigation to include crop health scanner
3. Ensure backend API is properly configured
4. Test all features end-to-end
