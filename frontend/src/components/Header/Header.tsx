import styles from './Header.module.scss'
import Logo from 'public/images/nd.svg'
import Link from 'next/link'

export default function Header() {
    return (
        <header className={styles.root}>
            <div className={styles.menu}>
                <div className={styles.leftCol}>
                    <Link href='/#schedule'>
                        <span>Афиша</span>
                    </Link>
                    <Link href='/#events'>
                        <span>Спектакли</span>
                    </Link>
                    <Link href='/#contacts'>
                        <span>Контакты</span>
                    </Link>
                </div>
                <div className={styles.logo}>
                    <Link href='/'><Logo /></Link>
                </div>
                <div className={styles.rightCol}>

                </div>
            </div>
        </header>
    );
}