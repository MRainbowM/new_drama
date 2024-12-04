from typing import List

from django.shortcuts import get_object_or_404
from django.utils.translation import gettext_lazy as _
from ninja import Router

from .models import People
from .schemes import PeopleDetailSchema, PeoplePreviewSchema

router = Router()


@router.get(
    '/list',
    response=List[PeoplePreviewSchema],
    tags=[_('Люди театра')],
    summary=_('Получить список людей театра')
)
def get_people_list(request):
    people_list = People.objects.all()

    return people_list


@router.get(
    '/{slug}',
    response=PeopleDetailSchema,
    tags=[_('Люди театра')],
    summary=_('Получить данные человека по slug')
)
def get_people_by_slug(request, slug: str):
    people = get_object_or_404(People, slug=slug)
    return people
