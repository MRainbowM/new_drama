from django.contrib import admin

from ..models import Popup


@admin.register(Popup)
class PopupAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'title',
        'get_is_enable',
        'get_is_show_timer',
        'start_at',
        'end_at',
    )
    readonly_fields = ('create_at', 'update_at')

    @admin.display(description='Показывать на сайте', ordering='is_enable')
    def get_is_enable(self, obj) -> str:
        return '✅' if obj.is_enable else '❌'

    @admin.display(description='Показывать таймер оставшегося времени', ordering='is_show_timer')
    def get_is_show_timer(self, obj) -> str:
        return '✅' if obj.is_show_timer else '❌'
