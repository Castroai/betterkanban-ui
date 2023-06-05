import { ReactNode } from 'react';

const Modal = ({ children, isOpen }: { children: ReactNode, isOpen: boolean }) => {

    if (!isOpen) {
        return null; // Don't render anything if modal is closed
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-90 flex-1">
            {children}
        </div>
    );
};

export default Modal;
