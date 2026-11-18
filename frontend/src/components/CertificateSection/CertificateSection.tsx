import Image from 'next/image';
import Link from 'next/link';
import photo from 'public/images/certificate.webp';
import ticket from 'public/images/certificate-ticket.png';
import { contactCertificateBuy } from '../../constants/links';
import styles from './CertificateSection.module.scss';

const features = [
    {
        title: 'На любой',
        description: 'спектакль афиши',
    },
    {
        title: 'Номинал',
        description: 'на ваш выбор',
    },
    {
        title: 'Действует',
        description: '3 года',
    },
];

export default function CertificateSection() {
    return (
        <section className={styles.root} id="certificates">
            <h2>Подарочные сертификаты</h2>

            <div className={styles.content}>
                <div className={styles.visual}>
                    <div className={styles.photoWrap}>
                        <Image
                            className={styles.photo}
                            src={photo.src}
                            alt="Подарочный сертификат театра «Новая Драма»"
                            fill
                            sizes="(max-width: 900px) 100vw, 560px"
                        />
                    </div>

                    <Image
                        className={styles.ticket}
                        src={ticket.src}
                        alt=""
                        width={537}
                        height={374}
                        aria-hidden="true"
                    />
                </div>

                <div className={styles.info}>
                    <h3 className={styles.heading}>
                        Лучший
                        <br />
                        подарок&nbsp;—
                        <br />
                        вечер в театре
                    </h3>

                    <p className={styles.description}>
                        Вещи забываются, эмоции — никогда. Подарите близким спектакль:
                        смех до слёз, мурашки на аплодисментах и вечер, о котором
                        захочется рассказывать друзьям. Театр — это модно, а сертификат
                        в Новую Драму — тот подарок, который точно оценят.
                    </p>

                    <div className={styles.features}>
                        {features.map((feature) => (
                            <div className={styles.feature} key={feature.title}>
                                <span className={styles.featureTitle}>
                                    {feature.title}
                                </span>
                                <span className={styles.featureDescription}>
                                    {feature.description}
                                </span>
                            </div>
                        ))}
                    </div>

                    <Link
                        href={contactCertificateBuy}
                        className={styles.btn}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Купить сертификат
                    </Link>
                </div>
            </div>
        </section>
    );
}
