import styles from './Popup.module.scss';

import { apiClient } from '../../api/client';
import PopupModal from '../PopupModal/PopupModal';
import PopupMini from '../PopupMini/PopupMini';

export default async function Popup() {
    const response = await apiClient.GET('/info/popup', {});

    if (response.error) {
        return null;
    }

    return (
        <>
            <PopupModal popup={response.data} />
            <PopupMini popup={response.data} />
        </>
    );
}