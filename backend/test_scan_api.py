#!/usr/bin/env python
"""
Test script to verify scan API is working
Run this from the backend folder: python test_scan_api.py
"""

import requests
import os

# Configuration
API_URL = "http://localhost:8000/api"
TEST_IMAGE_PATH = "test_image.jpg"  # You need to provide a test image

def test_history():
    """Test the history endpoint"""
    print("=" * 50)
    print("Testing History Endpoint")
    print("=" * 50)
    
    try:
        response = requests.get(f"{API_URL}/history/")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            print("✅ History endpoint working!")
            return True
        else:
            print("❌ History endpoint failed!")
            return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def test_scan(image_path):
    """Test the scan endpoint"""
    print("\n" + "=" * 50)
    print("Testing Scan Endpoint")
    print("=" * 50)
    
    if not os.path.exists(image_path):
        print(f"❌ Test image not found: {image_path}")
        print("Please provide a test image file")
        return False
    
    try:
        with open(image_path, 'rb') as f:
            files = {'image': f}
            response = requests.post(f"{API_URL}/scan/", files=files)
        
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Response: {data}")
            print(f"\n✅ Scan successful!")
            print(f"   Status: {data.get('status')}")
            print(f"   Confidence: {data.get('confidence')}")
            return True
        else:
            print(f"❌ Scan failed!")
            print(f"Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def main():
    print("\n" + "=" * 50)
    print("SCAN API TEST SCRIPT")
    print("=" * 50)
    print(f"API URL: {API_URL}")
    print(f"Test Image: {TEST_IMAGE_PATH}")
    print()
    
    # Test 1: History endpoint
    history_ok = test_history()
    
    # Test 2: Scan endpoint (if test image exists)
    if os.path.exists(TEST_IMAGE_PATH):
        scan_ok = test_scan(TEST_IMAGE_PATH)
    else:
        print("\n" + "=" * 50)
        print("Skipping Scan Test")
        print("=" * 50)
        print(f"No test image found at: {TEST_IMAGE_PATH}")
        print("To test scan, create a test image file")
        scan_ok = None
    
    # Summary
    print("\n" + "=" * 50)
    print("TEST SUMMARY")
    print("=" * 50)
    print(f"History Endpoint: {'✅ PASS' if history_ok else '❌ FAIL'}")
    if scan_ok is not None:
        print(f"Scan Endpoint: {'✅ PASS' if scan_ok else '❌ FAIL'}")
    else:
        print(f"Scan Endpoint: ⏭️  SKIPPED (no test image)")
    print()
    
    if history_ok and (scan_ok or scan_ok is None):
        print("✅ Backend API is working!")
    else:
        print("❌ Backend API has issues!")
        print("\nTroubleshooting:")
        print("1. Make sure backend is running: python manage.py runserver")
        print("2. Check backend terminal for errors")
        print("3. Verify .env file has HUGGINGFACE_API_KEY")

if __name__ == "__main__":
    main()
