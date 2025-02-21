import styles from './PartnerItem.module.scss'
import { components } from '../../api/schema'
import Image from 'next/image'
import Link from 'next/link'

interface PartnerItemProps {
    partner: components['schemas']['PartnerOutSchema']
}


export default function PartnerItem(
    { partner }: PartnerItemProps
) {
    return (
        <div className={styles.root}>
            <Link
                href={partner.link}
                target="__blank" className={styles.logo}
            >
                <Image
                    src={partner.logo}
                    layout='fill'
                    objectFit='contain'
                    alt={partner.name}
                />
            </Link>
            <Link
                href={partner.link}
                target="__blank"
                className={styles.name}
            >
                {partner.name}
            </Link>
        </div>
    );
}