import HeaderMenu from '../HeaderMenu/HeaderMenu'
import { isNewYearTheme } from '../../constants/newYear';

interface HeaderProps {
    /* Массив элементов меню */
    menuItems: { href: string, title: string }[]
}

export default async function Header(
    { menuItems }: HeaderProps
) {
    return (
        <HeaderMenu items={menuItems} isNewYearTheme={isNewYearTheme} />
    );
}