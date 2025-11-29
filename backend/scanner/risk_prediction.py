"""
Agricultural Risk Prediction Engine
Calculates ETCL (Estimated Time to Critical Loss) based on moisture, temperature, and weather data
"""

import random
from datetime import datetime, timedelta
from typing import Dict, List, Any


class RiskPredictionEngine:
    """
    Predicts crop storage risk and generates advisory in Bengali
    """
    
    # District-wise weather patterns (mock data)
    DISTRICT_WEATHER_PATTERNS = {
        'dhaka': {'temp_range': (28, 36), 'humidity_range': (65, 90), 'rain_range': (20, 80)},
        'chittagong': {'temp_range': (26, 34), 'humidity_range': (70, 95), 'rain_range': (30, 90)},
        'rajshahi': {'temp_range': (30, 38), 'humidity_range': (55, 85), 'rain_range': (10, 60)},
        'khulna': {'temp_range': (27, 35), 'humidity_range': (68, 92), 'rain_range': (25, 85)},
        'sylhet': {'temp_range': (25, 33), 'humidity_range': (75, 95), 'rain_range': (40, 95)},
        'barisal': {'temp_range': (26, 34), 'humidity_range': (70, 93), 'rain_range': (35, 88)},
        'rangpur': {'temp_range': (28, 36), 'humidity_range': (60, 88), 'rain_range': (15, 70)},
        'mymensingh': {'temp_range': (27, 35), 'humidity_range': (65, 90), 'rain_range': (25, 80)},
    }
    
    def __init__(self):
        self.base_etcl = 120  # Base ETCL in hours
        
    def calculate_etcl(
        self,
        moisture: float,
        temperature: float,
        location: str,
        batch_id: str = None
    ) -> Dict[str, Any]:
        """
        Calculate ETCL and generate risk advisory
        
        Args:
            moisture: Grain moisture percentage
            temperature: Temperature in Celsius
            location: District name
            batch_id: Batch identifier
            
        Returns:
            Dictionary with ETCL, risk category, weather forecast, and advisory
        """
        
        # Generate 7-day weather forecast
        weather_forecast = self._generate_weather_forecast(location)
        
        # Calculate average humidity and rain probability
        avg_humidity = sum(day['humidity'] for day in weather_forecast) / 7
        avg_rain_prob = sum(day['rain_prob'] for day in weather_forecast) / 7
        
        # Start with base ETCL
        etcl = self.base_etcl
        
        # Apply moisture adjustment (VERY AGGRESSIVE for high moisture)
        if moisture > 14:
            # Much higher multiplier for critical moisture levels
            # Extra penalty for moisture > 18%
            if moisture > 18:
                etcl -= (moisture - 14) * 22  # Even more aggressive for very high moisture
            else:
                etcl -= (moisture - 14) * 20
        elif moisture < 11:
            etcl += 20
            
        # Apply temperature adjustment (VERY AGGRESSIVE)
        if temperature > 32:
            etcl -= (temperature - 32) * 8
        # Additional penalty for temperatures above 28°C
        elif temperature > 28:
            etcl -= (temperature - 28) * 5
            
        # Apply humidity adjustment
        if avg_humidity > 80:
            etcl -= 10
        elif avg_humidity > 75:  # Additional check for moderately high humidity
            etcl -= 5
            
        # Apply rainfall probability adjustment
        if avg_rain_prob > 70:
            etcl -= 12
        elif avg_rain_prob > 50:  # Additional check for moderate rain probability
            etcl -= 5
            
        # Ensure minimum ETCL
        etcl = max(12, etcl)
        
        # Determine risk category
        risk_category = self._determine_risk_category(etcl)
        
        # Generate Bengali advisory
        advisory = self._generate_advisory(
            moisture, temperature, etcl, risk_category,
            avg_humidity, avg_rain_prob, weather_forecast
        )
        
        return {
            'batch_id': batch_id or f"BATCH-{datetime.now().strftime('%Y%m%d%H%M%S')}",
            'location': location.title(),
            'etcl_hours': round(etcl, 1),
            'risk_category': risk_category,
            'weather_forecast_7d': weather_forecast,
            'advisory_bangla': advisory,
            'calculated_at': datetime.now().isoformat()
        }
    
    def _generate_weather_forecast(self, location: str) -> List[Dict[str, Any]]:
        """Generate 7-day mock weather forecast based on location"""
        
        location_lower = location.lower()
        pattern = self.DISTRICT_WEATHER_PATTERNS.get(
            location_lower,
            {'temp_range': (28, 36), 'humidity_range': (65, 90), 'rain_range': (20, 80)}
        )
        
        forecast = []
        for day in range(1, 8):
            forecast.append({
                'day': day,
                'date': (datetime.now() + timedelta(days=day-1)).strftime('%Y-%m-%d'),
                'temp': round(random.uniform(*pattern['temp_range']), 1),
                'humidity': round(random.uniform(*pattern['humidity_range']), 1),
                'rain_prob': round(random.uniform(*pattern['rain_range']), 1)
            })
            
        return forecast
    
    def _determine_risk_category(self, etcl: float) -> str:
        """Determine risk category based on ETCL"""
        
        if etcl > 96:
            return 'Low Risk'
        elif etcl >= 48:
            return 'Moderate Risk'
        elif etcl >= 24:
            return 'High Risk'
        else:
            return 'Critical Risk'
    
    def _generate_advisory(
        self,
        moisture: float,
        temperature: float,
        etcl: float,
        risk_category: str,
        avg_humidity: float,
        avg_rain_prob: float,
        weather_forecast: List[Dict]
    ) -> Dict[str, str]:
        """Generate Bengali advisory based on risk factors"""
        
        # Risk summary
        if risk_category == 'Critical Risk':
            summary = f"জরুরি সতর্কতা! মাত্র {round(etcl)} ঘণ্টার মধ্যে ফসলের মারাত্মক ক্ষতির ঝুঁকি।"
        elif risk_category == 'High Risk':
            summary = f"উচ্চ ঝুঁকি! আনুমানিক {round(etcl)} ঘণ্টার মধ্যে ফসল নষ্ট হতে পারে।"
        elif risk_category == 'Moderate Risk':
            summary = f"মাঝারি ঝুঁকি। আনুমানিক {round(etcl)} ঘণ্টা পর্যন্ত ফসল নিরাপদ থাকবে।"
        else:
            summary = f"কম ঝুঁকি। ফসল আপাতত নিরাপদ ({round(etcl)} ঘণ্টা)।"
        
        # Why risk exists
        risk_factors = []
        if moisture > 14:
            risk_factors.append(f"উচ্চ আর্দ্রতা ({moisture}%)")
        if temperature > 32:
            risk_factors.append(f"অতিরিক্ত তাপমাত্রা ({temperature}°C)")
        if avg_humidity > 80:
            risk_factors.append(f"বাতাসে আর্দ্রতা বেশি ({round(avg_humidity)}%)")
        if avg_rain_prob > 70:
            risk_factors.append(f"বৃষ্টির সম্ভাবনা বেশি ({round(avg_rain_prob)}%)")
        
        if risk_factors:
            why_risk = "ঝুঁকির কারণ: " + ", ".join(risk_factors) + "।"
        else:
            why_risk = "ফসলের আর্দ্রতা ও তাপমাত্রা নিয়ন্ত্রণে আছে।"
        
        # Action recommendations
        actions = []
        
        if moisture > 14:
            actions.append("অবিলম্বে ফসল শুকানোর ব্যবস্থা করুন")
        
        if temperature > 32:
            actions.append("ঠান্ডা ও বায়ুচলাচল যুক্ত স্থানে সংরক্ষণ করুন")
        
        if avg_rain_prob > 70:
            actions.append("বৃষ্টির কারণে ঘরের ভিতরে শুকানোর ব্যবস্থা করুন")
        
        if avg_humidity > 80:
            actions.append("ইনডোর এয়ারেশন সিস্টেম ব্যবহার করুন")
        
        if risk_category in ['Critical Risk', 'High Risk']:
            actions.append("নিয়মিত ফসল পরীক্ষা করুন (প্রতি ৬ ঘণ্টায়)")
        
        if not actions:
            actions.append("বর্তমান সংরক্ষণ পদ্ধতি চালিয়ে যান")
            actions.append("নিয়মিত পর্যবেক্ষণ করুন")
        
        action = "করণীয়: " + "; ".join(actions) + "।"
        
        # Warning
        warning = ""
        if risk_category == 'Critical Risk':
            warning = "⚠️ সতর্কবার্তা: অ্যাফ্লাটক্সিন ছত্রাক সংক্রমণের উচ্চ ঝুঁকি। দ্রুত ব্যবস্থা না নিলে সম্পূর্ণ ফসল নষ্ট হতে পারে।"
        elif risk_category == 'High Risk':
            warning = "⚠️ সতর্কবার্তা: ছত্রাক ও পোকামাকড়ের আক্রমণের ঝুঁকি বাড়ছে। দ্রুত প্রতিরোধমূলক ব্যবস্থা নিন।"
        elif avg_rain_prob > 80:
            warning = "🌧️ আবহাওয়া সতর্কতা: আগামী দিনগুলোতে ভারী বৃষ্টির সম্ভাবনা। ফসল সুরক্ষিত রাখুন।"
        
        return {
            'summary': summary,
            'why_risk': why_risk,
            'action': action,
            'warning': warning
        }


# Singleton instance
risk_engine = RiskPredictionEngine()
