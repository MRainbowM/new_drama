from django.contrib import admin

from ..models import InfoBlock


@admin.register(InfoBlock)
class InfoBlockAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_enable', 'sort', 'create_at', 'update_at')
    readonly_fields = ('create_at', 'update_at')
