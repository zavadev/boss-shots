import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteCommentForm from './DeleteCommentForm'

function DeleteCommentModal({comment}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button id="edit-photo-btn" onClick={() => setShowModal(true)}>Delete Comment</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteCommentForm setShowModal={setShowModal} comment={comment}/>
        </Modal>
      )}
    </>
  );
}

export default DeleteCommentModal;
