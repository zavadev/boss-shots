const GET_ALL_ALBUMS = 'albums/GET_ALL_ALBUMS';
const GET_ALBUM = 'albums/GET_ALBUM';
const ADD_ALBUM = 'albums/ADD_ALBUM';

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
    headers: { 'Content-Type': 'application/json'},
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

export default function albumReducer(state = {}, action) {
  let newState;

  switch (action.type) {
    case GET_ALL_ALBUMS:
      newState = { ...state }
      action.payload.forEach(album => newState[album.id] = album)
      return { ...newState, ...state }
    case GET_ALBUM:
      newState = { ...state }
      newState[action.payload.id] = action.payload
      return { ...newState, ...state }
    case ADD_ALBUM:
      let album = action.payload
      newState = { ...state }
      newState[album.id] = album
      return { ...newState, ...state }
    default:
      return state;
  }
}
