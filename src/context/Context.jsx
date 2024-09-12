import { createContext, useState, useCallback } from 'react';

const Context = createContext();

export const ModalProvider = ({ children }) => {
    const [modalContent, setModalContent] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const openModal = useCallback(content => {
        setModalContent(content);
        setIsOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsOpen(false);
        setModalContent(null);
    }, []);

    return (
        <Context.Provider
            value={{ isOpen, openModal, closeModal, modalContent }}
        >
            {children}
        </Context.Provider>
    );
};

export default Context;
