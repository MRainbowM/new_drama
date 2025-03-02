import styles from './Hero.module.scss'
import NDlarge from 'public/images/hero_2.svg?url'
import NDsmall from 'public/images/hero_m.svg?url'
import PosterImg from 'public/images/hero_poster.png'


export default function Hero() {
    const videoPath = `${process.env.BACKEND_STATIC_URL}/video/hero.mp4`;
    const videoPathMobile = `${process.env.BACKEND_STATIC_URL}/video/hero_mobile.mp4`;

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
                    poster={PosterImg.src}
                    style={{
                        '--mask-large': `url(${NDlarge.src})`,
                        '--mask-small': `url(${NDsmall.src})`,
                    } as React.CSSProperties}

                    controls
                >
                    <source src="/api/video?is_mobile=true" type="video/mp4" media="(max-width:700px)"  />
                    <source src="/api/video?is_mobile=false" type="video/mp4"  />
{/*                         
                    <source src={videoPathMobile} type="video/mp4" media="(max-width:700px)" />
                    <source src={videoPath} type="video/mp4" /> */}
                </video>
            </div>
        </div>
    )
}