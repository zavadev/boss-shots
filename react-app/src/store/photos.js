const GET_PHOTOS = 'photos/GET_PHOTOS'

const getAllPhotos = (photos) => ({
  type: GET_PHOTOS,
  payload: photos
})

const getAllPhotosThunk = () => async (dispatch) => {
  const response = await fetch('/api/photos/all')

  if (response.ok) {
    const photos = await response.json();
    dispatch(getAllPhotos(photos))
  }
  return response
}


const initialState = {};

const photosReducer =  (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_PHOTOS:
      newState = { ...state }
      action.payload.photos.forEach(photo => newState[photo.id] = photo);
      return newState;
    default:
      return state;
  }
}
