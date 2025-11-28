from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken, AuthenticationFailed
from .models import User

class CustomJWTAuthentication(JWTAuthentication):
    def get_user(self, validated_token):
        try:
            user_id = validated_token['user_id']
            user = User.objects.get(id=user_id)
            return user
        except User.DoesNotExist:
            raise InvalidToken('User not found')
    
    def authenticate(self, request):
        """
        Override to make authentication optional
        Returns None if no token, allowing anonymous access
        """
        try:
            return super().authenticate(request)
        except (InvalidToken, AuthenticationFailed):
            # Return None to allow anonymous access
            return None
