import HeaderMenu from '../HeaderMenu/HeaderMenu'
import { getMenuItems } from '../../services/getMenuItems';

export default async function Header() {
    const { menuItems } = await getMenuItems();

    return (
        <HeaderMenu items={menuItems} />
    );
}