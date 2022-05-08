import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postCommentThunk } from "../../store/comments"

function AddCommentForm({photo}){
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState([]);

  const user_id = useSelector(state => state.session.user);

  const commentSubmit = (e) => {
    e.preventDefault();
    let newComment = {
      user_id,
      photo_id: photo.id,
      comment,
    }
    dispatch(postCommentThunk(photo.id,newComment))
    .then((res)=>{
      if(!res?.ok){
        setErrors(res?.errors)
      }else{
        setErrors([])
      }
    })
    .then(()=>{setComment("");})
  }

  return (
    <>
      <form id="add-comment-form" onSubmit={commentSubmit}>
      <div>
          {errors?.length > 0 && errors?.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div id="add-comment-title">Add Comment</div>
        <label id="comment-input-label">
          Comment:
          <input
            id="comment-input"
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}

          />
        </label>
        <div id="submit-btn-div">
          <button id="submit-button" type="submit">Add Comment</button>
        </div>
      </form>
    </>
  )
}

export default AddCommentForm;
