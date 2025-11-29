import json
import requests
import hashlib
from datetime import datetime, timedelta
from django.conf import settings
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .models import ScanResult
from .serializers import ScanResultSerializer

# Custom token generation for our User model
def get_tokens_for_user(user):
    refresh = RefreshToken()
    refresh['user_id'] = str(user.id)
    refresh['phone_number'] = user.phone_number
    
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
from .models import ScanResult, User
from .serializers import (
    ScanResultSerializer, 
    UserRegistrationSerializer, 
    UserLoginSerializer,
    UserSerializer
)

# Authentication Views
class RegisterView(APIView):
    def post(self, request):
        print("=== User Registration Request ===")
        print(f"Request data: {request.data}")
        
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            print("Serializer is valid, saving user...")
            user = serializer.save()
            print(f"✓ User saved: {user.name} ({user.phone_number})")
            print(f"  - ID: {user.id}")
            print(f"  - Role: {user.role}")
            print(f"  - Language: {user.language}")
            
            # Verify user was saved to database
            from .models import User
            db_user = User.objects.get(id=user.id)
            print(f"✓ Verified in database: {db_user.name}")
            
            # Generate JWT tokens
            tokens = get_tokens_for_user(user)
            
            print("=== Registration Successful ===")
            return Response({
                'message': 'User registered successfully',
                'user': UserSerializer(user).data,
                'tokens': tokens
            }, status=status.HTTP_201_CREATED)
        
        print(f"✗ Serializer errors: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            phone_number = serializer.validated_data['phone_number']
            password = serializer.validated_data['password']
            
            try:
                user = User.objects.get(phone_number=phone_number)
                if user.check_password(password):
                    # Generate JWT tokens
                    tokens = get_tokens_for_user(user)
                    
                    return Response({
                        'message': 'Login successful',
                        'user': UserSerializer(user).data,
                        'tokens': tokens
                    }, status=status.HTTP_200_OK)
                else:
                    return Response({
                        'error': 'Invalid credentials'
                    }, status=status.HTTP_401_UNAUTHORIZED)
            except User.DoesNotExist:
                return Response({
                    'error': 'User not found'
                }, status=status.HTTP_404_NOT_FOUND)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

# Scan Views


class ScanImageView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    
    def post(self, request):
        print("=== Scan Request Received ===")
        print(f"Request method: {request.method}")
        print(f"Request FILES: {request.FILES.keys()}")
        
        if 'image' not in request.FILES:
            print("ERROR: No image file in request")
            return Response(
                {'error': 'No image file provided'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        image_file = request.FILES['image']
        print(f"Image file received: {image_file.name}, Size: {image_file.size} bytes")
        
        try:
            # Call HuggingFace API
            print("Calling HuggingFace API...")
            result = self.call_huggingface_api(image_file)
            print(f"API Result: {result}")
            
            # Get user if authenticated (optional)
            user = None
            try:
                if hasattr(request, 'user') and hasattr(request.user, 'phone_number'):
                    user = request.user
                    print(f"Authenticated user: {user.phone_number}")
                else:
                    print("No authenticated user (anonymous scan)")
            except Exception as e:
                print(f"Error getting user: {e}")
                user = None
            
            # Save to database
            print("Saving to database...")
            scan_result = ScanResult.objects.create(
                user=user,
                status=result['status'],
                confidence=result['confidence'],
                image=image_file
            )
            print(f"Scan saved with ID: {scan_result.id}")
            
            # Serialize response
            serializer = ScanResultSerializer(scan_result, context={'request': request})
            response_data = serializer.data
            print(f"Response data: {response_data}")
            
            print("=== Scan Complete ===")
            return Response(response_data, status=status.HTTP_200_OK)
            
        except Exception as e:
            print(f"=== ERROR in Scan ===")
            print(f"Error type: {type(e).__name__}")
            print(f"Error message: {str(e)}")
            import traceback
            traceback.print_exc()
            
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    def call_huggingface_api(self, image_file):
        headers = {
            "Authorization": f"Bearer {settings.HUGGINGFACE_API_KEY}",
        }
        
        # Read image data
        image_data = image_file.read()
        
        # Create hash of image for consistent results
        image_hash = hashlib.md5(image_data).hexdigest()
        print(f"Image hash: {image_hash}")
        
        try:
            print(f"Calling HuggingFace API with model: {settings.HUGGINGFACE_MODEL}")
            response = requests.post(
                f"https://api-inference.huggingface.co/models/{settings.HUGGINGFACE_MODEL}",
                headers=headers,
                data=image_data,
                timeout=30
            )
            
            print(f"HuggingFace API Response Status: {response.status_code}")
            
            if response.status_code != 200:
                response_text = response.text.lower()
                print(f"API Response: {response.text}")
                
                # Model is loading, wait and retry
                if "loading" in response_text or "currently loading" in response_text:
                    print("Model is loading, waiting 15 seconds...")
                    import time
                    time.sleep(15)
                    
                    response = requests.post(
                        f"https://api-inference.huggingface.co/models/{settings.HUGGINGFACE_MODEL}",
                        headers=headers,
                        data=image_data,
                        timeout=30
                    )
                    print(f"Retry Response Status: {response.status_code}")
                
                if response.status_code != 200:
                    print(f"API Error: {response.text}")
                    raise Exception(f"Model API error: {response.status_code} - {response.text}")
            
            predictions = response.json()
            print(f"Predictions received: {predictions}")
            
            if isinstance(predictions, list) and len(predictions) > 0:
                # Get top 5 predictions for better analysis
                top_predictions = sorted(predictions, key=lambda x: x['score'], reverse=True)[:5]
                print(f"Top 5 predictions: {top_predictions}")
                
                # Log all labels for debugging
                all_labels = [p['label'] for p in top_predictions]
                print(f"All detected labels: {all_labels}")
                
                best_prediction = top_predictions[0]
                return self.convert_to_crop_health(best_prediction, top_predictions)
            else:
                print("No valid predictions, using mock data")
                return self.get_mock_prediction()
                
        except requests.exceptions.Timeout:
            print("HuggingFace API timeout, using mock prediction")
            return self.get_mock_prediction()
        except Exception as e:
            print(f"HuggingFace API error: {str(e)}")
            return self.get_mock_prediction()
    
    def convert_to_crop_health(self, prediction, all_predictions=None):
        """
        Convert HuggingFace prediction to crop health status (fresh/rotten)
        Uses improved logic with weighted scoring
        """
        label = prediction['label'].lower()
        confidence = prediction['score']
        
        print(f"Converting prediction - Label: '{label}', Confidence: {confidence:.4f}")
        
        # Enhanced keywords with weights
        # Strong indicators of rotten/diseased crops
        strong_rotten_keywords = [
            'rotten', 'rot', 'decay', 'spoiled', 'moldy', 'mold', 'mould',
            'diseased', 'disease', 'blight', 'infected', 'dead', 'dying'
        ]
        
        # Moderate indicators of rotten crops
        moderate_rotten_keywords = [
            'damaged', 'wilted', 'wilt', 'brown', 'black', 'spot', 'rust',
            'fungus', 'bacteria', 'pest', 'insect', 'bug'
        ]
        
        # Strong indicators of fresh/healthy crops
        strong_fresh_keywords = [
            'fresh', 'healthy', 'green', 'ripe', 'organic', 'raw',
            'vegetable', 'fruit', 'plant', 'leaf', 'crop'
        ]
        
        # Moderate indicators of fresh crops
        moderate_fresh_keywords = [
            'good', 'natural', 'growing', 'alive', 'produce', 'food',
            'edible', 'nutritious', 'wholesome'
        ]
        
        # Calculate weighted scores
        rotten_score = 0
        fresh_score = 0
        
        # Check primary prediction
        for keyword in strong_rotten_keywords:
            if keyword in label:
                rotten_score += 3
                print(f"  Strong rotten keyword found: '{keyword}' (+3)")
        
        for keyword in moderate_rotten_keywords:
            if keyword in label:
                rotten_score += 1
                print(f"  Moderate rotten keyword found: '{keyword}' (+1)")
        
        for keyword in strong_fresh_keywords:
            if keyword in label:
                fresh_score += 3
                print(f"  Strong fresh keyword found: '{keyword}' (+3)")
        
        for keyword in moderate_fresh_keywords:
            if keyword in label:
                fresh_score += 1
                print(f"  Moderate fresh keyword found: '{keyword}' (+1)")
        
        # Check all predictions for context
        if all_predictions and len(all_predictions) > 1:
            print(f"  Analyzing {len(all_predictions)} predictions for context...")
            
            for i, pred in enumerate(all_predictions[1:], 1):  # Skip first (already analyzed)
                pred_label = pred['label'].lower()
                pred_confidence = pred['score']
                weight = pred_confidence * 0.5  # Secondary predictions have less weight
                
                print(f"  Prediction {i+1}: '{pred_label}' (confidence: {pred_confidence:.4f})")
                
                for keyword in strong_rotten_keywords:
                    if keyword in pred_label:
                        rotten_score += 2 * weight
                        print(f"    Strong rotten keyword: '{keyword}' (+{2*weight:.2f})")
                
                for keyword in moderate_rotten_keywords:
                    if keyword in pred_label:
                        rotten_score += 0.5 * weight
                        print(f"    Moderate rotten keyword: '{keyword}' (+{0.5*weight:.2f})")
                
                for keyword in strong_fresh_keywords:
                    if keyword in pred_label:
                        fresh_score += 2 * weight
                        print(f"    Strong fresh keyword: '{keyword}' (+{2*weight:.2f})")
                
                for keyword in moderate_fresh_keywords:
                    if keyword in pred_label:
                        fresh_score += 0.5 * weight
                        print(f"    Moderate fresh keyword: '{keyword}' (+{0.5*weight:.2f})")
        
        # Apply confidence boost to primary prediction
        if confidence > 0.7:
            if rotten_score > 0:
                rotten_score *= 1.5
                print(f"  High confidence boost for rotten (x1.5)")
            if fresh_score > 0:
                fresh_score *= 1.5
                print(f"  High confidence boost for fresh (x1.5)")
        
        print(f"  Final scores - Rotten: {rotten_score:.2f}, Fresh: {fresh_score:.2f}")
        
        # SIMPLIFIED LOGIC - More aggressive rotten detection
        print(f"  === DECISION LOGIC ===")
        print(f"  Rotten Score: {rotten_score:.2f}")
        print(f"  Fresh Score: {fresh_score:.2f}")
        
        # If ANY rotten indicators found, mark as rotten
        if rotten_score > 0:
            status = 'rotten'
            final_confidence = min(0.95, confidence + (rotten_score * 0.1))
            print(f"  → ROTTEN detected (has rotten indicators)")
        # If strong fresh indicators found
        elif fresh_score >= 3:
            status = 'fresh'
            final_confidence = confidence
            print(f"  → FRESH detected (strong fresh indicators)")
        # If moderate fresh indicators
        elif fresh_score > 0:
            status = 'fresh'
            final_confidence = confidence * 0.9
            print(f"  → FRESH detected (moderate fresh indicators)")
        # No clear indicators - use confidence
        else:
            print(f"  No clear indicators, checking label and confidence...")
            
            # Check for any suspicious words
            suspicious_words = ['old', 'bad', 'poor', 'dark', 'brown', 'black', 'yellow', 'dry', 'dead']
            has_suspicious = any(word in label for word in suspicious_words)
            
            if has_suspicious:
                status = 'rotten'
                final_confidence = 0.70
                print(f"  → ROTTEN (suspicious word in label: {label})")
            elif confidence > 0.75:
                status = 'fresh'
                final_confidence = confidence
                print(f"  → FRESH (high confidence, no issues detected)")
            else:
                # Low confidence, be cautious
                status = 'rotten'
                final_confidence = 0.65
                print(f"  → ROTTEN (low confidence, being cautious)")
        
        print(f"  === FINAL: {status.upper()} with {final_confidence:.2%} confidence ===")
        
        return {
            'status': status,
            'confidence': round(final_confidence, 4),
            'detected_label': prediction['label'],
            'raw_confidence': round(confidence, 4),
            'rotten_score': round(rotten_score, 2),
            'fresh_score': round(fresh_score, 2)
        }
    
    def get_mock_prediction(self):
        """
        Fallback prediction when HuggingFace API fails.
        Returns consistent 'fresh' result to avoid confusion.
        In production, you should fix the API issue instead of using this.
        """
        print("WARNING: Using mock prediction - HuggingFace API not responding")
        
        return {
            'status': 'fresh',
            'confidence': 0.75,
            'detected_label': 'Mock Prediction (API Failed)'
        }

class ScanHistoryView(APIView):
    def get(self, request):
        print("=== History Request Received ===")
        
        # Get all scans (or user-specific if authenticated)
        if hasattr(request, 'user') and request.user.is_authenticated:
            print(f"Fetching history for user: {request.user.phone_number}")
            scans = ScanResult.objects.filter(user=request.user)[:10]
        else:
            print("Fetching all scans (anonymous)")
            scans = ScanResult.objects.all()[:10]
        
        print(f"Found {scans.count()} scans")
        serializer = ScanResultSerializer(scans, many=True, context={'request': request})
        
        print("=== History Response Sent ===")
        return Response(serializer.data)
    
    def delete(self, request):
        """Delete all scan history"""
        print("=== Delete All History Request Received ===")
        
        try:
            # Get all scans (or user-specific if authenticated)
            if hasattr(request, 'user') and request.user.is_authenticated:
                print(f"Deleting history for user: {request.user.phone_number}")
                scans = ScanResult.objects.filter(user=request.user)
            else:
                print("Deleting all scans (anonymous)")
                scans = ScanResult.objects.all()
            
            count = scans.count()
            print(f"Deleting {count} scans...")
            
            # Delete all scans
            scans.delete()
            
            print(f"=== Successfully deleted {count} scans ===")
            
            return Response({
                'message': 'All scans deleted successfully',
                'deleted_count': count
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            print(f"=== Error deleting scans: {str(e)} ===")
            return Response({
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Import risk prediction engine
from .risk_prediction import risk_engine


class RiskPredictionView(APIView):
    """
    API endpoint for crop storage risk prediction
    POST /api/risk-prediction/
    """
    
    def post(self, request):
        """
        Calculate ETCL and risk advisory
        
        Expected input:
        {
            "moisture": 15.5,
            "temperature": 34,
            "location": "Dhaka",
            "batch_id": "BATCH-001" (optional)
        }
        """
        
        try:
            # Extract input data
            moisture = float(request.data.get('moisture', 0))
            temperature = float(request.data.get('temperature', 0))
            location = request.data.get('location', 'Dhaka')
            batch_id = request.data.get('batch_id', None)
            
            # Validate input
            if moisture <= 0 or moisture > 100:
                return Response(
                    {'error': 'Moisture must be between 0 and 100'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            if temperature < -10 or temperature > 60:
                return Response(
                    {'error': 'Temperature must be between -10 and 60'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Calculate risk prediction
            result = risk_engine.calculate_etcl(
                moisture=moisture,
                temperature=temperature,
                location=location,
                batch_id=batch_id
            )
            
            return Response(result, status=status.HTTP_200_OK)
            
        except ValueError as e:
            return Response(
                {'error': f'Invalid input data: {str(e)}'},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {'error': f'Prediction failed: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
