from unittest.mock import PropertyMock, patch

import pytest
from asgiref.sync import async_to_sync
from event.api.events.api_service import event_api_service
from event.models.event_model import Event


def _patch_compressed_urls_raise_file_not_found():
    """Симулирует отсутствие файла media при доступе к compressed URL."""
    error = FileNotFoundError(
        2,
        'No such file or directory',
        '/backend/media/event_cover/2026/09/08/missing.jpg',
    )
    return patch.multiple(
        Event,
        cover_compressed=PropertyMock(side_effect=error),
        cover_in_list_compressed=PropertyMock(side_effect=error),
        detail_cover_compressed=PropertyMock(side_effect=error),
        description_cover_compressed=PropertyMock(side_effect=error),
        actor_cover_compressed=PropertyMock(side_effect=error),
    )


@pytest.mark.django_db
def test_get_events_returns_only_enabled(
    api_client,
    main_page_event,
    disabled_event,
    event_without_main_page,
):
    """Список спектаклей отдаёт только is_enable=True."""
    response = async_to_sync(api_client.get)('/events/')

    assert response.status_code == 200
    data = response.json()
    slugs = {item['slug'] for item in data}

    assert main_page_event.slug in slugs
    assert event_without_main_page.slug in slugs
    assert disabled_event.slug not in slugs


@pytest.mark.django_db
def test_get_events_filter_show_on_main_page(
    api_client,
    main_page_event,
    event_without_main_page,
):
    """Фильтр show_on_main_page оставляет только спектакли для главной."""
    response = async_to_sync(api_client.get)(
        '/events/?show_on_main_page=true',
    )

    assert response.status_code == 200
    data = response.json()
    slugs = {item['slug'] for item in data}

    assert main_page_event.slug in slugs
    assert event_without_main_page.slug not in slugs


@pytest.mark.django_db
def test_get_events_missing_cover_file_does_not_break_api(
    api_client,
    event_with_missing_cover,
    event_without_main_page,
):
    """Отсутствующий файл обложки не ломает весь /api/events/."""
    with _patch_compressed_urls_raise_file_not_found():
        response = async_to_sync(api_client.get)('/events/')

    assert response.status_code == 200
    data = response.json()
    by_slug = {item['slug']: item for item in data}

    assert event_with_missing_cover.slug in by_slug
    assert event_without_main_page.slug in by_slug

    broken = by_slug[event_with_missing_cover.slug]
    assert broken['cover_compressed_url'] is None
    assert broken['cover_in_list_compressed_url'] is None
    assert broken['name'] == event_with_missing_cover.name


@pytest.mark.django_db
def test_get_events_service_missing_cover_returns_null_urls(
    event_with_missing_cover,
):
    """Сервис сериализует спектакль с битой обложкой без ValidationError."""
    with _patch_compressed_urls_raise_file_not_found():
        result = async_to_sync(event_api_service.get_events)()

    by_slug = {item.slug: item for item in result}
    event = by_slug[event_with_missing_cover.slug]

    assert event.cover_compressed_url is None
    assert event.cover_in_list_compressed_url is None


@pytest.mark.django_db
def test_get_event_by_slug_success(api_client, main_page_event):
    """Детальная карточка спектакля по slug."""
    response = async_to_sync(api_client.get)(
        f'/events/{main_page_event.slug}/'
    )

    assert response.status_code == 200
    data = response.json()
    assert data['event']['slug'] == main_page_event.slug
    assert data['event']['name'] == main_page_event.name
    assert 'peoples' in data
    assert 'images' in data


@pytest.mark.django_db
def test_get_event_by_slug_not_found(api_client):
    """Несуществующий slug возвращает 404."""
    response = async_to_sync(api_client.get)('/events/unknown-slug/')

    assert response.status_code == 404


@pytest.mark.django_db
def test_get_event_by_slug_missing_cover_files(
    api_client,
    event_with_missing_cover,
):
    """Отсутствующие файлы обложек в деталке отдаются как null."""
    with _patch_compressed_urls_raise_file_not_found():
        response = async_to_sync(api_client.get)(
            f'/events/{event_with_missing_cover.slug}/'
        )

    assert response.status_code == 200
    event = response.json()['event']

    assert event['cover_compressed_url'] is None
    assert event['detail_cover_compressed_url'] is None
    assert event['description_cover_compressed_url'] is None
    assert event['actor_cover_compressed_url'] is None
