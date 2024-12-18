import styles from './Hero.module.scss'
import TitleNew from 'public/static/images/hero_1.svg'
import TitleDrama from 'public/static/images/hero_2.svg'

export default function Hero() {
    return (
        <div className={styles.root}>
            <div className={styles.mainVideo}>
                <video autoPlay muted loop preload="auto" aria-label="Video player">
                    <source src='http://0.0.0.0:8011/static/video/hero.MP4' type="video/mp4" />
                </video>

            </div>
            <div className={styles.title}>
                <TitleNew style={{ marginRight: '-50%' }} />
                <TitleDrama style={{ marginLeft: '-50%' }} />
            </div>
        </div>
    )
}