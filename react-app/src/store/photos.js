const GET_PHOTOS = 'photos/GET_PHOTOS'
const POST_PHOTO = 'photos/POST_PHOTO'

const getAllPhotos = (photos) => ({
  type: GET_PHOTOS,
  payload: photos
})

const postPhoto = (photo) => ({
  type: POST_PHOTO,
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


const initialState = {};

const photosReducer =  (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_PHOTOS:
      newState = { ...state }
      action.payload.photos.forEach(photo => newState[photo.id] = photo);
      return newState;
    case POST_PHOTO:
      newState = { [action.photo.id]: action.photo, ...state };
      return newState;
    default:
      return state;
  }
}
