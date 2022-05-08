import React, { useState } from 'react';
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { updateSingleAlbum } from "../../store/albums"
import './EditAlbumForm.css';

export default function EditAlbumForm({ album, setShowModal }) {
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch()
  const [title, setTitle] = useState(album.title)
  const history = useHistory()
  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(updateSingleAlbum(title, album.id))
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
  return (
    <form id="edit-album-form" onSubmit={onSubmit}>
      <div id="edit-album-title">Edit Album</div>
      {errors?.length > 0 && errors?.map((error, ind) => (
        <div key={ind}>{error}</div>
      ))}
      <label> Title: </label>
      <input id="edit-album-title-input" type="text" onChange={e => setTitle(e.target.value)} value={title} ></input>
      <button className="btn-rnb">Submit</button>
    </form>

  )

}
