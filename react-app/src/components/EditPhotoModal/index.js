import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditPhotoForm from './EditPhotoForm';

function EditPhotoModal({ photo }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="btn-rnb" id="edit-photo-btn" onClick={() => setShowModal(true)}>Edit Photo</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditPhotoForm setShowModal={setShowModal} photo={photo} />
        </Modal>
      )}
    </>
  );
}

export default EditPhotoModal;
