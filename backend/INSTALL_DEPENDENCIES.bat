@echo off
echo ========================================
echo   Installing Backend Dependencies
echo ========================================
echo.

echo Installing required packages...
pip install Django==4.2.7
pip install djangorestframework==3.14.0
pip install djangorestframework-simplejwt==5.3.0
pip install django-cors-headers==4.3.1
pip install requests==2.31.0
pip install Pillow==12.0.0
pip install python-dotenv==1.0.0

echo.
echo ========================================
echo   Dependencies Installed!
echo   Now running migrations...
echo ========================================
echo.

python manage.py makemigrations
python manage.py migrate

echo.
echo ========================================
echo   Setup Complete!
echo   You can now run: python manage.py runserver
echo ========================================
echo.
pause
