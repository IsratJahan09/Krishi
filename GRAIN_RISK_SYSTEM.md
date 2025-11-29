# 🌾 Agricultural Grain Risk Prediction System

## Overview

An intelligent risk assessment system for stored grain that analyzes weather forecasts, grain moisture, and temperature to predict the **Expected Time to Critical Loss (ETCL)** and provide actionable recommendations to farmers.

---

## 🎯 Features

### 1. **ETCL Calculation**
Calculates the time (in hours) before stored grain reaches critical loss due to:
- Aflatoxin contamination
- Mold growth
- Fungal infection
- Moisture damage

### 2. **Weather Integration**
- Automatically reads 5-day weather forecast from the Weather Alert page
- Analyzes temperature, humidity, and rainfall probability
- Factors weather trends into risk calculation

### 3. **Risk Assessment**
Three-tier risk classification:
- **Low Risk** (ETCL ≥ 96 hours) - Green
- **Medium Risk** (ETCL 60-95 hours) - Yellow
- **High Risk** (ETCL < 60 hours) - Red

### 4. **Bilingual Support**
- Full Bangla language interface
- Bangla number formatting
- Culturally appropriate recommendations

---

## 📊 ETCL Calculation Rules

### Base ETCL
```
Starting ETCL = 120 hours (5 days safe storage)
```

### Moisture Penalties
```
IF grain_moisture > 14%:
    ETCL -= (moisture - 14) × 8 hours
    
IF grain_moisture < 11%:
    ETCL += 20 hours (bonus for dry grain)
```

### Temperature Penalties
```
IF grain_temperature > 32°C:
    ETCL -= (temperature - 32) × 5 hours
```

### Weather Forecast Penalties

**High Humidity Days (>70%)**
```
IF 3+ days with humidity > 70%:
    ETCL -= 25 hours
ELSE IF 2 days with humidity > 70%:
    ETCL -= 15 hours
ELSE IF 1 day with humidity > 70%:
    ETCL -= 10 hours
```

**High Rainfall Probability (>60%)**
```
IF 2+ days with rain probability > 60%:
    ETCL -= 15 hours
ELSE IF 1 day with rain probability > 60%:
    ETCL -= 10 hours
```

### Minimum ETCL
```
ETCL = max(24, calculated_ETCL)
(Never goes below 24 hours)
```

---

## 🔧 How to Use

### Step 1: Get Weather Data
1. Navigate to **"আবহাওয়া সতর্কতা"** (Weather Alert) page
2. Enter your location (e.g., ঢাকা, চট্টগ্রাম)
3. Click **"খুঁজুন"** to fetch 5-day forecast
4. Weather data is automatically cached

### Step 2: Calculate Risk
1. Scroll down to **"শস্য সংরক্ষণ ঝুঁকি বিশ্লেষণ"** section
2. Enter your grain moisture percentage (%)
3. Enter your grain temperature (°C)
4. Click **"ঝুঁকি বিশ্লেষণ করুন"**

### Step 3: Review Results
The system displays:
- **Risk Level** (Low/Medium/High)
- **ETCL** in hours and days
- **Weather Impact Summary**
- **Recommended Actions**

---

## 📋 Example Scenarios

### Scenario 1: Low Risk
```
Input:
- Grain Moisture: 12%
- Grain Temperature: 28°C
- Weather: Moderate humidity (60%), no rain

Output:
- Risk Level: Low Risk
- ETCL: 105 hours (≈ 4 days)
- Recommendation: Continue current storage, monitor regularly
```

### Scenario 2: Medium Risk
```
Input:
- Grain Moisture: 15%
- Grain Temperature: 30°C
- Weather: High humidity (75%) for 2 days

Output:
- Risk Level: Medium Risk
- ETCL: 72 hours (≈ 3 days)
- Recommendation: Reduce moisture, ensure ventilation
```

### Scenario 3: High Risk
```
Input:
- Grain Moisture: 18%
- Grain Temperature: 35°C
- Weather: High humidity (80%), rain expected

Output:
- Risk Level: High Risk
- ETCL: 38 hours (≈ 1.5 days)
- Recommendation: URGENT - Dry grain immediately, indoor storage
```

---

## 🎨 User Interface

### Input Section
- **Grain Moisture (%)**: Range 8-25%, safe limit < 14%
- **Grain Temperature (°C)**: Range 20-45°C, safe limit < 32°C
- Weather data status indicator

### Output Section
Color-coded risk card with:
- Risk level icon (✓ Low, ℹ Medium, ⚠ High)
- ETCL display (hours and days)
- Weather impact summary
- Farmer recommendations
- Current conditions summary

---

## 🔬 Technical Implementation

### Component Location
```
frontend/src/components/GrainRiskCalculator.tsx
```

### Integration
```typescript
// In WeatherAlert.tsx
import GrainRiskCalculator from "@/components/GrainRiskCalculator";

// Rendered after weather forecast
{weatherData.length > 0 && (
  <div className="mt-8">
    <GrainRiskCalculator />
  </div>
)}
```

### Data Flow
1. Weather data cached in `localStorage` as `krishi_weather_alert_cache`
2. Component reads cached data on mount
3. User inputs grain parameters
4. ETCL calculated using rule-based algorithm
5. Risk analysis displayed with recommendations

---

## 📱 Responsive Design

- Mobile-first approach
- Grid layout adapts to screen size
- Touch-friendly input controls
- Readable on all devices

---

## 🌐 Localization

### Bangla Text
- All labels and descriptions in Bangla
- Bangla number formatting (১২৩ instead of 123)
- Culturally appropriate advice

### English Support
- Technical terms (ETCL, Aflatoxin) in English
- Risk levels in both languages

---

## 🚀 Future Enhancements

### Planned Features
1. **Historical Data Analysis**
   - Track ETCL over time
   - Identify patterns

2. **SMS Alerts**
   - Send warnings when ETCL drops below threshold
   - Daily risk updates

3. **Crop-Specific Rules**
   - Different ETCL calculations for rice, wheat, corn
   - Customized recommendations

4. **AI/ML Integration**
   - Predict mold growth using machine learning
   - Image-based grain quality assessment

5. **Multi-Batch Management**
   - Track multiple storage locations
   - Comparative risk analysis

6. **Export Reports**
   - PDF risk assessment reports
   - Share with agricultural officers

---

## 📊 Scientific Basis

### Aflatoxin Growth Conditions
- Optimal temperature: 25-35°C
- Optimal moisture: >14%
- Optimal humidity: >70%

### Mold Prevention
- Keep grain moisture < 14%
- Maintain temperature < 32°C
- Ensure good ventilation
- Protect from rain

### References
- FAO Guidelines on Grain Storage
- USDA Grain Quality Standards
- Bangladesh Agricultural Research Institute (BARI)

---

## 🛠️ Configuration

### Safe Limits (Adjustable)
```typescript
const SAFE_MOISTURE = 14; // %
const SAFE_TEMPERATURE = 32; // °C
const HIGH_HUMIDITY_THRESHOLD = 70; // %
const HIGH_RAIN_THRESHOLD = 60; // %
```

### ETCL Weights (Adjustable)
```typescript
const MOISTURE_PENALTY_FACTOR = 8; // hours per %
const TEMP_PENALTY_FACTOR = 5; // hours per °C
const HUMIDITY_PENALTY = [10, 15, 25]; // 1, 2, 3+ days
const RAIN_PENALTY = [10, 15]; // 1, 2+ days
```

---

## 🐛 Troubleshooting

### Weather Data Not Loading
**Problem**: "আবহাওয়া তথ্য পাওয়া যায়নি" message
**Solution**: 
1. Visit Weather Alert page first
2. Search for your location
3. Return to risk calculator

### Incorrect ETCL
**Problem**: ETCL seems too high/low
**Solution**:
1. Verify grain moisture measurement
2. Check grain temperature reading
3. Ensure weather data is current

### Display Issues
**Problem**: Text not showing properly
**Solution**:
1. Clear browser cache
2. Refresh page
3. Check internet connection

---

## 📞 Support

For technical issues or questions:
- GitHub Issues: [Project Repository]
- Email: support@krishi.com
- Documentation: This file

---

## 📄 License

MIT License - See LICENSE file for details

---

## 👥 Credits

**Developed for**: Bangladeshi Farmers
**Technology**: React + TypeScript + Tailwind CSS
**Weather API**: OpenWeatherMap
**Language**: Bangla (বাংলা) + English

---

**Made with ❤️ for sustainable agriculture**

🌾 কৃষি - Krishi Platform
