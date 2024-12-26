import SliderList from '../SliderList/SliderList';
import styles from './SliderSection.module.scss'
import { apiClient } from '../../api/client'


export default async function SliderSection() {

    const response = await apiClient.GET('/api/info/info_block/list', {
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
            <SliderList
                data={response.data}
            />
        </section>

    );
}