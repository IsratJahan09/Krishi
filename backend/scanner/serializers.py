from rest_framework import serializers
from .models import ScanResult, User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'phone_number', 'name', 'role', 'language', 'created_at']
        read_only_fields = ['id', 'created_at']

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)
    
    class Meta:
        model = User
        fields = ['phone_number', 'name', 'password', 'role', 'language']
    
    def create(self, validated_data):
        user = User(
            phone_number=validated_data['phone_number'],
            name=validated_data['name'],
            role=validated_data.get('role', 'farmer'),
            language=validated_data.get('language', 'bangla')
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class UserLoginSerializer(serializers.Serializer):
    phone_number = serializers.CharField()
    password = serializers.CharField(write_only=True)





class ScanResultSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    timestamp = serializers.DateTimeField(source='created_at', format='%Y-%m-%d %H:%M:%S')
    
    class Meta:
        model = ScanResult
        fields = ['id', 'status', 'confidence', 'image_url', 'timestamp']
    
    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None