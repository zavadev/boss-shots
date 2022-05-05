import React, { useState } from 'react';
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { updateSingleAlbum } from "../../store/albums"


export default function EditAlbumForm({ album, setShowModal }) {

    const dispatch = useDispatch()
    const [title, setTitle] = useState(album.title)
    const history = useHistory()
    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(updateSingleAlbum(title, album.id))
        history.push("/home")
        // setShowModal(false)
    }
    return (
        <form onSubmit={onSubmit}>
            <label> Title </label>
            <input type="text" onChange={e => setTitle(e.target.value)} value={title}></input>
            <button>Submit</button>
        </form>

    )

}
