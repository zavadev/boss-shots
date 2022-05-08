import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deletePhotoThunk } from "../../store/photos.js";
import './DeletePhotoForm.css';

function DeletePhotoForm({ setShowModal, photo }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const user_id = useSelector(state => state.session.user.id);
  return (
    <>
      <form id="delete-photo-form">
        <p id="delete-title">Are you sure you want to delete?</p>
        <div id="submit-btn-div">
          <button id="submit-button" className="btn-rnb" onClick={() => {
            dispatch(deletePhotoThunk(photo))
            history.push(`/home`)
          }
          }>Yes</button>
          <button id="delete-button" onClick={() => setShowModal(false)}>No</button>
        </div>
      </form>
    </>
  )
}

export default DeletePhotoForm;
