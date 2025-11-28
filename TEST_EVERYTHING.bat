@echo off
echo ========================================
echo   TESTING COMPLETE SYSTEM
echo ========================================
echo.

echo [1/3] Testing if Backend is Running...
curl http://localhost:8000/api/history/
if %ERRORLEVEL% EQU 0 (
    echo ✅ Backend is running!
) else (
    echo ❌ Backend is NOT running!
    echo.
    echo To start backend:
    echo   cd merged-krishi-project\backend
    echo   python manage.py runserver
    goto :end
)

echo.
echo [2/3] Testing if Frontend is Running...
curl http://localhost:5173/
if %ERRORLEVEL% EQU 0 (
    echo ✅ Frontend is running!
) else (
    echo ❌ Frontend is NOT running!
    echo.
    echo To start frontend:
    echo   cd merged-krishi-project\frontend
    echo   npm run dev
    goto :end
)

echo.
echo [3/3] Checking Frontend .env...
cd merged-krishi-project\frontend
findstr "VITE_API_URL" .env
if %ERRORLEVEL% EQU 0 (
    echo ✅ VITE_API_URL is configured!
) else (
    echo ❌ VITE_API_URL is missing!
    echo.
    echo Add this to frontend\.env:
    echo   VITE_API_URL=http://localhost:8000/api
)

echo.
echo ========================================
echo   TEST COMPLETE
echo ========================================
echo.
echo If all tests passed, scan should work!
echo Open: http://localhost:5173/scan
echo.

:end
pause
