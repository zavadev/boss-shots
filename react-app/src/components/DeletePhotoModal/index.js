import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeletePhotoForm from './DeletePhotoForm'

function DeletePhotoModal({photo}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button id="edit-photo-btn" onClick={() => setShowModal(true)}>Delete Photo</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeletePhotoForm setShowModal={setShowModal} photo={photo}/>
        </Modal>
      )}
    </>
  );
}

export default DeletePhotoModal;
