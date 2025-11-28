"""
Test the prediction logic without HuggingFace API
Run: python test_prediction_logic.py
"""

# Simulate different HuggingFace responses
test_cases = [
    {
        "name": "Fresh Apple",
        "prediction": {"label": "apple", "score": 0.85},
        "expected": "fresh"
    },
    {
        "name": "Moldy Bread",
        "prediction": {"label": "moldy bread", "score": 0.75},
        "expected": "rotten"
    },
    {
        "name": "Rotten Fruit",
        "prediction": {"label": "rotten fruit", "score": 0.80},
        "expected": "rotten"
    },
    {
        "name": "Fresh Vegetable",
        "prediction": {"label": "fresh vegetable", "score": 0.90},
        "expected": "fresh"
    },
    {
        "name": "Diseased Plant",
        "prediction": {"label": "diseased plant", "score": 0.70},
        "expected": "rotten"
    },
    {
        "name": "Brown Banana",
        "prediction": {"label": "brown banana", "score": 0.65},
        "expected": "rotten"
    },
    {
        "name": "Generic Food (High Confidence)",
        "prediction": {"label": "food", "score": 0.85},
        "expected": "fresh"
    },
    {
        "name": "Generic Food (Low Confidence)",
        "prediction": {"label": "food", "score": 0.60},
        "expected": "rotten"
    },
]

def test_prediction(label, confidence):
    """Simplified version of convert_to_crop_health logic"""
    
    # Keywords
    strong_rotten = ['rotten', 'rot', 'mold', 'moldy', 'decay', 'spoiled', 'diseased', 'dead', 'dying']
    moderate_rotten = ['damaged', 'wilted', 'brown', 'black', 'spot', 'rust', 'fungus']
    strong_fresh = ['fresh', 'healthy', 'green', 'ripe', 'organic', 'vegetable', 'fruit']
    moderate_fresh = ['good', 'natural', 'growing', 'alive', 'produce', 'food']
    
    label_lower = label.lower()
    
    # Calculate scores
    rotten_score = 0
    fresh_score = 0
    
    for keyword in strong_rotten:
        if keyword in label_lower:
            rotten_score += 3
    
    for keyword in moderate_rotten:
        if keyword in label_lower:
            rotten_score += 1
    
    for keyword in strong_fresh:
        if keyword in label_lower:
            fresh_score += 3
    
    for keyword in moderate_fresh:
        if keyword in label_lower:
            fresh_score += 1
    
    # Decision logic
    if rotten_score > 0:
        return 'rotten'
    elif fresh_score >= 3:
        return 'fresh'
    elif fresh_score > 0:
        return 'fresh'
    else:
        # Check suspicious words
        suspicious = ['old', 'bad', 'poor', 'dark', 'brown', 'black', 'yellow', 'dry', 'dead']
        if any(word in label_lower for word in suspicious):
            return 'rotten'
        elif confidence > 0.75:
            return 'fresh'
        else:
            return 'rotten'

# Run tests
print("=" * 60)
print("PREDICTION LOGIC TEST")
print("=" * 60)

passed = 0
failed = 0

for test in test_cases:
    label = test["prediction"]["label"]
    confidence = test["prediction"]["score"]
    expected = test["expected"]
    
    result = test_prediction(label, confidence)
    status = "✅ PASS" if result == expected else "❌ FAIL"
    
    if result == expected:
        passed += 1
    else:
        failed += 1
    
    print(f"\n{status} - {test['name']}")
    print(f"  Label: '{label}'")
    print(f"  Confidence: {confidence}")
    print(f"  Expected: {expected}")
    print(f"  Got: {result}")

print("\n" + "=" * 60)
print(f"RESULTS: {passed} passed, {failed} failed")
print("=" * 60)

if failed == 0:
    print("✅ All tests passed! Logic is working correctly.")
else:
    print(f"❌ {failed} tests failed. Logic needs adjustment.")
