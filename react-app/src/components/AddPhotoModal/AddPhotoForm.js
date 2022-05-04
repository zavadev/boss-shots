import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postPhotoThunk } from "../../store/photos.js"

function AddPhotoForm({setShowModal}){
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [photo_url, setPhotoURL] = useState("");
  const [description, setDescription] = useState("");
  const user_id = useSelector(state => state.session.user.id);


  const photoSubmit = (e) => {
    e.preventDefault();
    let newPhoto = {
      user_id,
      title,
      photo_url,
      description
    }
    console.log("====>>>>>>", newPhoto);
    dispatch(postPhotoThunk(newPhoto))
      .then((() => setShowModal(false)))
  }

  return (
    <>
      <form id="add-photo-form" onSubmit={photoSubmit}>
        <div id="add-photo-title">Add Photo</div>
        <label id="title-input-label">
          Title
          <input
            id="title-input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label id="photo-url-label">
          Photo URL
          <input
            id="url-input"
            type="url"
            value={photo_url}
            onChange={(e) => setPhotoURL(e.target.value)}
            required
          />
        </label>
        <label id="description-label">
          Description
          <input
            id="description-input"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <div id="submit-btn-div">
          <button id="submit-button" type="submit">Add Photo</button>
        </div>
      </form>
    </>
  )
}

export default AddPhotoForm;
