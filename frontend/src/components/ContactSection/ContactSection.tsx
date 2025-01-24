import { contactEmail, contactPhone, contactPhoneTitle, socialIG, socialTG, socialVK } from '../../constants/links';
import styles from './ContactSection.module.scss'


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
                            <a href={socialTG} target="__blank">Telegram</a>
                            <a href={socialIG} target="__blank">Inst</a>
                            <a href={socialVK} target="__blank">Vk</a>
                        </div>
                    </div>

                </div>

                <div className={styles.btn}>
                    <span>Билеты</span>
                </div>

            </div>
        </section>
    );
}