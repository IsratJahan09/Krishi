@echo off
echo ========================================
echo   Fixing pkg_resources Error
echo ========================================
echo.

echo Installing setuptools...
pip install setuptools

echo.
echo Installing all dependencies again...
pip install -r requirements.txt

echo.
echo Running migrations...
python manage.py makemigrations
python manage.py migrate

echo.
echo ========================================
echo   Fixed! Now starting server...
echo ========================================
echo.

python manage.py runserver

pause
