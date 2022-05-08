import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postCommentThunk } from "../../store/comments";
import './AddComment.css';

function AddCommentForm({ photo }) {
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
    dispatch(postCommentThunk(photo.id, newComment))
      .then((res) => {
        if (!res?.ok) {
          setErrors(res?.errors)
        } else {
          setErrors([])
        }
      })
      .then(() => { setComment(""); })
  }

  return (
    <>
      <form id="add-comment-form" onSubmit={commentSubmit}>
        <div>
          {errors?.length > 0 && errors?.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <label id="comment-input-label">
          Add Comment:
        </label>
        <textarea
          id="comment-input"
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div id="submit-btn-div">
          <button className="btn-rnb" id="submit-button" type="submit">Add Comment</button>
        </div>
      </form>
    </>
  )
}

export default AddCommentForm;
