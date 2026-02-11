from typing import List

from django.utils.translation import gettext_lazy as _
from ninja import Query, Router

from .models import Partner
from .schemes import (
    PartnerFilterSchema, PartnerOutSchema
)

router = Router()


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
