import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddPhotoForm from './AddPhotoForm';
import './AddPhotoForm.css';

function AddPhotoModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="btn-rnb" id="add-photo-btn" onClick={() => setShowModal(true)}>Add Photo</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddPhotoForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default AddPhotoModal;
