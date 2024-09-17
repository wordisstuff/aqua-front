const Modals = () => {
    const { isOpen, closeModal, modalContent } = useModalContext();

    return (
        <ModalWindow isOpen={isOpen} onRequestClose={closeModal}>
            {modalContent}
        </ModalWindow>
    );
};

export default Modals;
