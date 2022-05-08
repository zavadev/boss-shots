import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {deleteCommentThunk} from '../../store/comments';
import './DeleteCommentForm.css';

function DeleteCommentForm({setShowModal,comment}){
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (e) =>{
    e.preventDefault()

    dispatch(deleteCommentThunk(comment))
  }
  return (
    <>
      <form id="delete-comment-form" onSubmit={onSubmit}>
        <p id='delete-comment-title' >Are you sure you want to delete?</p>
        <div id="submit-btn-div">
          <button className="btn-rnb" id="submit-button"  onClick={async () => {
            dispatch(deleteCommentThunk(comment))
            // history.push('/home')
          }
            }>Yes</button>
            <button onClick={()=>setShowModal(false)}>No</button>
        </div>
      </form>
    </>
  )
}

export default DeleteCommentForm;
