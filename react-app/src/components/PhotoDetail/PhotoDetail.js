import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOnePhotoThunk } from '../../store/photos';

function PhotoDetail(){
    const photo_id = useParams();
    const dispatch = useDispatch();

    const photos = useSelector(state => Object.values(state.photos))

    console.log(photo_id.photo_id)

    useEffect(()=>{
        dispatch(getOnePhotoThunk(photo_id.photo_id))
    },[dispatch])

    return (
        <>
            <h1>Photo</h1>
        </>
    )
}

export default PhotoDetail;
