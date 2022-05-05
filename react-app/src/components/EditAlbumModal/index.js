import React, { useState } from 'react';
import { Modal } from "../../context/Modal"
import EditAlbumForm from "./EditAlbumForm"

export default function EditAlbumModal({ album }) {
    const [showModal, setShowModal] = useState(false)
    return (
        <>
            <button onClick={() => setShowModal(true)}>Update Album</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditAlbumForm setShowModal={setShowModal} album={album}></EditAlbumForm>
                </Modal>
            )
            }
        </>
    )


}
