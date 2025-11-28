#!/usr/bin/env python
"""
Test script to verify HuggingFace API integration
Run this from the Backend directory after activating venv
"""

import os
import sys
import requests
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def test_huggingface_api():
    print("="*60)
    print("Testing HuggingFace API Integration")
    print("="*60)
    
    # Check API key
    api_key = os.getenv('HUGGINGFACE_API_KEY')
    if not api_key:
        print("❌ HUGGINGFACE_API_KEY not found in .env file")
        return False
    
    print(f"✅ API Key found: {api_key[:10]}...")
    
    # Test model
    model = "google/vit-base-patch16-224"
    print(f"📦 Testing model: {model}")
    
    # Create a simple test (you can replace with actual image path)
    print("\n" + "-"*60)
    print("Testing API endpoint...")
    print("-"*60)
    
    headers = {
        "Authorization": f"Bearer {api_key}",
    }
    
    # Test with a simple request to check if API key is valid
    try:
        # First, let's just check if the model endpoint is accessible
        response = requests.get(
            f"https://api-inference.huggingface.co/models/{model}",
            headers=headers,
            timeout=10
        )
        
        print(f"Model endpoint status: {response.status_code}")
        
        if response.status_code == 200:
            print("✅ HuggingFace API is accessible")
            print("✅ API key is valid")
            print("✅ Model endpoint is reachable")
            
            # Check if model is loaded
            model_info = response.json()
            print(f"\nModel Info:")
            print(f"  - Model ID: {model_info.get('modelId', 'N/A')}")
            print(f"  - Pipeline: {model_info.get('pipeline_tag', 'N/A')}")
            
            return True
        elif response.status_code == 401:
            print("❌ API key is invalid or expired")
            print("   Please check your HUGGINGFACE_API_KEY in .env file")
            return False
        elif response.status_code == 404:
            print("⚠️  Model not found")
            print("   The model might not exist or is private")
            return False
        else:
            print(f"⚠️  Unexpected status code: {response.status_code}")
            print(f"   Response: {response.text}")
            return False
            
    except requests.exceptions.Timeout:
        print("⚠️  Request timed out")
        print("   HuggingFace API might be slow or unreachable")
        return False
    except requests.exceptions.ConnectionError:
        print("❌ Connection error")
        print("   Check your internet connection")
        return False
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return False

def test_with_sample_image():
    """
    Test with an actual image if available
    """
    print("\n" + "="*60)
    print("Testing with Sample Image (if available)")
    print("="*60)
    
    # Check if there are any images in media/scans
    media_path = Path("media/scans")
    if media_path.exists():
        images = list(media_path.glob("*.jpg")) + list(media_path.glob("*.png"))
        if images:
            print(f"✅ Found {len(images)} image(s) in media/scans")
            
            # Test with first image
            test_image = images[0]
            print(f"📸 Testing with: {test_image.name}")
            
            api_key = os.getenv('HUGGINGFACE_API_KEY')
            model = "google/vit-base-patch16-224"
            
            headers = {
                "Authorization": f"Bearer {api_key}",
            }
            
            try:
                with open(test_image, 'rb') as f:
                    image_data = f.read()
                
                response = requests.post(
                    f"https://api-inference.huggingface.co/models/{model}",
                    headers=headers,
                    data=image_data,
                    timeout=30
                )
                
                if response.status_code == 200:
                    predictions = response.json()
                    print("\n✅ Image classification successful!")
                    print("\nTop 3 predictions:")
                    for i, pred in enumerate(predictions[:3], 1):
                        print(f"  {i}. {pred['label']}: {pred['score']*100:.2f}%")
                    return True
                elif "loading" in response.text.lower():
                    print("⏳ Model is loading... This is normal for first request")
                    print("   Try again in 10-15 seconds")
                    return True
                else:
                    print(f"⚠️  Status: {response.status_code}")
                    print(f"   Response: {response.text[:200]}")
                    return False
                    
            except Exception as e:
                print(f"❌ Error testing image: {str(e)}")
                return False
        else:
            print("ℹ️  No images found in media/scans")
            print("   Upload an image through the app first")
    else:
        print("ℹ️  media/scans directory doesn't exist yet")
        print("   It will be created when you upload your first image")
    
    return True

if __name__ == "__main__":
    print("\n")
    success = test_huggingface_api()
    
    if success:
        test_with_sample_image()
        
        print("\n" + "="*60)
        print("✅ HuggingFace Integration Test Complete")
        print("="*60)
        print("\nYou can now:")
        print("1. Start Django server: python manage.py runserver")
        print("2. Upload images through the frontend")
        print("3. Check Django admin to see stored results")
        print("\nNote: First API call might be slow as model loads")
        print("="*60 + "\n")
    else:
        print("\n" + "="*60)
        print("❌ HuggingFace Integration Test Failed")
        print("="*60)
        print("\nPlease fix the issues above before proceeding")
        print("="*60 + "\n")
        sys.exit(1)
