import React from 'react';
import { deleteSingleAlbum, getAllAlbums } from "../../store/albums"
import { useDispatch, useSelector } from 'react-redux';

export default function DeleteAlbumForm({ id, setShowModal, album }) {
    const dispatch = useDispatch();
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(deleteSingleAlbum(id))
        dispatch(getAllAlbums())
        setShowModal(false)
    }
    return (
        <>
            <form onSubmit={onSubmit}>
                <h2> {album.title}</h2>
                <h3>Are you sure you want to delete this album?</h3>
                <button>Submit</button>
            </form>
        </>
    )

}
