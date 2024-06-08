import React from 'react';

const DeleteConfirmationModal = ({ isOpen, onConfirm, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>Are you sure you want to delete this user?</h3>
                <button onClick={onConfirm}>Yes</button>
                <button onClick={onClose}>No</button>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
