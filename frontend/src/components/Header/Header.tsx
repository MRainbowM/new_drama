import styles from './Header.module.scss'
import { apiClient } from '../../api/client'
import HeaderMenu from '../HeaderMenu/HeaderMenu'

export default async function Header() {
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
        throw new Error('error'); //TODO
    }

    const menuItems = [
        { href: '/#schedule', title: 'Афиша' },
        { href: '/#events', title: 'Спектакли' },
        { href: '/#contacts', title: 'Контакты' },
        { href: '/#partner', title: 'Партнеры' },
    ];

    if (response.data.length > 0) {
        response.data.map(item => (
            menuItems.push({
                href: `/#${item.menu_title_slug}`,
                title: item.menu_title
            })
        ));
    }

    return (
        <HeaderMenu items={menuItems} />
    );
}