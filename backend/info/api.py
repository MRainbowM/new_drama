from typing import List

from django.http import Http404
from django.utils.translation import gettext_lazy as _
from ninja import Query, Router

from .models import InfoBlock, Review, Partner
from .models.services.popup_db_service import popup_db_service
from .schemes import (
    InfoBlockOutSchema, InfoBlockFilterSchema,
    MenuInfoBlockOutSchema,
    ReviewOutSchema, ReviewFilterSchema,
    PartnerFilterSchema, PartnerOutSchema,
    PopupOutSchema
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
    '/info_block/menu/list',
    response=List[MenuInfoBlockOutSchema],
    tags=[_('Инфо-блоки')],
    summary=_('Получить список инфо-блоков в меню')
)
def get_menu_info_block_list(request, filters: InfoBlockFilterSchema = Query(...)):
    info_block_list = InfoBlock.objects.all()
    info_block_list = filters.filter(info_block_list).order_by('sort')

    return info_block_list


@router.get(
    '/review/list',
    response=List[ReviewOutSchema],
    tags=[_('Инфо-блоки')],
    summary=_('Получить список отзывов')
)
def get_review_list(request, filters: ReviewFilterSchema = Query(...)):
    review_list = Review.objects.all()
    review_list = filters.filter(review_list).order_by('sort')

    return review_list


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


@router.get(
    '/popup',
    response=PopupOutSchema,
    tags=[_('Поп-ап')],
    summary=_('Получить активный поп-ап на текущий момент времени')
)
def get_active_popup(request):
    popup = popup_db_service.get_active()

    if popup is None:
        raise Http404

    return popup
