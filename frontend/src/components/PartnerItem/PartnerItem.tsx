import styles from './PartnerItem.module.scss'
import { components } from '../../api/schema'
import Image from 'next/image'

interface PartnerItemProps {
    partner: components['schemas']['PartnerOutSchema']
}


export default function PartnerItem(
    { partner }: PartnerItemProps
) {
    return (
        <div className={styles.root}>
            <div className={styles.logo}>
                <Image
                    src={partner.logo}
                    layout='fill'
                    objectFit='contain'
                    alt={partner.name}
                />
            </div>
            <span className={styles.name}>{partner.name}</span>
        </div>
    );
}