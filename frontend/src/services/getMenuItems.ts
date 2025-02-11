import { apiClient } from '../api/client'

interface getMenuItemsResult {
    /* Массив элементов меню */
    menuItems: { href: string, title: string }[]
}


export async function getMenuItems(): Promise<getMenuItemsResult> {
    /* Получение списка элементов меню */
    const menuItems = [
        { href: '/#schedule', title: 'Афиша' },
        { href: '/#events', title: 'Спектакли' },
        { href: '/#contacts', title: 'Контакты' },
        { href: '/#partner', title: 'Партнеры' },
    ];

    // Инфо-блоки в меню
    const response = await apiClient.GET('/info/info_block/menu/list', {
        params: {
            query: {
                is_enable: true,
                in_menu: true
            }
        }
    });

    if (response.error) {
        console.log(response.error);
        // throw new Error('error'); //TODO
        return { menuItems };
    }

    if (response.data.length > 0) {
        response.data.map(item => (
            menuItems.push({
                href: `/#${item.menu_title_slug}`,
                title: item.menu_title
            })
        ));
    }

    return { menuItems }
}