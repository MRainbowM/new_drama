from typing import List

from django.utils.translation import gettext_lazy as _
from ninja import Query, Router

from .models import InfoBlock, Viewer, Partner
from .schemes import (
    InfoBlockOutSchema, InfoBlockFilterSchema,
    ViewerOutSchema, ViewerFilterSchema,
    PartnerFilterSchema, PartnerOutSchema
)

router = Router()


@router.get(
    '/info_block/list',
    response=List[InfoBlockOutSchema],
    tags=[_('Инфо-блоки')],
    summary=_('Получить список инфо-блоков')
)
def get_info_block_list(request, filters: InfoBlockFilterSchema = Query(...)):
    info_block_list = InfoBlock.objects.all()
    info_block_list = filters.filter(info_block_list).order_by('sort')

    return info_block_list


@router.get(
    '/viewer/list',
    response=List[ViewerOutSchema],
    tags=[_('Инфо-блоки')],
    summary=_('Получить список зрителей')
)
def get_viewer_list(request, filters: ViewerFilterSchema = Query(...)):
    viewer_list = Viewer.objects.all()
    viewer_list = filters.filter(viewer_list).order_by('sort')

    return viewer_list


@router.get(
    '/partner/list',
    response=List[PartnerOutSchema],
    tags=[_('Инфо-блоки')],
    summary=_('Получить список партнеров')
)
def get_partner_list(request, filters: PartnerFilterSchema = Query(...)):
    partner_list = Partner.objects.all()
    partner_list = filters.filter(partner_list).order_by('sort')

    return partner_list
