@echo off
echo ========================================
echo   Krishi Crop Health Scanner
echo ========================================
echo.

echo Starting Backend Server...
start "Backend" cmd /k "cd backend && venv\Scripts\activate && python manage.py runserver"

timeout /t 3 /nobreak >nul

echo Starting Frontend Server...
start "Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo   Servers Starting...
echo ========================================
echo.
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:5173
echo Admin:    http://localhost:8000/admin
echo.
echo Press any key to exit this window...
pause >nul
