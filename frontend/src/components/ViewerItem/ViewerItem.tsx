import styles from './ViewerItem.module.scss'
import { components } from '../../api/schema'
import Image from 'next/image'

interface ViewerItemProps {
    viewer: components['schemas']['ViewerOutSchema']
}


export default function ViewerItem(
    { viewer }: ViewerItemProps
) {
    return (
        <div className={styles.root}>
            <Image
                src={viewer.image}
                width={500}
                height={500}
                alt={viewer.nickname}
            />
        </div>
    );
}