import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {deleteCommentThunk} from '../../store/comments';
function DeleteCommentForm({setShowModal,comment}){
  const history = useHistory();
  const dispatch = useDispatch();
  const user_id = useSelector(state => state.session.user.id);
  return (
    <>
      <form id="delete-photo-form">
        <p>Are you sure you want to delete?</p>
        <div id="submit-btn-div">
          <button id="submit-button"  onClick={() => {
            dispatch(deleteCommentThunk(comment))
            history.push(`/home`)
          }
            }>Yes</button>
            <button onClick={()=>setShowModal(false)}>No</button>
        </div>
      </form>
    </>
  )
}

export default DeleteCommentForm;
