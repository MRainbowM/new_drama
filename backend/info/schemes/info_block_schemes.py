from typing import Optional

from ninja import FilterSchema, Field, ModelSchema

from ..models import InfoBlock


class MenuInfoBlockOutSchema(ModelSchema):
    class Config:
        model = InfoBlock
        model_fields = [
            'id', 'menu_title', 'menu_title_slug'
        ]


class InfoBlockOutSchema(ModelSchema):
    class Config:
        model = InfoBlock
        model_fields = [
            'id', 'title', 'content', 'btn_text',
            'btn_link', 'cover', 'menu_title_slug'
        ]


class InfoBlockFilterSchema(FilterSchema):
    is_enable: Optional[bool] = Field(None, q='is_enable')
    in_menu: Optional[bool] = Field(None, q='in_menu')
