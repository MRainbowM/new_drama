from ninja import ModelSchema
from ..models import EventImage
from typing import Optional


class EventImageOutSchema(ModelSchema):
    image_compressed_url: Optional[str] = None

    class Config:
        model = EventImage
        model_fields = [
            'id', 'image'
        ]
