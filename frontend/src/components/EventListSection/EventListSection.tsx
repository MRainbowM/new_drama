import styles from './EventListSection.module.scss'
import { apiClient } from '../../api/client'
import Image from 'next/image'
import Img from 'public/static/images/pp-67.jpg'


export default async function EventListSection(


) {
    // Репертуар
    const response = await apiClient.GET('/api/event/event/list', {
        params: {
            query: {
                is_enable: true
            }
        }
    });

    if (response.error) {
        console.log(response.error);
        throw new Error('error'); //TODO
    }
    return (
        <section className={styles.root}>

            <h2>Все спектакли</h2>

            <div className={styles.list}>


                {response.data.map((item, key) => (
                    <div className={styles.item}
                        style={{ backgroundImage: `url(http://0.0.0.0:8011/${item.preview_cover})` }}
                        key={key}
                    >
                        <div className={styles.text}>
                            <div className={styles.leftCol}>
                                <span className={styles.title}>
                                    {item.name}
                                </span>
                                <span className={styles.description}>
                                    Смешная история о страшном
                                </span>
                            </div>
                            <div className={styles.rightCol}>
                                <span>
                                    Драматург: Наталья Милантьева
                                </span>
                                <span>
                                    Режиссер: Вадим Карионов
                                </span>
                            </div>
                        </div>
                        <div className={styles.btn}>
                            <span>О спектакле</span>
                        </div>
                    </div>

                ))}


            </div>

        </section >
    );
}