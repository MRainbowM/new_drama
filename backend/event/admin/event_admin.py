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
    list_display = (
        'name', 'get_is_enable', 'short_description', 'min_age_limit',
        'get_has_intermission', 'duration', 'premiere_at', 'slug'
    )
    readonly_fields = ('slug', 'create_at', 'update_at')
    inlines = [EventPeopleInline, EventImageInline]
    # raw_id_fields = ('producer',)
    ordering = ('name',)

    fieldsets = (
        ('Основные', {
            'fields': (
                'name', 'short_description', 'description',
                'min_age_limit', 'premiere_at', 'duration',
                'has_intermission', 'is_enable'
            )
        }),
        ('Создатели', {
            'fields': ('dramatist', 'producer')
        }),
        ('Служебные', {
            'fields': ('slug', 'create_at', 'update_at')
        }),
        ('Медиа', {
            'fields': (
                'program_pdf',
                'cover', 'preview_cover', 'detail_cover', 'description_cover',
                'actor_cover',
            )
        }),
    )

    @admin.display(description='Показывать в репертуаре', ordering='is_enable')
    def get_is_enable(self, obj) -> str:
        return '✅' if obj.is_enable else '❌'

    @admin.display(description='Антракт', ordering='has_intermission')
    def get_has_intermission(self, obj) -> str:
        return '✅' if obj.has_intermission else '❌'
