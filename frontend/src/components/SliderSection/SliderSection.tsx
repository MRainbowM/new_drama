import SliderList from '../SliderList/SliderList';
import styles from './SliderSection.module.scss'
import { apiClient } from '../../api/client'


export default async function SliderSection() {

    const response = await apiClient.GET('/info/info_block/list', {
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

        <section className={styles.root}>
            <SliderList
                data={response.data}
            />
        </section>

    );
}