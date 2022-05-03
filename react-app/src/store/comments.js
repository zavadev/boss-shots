const POST_COMMENT = 'comment/POST_COMMENT'
const DELETE_COMMENT = 'comment/DELETE_COMMENT'

const postComment = (comment) => ({
  type: POST_COMMENT,
  payload: comment
})

const deleteComment = (comment) => ({
  type: DELETE_COMMENT,
  payload: comment
})

export const postCommentThunk = (photoId, comment) => async(dispatch) => {
  const response = await fetch(`/api/photos/${photoId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comment)
  })
  if (response.ok) {
    const newComment = await response.json();
    dispatch(postCommentThunk(newComment));
    return newComment;
  }
  return response;
}

export const deleteCommentThunk = (commentId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: 'DELETE'
  })

  if (response.ok) {
    const deletedComment = await response.json();
    dispatch(deleteComment(deletedComment));
    return deletedComment;
  }
  return response;
}

const commentsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case POST_COMMENT:
      newState = { [action.payload.id]: action.payload, ...state };
      return newState;
    case DELETE_PHOTO:
      newState = { ...state };
      delete newState [action.payload.id];
      return newState;
    default:
      return state;
  }
}

export default commentsReducer;
