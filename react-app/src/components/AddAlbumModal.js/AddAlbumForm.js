import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSingleAlbum } from '../../store/albums'

function AddAlbumForm({ setShowModal }) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const user_id = useSelector(state => state.session?.user?.id);
    const [errors, setErrors] = useState([]);


    const onSubmit = async (e) => {
        e.preventDefault();
        await dispatch(addSingleAlbum(title, user_id))
        .then((res)=>{
            console.log('REES',res)
            if(!res?.ok){
                console.log('REES',res)
              setErrors(res?.errors)
            }else if(res.title){
                console.log('REES',res)
                setShowModal(false)
            }
          })

    }

    return (
        <>
            <form id="add-album-form" onSubmit={onSubmit}>
            <div>
          {errors?.length > 0 && errors?.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
                <div id="">Add Photo</div>
                <label id="">
                    Title
                    <input
                        id="title-input"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>

                <div id="submit-btn-div">
                    <button id="submit-button" type="submit">Add Album</button>
                </div>
            </form>
        </>
    )
}

export default AddAlbumForm;
