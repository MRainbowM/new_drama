from django.contrib import admin

from ..models import InfoBlock


@admin.register(InfoBlock)
class InfoBlockAdmin(admin.ModelAdmin):
    list_display = ('title', 'get_is_enable', 'sort', 'create_at', 'update_at')
    readonly_fields = ('menu_title_slug', 'create_at', 'update_at')

    @admin.display(description='Показывать на сайте', ordering='is_enable')
    def get_is_enable(self, obj) -> str:
        return '✅' if obj.is_enable else '❌'
