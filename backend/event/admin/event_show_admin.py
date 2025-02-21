from django.contrib import admin

from ..models import EventShow


@admin.register(EventShow)
class EventShowAdmin(admin.ModelAdmin):
    list_display = ('get_event_name', 'start_at',)
    sortable_by = ('start_at', 'get_event_name')
    ordering = ('-start_at',)

    @admin.display(description='Спектакль', ordering='event__name')
    def get_event_name(self, obj) -> str:
        return obj.event.name
