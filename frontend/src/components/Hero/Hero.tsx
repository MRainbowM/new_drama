import styles from './Hero.module.scss'
import NDlarge from 'public/images/hero_2.svg?url'
import NDsmall from 'public/images/hero_m.svg?url'


export default function Hero() {
    const videoPath = `${process.env.BACKEND_STATIC_URL}/video/hero.mp4`;

    return (
        <div className={styles.root}>
            <div className={styles.mainVideo} >
                <video
                    className={styles.bgVideo}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    aria-label="Video player"
                    style={{
                        '--mask-large': `url(${NDlarge.src})`,
                        '--mask-small': `url(${NDsmall.src})`,
                    } as React.CSSProperties}
                >

                    <source src={videoPath} type="video/mp4" />
                </video>
            </div>
        </div>
    )
}