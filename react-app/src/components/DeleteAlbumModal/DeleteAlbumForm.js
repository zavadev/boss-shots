import React from 'react';
import { deleteSingleAlbum, getAllAlbums } from "../../store/albums"
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function DeleteAlbumForm({ id, setShowModal, album }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmit = (e) => {
        e.preventDefault();

        dispatch(deleteSingleAlbum(id)).then(() => {

            history.push('/home');
            setShowModal(false)
        })





    }

    return (
        <>
            <form onSubmit={onSubmit} action="/home">
                <h2> {album?.title}</h2>
                <h3>Are you sure you want to delete this album?</h3>
                <button>Submit</button>
            </form>
        </>
    )

}
