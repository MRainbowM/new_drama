from django.contrib import admin

from people.models import EventPeople
from ..models import Event, EventImage


class EventPeopleInline(admin.TabularInline):
    model = EventPeople
    extra = 3


class EventImageInline(admin.TabularInline):
    model = EventImage
    extra = 3


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    readonly_fields = ('slug',)
    inlines = [EventPeopleInline, EventImageInline]
