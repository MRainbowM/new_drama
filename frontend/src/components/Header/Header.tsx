import HeaderMenu from '../HeaderMenu/HeaderMenu'
import { getMenuItems } from '../../services/getMenuItems';

interface HeaderProps {
    /* Массив элементов меню */
    menuItems: { href: string, title: string }[]
}

export default async function Header(
    { menuItems }: HeaderProps
) {
    return (
        <HeaderMenu items={menuItems} />
    );
}