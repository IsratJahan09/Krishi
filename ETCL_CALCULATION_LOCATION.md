# 📍 ETCL Calculation - Exact Location

## 🎯 Where is ETCL Calculated?

**File**: `frontend/src/components/AutoGrainRiskAssessment.tsx`

**Function**: `calculateRiskFromWeather()`

**Line Numbers**: Approximately lines 85-240

---

## 📂 File Structure

```
frontend/
  └── src/
      └── components/
          └── AutoGrainRiskAssessment.tsx  ← ETCL CALCULATED HERE
```

---

## 🔍 Exact Code Location

### Function Definition (Line ~85)
```typescript
const calculateRiskFromWeather = (weather: WeatherForecast[]): RiskAnalysis => {
    // ETCL calculation starts here
    let etcl = 120; // Base ETCL: 120 hours (5 days)
    
    // ... calculation logic ...
    
    return {
        riskLevel,
        etcl: Math.round(etcl),  // Final ETCL value returned
        weatherImpact,
        recommendation,
        riskColor,
        riskBangla,
        riskFactors,
    };
}
```

---

## 🧮 ETCL Calculation Steps

### Step 1: Initialize Base ETCL (Line ~90)
```typescript
let etcl = 120; // Base ETCL: 120 hours (5 days)
```

### Step 2: Analyze Weather Data (Lines ~95-110)
```typescript
weather.forEach((day) => {
    if (day.humidity > 70) highHumidityDays++;
    if (day.rainProbability > 60) highRainDays++;
    if (day.temperature > 32) highTempDays++;
    avgTemp += day.temperature;
    avgHumidity += day.humidity;
    totalRainProb += day.rainProbability;
});
```

### Step 3: Apply Humidity Penalties (Lines ~115-130)
```typescript
// High humidity penalty (major risk factor)
if (highHumidityDays >= 4) {
    etcl -= 35;
} else if (highHumidityDays >= 3) {
    etcl -= 25;
} else if (highHumidityDays >= 2) {
    etcl -= 15;
} else if (highHumidityDays >= 1) {
    etcl -= 10;
}
```

### Step 4: Apply Rain Penalties (Lines ~132-145)
```typescript
// High rainfall penalty (moisture re-absorption risk)
if (highRainDays >= 3) {
    etcl -= 20;
} else if (highRainDays >= 2) {
    etcl -= 15;
} else if (highRainDays >= 1) {
    etcl -= 10;
}
```

### Step 5: Apply Temperature Penalties (Lines ~147-160)
```typescript
// High temperature penalty (fungal growth)
if (highTempDays >= 3) {
    etcl -= 20;
} else if (highTempDays >= 2) {
    etcl -= 12;
} else if (highTempDays >= 1) {
    etcl -= 8;
}
```

### Step 6: Apply Combined Risk Penalties (Lines ~162-175)
```typescript
// Combined risk: High humidity + High temperature
if (avgHumidity > 75 && avgTemp > 30) {
    etcl -= 15;
}

// Combined risk: High humidity + Rain
if (avgHumidity > 70 && avgRainProb > 50) {
    etcl -= 12;
}
```

### Step 7: Apply Good Conditions Bonus (Lines ~177-182)
```typescript
// Bonus for good conditions
if (avgHumidity < 60 && avgRainProb < 30 && avgTemp < 30) {
    etcl += 15;
}
```

### Step 8: Ensure Minimum ETCL (Line ~184)
```typescript
// Ensure ETCL doesn't go below 24 hours
etcl = Math.max(24, etcl);
```

### Step 9: Determine Risk Level (Lines ~186-200)
```typescript
if (etcl >= 96) {
    riskLevel = "Low";
} else if (etcl >= 60) {
    riskLevel = "Medium";
} else {
    riskLevel = "High";
}
```

### Step 10: Return Results (Lines ~235-245)
```typescript
return {
    riskLevel,
    etcl: Math.round(etcl),  // ← FINAL ETCL VALUE
    weatherImpact,
    recommendation,
    riskColor,
    riskBangla,
    riskFactors,
};
```

---

## 🔄 When is ETCL Calculated?

### Trigger 1: When Weather Data is Received as Prop
```typescript
useEffect(() => {
    if (propWeatherData && propWeatherData.length > 0) {
        const analysis = calculateRiskFromWeather(propWeatherData);
        setRiskAnalysis(analysis);
    }
}, [propWeatherData]);
```

### Trigger 2: When Weather Data is Loaded from Cache
```typescript
useEffect(() => {
    if (!propWeatherData || propWeatherData.length === 0) {
        const cached = localStorage.getItem("krishi_weather_alert_cache");
        // ... load data ...
        const analysis = calculateRiskFromWeather(weather);
        setRiskAnalysis(analysis);
    }
}, [propWeatherData]);
```

---

## 📊 ETCL Calculation Formula

```
ETCL = 120 hours (base)

Penalties:
  - High humidity (4+ days): -35 hours
  - High humidity (3 days): -25 hours
  - High humidity (2 days): -15 hours
  - High humidity (1 day): -10 hours
  
  - Heavy rain (3+ days): -20 hours
  - Heavy rain (2 days): -15 hours
  - Heavy rain (1 day): -10 hours
  
  - High temp (3+ days): -20 hours
  - High temp (2 days): -12 hours
  - High temp (1 day): -8 hours
  
  - High humidity + High temp: -15 hours
  - High humidity + Rain: -12 hours

Bonus:
  + Good conditions: +15 hours

Minimum:
  ETCL = max(24, calculated_ETCL)
```

---

## 🎨 Where is ETCL Displayed?

### Display Component
**File**: `frontend/src/components/AutoGrainRiskAssessment.tsx`

**Location**: Lines ~280-290

```typescript
<div className="p-4 bg-white rounded-lg border-2 border-current">
    <div className="text-center">
        <p className="text-sm font-bangla mb-1 opacity-80">
            ETCL (Expected Time to Critical Loss)
        </p>
        <p className="text-4xl font-bold font-bangla">
            {toBanglaNumber(riskAnalysis.etcl)} ঘণ্টা
        </p>
        <p className="text-xs font-bangla mt-1 opacity-70">
            ≈ {toBanglaNumber(Math.round(riskAnalysis.etcl / 24))} দিন
        </p>
    </div>
</div>
```

---

## 🔍 How to Find It

### Method 1: Search in File
1. Open: `frontend/src/components/AutoGrainRiskAssessment.tsx`
2. Search for: `calculateRiskFromWeather`
3. Look for: `let etcl = 120;`

### Method 2: Search for ETCL
1. Search in project: "let etcl"
2. Find in: `AutoGrainRiskAssessment.tsx`
3. Line: ~90

### Method 3: Follow the Flow
1. User searches location
2. Weather data fetched
3. Passed to `AutoGrainRiskAssessment` component
4. `calculateRiskFromWeather()` function called
5. ETCL calculated inside this function

---

## 📝 Example Calculation

### Input Weather Data
```javascript
[
  { humidity: 75, rainProbability: 70, temperature: 33 },  // Day 1
  { humidity: 80, rainProbability: 65, temperature: 32 },  // Day 2
  { humidity: 72, rainProbability: 55, temperature: 31 },  // Day 3
  { humidity: 68, rainProbability: 40, temperature: 30 },  // Day 4
  { humidity: 65, rainProbability: 30, temperature: 29 }   // Day 5
]
```

### Calculation Steps
```
Base ETCL: 120 hours

Analysis:
- High humidity days (>70%): 3 days
- High rain days (>60%): 2 days
- High temp days (>32°): 1 day
- Avg humidity: 72%
- Avg rain: 52%
- Avg temp: 31°C

Penalties:
- High humidity (3 days): -25 hours
- High rain (2 days): -15 hours
- High temp (1 day): -8 hours
- High humidity + Rain: -12 hours

Total: 120 - 25 - 15 - 8 - 12 = 60 hours

Final ETCL: 60 hours (≈ 2.5 days)
Risk Level: Medium (Yellow)
```

---

## 🎯 Summary

**ETCL is calculated in**:
- **File**: `frontend/src/components/AutoGrainRiskAssessment.tsx`
- **Function**: `calculateRiskFromWeather()`
- **Line**: ~85-240
- **Trigger**: When weather data is received or loaded
- **Display**: In the risk assessment card
- **Update**: Automatically when weather changes

**The calculation is 100% client-side (frontend) and happens automatically!**

---

## 🔗 Related Files

1. **WeatherAlert.tsx** - Passes weather data to AutoGrainRiskAssessment
2. **AutoGrainRiskAssessment.tsx** - Calculates ETCL ← **HERE**
3. **banglaNumber.ts** - Formats ETCL for display

---

**📍 Location Confirmed: `frontend/src/components/AutoGrainRiskAssessment.tsx`**
