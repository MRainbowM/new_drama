import styles from './EventListSection.module.scss'

import Image from 'next/image'
import Img from 'public/static/images/pp-67.jpg'


export default function EventListSection(

) {
    return (
        <section className={styles.root}>

            <h2>Все спектакли</h2>

            <div className={styles.list}>
                <div className={styles.item}
                    style={{ backgroundImage: `url(${Img.src})` }}
                >

                    <span className={styles.title}>
                        Метод Гронхольма
                    </span>
                    <span className={styles.description}>
                        Смешная история о страшном
                    </span>
                    <div className={styles.btn}>
                        <span>О спектакле</span>
                    </div>

                </div>
            </div>

        </section >
    );
}