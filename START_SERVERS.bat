@echo off
echo ========================================
echo   Starting Krishi Backend and Frontend
echo ========================================
echo.

echo [1/2] Starting Backend Server...
echo.
start cmd /k "cd backend && python manage.py runserver 8080"

timeout /t 3 /nobreak > nul

echo [2/2] Starting Frontend Server...
echo.
start cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo   Servers are starting...
echo   Backend: http://localhost:8080
echo   Frontend: http://localhost:5173
echo ========================================
echo.
echo Press any key to close this window...
pause > nul
