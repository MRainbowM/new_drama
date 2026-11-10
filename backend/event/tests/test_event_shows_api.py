import pytest
from asgiref.sync import async_to_sync
from event.api.event_shows.api_service import event_show_api_service


@pytest.mark.django_db
def test_get_list_by_month_returns_is_sold_out(
    event_show,
    sold_out_event_show,
):
    """Афиша возвращает поле is_sold_out для каждого показа."""
    result = async_to_sync(event_show_api_service.get_list_by_month)()

    assert len(result) == 2

    by_id = {item.id: item for item in result}
    assert by_id[event_show.id].is_sold_out is False
    assert by_id[sold_out_event_show.id].is_sold_out is True


@pytest.mark.django_db
def test_event_shows_api_returns_is_sold_out(
    api_client,
    event_show,
    sold_out_event_show,
):
    """HTTP API афиши отдаёт is_sold_out в JSON."""
    response = async_to_sync(api_client.get)('/event-shows/')

    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2

    by_id = {item['id']: item for item in data}
    assert by_id[event_show.id]['is_sold_out'] is False
    assert by_id[sold_out_event_show.id]['is_sold_out'] is True
    assert 'is_premiere' in by_id[event_show.id]
    assert 'link_to_buy_ticket' in by_id[event_show.id]
