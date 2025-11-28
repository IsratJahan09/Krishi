from django.contrib import admin
from django.utils.html import format_html
from .models import User, ScanResult

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['phone_number', 'name', 'role', 'language', 'created_at']
    list_filter = ['role', 'language', 'created_at']
    search_fields = ['phone_number', 'name']
    readonly_fields = ['id', 'created_at', 'updated_at']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('id', 'phone_number', 'name', 'password')
        }),
        ('User Details', {
            'fields': ('role', 'language')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at')
        }),
    )

@admin.register(ScanResult)
class ScanResultAdmin(admin.ModelAdmin):
    list_display = ['id', 'user_info', 'status', 'confidence_percentage', 'image_thumbnail', 'created_at']
    list_filter = ['status', 'created_at', 'user']
    readonly_fields = ['id', 'created_at', 'image_preview']
    search_fields = ['status', 'id', 'user__phone_number', 'user__name']
    ordering = ['-created_at']
    
    def user_info(self, obj):
        if obj.user:
            return f"{obj.user.name} ({obj.user.phone_number})"
        return "Anonymous"
    user_info.short_description = 'User'
    
    def confidence_percentage(self, obj):
        return f"{obj.confidence:.1%}"
    confidence_percentage.short_description = 'Confidence'
    
    def image_thumbnail(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="50" height="50" style="object-fit: cover; border-radius: 4px;" />', obj.image.url)
        return '-'
    image_thumbnail.short_description = 'Thumbnail'
    
    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="400" style="border-radius: 8px; max-width: 100%;" />', obj.image.url)
        return '-'
    image_preview.short_description = 'Image Preview'
