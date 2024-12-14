import styles from './Hero.module.scss'
import MainImg from 'public/static/images/main.jpeg'
import Image from 'next/image'
import ND from 'public/static/images/Hero.svg'
import TitleNew from 'public/static/images/hero_1.svg'
import TitleDrama from 'public/static/images/hero_2.svg'

export default function Hero() {
    return (
        <div className={styles.root}>
            <div className={styles.mainImage}>
                <Image

                    src={MainImg.src}
                    width={MainImg.width}
                    height={MainImg.height}
                    alt='Новая драма'
                />
            </div>
            <div className={styles.title}>
                {/* <h1>Новая драма</h1> */}
                {/* <ND /> */}
                <TitleNew style={{ marginRight: '-50%' }} />
                <TitleDrama style={{ marginLeft: '-50%' }} />
            </div>


        </div>
    )
}