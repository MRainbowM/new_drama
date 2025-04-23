import styles from './ContactsSection.module.scss';
import clsx from "clsx";
import Link from 'next/link';
import { contactEmail, contactPhone, contactPhoneTitle, contactTicketBuy, socialIG, socialTG, socialVK, socialYT } from '../../constants/links';
import picture1 from 'public/images/contacts-1.png';
import picture2 from 'public/images/contacts-2.png';
import picture3 from 'public/images/contacts-3.png';
import picture4 from 'public/images/contacts-4.png';
import Image from 'next/image';


export default async function ContactsSection() {

    return (
        <section className={styles.root} id="contacts">
            <h2>Контакты</h2>

            <div className={styles.grid}>
                <div className={styles.row}>
                    <span className={styles.key}>Адрес</span>
                    <span className={styles.value}>
                        Кожова 38, Иркутск
                    </span>
                </div>

                <div className={clsx(styles.row, styles.phoneRow)}>
                    <span className={styles.key}>Телефон</span>
                    <span className={styles.value}>
                        <a href={`tel:${contactPhone}`}>{contactPhoneTitle}</a>
                    </span>
                </div>

                <div className={clsx(styles.row, styles.socialRow)}>
                    <span className={styles.key}>Социальные сети</span>
                    <span className={clsx(styles.value, styles.social)}>
                        <Link href={socialTG} target="__blank">
                            <span>Telegram</span>
                        </Link>
                        <Link href={socialIG} target="__blank">
                            <span>Instagram</span>
                        </Link>
                        <Link href={socialVK} target="__blank">
                            <span>Вк</span>
                        </Link>
                        <Link href={socialYT} target="__blank">
                            <span>Youtube</span>
                        </Link>
                    </span>
                </div>

                <div className={clsx(styles.row, styles.emailRow)}>
                    <span className={styles.key}>Хотите предложить сотрудничество?</span>
                    <span className={styles.value}>
                        <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
                    </span>
                </div>
            </div>

            <div className={styles.containerPicture}>
                <div className={styles.circleBorder}>
                    <div className={styles.pictureList}>
                        <Image
                            className={clsx(
                                styles.picture,
                                styles.picture1
                            )}
                            src={picture1.src}
                            width={500}
                            height={500}
                            alt={'Контакты'}
                        />
                        <Image
                            className={clsx(
                                styles.picture,
                                styles.picture2
                            )}
                            src={picture2.src}
                            width={500}
                            height={500}
                            alt={'Контакты'}
                        />
                        <Image
                            className={clsx(
                                styles.picture,
                                styles.picture3
                            )}
                            src={picture3.src}
                            width={500}
                            height={500}
                            alt={'Контакты'}
                        />
                        <Image
                            className={clsx(
                                styles.picture,
                                styles.picture4
                            )}
                            src={picture4.src}
                            width={500}
                            height={500}
                            alt={'Контакты'}
                        />
                    </div>
                    <Link
                        href={contactTicketBuy}
                        className={styles.btnTicket}
                        target="__blank"
                    >
                        <span>Купить билет</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}