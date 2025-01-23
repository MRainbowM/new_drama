import styles from './ViewerSection.module.scss'
import { apiClient } from '../../api/client'
import ViewerList from '../ViewerList/ViewerList';

export default async function ViewerSection() {
    // Получение списка фотографий зрителей
    const response = await apiClient.GET('/info/viewer/list', {
        params: {
            query: {
                is_enable: true
            }
        }
    });

    if (response.error) {
        console.log(response.error);
        throw new Error('error'); //TODO
        return (<></>);
    }

    return (
        <section className={styles.root}>
            <h2>Наши зрители</h2>
            <ViewerList
                viewerList={response.data}
            />
        </section>
    );
}