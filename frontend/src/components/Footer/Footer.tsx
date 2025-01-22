import styles from './Footer.module.scss'
import Link from 'next/link'
import VK from 'public/images/vk.svg'
import TG from 'public/images/tg.svg'
import IG from 'public/images/ig.svg'
import YT from 'public/images/yt.svg'

export default async function Footer() {
    return (
        <footer className={styles.root}>
            <div className={styles.name}>
                <span>Театр Новая Драма</span>
            </div>

            <div className={styles.menu}>
                <a href="/#schedule">Афиша</a>
                <a href="/#events">Спектакли</a>
                <a href="/#contacts">Контакты</a>
            </div>

            <div className={styles.contacts}>
                <div className={styles.address}>
                    <span>Иркутск, Кожова, 38</span>
                </div>
                <div className={styles.phone}>
                    <a href="tel:+79245303336">+7 (924) 530-33-36</a>
                </div>
                <div className={styles.email}>
                    <a href="mailto:novaya-drama@yandex.ru">novaya-drama@yandex.ru</a>
                </div>
                <div className={styles.social}>
                    <Link
                        className={styles.link}
                        href={'https://vk.com/novayadrama'}
                        target='_blank'
                    ><VK /></Link>
                    <Link
                        className={styles.link}
                        href={'https://t.me/novayadrama'}
                        target='_blank'
                    ><TG /></Link>
                    <Link
                        className={styles.link}
                        href={'https://www.instagram.com/novaya_drama_irkutsk'}
                        target='_blank'
                    ><IG /></Link>
                    <Link
                        className={styles.link}
                        href={'https://www.youtube.com/channel/UCVrDmCTXE3vJpFqJja7rwEQ'}
                        target='_blank'
                    ><YT /></Link>
                </div>
            </div>
        </footer>
    );
}