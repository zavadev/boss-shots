import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePhotoThunk } from "../../store/photos.js"

function EditPhotoForm({ setShowModal, photo }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(photo.title);
  //const [photo_url, setPhotoURL] = useState("");
  const [description, setDescription] = useState(photo.description);
  const [image, setImage] = useState(photo.photo_url);
  const [errors, setErrors] = useState([]);
  //const [imageLoading, setImageLoading] = useState(false);
  const user_id = useSelector(state => state.session.user.id);


  const photoSubmit = async (e) => {
    e.preventDefault();
    let newPhoto = {
      ...photo,
      user_id,
      title,
      image,
      description
    }
    //console.log("====>>>>>>", newPhoto);
    dispatch(updatePhotoThunk(newPhoto))
      .then((res) => {
        //console.log(res,"rest p")
        if (!res?.ok) {
          setErrors(res?.errors)
        } else {
          setErrors([])
          setShowModal(false)
        }
      })
  }
  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  }
  return (
    <>
      <form id="edit-photo-form" onSubmit={photoSubmit}>
        {errors?.length > 0 && errors?.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
        <div id="edit-photo-title">Edit Photo</div>
        <label id="title-input-label">
          Title
          <input
            id="title-input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}

          />
        </label>
        {/* <label id="photo-url-label">
          Photo URL
          <input
            id="url-input"
            type="file"
            onChange={updateImage}
          />
        </label> */}
        <label id="description-label">
          Description
          <input
            id="description-input"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <div id="submit-btn-div">
          <button className="btn-rnb" id="submit-button" type="submit">Edit Photo</button>
        </div>
      </form>
    </>
  )
}

export default EditPhotoForm;
