"""
Test script for Risk Prediction with provided dataset
"""

import sys
import os
import django

# Setup Django environment
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'crop.settings')
django.setup()

from scanner.risk_prediction import risk_engine

# Test dataset
test_data = [
    {"batch_id": "BATCH-003", "location": "Chattogram", "moisture": 17.5, "temperature": 31, "expected_risk": "High"},
    {"batch_id": "BATCH-002", "location": "Rajshahi", "moisture": 17.64, "temperature": 30.9, "expected_risk": "High"},
    {"batch_id": "BATCH-005", "location": "Gazipur", "moisture": 17.76, "temperature": 30.6, "expected_risk": "High"},
    {"batch_id": "BATCH-002", "location": "Rangpur", "moisture": 17.82, "temperature": 30.5, "expected_risk": "High"},
    {"batch_id": "BATCH-004", "location": "Khulna", "moisture": 17.99, "temperature": 30.3, "expected_risk": "High"},
    {"batch_id": "BATCH-002", "location": "Chattogram", "moisture": 18.06, "temperature": 30.1, "expected_risk": "Critical"},
    {"batch_id": "BATCH-002", "location": "Sylhet", "moisture": 18.12, "temperature": 30.1, "expected_risk": "Critical"},
    {"batch_id": "BATCH-005", "location": "Chattogram", "moisture": 18.2, "temperature": 29.9, "expected_risk": "Critical"},
    {"batch_id": "BATCH-004", "location": "Rangpur", "moisture": 18.36, "temperature": 29.9, "expected_risk": "Critical"},
]

print("="*80)
print("TESTING RISK PREDICTION ENGINE WITH PROVIDED DATASET")
print("="*80)
print()

results = []
passed = 0
failed = 0

for i, data in enumerate(test_data, 1):
    print(f"\n{'='*80}")
    print(f"TEST {i}/{len(test_data)}")
    print(f"{'='*80}")
    print(f"Batch ID: {data['batch_id']}")
    print(f"Location: {data['location']}")
    print(f"Moisture: {data['moisture']}%")
    print(f"Temperature: {data['temperature']}°C")
    print(f"Expected Risk: {data['expected_risk']}")
    print("-"*80)
    
    try:
        # Calculate risk
        result = risk_engine.calculate_etcl(
            moisture=data['moisture'],
            temperature=data['temperature'],
            location=data['location'],
            batch_id=data['batch_id']
        )
        
        # Extract results
        etcl = result['etcl_hours']
        risk_category = result['risk_category']
        
        # Check if risk matches expected
        expected_risk = data['expected_risk'] + " Risk"
        match = risk_category == expected_risk
        
        if match:
            passed += 1
            status = "✅ PASS"
        else:
            failed += 1
            status = "❌ FAIL"
        
        print(f"\nRESULTS:")
        print(f"  ETCL: {etcl} hours")
        print(f"  Risk Category: {risk_category}")
        print(f"  Expected: {expected_risk}")
        print(f"  Status: {status}")
        
        # Show weather forecast summary
        weather = result['weather_forecast_7d']
        avg_temp = sum(d['temp'] for d in weather) / len(weather)
        avg_humidity = sum(d['humidity'] for d in weather) / len(weather)
        avg_rain = sum(d['rain_prob'] for d in weather) / len(weather)
        
        print(f"\nWEATHER FORECAST (7-day average):")
        print(f"  Temperature: {avg_temp:.1f}°C")
        print(f"  Humidity: {avg_humidity:.1f}%")
        print(f"  Rain Probability: {avg_rain:.1f}%")
        
        # Show advisory
        print(f"\nADVISORY (Bengali):")
        print(f"  Summary: {result['advisory_bangla']['summary']}")
        print(f"  Why Risk: {result['advisory_bangla']['why_risk']}")
        
        results.append({
            'test': i,
            'batch_id': data['batch_id'],
            'location': data['location'],
            'moisture': data['moisture'],
            'temperature': data['temperature'],
            'etcl': etcl,
            'risk': risk_category,
            'expected': expected_risk,
            'match': match
        })
        
    except Exception as e:
        print(f"\n❌ ERROR: {str(e)}")
        failed += 1
        results.append({
            'test': i,
            'batch_id': data['batch_id'],
            'error': str(e),
            'match': False
        })

# Summary
print("\n" + "="*80)
print("TEST SUMMARY")
print("="*80)
print(f"Total Tests: {len(test_data)}")
print(f"Passed: {passed} ✅")
print(f"Failed: {failed} ❌")
print(f"Success Rate: {(passed/len(test_data)*100):.1f}%")
print()

# Detailed results table
print("\nDETAILED RESULTS:")
print("-"*80)
print(f"{'Test':<6} {'Batch':<12} {'Location':<15} {'Moisture':<10} {'Temp':<8} {'ETCL':<8} {'Risk':<18} {'Match':<6}")
print("-"*80)

for r in results:
    if 'error' not in r:
        match_symbol = "✅" if r['match'] else "❌"
        print(f"{r['test']:<6} {r['batch_id']:<12} {r['location']:<15} {r['moisture']:<10.2f} {r['temperature']:<8.1f} {r['etcl']:<8.1f} {r['risk']:<18} {match_symbol:<6}")
    else:
        print(f"{r['test']:<6} {r['batch_id']:<12} ERROR: {r['error']}")

print("-"*80)
print()

# ETCL Calculation Breakdown for first test
print("\n" + "="*80)
print("ETCL CALCULATION BREAKDOWN (Example: Test 1)")
print("="*80)

data = test_data[0]
moisture = data['moisture']
temperature = data['temperature']

print(f"\nInput:")
print(f"  Moisture: {moisture}%")
print(f"  Temperature: {temperature}°C")
print()

etcl = 120  # Base ETCL
print(f"Base ETCL: {etcl} hours")
print()

print("Adjustments:")

# Moisture adjustment
if moisture > 14:
    adjustment = (moisture - 14) * 8
    etcl -= adjustment
    print(f"  Moisture > 14%: -{adjustment:.1f} hours (moisture={moisture}%)")
elif moisture < 11:
    etcl += 20
    print(f"  Moisture < 11%: +20 hours")
else:
    print(f"  Moisture 11-14%: No adjustment")

# Temperature adjustment
if temperature > 32:
    adjustment = (temperature - 32) * 5
    etcl -= adjustment
    print(f"  Temperature > 32°C: -{adjustment:.1f} hours (temp={temperature}°C)")
else:
    print(f"  Temperature ≤ 32°C: No adjustment")

# Note: Weather adjustments would be applied based on forecast
print(f"  (Weather adjustments applied based on 7-day forecast)")

print()
print(f"Final ETCL: {max(12, etcl):.1f} hours (minimum 12 hours)")
print()

# Risk category determination
final_etcl = max(12, etcl)
if final_etcl > 96:
    risk = "Low Risk"
elif final_etcl >= 48:
    risk = "Moderate Risk"
elif final_etcl >= 24:
    risk = "High Risk"
else:
    risk = "Critical Risk"

print(f"Risk Category: {risk}")
print()

print("="*80)
print("TEST COMPLETE")
print("="*80)
