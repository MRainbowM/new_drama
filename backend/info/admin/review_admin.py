from django.contrib import admin

from ..models import Review


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('id', 'get_is_enable_main', 'get_is_enable_event', 'event', 'sort', 'create_at', 'update_at')
    readonly_fields = ('create_at', 'update_at')

    @admin.display(description='На главной', ordering='is_enable_main')
    def get_is_enable_main(self, obj) -> str:
        return '✅' if obj.is_enable_main else '❌'

    @admin.display(description='В спектакле', ordering='is_enable_event')
    def get_is_enable_event(self, obj) -> str:
        return '✅' if obj.is_enable_event else '❌'
