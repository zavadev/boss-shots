import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteCommentForm from './DeleteCommentForm'

function DeleteCommentModal({photo}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button id="edit-photo-btn" onClick={() => setShowModal(true)}>Delete Comment</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteCommentForm setShowModal={setShowModal} photo={photo}/>
        </Modal>
      )}
    </>
  );
}

export default DeleteCommentModal;
