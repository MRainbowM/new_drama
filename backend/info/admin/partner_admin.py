from django.contrib import admin

from ..models import Partner


@admin.register(Partner)
class PartnerAdmin(admin.ModelAdmin):
    list_display = ('name', 'get_is_enable', 'sort', 'create_at', 'update_at')
    readonly_fields = ('create_at', 'update_at')

    @admin.display(description='Показывать на сайте', ordering='is_enable')
    def get_is_enable(self, obj) -> str:
        return '✅' if obj.is_enable else '❌'
