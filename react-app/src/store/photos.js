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

export const getAllPhotosThunk = () => async (dispatch) => {
  // console.log("ENTER")
  const response = await fetch('/api/photos/all')
  // console.log("RESPONSE",response)
  if (response.ok) {
    const photos = await response.json();
    // console.log('json photo',photos.photos)
    dispatch(getAllPhotos(photos.photos))
    return response;
  }
}

export const postPhotoThunk = (photo) => async (dispatch) => {
  const {title, image, description, user_id} = photo;

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("user_id", user_id);

  if (image) formData.append("image", image);

  const response = await fetch('/api/photos/add_photo', {
    method: 'POST',
    body: formData
  })

  if (response.ok) {
    const newPhoto = await response.json();
    dispatch(postPhoto(newPhoto));
    // return newPhoto;
  }
  return response;
}

export const getOnePhotoThunk = (photoId) => async (dispatch) => {
  const response = await fetch(`/api/photos/${photoId}`)

  if (response.ok) {
    const photo = await response.json();
    dispatch(getOnePhoto(photo.photo));
    return photo;
  }
  return response;
}


export const updatePhotoThunk = (photo) => async (dispatch) => {
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

export const deletePhotoThunk = (photo) => async (dispatch) => {
  console.log("ENTER DELETE THUNK")
  const response = await fetch(`/api/photos/${photo.id}`, {
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
      //console.log('====================================',action,action.payload)
      action.payload.forEach(photo => newState[photo.id] = photo);
      return {...newState,...state};
    case POST_PHOTO:
      newState = { [action.payload.id]: action.payload, ...state };
      return newState;
    case GET_ONE_PHOTO:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    case UPDATE_PHOTO:
      newState = { ...state };
      newState = { [action.payload.id]: action.payload};
      return newState;
    case DELETE_PHOTO:
      newState = { ...state };
      delete newState[action.payload.id];
      return newState;
    default:
      return state;
  }
}

export default photosReducer;
