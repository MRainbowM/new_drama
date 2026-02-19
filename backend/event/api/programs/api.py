from ninja import Router

from .programs_api_service import programs_api_service

router = Router(tags=['Афиша'])


@router.get(
    '/today/',
    summary='Получить программку спектакля по текущей дате',
)
async def get_event_program_by_date(request):
    return await programs_api_service.get_program_today(
        host=request.get_host()
    )
