import styles from './Footer.module.scss'
import Link from 'next/link'
import VK from 'public/images/vk.svg'
import TG from 'public/images/tg.svg'
import IG from 'public/images/ig.svg'
import YT from 'public/images/yt.svg'
import { contactEmail, contactPhone, contactPhoneTitle, socialIG, socialTG, socialVK, socialYT } from '../../constants/links'

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
                    <a href={`tel:${contactPhone}`}>{contactPhoneTitle}</a>
                </div>
                <div className={styles.email}>
                    <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
                </div>
                <div className={styles.social}>
                    <Link
                        href={socialVK}
                        target='_blank'
                    ><VK /></Link>
                    <Link
                        href={socialTG}
                        target='_blank'
                    ><TG /></Link>
                    <Link
                        href={socialIG}
                        target='_blank'
                    ><IG /></Link>
                    <Link
                        href={socialYT}
                        target='_blank'
                    ><YT /></Link>
                </div>
            </div>
        </footer>
    );
}