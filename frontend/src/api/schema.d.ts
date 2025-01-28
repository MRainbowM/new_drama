/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/event/event_show/list": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Получить список спектаклей в афише */
        get: operations["event_api_get_event_show_list"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/event/program": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Получить программку спектакля по текущей дате */
        get: operations["event_api_get_event_program_by_date"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/event/event/list": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Получить список всех спектаклей: репертуар */
        get: operations["event_api_get_event_list"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/event/event/{slug}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Получить данные спектакля по slug */
        get: operations["event_api_get_event_by_slug"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/people/list": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Получить список людей театра */
        get: operations["people_api_get_people_list"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/people/{slug}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Получить данные человека по slug */
        get: operations["people_api_get_people_by_slug"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/info/info_block/list": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Получить список инфо-блоков */
        get: operations["info_api_get_info_block_list"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/info/info_block/menu/list": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Получить список инфо-блоков в меню */
        get: operations["info_api_get_menu_info_block_list"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/info/viewer/list": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Получить список зрителей */
        get: operations["info_api_get_viewer_list"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/info/partner/list": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Получить список партнеров */
        get: operations["info_api_get_partner_list"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        /** EventShowFilterSchema */
        EventShowFilterSchema: {
            /** Start At  Gte */
            start_at__gte?: string | null;
            /** Start At  Lte */
            start_at__lte?: string | null;
            /** Start At  Month  Gte */
            start_at__month__gte?: number | null;
            /** Start At  Year  Gte */
            start_at__year__gte?: number | null;
            /** Is Enable */
            is_enable?: boolean | null;
        };
        /** EventPreviewSchema */
        EventPreviewSchema: {
            dramatist: components["schemas"]["PeoplePreviewSchema"] | null;
            producer: components["schemas"]["PeoplePreviewSchema"] | null;
            /** ID */
            id?: number | null;
            /** Название спектакля */
            name: string;
            /** Слаг названия */
            slug: string;
            /** Краткое описание */
            short_description: string;
            /**
             * Обложка спектакля
             * @description Изображение в списке спектаклей
             */
            cover: string;
            /**
             * Обложка в афише
             * @description Изображение курсора при наведении на спектакль в афише
             */
            preview_cover: string;
            /**
             * Возрастное ограничение
             * @description Минимальный разрешенный возраст зрителя, например, 18 лет
             * @default 0
             */
            min_age_limit: number;
        };
        /** EventShowOutSchema */
        EventShowOutSchema: {
            /** Id */
            id: number;
            event: components["schemas"]["EventPreviewSchema"];
            /**
             * Start At
             * Format: date-time
             */
            start_at: string;
            /** Is Premiere */
            is_premiere: boolean;
            /** Link To Buy Ticket */
            link_to_buy_ticket: string;
        };
        /** PeoplePreviewSchema */
        PeoplePreviewSchema: {
            /** ID */
            id?: number | null;
            /** Имя */
            first_name: string;
            /** Фамилия */
            last_name: string;
            /** Слаг имени */
            slug: string;
            /**
             * Тег
             * @description Фильтр на странице "Коллектив"
             */
            tag?: string | null;
            /**
             * Фотография
             * @default
             */
            photo: string | null;
        };
        /** EventProgramSchema */
        EventProgramSchema: {
            /**
             * Программка спектакля
             * @description PDF файл с программой спектакля
             * @default
             */
            program_pdf: string | null;
            /** Название спектакля */
            name: string;
        };
        /** EventFilterSchema */
        EventFilterSchema: {
            /** Is Enable */
            is_enable?: boolean | null;
        };
        /** EventDetailSchema */
        EventDetailSchema: {
            /** Peoples */
            peoples: components["schemas"]["EventPeopleOutSchema"][];
            /** Images */
            images: components["schemas"]["EventImageOutSchema"][];
            /** ID */
            id?: number | null;
            /** Название спектакля */
            name: string;
            /** Слаг названия */
            slug: string;
            /** Краткое описание */
            short_description: string;
            /**
             * Обложка спектакля
             * @description Изображение в списке спектаклей
             */
            cover: string;
            /**
             * Обложка в афише
             * @description Изображение курсора при наведении на спектакль в афише
             */
            preview_cover: string;
            /**
             * Возрастное ограничение
             * @description Минимальный разрешенный возраст зрителя, например, 18 лет
             * @default 0
             */
            min_age_limit: number;
            /**
             * Подробное описание
             * @default
             */
            description: string | null;
            /**
             * Длительность спектакля
             * Format: duration
             */
            duration: string;
            /**
             * Есть антракт
             * @default false
             */
            has_intermission: boolean;
            /**
             * Дата премьеры
             * Format: date
             */
            premiere_at: string;
        };
        /** EventImageOutSchema */
        EventImageOutSchema: {
            /** ID */
            id?: number | null;
            /** Фото */
            image: string;
        };
        /** EventPeopleOutSchema */
        EventPeopleOutSchema: {
            people: components["schemas"]["PeoplePreviewSchema"];
            /** ID */
            id?: number | null;
            /**
             * Тег
             * @description Раздел в карточке спектакля, в котором будет отображаться участник
             */
            tag: string;
            /**
             * Роль участника в спектакле
             * @description Если участник - актер: указать имя персонажа. Если участник выполняет другую роль, например, художник - нужно указать "художник"
             * @default
             */
            role: string | null;
            /**
             * Сортировка
             * @default 0
             */
            sort: number;
        };
        /** PeopleDetailSchema */
        PeopleDetailSchema: {
            /** ID */
            id?: number | null;
            /** Имя */
            first_name: string;
            /** Фамилия */
            last_name: string;
            /** Слаг имени */
            slug: string;
            /**
             * Тег
             * @description Фильтр на странице "Коллектив"
             */
            tag?: string | null;
            /**
             * Фотография
             * @default
             */
            photo: string | null;
            /**
             * Описание
             * @default
             */
            description: string | null;
            /** Дата рождения */
            birthday?: string | null;
            /**
             * Должность
             * @default
             */
            position: string | null;
            /**
             * Образование
             * @default
             */
            education: string | null;
        };
        /** InfoBlockFilterSchema */
        InfoBlockFilterSchema: {
            /** Is Enable */
            is_enable?: boolean | null;
            /** In Menu */
            in_menu?: boolean | null;
        };
        /** InfoBlockOutSchema */
        InfoBlockOutSchema: {
            /** ID */
            id?: number | null;
            /** Заголовок */
            title: string;
            /** Текст */
            content: string;
            /**
             * Текст кнопки действия
             * @description Текст будет отображаться внутри кнопки. Примеры: "написать в telegram", "перейти на сайт"
             */
            btn_text: string;
            /**
             * Ссылка кнопки
             * @description Ресурс, на который будет перенаправлен пользователь при клике по кнопке
             */
            btn_link: string;
            /**
             * Обложка
             * @description Картинка инфо-блока
             */
            cover: string;
            /** Якорная ссылка */
            menu_title_slug: string;
        };
        /** MenuInfoBlockOutSchema */
        MenuInfoBlockOutSchema: {
            /** ID */
            id?: number | null;
            /**
             * Заголовок в меню
             * @description Текст якорной ссылки, который будет отображаться в меню (хедере)
             */
            menu_title: string;
            /** Якорная ссылка */
            menu_title_slug: string;
        };
        /** ViewerFilterSchema */
        ViewerFilterSchema: {
            /** Is Enable */
            is_enable?: boolean | null;
        };
        /** ViewerOutSchema */
        ViewerOutSchema: {
            /** ID */
            id?: number | null;
            /**
             * Фотография
             * @description Изображение на главной
             */
            image: string;
            /**
             * Никнейм
             * @default
             */
            nickname: string | null;
        };
        /** PartnerFilterSchema */
        PartnerFilterSchema: {
            /** Is Enable */
            is_enable?: boolean | null;
        };
        /** PartnerOutSchema */
        PartnerOutSchema: {
            /** ID */
            id?: number | null;
            /** Название */
            name: string;
            /**
             * Логотип
             * @description Логотип компании на главной
             */
            logo: string;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    event_api_get_event_show_list: {
        parameters: {
            query?: {
                start_at__gte?: string | null;
                start_at__lte?: string | null;
                start_at__month__gte?: number | null;
                start_at__year__gte?: number | null;
                is_enable?: boolean | null;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["EventShowOutSchema"][];
                };
            };
        };
    };
    event_api_get_event_program_by_date: {
        parameters: {
            query?: {
                event_date?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["EventProgramSchema"];
                };
            };
        };
    };
    event_api_get_event_list: {
        parameters: {
            query?: {
                is_enable?: boolean | null;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["EventPreviewSchema"][];
                };
            };
        };
    };
    event_api_get_event_by_slug: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                slug: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["EventDetailSchema"];
                };
            };
        };
    };
    people_api_get_people_list: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PeoplePreviewSchema"][];
                };
            };
        };
    };
    people_api_get_people_by_slug: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                slug: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PeopleDetailSchema"];
                };
            };
        };
    };
    info_api_get_info_block_list: {
        parameters: {
            query?: {
                is_enable?: boolean | null;
                in_menu?: boolean | null;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["InfoBlockOutSchema"][];
                };
            };
        };
    };
    info_api_get_menu_info_block_list: {
        parameters: {
            query?: {
                is_enable?: boolean | null;
                in_menu?: boolean | null;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MenuInfoBlockOutSchema"][];
                };
            };
        };
    };
    info_api_get_viewer_list: {
        parameters: {
            query?: {
                is_enable?: boolean | null;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ViewerOutSchema"][];
                };
            };
        };
    };
    info_api_get_partner_list: {
        parameters: {
            query?: {
                is_enable?: boolean | null;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PartnerOutSchema"][];
                };
            };
        };
    };
}
