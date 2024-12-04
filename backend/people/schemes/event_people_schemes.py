from ninja import ModelSchema

from .people_schemes import PeoplePreviewSchema
from ..models import EventPeople


class EventPeopleOutSchema(ModelSchema):
    people: PeoplePreviewSchema

    class Config:
        model = EventPeople
        model_fields = ['id', 'tag', 'role', 'sort']
