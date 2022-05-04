const POST_COMMENT = 'comment/POST_COMMENT'
const DELETE_COMMENT = 'comment/DELETE_COMMENT'
const GET_COMMENTS = 'comment/GET_COMMENTS'

const getAllComments = (comments) => ({
  type: GET_COMMENTS,
  payload: comments
})

const postComment = (comment) => ({
  type: POST_COMMENT,
  payload: comment
})

const deleteComment = (comment) => ({
  type: DELETE_COMMENT,
  payload: comment
})

export const postCommentThunk = (photoId, comment) => async (dispatch) => {
  const response = await fetch(`/api/photos/${photoId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comment)
  })
  if (response.ok) {
    const newComment = await response.json();
    dispatch(postComment(newComment));
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

export const getOnePhotoCommentsThunk = (photoId) => async (dispatch) => {
  const response = await fetch(`/api/photos/${photoId}`)

  if (response.ok) {
    const photo = await response.json();
    dispatch(getAllComments(photo.comments));
    return photo;
  }
  return response;
}

const commentsReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_COMMENTS:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    case POST_COMMENT:
      newState = { [action.payload.id]: action.payload, ...state };
      return newState;
    case DELETE_COMMENT:
      newState = { ...state };
      delete newState[action.payload.id];
      return newState;
    default:
      return state;
  }
}

export default commentsReducer;
