from django.contrib import admin

from ..models import InfoBlock


@admin.register(InfoBlock)
class InfoBlockAdmin(admin.ModelAdmin):
    readonly_fields = ('create_at', 'update_at')
