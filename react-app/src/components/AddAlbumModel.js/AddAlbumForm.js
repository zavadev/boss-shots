import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSingleAlbum } from '../../store/albums'

function AddAlbumForm({ setShowModal }) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const user_id = useSelector(state => state.session?.user?.id);


    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(addSingleAlbum(title, user_id))
            .then((() => setShowModal(false)))
    }

    return (
        <>
            <form id="" onSubmit={onSubmit}>
                <div id="">Add Photo</div>
                <label id="">
                    Title
                    <input
                        id="title-input"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>

                <div id="submit-btn-div">
                    <button id="submit-button" type="submit">Add Photo</button>
                </div>
            </form>
        </>
    )
}

export default AddAlbumForm;
