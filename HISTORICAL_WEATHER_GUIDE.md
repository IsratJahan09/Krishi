# 📊 How to Calculate ETCL Based on Last 5 Days

## 🎯 Current System vs Historical System

### Current System (Forecast)
- Uses **next 5 days** weather forecast
- Predicts future risk
- Free OpenWeatherMap API

### Historical System (What You Want)
- Uses **last 5 days** weather data
- Analyzes past conditions
- Requires historical weather data

---

## 🔧 Solution 1: Use OpenWeatherMap Historical API (Paid)

### Step 1: Get Historical API Access
OpenWeatherMap offers historical weather data, but it requires a **paid subscription**.

**API Endpoint**:
```
https://api.openweathermap.org/data/2.5/onecall/timemachine
```

**Cost**: ~$40/month for 1,000 calls/day

### Step 2: Modify Backend View

Add this new view to `backend/scanner/views.py`:

```python
class HistoricalWeatherView(APIView):
    """
    Get last 5 days historical weather data
    """
    
    def get(self, request):
        location = request.GET.get('location', '')
        
        if not location:
            return Response({'error': 'Location required'}, 
                          status=status.HTTP_400_BAD_REQUEST)
        
        try:
            api_key = settings.OPENWEATHER_API_KEY
            
            # Get coordinates for location first
            geo_url = f"http://api.openweathermap.org/geo/1.0/direct?q={location},BD&limit=1&appid={api_key}"
            geo_response = requests.get(geo_url, timeout=10)
            geo_data = geo_response.json()
            
            if not geo_data:
                return Response({'error': 'Location not found'}, 
                              status=status.HTTP_404_NOT_FOUND)
            
            lat = geo_data[0]['lat']
            lon = geo_data[0]['lon']
            
            # Get historical data for last 5 days
            historical_data = []
            
            for days_ago in range(5, 0, -1):
                # Calculate timestamp for each day
                target_date = datetime.now() - timedelta(days=days_ago)
                timestamp = int(target_date.timestamp())
                
                # Call historical API
                hist_url = f"https://api.openweathermap.org/data/2.5/onecall/timemachine?lat={lat}&lon={lon}&dt={timestamp}&appid={api_key}&units=metric"
                hist_response = requests.get(hist_url, timeout=10)
                hist_data = hist_response.json()
                
                # Extract data
                current = hist_data.get('current', {})
                historical_data.append({
                    'date': target_date.isoformat(),
                    'temperature': round(current.get('temp', 0)),
                    'humidity': current.get('humidity', 0),
                    'rainProbability': 0,  # Historical data doesn't have probability
                    'windSpeed': round(current.get('wind_speed', 0) * 3.6),
                    'condition': current.get('weather', [{}])[0].get('main', '').lower(),
                    'description': current.get('weather', [{}])[0].get('description', '')
                })
            
            return Response({
                'location': location,
                'historical': historical_data,
                'timestamp': datetime.now().isoformat()
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({'error': str(e)}, 
                          status=status.HTTP_500_INTERNAL_SERVER_ERROR)
```

### Step 3: Add URL Route

In `backend/scanner/urls.py`:
```python
path('weather/historical/', HistoricalWeatherView.as_view(), name='historical_weather'),
```

---

## 🔧 Solution 2: Store Your Own Historical Data (Free)

This is the **recommended solution** - store weather data daily in your database.

### Step 1: Create Weather History Model

Add to `backend/scanner/models.py`:

```python
class WeatherHistory(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    location = models.CharField(max_length=100)
    date = models.DateField()
    temperature = models.FloatField()
    humidity = models.IntegerField()
    rain_probability = models.IntegerField(default=0)
    wind_speed = models.FloatField()
    condition = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['location', 'date']
        ordering = ['-date']
    
    def __str__(self):
        return f"{self.location} - {self.date}"
```

### Step 2: Create Migration

```bash
cd backend
python manage.py makemigrations
python manage.py migrate
```

### Step 3: Create Daily Weather Logger

Add to `backend/scanner/views.py`:

```python
class SaveDailyWeatherView(APIView):
    """
    Save today's weather data for historical tracking
    Call this once per day (can be automated with cron job)
    """
    
    def post(self, request):
        location = request.data.get('location', '')
        
        if not location:
            return Response({'error': 'Location required'}, 
                          status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Fetch current weather
            api_key = settings.OPENWEATHER_API_KEY
            url = f"https://api.openweathermap.org/data/2.5/weather?q={location},BD&appid={api_key}&units=metric"
            response = requests.get(url, timeout=10)
            data = response.json()
            
            # Save to database
            weather_history, created = WeatherHistory.objects.update_or_create(
                location=location,
                date=datetime.now().date(),
                defaults={
                    'temperature': round(data['main']['temp']),
                    'humidity': data['main']['humidity'],
                    'rain_probability': 0,  # Can't get historical probability
                    'wind_speed': round(data['wind']['speed'] * 3.6),
                    'condition': data['weather'][0]['main'].lower(),
                    'description': data['weather'][0]['description']
                }
            )
            
            return Response({
                'message': 'Weather data saved',
                'created': created,
                'date': weather_history.date
            }, status=status.HTTP_201_CREATED)
            
        except Exception as e:
            return Response({'error': str(e)}, 
                          status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GetHistoricalWeatherView(APIView):
    """
    Get last 5 days of stored weather data
    """
    
    def get(self, request):
        location = request.GET.get('location', '')
        
        if not location:
            return Response({'error': 'Location required'}, 
                          status=status.HTTP_400_BAD_REQUEST)
        
        # Get last 5 days of data
        historical = WeatherHistory.objects.filter(
            location__iexact=location
        ).order_by('-date')[:5]
        
        if not historical:
            return Response({
                'error': 'No historical data found',
                'message': 'Start saving daily weather data first'
            }, status=status.HTTP_404_NOT_FOUND)
        
        # Format data
        historical_data = [{
            'date': record.date.isoformat(),
            'temperature': record.temperature,
            'humidity': record.humidity,
            'rainProbability': record.rain_probability,
            'windSpeed': record.wind_speed,
            'condition': record.condition,
            'description': record.description
        } for record in historical]
        
        return Response({
            'location': location,
            'historical': historical_data,
            'count': len(historical_data),
            'timestamp': datetime.now().isoformat()
        }, status=status.HTTP_200_OK)
```

### Step 4: Add URL Routes

In `backend/scanner/urls.py`:
```python
path('weather/save/', SaveDailyWeatherView.as_view(), name='save_weather'),
path('weather/historical/', GetHistoricalWeatherView.as_view(), name='get_historical'),
```

### Step 5: Automate Daily Weather Saving

Create a cron job or scheduled task:

**Linux/Mac (crontab)**:
```bash
# Run every day at midnight
0 0 * * * curl -X POST http://localhost:8080/api/weather/save/ -d "location=Dhaka"
0 0 * * * curl -X POST http://localhost:8080/api/weather/save/ -d "location=Chittagong"
0 0 * * * curl -X POST http://localhost:8080/api/weather/save/ -d "location=Rajshahi"
```

**Windows (Task Scheduler)**:
```powershell
# Create a PowerShell script: save_weather.ps1
$locations = @("Dhaka", "Chittagong", "Rajshahi", "Sylhet", "Khulna")
foreach ($location in $locations) {
    Invoke-RestMethod -Uri "http://localhost:8080/api/weather/save/" `
                      -Method POST `
                      -Body @{location=$location}
}

# Schedule to run daily at midnight
```

---

## 🔧 Solution 3: Use Your Dataset (Recommended for Your Case)

Since you already have batch monitoring data with timestamps, moisture, and temperature, you can use that!

### Your Dataset Structure:
```
Timestamp           | Batch   | Division  | District   | Moisture | Temp  | Risk
2025-11-25 20:40:54 | BATCH-003 | Chattogram | Chattogram | 17.5%   | 31°C  | High
2025-11-26 00:40:54 | BATCH-002 | Rajshahi   | Rajshahi   | 17.64%  | 30.9°C| High
...
```

### Step 1: Create Batch History Model

Add to `backend/scanner/models.py`:

```python
class BatchHistory(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    batch_id = models.CharField(max_length=50)
    timestamp = models.DateTimeField()
    division = models.CharField(max_length=100)
    district = models.CharField(max_length=100)
    moisture = models.FloatField()  # Percentage
    temperature = models.FloatField()  # Celsius
    risk_level = models.CharField(max_length=20)  # High, Critical, etc.
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-timestamp']
    
    def __str__(self):
        return f"{self.batch_id} - {self.timestamp}"
```

### Step 2: Import Your Dataset

Create a management command `backend/scanner/management/commands/import_batch_data.py`:

```python
from django.core.management.base import BaseCommand
from scanner.models import BatchHistory
from datetime import datetime

class Command(BaseCommand):
    help = 'Import batch monitoring data'
    
    def handle(self, *args, **kwargs):
        # Your dataset
        data = [
            ("2025-11-25 20:40:54", "BATCH-003", "Chattogram", "Chattogram", 17.5, 31, "High"),
            ("2025-11-26 00:40:54", "BATCH-002", "Rajshahi", "Rajshahi", 17.64, 30.9, "High"),
            # ... add all your data
        ]
        
        for row in data:
            BatchHistory.objects.create(
                timestamp=datetime.strptime(row[0], "%Y-%m-%d %H:%M:%S"),
                batch_id=row[1],
                division=row[2],
                district=row[3],
                moisture=row[4],
                temperature=row[5],
                risk_level=row[6]
            )
        
        self.stdout.write(self.style.SUCCESS(f'Imported {len(data)} records'))
```

Run: `python manage.py import_batch_data`

### Step 3: Create API to Get Last 5 Days

```python
class BatchHistoryView(APIView):
    """
    Get last 5 days of batch monitoring data
    """
    
    def get(self, request):
        district = request.GET.get('district', '')
        batch_id = request.GET.get('batch_id', '')
        
        # Filter by district or batch
        query = BatchHistory.objects.all()
        
        if district:
            query = query.filter(district__iexact=district)
        if batch_id:
            query = query.filter(batch_id=batch_id)
        
        # Get last 5 days
        five_days_ago = datetime.now() - timedelta(days=5)
        history = query.filter(timestamp__gte=five_days_ago).order_by('-timestamp')
        
        # Format data
        historical_data = [{
            'timestamp': record.timestamp.isoformat(),
            'batch_id': record.batch_id,
            'district': record.district,
            'moisture': record.moisture,
            'temperature': record.temperature,
            'risk_level': record.risk_level
        } for record in history]
        
        return Response({
            'district': district,
            'batch_id': batch_id,
            'historical': historical_data,
            'count': len(historical_data)
        }, status=status.HTTP_200_OK)
```

---

## 🎯 Recommended Approach

**For your case, I recommend Solution 3** because:

1. ✅ You already have the data
2. ✅ It's free (no API costs)
3. ✅ You control the data
4. ✅ Can track specific batches
5. ✅ Real measurements (not forecasts)

---

## 📊 How to Use Historical Data for ETCL

Once you have historical data, modify the ETCL calculation to use it:

```typescript
// In AutoGrainRiskAssessment.tsx
const calculateRiskFromHistorical = (historical: HistoricalData[]): RiskAnalysis => {
    let etcl = 120;
    
    // Analyze last 5 days
    historical.forEach((day) => {
        // If moisture was high, grain is at risk
        if (day.moisture > 14) {
            etcl -= (day.moisture - 14) * 8;
        }
        
        // If temperature was high, fungal risk
        if (day.temperature > 32) {
            etcl -= (day.temperature - 32) * 5;
        }
    });
    
    // Current risk based on past conditions
    etcl = Math.max(24, etcl);
    
    return {
        riskLevel: etcl >= 96 ? "Low" : etcl >= 60 ? "Medium" : "High",
        etcl: Math.round(etcl),
        // ... other fields
    };
};
```

---

## 🚀 Next Steps

1. Choose which solution fits your needs
2. Implement the backend changes
3. Update frontend to call historical API
4. Test with your data
5. Deploy

**Let me know which solution you want to implement, and I'll help you build it!**
