import styles from './ViewerList.module.scss'
import { components } from '../../api/schema'
import VK from 'public/images/vk.svg'
import TG from 'public/images/tg.svg'
import IG from 'public/images/ig.svg'
import Link from 'next/link'
import { socialIG, socialTG, socialVK } from '../../constants/social'


interface ViewerListProps {
    viewerList: components['schemas']['ViewerOutSchema'][]
}


export default function ViewerList(
    { viewerList }: ViewerListProps
) {
    return (
        <div className={styles.root}>
            <div className={styles.text}>
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
            <div className={styles.slider}>

            </div>

        </div>
    );
}