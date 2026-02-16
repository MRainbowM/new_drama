from abc import ABC, abstractmethod
from typing import Any, Dict, Generic, List, Optional, Type, TypeVar, Union
from uuid import UUID

from asgiref.sync import sync_to_async
from basis.schemas import PageSchema
from basis.utils.paginator import Paginator
from django.core.files.storage import default_storage
from django.db import models
from django.db.models import Q, QuerySet
from ninja import Schema
from ninja.files import UploadedFile

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

    async def create(
            self,
            data: Union[Dict[str, Any], Schema],
            exclude_none: bool = False
    ) -> ModelType:
        """
        Создает объект.
        :param data: Словарь / Схема с данными объекта.
        :param exclude_none: Исключать ли поля со значением None.
        :return: Созданный объект.
        """
        if isinstance(data, Schema):
            data = data.dict(
                exclude_unset=True,
                exclude_none=exclude_none
            )

        return await self.model.objects.acreate(**data)

    async def delete(self, object_id: UUID) -> None:
        """
        Удаляет объект по ID.
        """
        await self.model.objects.filter(id=object_id).adelete()

    async def delete_by_filters(self, **kwargs) -> None:
        """
        Удаляет объекты по фильтрам.
        """
        queryset = await self._filter_queryset(**kwargs)
        await queryset.adelete()

    async def update_by_id(
            self,
            object_id: UUID,
            data: Union[Dict[str, Any], Schema],
            exclude_none: bool = False
    ) -> bool:
        """
        Обновляет объект по ID.

        :param object_id: ID изменяемого объекта.
        :param data: Схема с новыми данными объекта.
        :param exclude_none: Исключать ли поля со значением None.
        :return: Обновлен ли объект.
        """
        if isinstance(data, Schema):
            update_data = data.dict(
                exclude_unset=True,
                exclude_none=exclude_none
            )
        else:
            if exclude_none is True:
                data = {k: v for k, v in data.items() if v is not None}

            update_data = data

        count_updated = await self.model.objects.filter(
            id=object_id
        ).aupdate(**update_data)

        return bool(count_updated)

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

    async def upload_file(
            self,
            instance: ModelType,
            file: UploadedFile,
            field_name: str,
            delete_old_file: bool = False
    ) -> ModelType:
        """
        Загрузка файла.

        :param instance: Объект, в который будет загружен файл.
        :param file: Загружаемый файл.
        :param field_name: Название поля, в которое будет загружен файл.
        :param delete_old_file: Удалять ли старый файл.
        :return: Путь к загруженному файлу.
        """
        old_file_path = getattr(instance, field_name)

        if old_file_path and delete_old_file:
            try:
                await sync_to_async(default_storage.delete)(old_file_path)
            except Exception as e:
                print(f'Ошибка при удалении файла {old_file_path}: {e}')

        try:
            setattr(instance, field_name, file)
            await instance.asave()
        except Exception as e:
            print(f'Ошибка при сохранении файла {file.name}: {e}')

        return instance

    async def delete_file(
            self,
            instance: ModelType,
            field_name: str,
            delete_from_disk: bool = True
    ) -> None:
        """
        Удаление файла.

        :param instance: Объект, из которого будет удален файл.
        :param field_name: Название поля, из которого будет удален файл.
        :param delete_from_disk: Удалять ли файл с диска.
        """
        file_path = getattr(instance, field_name)

        if file_path and delete_from_disk is True:
            try:
                await sync_to_async(default_storage.delete)(file_path)
            except Exception as e:
                print(f'Ошибка при удалении файла {file_path}: {str(e)}')

        setattr(instance, field_name, None)
        await instance.asave()
