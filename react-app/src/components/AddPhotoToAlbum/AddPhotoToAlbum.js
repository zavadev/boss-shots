import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addPhotoAlbum } from '../../store/albums'
import { getAllPhotosThunk } from "../../store/photos"

export default function AddPhotoToAlbum({ id, setShowModal }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [selectedPhoto, setSelectedPhoto] = useState("")
    const photos = useSelector(state => Object.values(state.photos))
    // const albums = Object.values(state.albums)
    console.log(selectedPhoto)
    useEffect(() => {
        dispatch(getAllPhotosThunk())

    }, [dispatch])
    const onClick = () => {
        dispatch(addPhotoAlbum(id, selectedPhoto)).then(() => setShowModal(false))
    }

    return (
        <>
            <p>Test</p>
            <dl>
                {photos.map(photo => (
                    <>
                        <dt key={photo.id}>
                            <button onClick={() => setSelectedPhoto(photo.id)} style={{ background: `url(${photo.photo_url})`, height: "100px", width: "100px", backgroundSize: "100px 100px" }} />
                        </dt>

                    </>

                ))}
                <button onClick={onClick}>Add</button>
            </dl>
        </>
    )


}