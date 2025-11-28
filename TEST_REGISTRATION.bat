@echo off
echo ========================================
echo Testing User Registration System
echo ========================================
echo.

cd backend

echo 1. Checking admin setup...
python check_admin_setup.py
echo.

echo ========================================
echo 2. Instructions:
echo ========================================
echo.
echo Start Backend:  cd backend ^&^& python manage.py runserver
echo Start Frontend: cd frontend ^&^& npm run dev
echo.
echo Then visit: http://localhost:5173/register
echo.
echo After registration, check admin at:
echo http://localhost:8000/admin/
echo.
pause
