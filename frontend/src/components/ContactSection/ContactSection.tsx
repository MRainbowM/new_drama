import { contactEmail, contactPhone, contactPhoneTitle, contactTicketBuy, socialIG, socialTG, socialVK } from '../../constants/links';
import styles from './ContactSection.module.scss'
import MapImg from 'public/images/map.png'
import Image from 'next/image'
import Link from 'next/link'

export default async function ContactSection() {
    return (
        <section className={styles.root} id="contacts">
            <div className={styles.circle}>

            </div>

            <div className={styles.header}>
                <h2>Контакты</h2>
            </div>

            <div className={styles.content}>

                <div className={styles.contacts}>

                    <div className={styles.item}>
                        <h3>Телефон</h3>

                        <div className={styles.dataRow}>
                            <a href={`tel:${contactPhone}`}>{contactPhoneTitle}</a>
                        </div>
                    </div>

                    <div className={styles.item}>
                        <h3>Адрес</h3>

                        <div className={styles.dataRow}>
                            <span className={styles.address}>Кожова 38, Иркутск, Россия, 664022</span>
                        </div>
                    </div>

                    <div className={styles.item}>
                        <h3>Написать нам</h3>

                        <div className={styles.dataRow}>
                            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
                        </div>
                    </div>

                    <div className={styles.item}>
                        <h3>Соц сети</h3>

                        <div className={styles.dataRow}>
                            <Link href={socialTG} target="__blank">
                                <span>Telegram</span>
                            </Link>
                            <Link href={socialIG} target="__blank">
                                <span>Inst</span>
                            </Link>
                            <Link href={socialVK} target="__blank">
                                <span>Vk</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <Link
                    href={contactTicketBuy}
                    className={styles.btn}
                    target="__blank"
                >
                    <span>Билеты</span>
                </Link>

            </div>

            <Image
                className={styles.map}
                src={MapImg.src}
                width={MapImg.width}
                height={MapImg.height}
                alt={'Иркутск, Кожова, 38'}
            />
        </section>
    );
}