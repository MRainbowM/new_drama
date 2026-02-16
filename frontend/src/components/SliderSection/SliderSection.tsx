import SliderList from '../SliderList/SliderList';
import styles from './SliderSection.module.scss'
import { getInfoBlocks } from '../../services/api/getInfoBlocks'


export default async function SliderSection() {
    const { infoBlocks } = await getInfoBlocks();

    if (infoBlocks.length == 0) {
        return <></>;
    }
    
    return (

        <section className={styles.root}>
            <SliderList
                data={infoBlocks}
            />
        </section>

    );
}