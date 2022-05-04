import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddAlbumForm from './AddAlbumForm';
import './AddAlbumForm.css';

function AddAlbumModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button id="add-photo-btn" onClick={() => setShowModal(true)}>Add Album</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AddAlbumForm setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default AddAlbumModal;
