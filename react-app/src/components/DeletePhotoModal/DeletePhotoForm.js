import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deletePhotoThunk } from "../../store/photos.js"

function DeletePhotoForm({setShowModal,photo}){
  const history = useHistory();
  const dispatch = useDispatch();
  const [title, setTitle] = useState(photo.title);
  const [photo_url, setPhotoURL] = useState("");
  const [description, setDescription] = useState(photo.description);
  const [image, setImage] = useState(photo.photo_url);
  const [imageLoading, setImageLoading] = useState(false);
  const user_id = useSelector(state => state.session.user.id);
  return (
    <>
      <form id="delete-photo-form">
        <p>Are you sure you want to delete?</p>
        <div id="submit-btn-div">
          <button id="submit-button"  onClick={() => {
            dispatch(deletePhotoThunk(photo))
            history.push(`/home`)
          }
            }>Yes</button>
            <button onClick={()=>setShowModal(false)}>No</button>
        </div>
      </form>
    </>
  )
}

export default DeletePhotoForm;
