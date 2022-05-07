import React, { useState } from 'react';
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { updateSingleAlbum } from "../../store/albums"


export default function EditAlbumForm({ album, setShowModal }) {
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch()
    const [title, setTitle] = useState(album.title)
    const history = useHistory()
    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(updateSingleAlbum(title, album.id))
        .then((res)=>{
            //console.log(res,"rest p")
            if(!res?.ok){
              setErrors(res?.errors)
            }else{
              setErrors([])
              setShowModal(false)
            }
          })
    }
    return (
        <form onSubmit={onSubmit}>
             {errors?.length > 0 && errors?.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
            <label> Title </label>
            <input type="text" onChange={e => setTitle(e.target.value)} value={title}></input>
            <button>Submit</button>
        </form>

    )

}
