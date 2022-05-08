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

  const response = await fetch(`/api/photos/${photoId}/comment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comment)
  })


  if (response.ok) {
    const newComment = await response.json();
    dispatch(postComment(newComment));
    //return newComment;
  }else if (response.status < 500) {
    const data = await response.json();

    return data
  }
  return response;
}

export const deleteCommentThunk = (comment) => async (dispatch) => {

  const response = await fetch(`/api/comments/${comment.id}`, {
    method: 'DELETE'
  })

  if (response.ok) {
    const deletedComment = await response.json();
    await dispatch(deleteComment(deletedComment));

  }
}

export const getOnePhotoCommentsThunk = (photoId) => async (dispatch) => {

  const response = await fetch(`/api/photos/${photoId}`)


  if (response.ok) {
    const photo = await response.json();
    dispatch(getAllComments(photo.comments));

    return response;
  }
}

const commentsReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_COMMENTS:
      newState = { ...state };
     
      action.payload.forEach(comment => newState[comment.id] = comment);
      //newState[action.payload.id] = action.payload;
      return {...newState,...state};
    case POST_COMMENT:
      newState = { [action.payload.id]: action.payload, ...state };
      return newState;
    case DELETE_COMMENT:
      newState = {...state}
      delete newState[action.payload.id]
      return {...newState}
    default:
      return state;
  }
}

export default commentsReducer;
