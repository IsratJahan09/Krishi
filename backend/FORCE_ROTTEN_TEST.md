# 🧪 FORCE ROTTEN TEST

## Problem: Still showing fresh for rotten images?

Let me help you debug this!

## 🔍 Step 1: Check What Backend Sees

When you scan an image, the backend terminal should show:

```
=== Scan Request Received ===
Image file received: image.jpg, Size: 123456 bytes
Calling HuggingFace API...
Top 5 predictions: [{'label': '...', 'score': 0.XX}, ...]
All detected labels: ['label1', 'label2', 'label3', ...]
Converting prediction - Label: '...', Confidence: 0.XX
  === DECISION LOGIC ===
  Rotten Score: X.XX
  Fresh Score: X.XX
  → ROTTEN/FRESH detected (reason)
  === FINAL: ROTTEN/FRESH with XX% confidence ===
```

## 📋 What to Send Me:

Copy and paste the ENTIRE backend output from one scan, especially:
1. "All detected labels: [...]"
2. "Converting prediction - Label: '...'"
3. "Rotten Score: X.XX"
4. "Fresh Score: X.XX"
5. "FINAL: ROTTEN/FRESH"

## 🎯 New Logic (Very Aggressive):

The new logic is VERY aggressive for rotten detection:

1. **ANY rotten keyword found** → ROTTEN (even score of 0.5)
2. **No rotten keywords + strong fresh** → FRESH
3. **No clear keywords + suspicious words** → ROTTEN
4. **Low confidence (<75%)** → ROTTEN (be cautious)

## 🚀 Apply New Logic:

```powershell
# Stop backend (Ctrl+C)
cd merged-krishi-project\backend
python manage.py runserver
```

## 🧪 Test Cases:

### Test 1: Upload Fresh Apple
Expected backend log:
```
All detected labels: ['apple', 'fruit', 'red']
Converting prediction - Label: 'apple'
  Strong fresh keyword found: 'fruit' (+3)
  Fresh Score: 4.50
  → FRESH detected (strong fresh indicators)
  === FINAL: FRESH with 85% confidence ===
```

### Test 2: Upload Moldy Bread
Expected backend log:
```
All detected labels: ['moldy bread', 'food', 'mold']
Converting prediction - Label: 'moldy bread'
  Strong rotten keyword found: 'moldy' (+3)
  Rotten Score: 4.50
  → ROTTEN detected (has rotten indicators)
  === FINAL: ROTTEN with 85% confidence ===
```

### Test 3: Upload Brown Banana
Expected backend log:
```
All detected labels: ['banana', 'brown', 'fruit']
Converting prediction - Label: 'banana'
  Strong fresh keyword found: 'fruit' (+3)
  Moderate rotten keyword found: 'brown' (+1)
  Rotten Score: 1.00
  Fresh Score: 4.50
  → ROTTEN detected (has rotten indicators)  ← ANY rotten = ROTTEN
  === FINAL: ROTTEN with 75% confidence ===
```

## 💡 Why It Might Still Show Fresh:

### Reason 1: HuggingFace Not Detecting Rotten
If HuggingFace labels are like:
```
All detected labels: ['food', 'object', 'item']
```
No keywords match! The model doesn't recognize it's rotten.

**Solution:** Use plant disease model:
```
HUGGINGFACE_MODEL=linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification
```

### Reason 2: Image Quality
- Blurry images
- Poor lighting
- Rotten part not visible
- Too far away

**Solution:** Use clear, close-up images showing the rotten part.

### Reason 3: Model Limitation
The general model (google/vit-base-patch16-224) is not trained for crop diseases.

**Solution:** Switch to plant disease model (see above).

## 🔧 Quick Fix: Use Better Model

Edit `backend/.env`:
```
HUGGINGFACE_MODEL=linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification
```

Restart backend:
```powershell
python manage.py runserver
```

This model is SPECIFICALLY trained for plant diseases!

## 📊 Send Me This Info:

When you scan a rotten image, copy this from backend terminal:

```
1. All detected labels: [...]
2. Converting prediction - Label: '...'
3. Rotten Score: X.XX
4. Fresh Score: X.XX
5. Final decision: ROTTEN/FRESH
```

This will help me see exactly what's happening!

---

**Restart backend and send me the logs from scanning a rotten image!**
