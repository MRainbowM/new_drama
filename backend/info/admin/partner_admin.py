from django.contrib import admin

from ..models import Partner


@admin.register(Partner)
class PartnerAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_enable', 'sort', 'create_at', 'update_at')
    readonly_fields = ('create_at', 'update_at')
