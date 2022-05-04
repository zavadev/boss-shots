import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOnePhotoThunk } from '../../store/photos';
import { getOnePhotoCommentsThunk } from '../../store/comments';
import EditPhotoModal from '../EditPhotoModal';
import DeletePhotoModal from '../DeletePhotoModal';
import './PhotoDetail.css'

function PhotoDetail() {
    const photo_id = useParams();
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const sessionUser = useSelector(state => state.session.user);
    const photos = useSelector(state => Object.values(state.photos))
    const photoComments = useSelector(state => Object.values(state.comments))

    let comments = photoComments[0];


    useEffect(async () => {
        dispatch(getOnePhotoThunk(photo_id.photo_id))
        dispatch(getOnePhotoCommentsThunk(photo_id.photo_id))
        const response = await fetch('/api/users/');
        const responseData = await response.json();
        setUsers(responseData.users);
    }, [dispatch])
    console.log('users',users)
    return (
        <div className='photo-detail'>
            <div className='photo-post'>
                <h1>{photos[0]?.title}</h1>
                <img src={photos[0]?.photo_url} />
                {users?.map(user =>{
                    console.log(user)
                        if(photos[0]?.user_id == user?.id){
                            return (
                                <p>Posted By: {user.username}</p>
                            )
                        }
                    })}
                <p>{photos[0]?.description}</p>
                <div id="edit-delete">
                    <EditPhotoModal photo={photos[0]}/>
                    <DeletePhotoModal photo={photos[0]}/>
                </div>
            </div>

            <div className='photo-comments'>
                <h4>Comments</h4>
                {comments?.map(comment=>{
                    return(
                    <div className='comment'>
                    <p>{comment.comment}</p>
                    {users?.map(user =>{
                        if(comment?.user_id == user?.id){
                            return (
                                <p>{user.username}</p>
                            )
                        }
                    })}
                    </div>)
                })}
            </div>
        </div>
    )
}

export default PhotoDetail;
