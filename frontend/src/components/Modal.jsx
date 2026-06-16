import { useEffect } from "react";

function Modal({ children, onClose}) {

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };

        window.addEventListener("keydown", handleEsc);

        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    return (
        <div 
            className="modal show d-block"
            onClick={onClose}
        >
            <div 
                className="modal-dialog modal-lg modal-dialog-centered"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-content p-4">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;