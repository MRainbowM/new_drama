from abc import ABC, abstractmethod
from typing import Any, Dict, Generic, List, Optional, Tuple, Type, TypeVar, Union
from uuid import UUID

from basis.schemas import PageSchema
from basis.utils.paginator import Paginator
from django.db import models
from django.db.models import Q, QuerySet

ModelType = TypeVar('ModelType', bound=models.Model)


class AbstractDBService(ABC, Generic[ModelType]):
    """
    Абстрактный сервис для работы с Django-моделями.
    """

    def __init__(self, model: Type[ModelType]) -> None:
        self.model = model

    @abstractmethod  # Обязательно переопределить в дочернем классе
    async def _get_filters(self, **kwargs) -> Q:
        """
        Абстрактный метод для получения QuerySet фильтров.
        Должен быть переопределен в дочернем классе.
        """
        filters = Q()
        return filters

    async def _get_select_related(self, **kwargs) -> List[str]:
        """
        Абстрактный метод для получения таблиц, 1-m, которые можно заджойнить.
        :return: Возвращает список строковых названий таблиц.
        """
        return []

    async def _get_prefetch_related(self, **kwargs) -> List[str]:
        """
        Абстрактный метод для получения prefetch_related, таблиц m-m.
        """
        return []

    async def _get_annotations_fields(self, **kwargs) -> Dict[str, Any]:
        """
        Возвращает вычисляемые поля (аннотации), которые нужно добавить в QuerySet.

        Пример:
            return {"has_media": Exists(MediaTag.objects.filter(tag_id=OuterRef("pk")))}

        Важно:
        - Эти поля добавляются через annotate(**annotations_fields)
        - Их нельзя передавать в only(), поэтому базовый сервис автоматически
          исключит их из return_fields перед вызовом only()
        """
        return {}

    def _apply_annotations_fields(
            self,
            queryset: QuerySet[ModelType],
            annotations_fields: Dict[str, Any],
            return_fields: List[str],
    ) -> Tuple[QuerySet[ModelType], List[str]]:
        """
        Универсально добавляет annotations_fields в SQL (annotate) и возвращает безопасный
        список return_fields для only() (без имён аннотаций).

        :param queryset: QuerySet.
        :param annotations_fields: Вычисляемые поля.
        :param return_fields: Возвращаемые поля.
        :return: Tuple[QuerySet[ModelType], List[str]].
        :raise ValueError: Если annotations_fields пустой.
        """
        if not annotations_fields:
            return queryset, return_fields

        queryset = queryset.annotate(**annotations_fields)
        safe_return_fields = [
            f for f in return_fields if f not in annotations_fields]

        # Если в return_fields были только аннотации — оставим хотя бы pk,
        # чтобы only() не ломался и модель могла корректно материализоваться.
        if not safe_return_fields:
            safe_return_fields = ['id']

        return queryset, safe_return_fields

    async def _exclude(self, queryset: QuerySet[ModelType], **kwargs) -> QuerySet:
        """
        Абстрактный метод, который исключает строки по значение параметров.
        """
        return queryset

    async def _filter_queryset(
            self,
            return_fields: Optional[List[str]] = None,
            order_by: Union[List[str], str] = None,
            **kwargs,
    ) -> QuerySet[ModelType]:
        """
        Возвращает отфильтрованный QuerySet.
        """
        if return_fields is None:
            return_fields = ['id']

        filters = await self._get_filters(**kwargs)

        # Фильтрация
        queryset = self.model.objects.filter(filters)

        # Исключения
        queryset = await self._exclude(queryset=queryset, **kwargs)

        # Присоединение таблиц
        select_related_array = await self._get_select_related(**kwargs)
        if select_related_array:
            queryset = queryset.select_related(*select_related_array)

        prefetch_related_array = await self._get_prefetch_related(**kwargs)
        if prefetch_related_array:
            queryset = queryset.prefetch_related(*prefetch_related_array)

        # Вычисляемые поля (аннотации) — должны быть добавлены до сортировки,
        # чтобы можно было order_by по ним.
        annotations_fields = await self._get_annotations_fields(
            return_fields=return_fields,
            order_by=order_by,
            **kwargs,
        )
        queryset, return_fields = self._apply_annotations_fields(
            queryset=queryset,
            annotations_fields=annotations_fields,
            return_fields=return_fields,
        )

        # Сортировка
        if order_by is not None:
            if isinstance(order_by, str):
                order_by = [order_by]
            queryset = queryset.order_by(*order_by)

        # Получение только запрашиваемых полей
        queryset = queryset.only(*return_fields)

        return queryset

    async def get_by_id(self, object_id: UUID, **kwargs) -> Optional[ModelType]:
        """
        Получение объекта по ID с применением фильтров.
        """

        queryset = await self._filter_queryset(**kwargs)
        return await queryset.filter(id=object_id).afirst()

    async def exists(self, **kwargs) -> bool:
        """
        Проверяет, существует ли объект по фильтрам.
        """
        queryset = await self._filter_queryset(**kwargs)
        return await queryset.aexists()

    async def get_list(self, **kwargs) -> List[ModelType]:
        """
        Получает список объектов.
        """
        queryset = await self._filter_queryset(**kwargs)
        queryset = queryset.distinct()  # Убрать дубликаты
        return [obj async for obj in queryset]

    async def get_page_with_paginator(
            self,
            size: Optional[int] = 50,
            page: Optional[int] = 1,
            **kwargs,
    ) -> PageSchema:
        """
        Возвращает страницу с объектами и информацией о пагинации.

        :param size: Кол-во записей на странице.
        :param page: Номер страницы.
        """
        paginator = Paginator(size=size, page=page)

        queryset = await self._filter_queryset(
            **kwargs
        )
        queryset = queryset.distinct()  # Убрать дубликаты

        return await paginator.paginate(data=queryset)

    async def get_count(self, **kwargs) -> int:
        """
        Возвращает количество объектов после фильтрации.
        """
        queryset = await self._filter_queryset(**kwargs)

        return await queryset.distinct().acount()

    async def get_first(self, **kwargs) -> Optional[ModelType]:
        """
        Возвращает первый объект после фильтрации.
        """
        queryset = await self._filter_queryset(**kwargs)
        return await queryset.afirst()
