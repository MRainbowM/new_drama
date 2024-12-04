from ninja import ModelSchema

from ..models import People


class PeoplePreviewSchema(ModelSchema):
    class Config:
        model = People
        model_fields = [
            'id', 'first_name', 'last_name', 'slug', 'tag', 'photo',
        ]


class PeopleDetailSchema(ModelSchema):
    class Config:
        model = People
        model_fields = [
            'id', 'first_name', 'last_name', 'slug', 'tag', 'photo', 'description', 'birthday', 'position', 'education'
        ]
