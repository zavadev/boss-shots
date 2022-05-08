import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSingleAlbum } from '../../store/albums'
import "./AddAlbumForm.css"

function AddAlbumForm({ setShowModal }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const user_id = useSelector(state => state.session?.user?.id);
  const [errors, setErrors] = useState([]);


  const onSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addSingleAlbum(title, user_id))
      .then((res) => {
      
        if (!res?.ok) {
          setErrors(res?.errors)
        } else {
          setErrors([])
          setShowModal(false)
        }
      })
      .then(() => { setTitle(""); })

  }

  return (
    <>
      <form id="add-album-form" onSubmit={onSubmit}>
        <div>
          {errors?.length > 0 && errors?.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div id="add-photo-main-title">Add Album</div>
        <label id="">
          Title:
        </label>
        <input
          id="title-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div id="submit-btn-div">
          <button className="btn-rnb" id="submit-button" type="submit">Add Album</button>
        </div>
      </form>
    </>
  )
}

export default AddAlbumForm;
