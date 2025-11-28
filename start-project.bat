@echo off
echo ========================================
echo   Krishi - Agricultural Platform
echo   Starting Backend and Frontend
echo ========================================
echo.

echo [1/2] Starting Backend Server...
start cmd /k "cd backend && python -m venv venv && venv\Scripts\activate && pip install -r requirements.txt && python manage.py migrate && python manage.py runserver"

timeout /t 5 /nobreak > nul

echo [2/2] Starting Frontend Server...
start cmd /k "cd frontend && npm install && npm run dev"

echo.
echo ========================================
echo   Servers Starting...
echo   Backend: http://localhost:8000
echo   Frontend: http://localhost:5173
echo ========================================
echo.
echo Press any key to exit this window...
pause > nul
