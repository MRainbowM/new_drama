import styles from './Hero.module.scss'
import NDlarge from 'public/static/images/hero_2.svg?url'
import NDsmall from 'public/static/images/hero_1.svg?url'


export default function Hero() {
    return (
        <div className={styles.root}>
            <div className={styles.mainVideo} >
                <video
                    className={styles.bgVideo}
                    autoPlay
                    muted
                    loop
                    preload="auto"
                    aria-label="Video player"
                    style={{
                        '--mask-large': `url(${NDlarge.src})`,
                        '--mask-small': `url(${NDsmall.src})`,
                    } as React.CSSProperties}
                >
                    <source src='http://0.0.0.0:8011/static/video/hero.MP4' type="video/mp4" />
                </video>
            </div>
        </div>
    )
}