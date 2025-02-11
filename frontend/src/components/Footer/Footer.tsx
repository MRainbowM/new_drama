import styles from './Footer.module.scss'
import Link from 'next/link'
import VK from 'public/images/vk.svg'
import TG from 'public/images/tg.svg'
import IG from 'public/images/ig.svg'
import YT from 'public/images/yt.svg'
import { contactEmail, contactPhone, contactPhoneTitle, socialIG, socialTG, socialVK, socialYT } from '../../constants/links'
import Logo from 'public/images/nd.svg'

interface FooterProps {
    /* Массив элементов меню */
    menuItems: { href: string, title: string }[]
}


export default async function Footer(
    { menuItems }: FooterProps
) {
    return (
        <footer className={styles.root}>
            <div className={styles.left}>
                <div className={styles.name}>
                    <Logo />
                    <span>Театр Новая Драма</span>
                </div>

                <div className={styles.menu}>
                    {menuItems.map((item, index) => (
                        <Link href={item.href} key={index}>
                            <span>{item.title}</span>
                        </Link>
                    ))}
                </div>

            </div>
            <div className={styles.right}>
                <div className={styles.contacts}>
                    <div className={styles.container}>
                        <div className={styles.address}>
                            <span>Иркутск, Кожова, 38</span>
                        </div>
                        <div className={styles.email}>
                            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
                        </div>
                        <div className={styles.phone}>
                            <a href={`tel:${contactPhone}`}>{contactPhoneTitle}</a>
                        </div>
                    </div>

                </div>

                <div className={styles.social}>
                    <div className={styles.container}>
                        <span>Мы в социальных сетях</span>
                        <div className={styles.icons}>
                            <Link
                                href={socialYT}
                                target='_blank'
                            ><YT /></Link>
                            <Link
                                href={socialIG}
                                target='_blank'
                            ><IG /></Link>
                            <Link
                                href={socialTG}
                                target='_blank'
                            ><TG /></Link>
                            <Link
                                href={socialVK}
                                target='_blank'
                            ><VK /></Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.row}>
                <span>© 2022 Новая Драма</span>
            </div>

        </footer>
    );
}