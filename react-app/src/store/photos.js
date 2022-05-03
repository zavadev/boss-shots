const GET_PHOTOS = 'photos/GET_PHOTOS'
const POST_PHOTO = 'photos/POST_PHOTO'
const GET_ONE_PHOTO = 'photos/GET_ONE_PHOTO'
const UPDATE_PHOTO = 'photos/UPDATE_PHOTO'
const DELETE_PHOTO = 'photos/DELETE_PHOTO'

const getAllPhotos = (photos) => ({
  type: GET_PHOTOS,
  payload: photos
})

const postPhoto = (photo) => ({
  type: POST_PHOTO,
  payload: photo
})

const getOnePhoto = (photo) => ({
  type: GET_ONE_PHOTO,
  payload: photo
})

const updatePhoto = (photo) => ({
  type: UPDATE_PHOTO,
  payload: photo
})

const deletePhoto = (photo) => ({
  type: DELETE_PHOTO,
  payload: photo
})

const getAllPhotosThunk = () => async (dispatch) => {
  const response = await fetch('/api/photos/all')

  if (response.ok) {
    const photos = await response.json();
    dispatch(getAllPhotos(photos))
  }
  return response
}

const postPhotoThunk = (photo) => async (dispatch) => {
  const response = await fetch('/api/photos/add_photo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(photo)
  })

  if (response.ok) {
    const newPhoto = await response.json();
    dispatch(postPhoto(newPhoto));
    return newPhoto;
  }
  return response;
}

const getOnePhotoThunk = (photoId) => async (dispatch) => {
  const response = await fetch(`/api/photos/${photoId}`)

  if (response.ok) {
    const photo = await response.json();
    dispatch(getOnePhoto(photo));
    return photo;
  }
  return response;
}

const updatePhotoThunk = (photo) => async (dispatch) => {
  const response = await fetch(`/api/photos/${photo.id}/edit`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(photo)
  })

  if (response.ok) {
    const updatedPhoto = await response.json();
    dispatch(updatePhoto(updatedPhoto));
    return updatedPhoto;
  }
  return response;
}

const deletePhotoThunk = (photoId) => async (dispatch) => {
  const response = await fetch(`/api/${photoId}`, {
    method: 'DELETE',
  })

  if (response.ok) {
    const deletedPhoto = await response.json();
    dispatch(deletePhoto(deletedPhoto));
    return deletedPhoto;
  }
  return response;
}


const initialState = {};

const photosReducer =  (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_PHOTOS:
      newState = { ...state }
      action.payload.photos.forEach(photo => newState[photo.id] = photo);
      return newState;
    case POST_PHOTO:
      newState = { [action.payload.photo.id]: action.payload.photo, ...state };
      return newState;
    case GET_ONE_PHOTO:
      newState = { ...state };
      newState[action.payload.photo.id] = action.payload.photo;
      return newState;
    case UPDATE_PHOTO:
      newState = { [action.payload.photo.id]: action.payload.photo, ...state };
      return newState;
    case DELETE_PHOTO:
      newState = { ...state };
      delete newState[action.payload.photo.id];
      return newState;
    default:
      return state;
  }
}
