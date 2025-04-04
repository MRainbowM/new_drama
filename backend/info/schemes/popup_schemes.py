from ninja import ModelSchema

from ..models import Popup


class PopupOutSchema(ModelSchema):
    class Config:
        model = Popup
        model_fields = [
            'id', 'subtitle', 'title', 'short_title', 'content', 'btn_text', 'btn_link', 'cover',
            'end_at'
        ]
