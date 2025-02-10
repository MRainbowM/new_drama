from django.contrib import admin

from ..models import Review


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('id', 'is_enable_main', 'is_enable_event', 'sort', 'create_at', 'update_at')
    readonly_fields = ('create_at', 'update_at')
