import styles from './Popup.module.scss';

import { apiClient } from '../../api/client';
import PopupModal from '../PopupModal/PopupModal';

export default async function Popup() {
    const response = await apiClient.GET('/info/popup', { cache: 'no-cache' });

    if (response.error) return null;


    return (
        <PopupModal popup={response.data} />
    );
}