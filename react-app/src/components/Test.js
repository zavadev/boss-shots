import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { getAllPhotosThunk, postPhotoThunk, getOnePhotoThunk, updatePhotoThunk, deletePhotoThunk } from '../store/photos';

const TestComp = () => {
    const photos = useSelector(state => Object.values(state.photos));
    console.log(photos)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllPhotosThunk())
    }, [dispatch])

    return (
        <>
            <h1>TEST</h1>
        </>
    )
}
export default TestComp;
