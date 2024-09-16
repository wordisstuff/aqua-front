import { useModalContext } from '../../context/useModalContext';

import ModalWindow from '../../shared/components/ModalWindow/ModalWindow';

const Modals = () => {
  const { isOpen, closeModal, modalContent } = useModalContext();

  return (
    <ModalWindow isOpen={isOpen} onRequestClose={closeModal}>
      {modalContent}
    </ModalWindow>
  );
};

export default Modals;
