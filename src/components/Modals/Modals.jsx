import { useModalContext } from '../../context/useContext.jsx';
import WindowModal from '../ShareComponents/WindowModal/WindowModal.jsx';

const Modals = () => {
    const { isOpen, closeModal, modalContent } = useModalContext();

    return (
        <WindowModal isOpen={isOpen} onRequestClose={closeModal}>
            {modalContent}
        </WindowModal>
    );
};

export default Modals;
