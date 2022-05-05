const GET_ALL_ALBUMS = 'albums/GET_ALL_ALBUMS';
const GET_ALBUM = 'albums/GET_ALBUM';
const ADD_ALBUM = 'albums/ADD_ALBUM';
const UPDATE_ALBUM = 'albums/UPDATE_ALBUM';
const DELETE_ALBUM = 'albums/DELETE_ALBUM'
const ADD_PHOTO = 'albums/ADD_PHOTO'

const getAlbums = albums => ({
  type: GET_ALL_ALBUMS,
  payload: albums
})

const getAlbum = album => ({
  type: GET_ALBUM,
  payload: album
})

const addAlbum = album => ({
  type: ADD_ALBUM,
  payload: album
})
const updatedAlbum = (album) => ({
  type: UPDATE_ALBUM,
  payload: album
})
const deleteAlbum = (id) => ({

  type: DELETE_ALBUM,
  payload: id

})
const addPhotoToAlbum = (photos) => ({
  type: ADD_PHOTO,
  payload: photos
})

export const addPhotoAlbum = (id, photo_id) => async (dispatch) => {

  const res = await fetch(`/api/albums/${id}/add_photo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      photo_id
    })
  })
  if (res.ok) {
    const photos = await res.json()
    console.log(photos)
    dispatch(addPhotoToAlbum(photos))
  }
}



export const getAllAlbums = () => async (dispatch) => {
  const res = await fetch(`/api/albums/all`)
  if (res.ok) {
    const data = await res.json()
    dispatch(getAlbums(data.albums))
  }
}

export const getSingleAlbum = (id) => async (dispatch) => {
  const res = await fetch(`/api/albums/${id}`)
  if (res.ok) {
    const data = await res.json()
    dispatch(getAlbum(data))
  }
}

export const addSingleAlbum = (title, user_id) => async (dispatch) => {
  const res = await fetch(`/api/albums/add_album`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title,
      user_id
    }),
  })

  if (res.ok) {
    const data = await res.json()
    dispatch(addAlbum(data))
  }
}

export const updateSingleAlbum = (title, albumId) => async (dispatch) => {
  const res = await fetch(`/api/albums/${albumId}/edit`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title,
    }),
  })

  if (res.ok) {
    const data = await res.json()
    console.log("=====>>>>>>>in the fetch for updete", data)
    dispatch(updatedAlbum(data))
    return data
  }
  return res
}

export const deleteSingleAlbum = (id) => async (dispatch) => {
  const res = await fetch(`/api/albums/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  if (res.ok) {
    const data = await res.json()
    dispatch(deleteAlbum(id))
    return data;
  }
}

export default function albumReducer(state = {}, action) {
  let newState;

  switch (action.type) {

    case GET_ALL_ALBUMS:
      newState = { ...state }
      // console.log("getAllAlb========>>>>", newState)
      action.payload.map(album => newState[album.id] = album)
      // console.log("new state after ======>>>>>>>", newState)
      // console.log("test", { ...newState, ...state })
      return newState
    case GET_ALBUM:
      newState = { ...state }
      newState[action.payload.id] = action.payload

      return newState;
    case ADD_ALBUM:
      let album = action.payload
      newState = { ...state }
      newState[album.id] = album
      return newState
    case UPDATE_ALBUM:
      newState = { ...state }
      newState = { [action.payload.id]: action.payload }
      return newState
    case DELETE_ALBUM:
      newState = { ...state }
      // console.log("---------->>>>>>>>", newState)
      // newState = Object.values(state).filter(album => album.id != action.payload)
      // console.log("---------->>>>>>>> after ", newState)
      delete newState[action.payload]
      return newState
    case ADD_PHOTO:
      newState = { ...state }
      // newState = { [action.payload.id]: action.payload }
      console.log("in addd photos tp albm ===========>>>", action.payload)
      return newState;

    default:
      return state;
  }
}
