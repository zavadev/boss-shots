import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { getAllPhotosThunk, postPhotoThunk, getOnePhotoThunk, updatePhotoThunk, deletePhotoThunk } from '../store/photos';

const TestComp = () => {
    const photoState = useSelector(state => state.photos);

    const photos = Object.values(photoState)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllPhotosThunk())
    }, [dispatch])

    // console.log('HTM',photos[0]?.title)


    return (
        <>
            <h1>TEST</h1>
            <ul>
                {photos?.map(photo => (
                    // {console.log(photo)}
                    <li key={photo?.id}>
                        <p>Title:{photo?.title}</p>
                        <img src={photo?.photo_url}></img>
                        <p>Description: {photo?.description}</p>
                        </li>
                ))}
            </ul>
        </>
    )
}
export default TestComp;
