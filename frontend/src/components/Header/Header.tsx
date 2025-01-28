import styles from './Header.module.scss'
import Logo from 'public/images/nd.svg'
import Link from 'next/link'
import { apiClient } from '../../api/client'

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

    const middleIdx = Math.floor(menuItems.length / 2);
    const leftItems = menuItems.slice(0, middleIdx);
    const rightItems = menuItems.slice(middleIdx, menuItems.length);

    return (
        <header className={styles.root}>
            <div className={styles.menu}>
                <div className={styles.leftCol}>
                    {leftItems.map(item => (
                        <Link href={item.href}>
                            <span>{item.title}</span>
                        </Link>
                    ))}
                </div>
                <div className={styles.logo}>
                    <Link href='/'><Logo /></Link>
                </div>
                <div className={styles.rightCol}>
                    {rightItems.map(item => (
                        <Link href={item.href}>
                            <span>{item.title}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </header>
    );
}