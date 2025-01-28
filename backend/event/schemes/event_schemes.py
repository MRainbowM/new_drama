from typing import Optional, List

from ninja import ModelSchema, FilterSchema, Field

from people.schemes import EventPeopleOutSchema, PeoplePreviewSchema
from .event_image_schemes import EventImageOutSchema
from ..models import Event


class EventDetailSchema(ModelSchema):
    peoples: List[EventPeopleOutSchema]
    images: List[EventImageOutSchema]

    class Config:
        model = Event

        model_fields = [
            'id', 'name', 'slug', 'short_description', 'cover', 'preview_cover', 'min_age_limit',
            'description', 'duration', 'has_intermission', 'premiere_at',
        ]

    @staticmethod
    def resolve_peoples(obj):
        return obj.peoples.all().order_by('sort')

    @staticmethod
    def resolve_images(obj):
        return obj.images.all()


class EventPreviewSchema(ModelSchema):
    dramatist: Optional[PeoplePreviewSchema]
    producer: Optional[PeoplePreviewSchema]

    class Config:
        model = Event
        model_fields = [
            'id', 'name', 'slug', 'short_description', 'cover', 'preview_cover', 'min_age_limit',
        ]


class EventProgramSchema(ModelSchema):
    class Config:
        model = Event
        model_fields = [
            'program_pdf', 'name'
        ]


class EventFilterSchema(FilterSchema):
    is_enable: Optional[bool] = Field(None, q='is_enable')
