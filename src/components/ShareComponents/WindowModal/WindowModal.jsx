import { useEffect } from 'react';
import Modal from 'react-modal';
import { icons } from '../../../utils/icons';
import style from './WindowModal.module.css';

Modal.setAppElement('#root');

const ModalWindow = ({
    isOpen,
    onRequestClose,
    children,
    shouldCloseOnOverlayClick = true,
}) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
            style={{
                overlay: {
                    backgroundColor: 'rgba(47, 47, 47, 0.6)',
                    zIndex: '15',
                    overflow: 'auto',
                    display: 'grid',
                    placeItems: 'center',
                },
            }}
            className={{
                base: style.modalContent,
                afterOpen: style.modalContentOpen,
                beforeClose: style.beforeClose,
            }}
        >
            <button onClick={onRequestClose} className={style.closeButton}>
                <svg className={`${style.iconClose}`}>
                    <use xlinkHref={`${icons}#close`} />
                </svg>
            </button>
            {children}
        </Modal>
    );
};

export default ModalWindow;
