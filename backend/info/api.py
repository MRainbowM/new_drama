from typing import List

from django.utils.translation import gettext_lazy as _
from ninja import Query, Router

from .models import InfoBlock
from .schemes import InfoBlockOutSchema, InfoBlockFilterSchema

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
