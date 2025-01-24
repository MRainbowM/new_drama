import VK from 'public/images/vk.svg'
import TG from 'public/images/tg.svg'
import IG from 'public/images/ig.svg'
import Link from 'next/link'
import { socialIG, socialTG, socialVK } from '../../constants/links'
import styles from './ViewerText.module.scss'

export default function ViewerText() {
    return (
        <div className={styles.root}>
            <span>Подписывайтесь и отмечайте нас в соц сетях, чтобы ваше фото попало на сайт ❤️</span>
            <div className={styles.social}>
                <Link
                    className={styles.link}
                    href={socialVK}
                    target='_blank'
                ><VK /></Link>
                <Link
                    className={styles.link}
                    href={socialTG}
                    target='_blank'
                ><TG /></Link>
                <Link
                    className={styles.link}
                    href={socialIG}
                    target='_blank'
                ><IG /></Link>
            </div>
        </div>
    );
}