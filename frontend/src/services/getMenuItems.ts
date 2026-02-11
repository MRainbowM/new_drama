import { getInfoBlocks } from './api/getInfoBlocks'
interface getMenuItemsResult {
    /* Массив элементов меню */
    menuItems: { href: string, title: string }[]
}


export async function getMenuItems(): Promise<getMenuItemsResult> {
    /* Получение списка элементов меню */
    const menuItems = [
        { href: '/#schedule', title: 'Афиша' },
        { href: '/events', title: 'Спектакли' },
        { href: '/#contacts', title: 'Контакты' },
        { href: '/#partner', title: 'Партнеры' },
    ];

    // Инфо-блоки в меню
    const { infoBlocks } = await getInfoBlocks({ in_menu: true });

    if (infoBlocks.length > 0) {
        infoBlocks.map(item => (
            menuItems.push({
                href: `/#${item.menu_title_slug}`,
                title: item.menu_title
            })
        ));
    }

    return { menuItems }
}