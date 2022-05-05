import React from "react";
import { useDispatch } from "react-redux";
import {deleteCommentThunk} from '../../store/comments';
function DeleteCommentForm({setShowModal,comment}){
  const dispatch = useDispatch();
  return (
    <>
      <form id="delete-photo-form">
        <p>Are you sure you want to delete?</p>
        <div id="submit-btn-div">
          <button id="submit-button"  onClick={async () => {
            dispatch(deleteCommentThunk(comment))
          }
            }>Yes</button>
            <button onClick={()=>setShowModal(false)}>No</button>
        </div>
      </form>
    </>
  )
}

export default DeleteCommentForm;
