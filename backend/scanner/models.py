from django.db import models
from django.contrib.auth.hashers import make_password, check_password
import uuid

class User(models.Model):
    ROLE_CHOICES = [
        ('farmer', 'Farmer'),
        ('admin', 'Admin'),
    ]
    
    LANGUAGE_CHOICES = [
        ('english', 'English'),
        ('bangla', 'Bangla'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    phone_number = models.CharField(max_length=15, unique=True)
    name = models.CharField(max_length=100)
    password = models.CharField(max_length=255)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='farmer')
    language = models.CharField(max_length=10, choices=LANGUAGE_CHOICES, default='bangla')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} ({self.phone_number})"
    
    def set_password(self, raw_password):
        self.password = make_password(raw_password)
    
    def check_password(self, raw_password):
        return check_password(raw_password, self.password)



class ScanResult(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='scans', null=True, blank=True)
    status = models.CharField(max_length=10, choices=[('fresh', 'Fresh'), ('rotten', 'Rotten')])
    confidence = models.FloatField()
    image = models.ImageField(upload_to='scans/')
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.status} ({self.confidence:.2%})"
