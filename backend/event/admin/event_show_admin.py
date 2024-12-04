from django.contrib import admin

from ..models import EventShow


@admin.register(EventShow)
class EventShowAdmin(admin.ModelAdmin):
    list_display = ('event__name', 'start_at')
    sortable_by = ('event__name', 'start_at')
    ordering = ('-start_at',)
