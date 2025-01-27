import styles from './Header.module.scss'
import Logo from 'public/images/nd.svg'
import Link from 'next/link'

export default function Header() {
    const menuItems = [
        { href: '/#schedule', title: 'Афиша' },
        { href: '/#events', title: 'Спектакли' },
        { href: '/#contacts', title: 'Контакты' },
        { href: '/', title: 'Ресторан' },
        { href: '/', title: 'Аренда' },
        { href: '/#partner', title: 'Партнеры' },
    ];
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