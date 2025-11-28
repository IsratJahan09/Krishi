@echo off
echo ========================================
echo   Fixing "unexpected user" Error
echo ========================================
echo.

echo Step 1: Creating migration...
python manage.py makemigrations

echo.
echo Step 2: Applying migration...
python manage.py migrate

echo.
echo ========================================
echo   Fix Complete!
echo   Now restart the backend server
echo ========================================
echo.

echo To restart backend:
echo   python manage.py runserver
echo.
pause
