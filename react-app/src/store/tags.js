const GET_ALL_TAGS = 'tags/GET_ALL_TAGS';
const ADD_TAG = 'tags/ADD_TAG';
const GET_TAGGED_PHOTOS = 'tags/GET_TAGGED_PHOTOS'


const getTags = (tags) => ({
    type: GET_ALL_TAGS,
    payload: tags
})

const addTag = (tag) => ({
    type: ADD_TAG,
    payload: tag
})

const getTaggedPhotos = (tag) => ({
    type: GET_TAGGED_PHOTOS,
    payload: tag
})

export const getAllTags = () => async (dispatch) => {
    const res = await fetch(`/api/tags/all`)
    if (res.ok) {
        const data = await res.json()
        dispatch(getTags(data.tags))
    }

}

export const addNewTag = (tag_name) => async (dispatch) => {
    const res = await fetch(`/api/tags/create_tag`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
            {
                tag_name
            })
    })
    if (res.ok) {
        const data = res.json()
        dispatch(addTag(data))
    }
}

export const getAllTaggedPhotos = (id) => async (dispatch) => {
    const res = await fetch(`/api/tags/${id}/photos`)
    if (res.ok) {
        const data = await res.json()
        dispatch(getTaggedPhotos(data))
    }
}

export default function tagReducer(state = {}, action) {
    let newState;
    switch (action.type) {
        case GET_ALL_TAGS:
            newState = { ...state }
            action.payload.forEach(tag => newState[tag.id] = tag)
            return { ...newState }
        case ADD_TAG:
            newState = { ...state }
            newState[action.payload.id] = action.payload
            return { ...newState, ...state }
        case GET_TAGGED_PHOTOS:
            newState = { ...state }
            newState[action.payload.id] = action.payload
            return { ...newState }
        default:
            return state;
    }
}
