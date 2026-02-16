import math
from typing import Sequence, TypeVar, Union, Optional

from django.db.models import QuerySet

from ..schemas import PageSchema

T = TypeVar('T')


class Paginator:
    """
    Универсальный пагинатор, работающий как с QuerySet, так и с последовательностями (list, tuple).
    """
    __slots__ = ['offset', 'limit', 'page', 'size']

    def __init__(self, page: Optional[int] = 1, size: Optional[int] = 50):
        # Устанавливаем параметры страницы и смещения
        self.page = max(page, 1)  # Текущая страница
        self.size = max(size, 1)  # Количество элементов на странице
        self.offset = (page - 1) * size  # Смещение в выборке
        self.limit = page * size  # Граница среза в выборке

    async def paginate_queryset(self, queryset: QuerySet) -> PageSchema:
        count = await queryset.acount()  # Общее количество записей
        count_page = math.ceil(count / self.size)  # Количество страниц
        page_qs = queryset[self.offset:self.limit]  # Срез по текущей странице

        return PageSchema[T].model_validate({
            'data': [obj async for obj in page_qs],
            'count': count,
            'count_page': count_page,
            'page': self.page,
            'size': self.size,
        })

    def _paginate_sequence(self, items: Sequence[T]) -> Sequence[T]:
        """
        Делает срез последовательности по текущей странице.
        """
        return items[self.offset:self.limit]

    def paginate_sequence(self, items: Sequence[T]) -> PageSchema[T]:
        """
        Пагинация для обычных последовательностей.
        """
        paginated = self._paginate_sequence(items)
        count = len(items)
        count_page = math.ceil(count / self.size)

        return PageSchema[T].model_validate({
            'data': paginated,
            'count': count,
            'count_page': count_page,
            'page': self.page,
            'size': self.size,
        })

    async def paginate(
            self,
            data: Union[QuerySet[T], Sequence[T]]
    ) -> PageSchema[T]:
        """
        Универсальный метод, определяет тип данных и вызывает нужную пагинацию.
        """
        if isinstance(data, QuerySet):
            return await self.paginate_queryset(data)
        if isinstance(data, Sequence):
            return self.paginate_sequence(data)

        raise TypeError(f'Unsupported data type for pagination: {type(data)}')
