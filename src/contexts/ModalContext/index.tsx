import { createContext, useState, useContext, ReactNode } from 'react';

// Define the type for our context value
type ModalContextValue = {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
};

// Create the context
const ModalContext = createContext<ModalContextValue | undefined>(undefined);

// Create a custom hook to access the context value
export const useModalContext = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModalContext must be used within a ModalProvider');
    }
    return context;
};

// Create the ModalProvider component
export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const contextValue: ModalContextValue = {
        isOpen,
        openModal,
        closeModal,
    };

    return (
        <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>
    );
};
