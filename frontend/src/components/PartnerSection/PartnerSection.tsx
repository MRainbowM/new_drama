import styles from './PartnerSection.module.scss'
import { apiClient } from '../../api/client'
import { contactEmail } from '../../constants/links';
import PartnerList from '../PartnerList/PartnerList';


export default async function PartnerSection() {
    const response = await apiClient.GET('/info/partner/list', {
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

    if (response.data.length == 0) {
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

                <PartnerList partnerList={response.data} />
            </div>
        </section>
    );
}