from ninja import ModelSchema

from ..models import EventImage


class EventImageOutSchema(ModelSchema):
    class Config:
        model = EventImage
        model_fields = [
            'id', 'image',
        ]
