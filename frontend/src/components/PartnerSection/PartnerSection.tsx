import styles from './PartnerSection.module.scss'
import { getPartnerList } from '../../services/api/getPartnerList'
import { contactEmail } from '../../constants/links';
import PartnerList from '../PartnerList/PartnerList';


export default async function PartnerSection() {

    const { partnerList } = await getPartnerList();

    if (partnerList.length == 0) {
        return <></>;
    }

    return (
        <section className={styles.root} id="partner">
            <h2>Наши друзья и партнеры</h2>

            <div className={styles.content}>
                <div className={styles.text}>
                    <span>Если вы хотите стать нашим партнером, пишите на почту</span>
                    <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
                </div>

                <PartnerList partnerList={partnerList} />
            </div>
        </section>
    );
}