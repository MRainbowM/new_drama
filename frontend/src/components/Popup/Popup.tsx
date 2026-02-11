import PopupModal from '../PopupModal/PopupModal';
import { getPopupActive } from '../../services/api/getPopupActive';

export default async function Popup() {
    
    const { popup } = await getPopupActive();
    if (!popup) return null;
    
    return (
        <PopupModal popup={popup} />
    );
}