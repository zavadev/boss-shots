import React, { useState } from 'react';
import { Modal } from "../../context/Modal"
import AddPhotoToAlbum from "./AddPhotoToAlbum"

export default function AddPhotoToAlbumModal({ id }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button className="btn-rnb" onClick={() => setShowModal(true)}>Choose Photo</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)} >
                    <AddPhotoToAlbum id={id} setShowModal={setShowModal} ></AddPhotoToAlbum>
                </Modal>
            )}

        </>
    )

}
