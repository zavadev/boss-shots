import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOnePhotoThunk } from '../../store/photos';
import { getOnePhotoCommentsThunk } from '../../store/comments';
import EditPhotoModal from '../EditPhotoModal';
import DeletePhotoModal from '../DeletePhotoModal';
import DeleteCommentModal from '../DeleteCommentModal';
import AddCommentForm from '../AddComment';
import './PhotoDetail.css'

function PhotoDetail() {
    const photo_id = useParams();
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const sessionUser = useSelector(state => state.session.user);
    const photos = useSelector(state => Object.values(state.photos))
    const comments = useSelector(state => Object.values(state.comments))
    console.log(comments)

    let mainPhoto = photos?.filter(photo =>{
        //console.log(photo,'photo in loop')
        //console.log(photo.id, 'compare to url id',parseInt( photo_id?.photo_id))
        if(photo?.id === parseInt( photo_id?.photo_id)){
            //console.log('FOUND',photo)
            return photo;
        }
    });
    let photoComments = comments?.filter(comment =>{
        //console.log(mainPhoto[0],'photo for comment')
        //console.log(mainPhoto[0].id, 'compare to comment photo id',comment?.photo_id)
        if(comment?.photo_id === mainPhoto[0]?.id){
            //console.log('FOUND',comment)
            return comment;
        }
    });
    //console.log(photoComments,'PHOTO COMMENTS')

    const owner = users?.filter(user =>{
        //console.log(user)
            if(mainPhoto[0]?.user_id === user?.id){
                return user;
            }
            return
    });

    //console.log(owner)

    useEffect(async () => {
        dispatch(getOnePhotoThunk(photo_id.photo_id))
        dispatch(getOnePhotoCommentsThunk(photo_id.photo_id))
        const response = await fetch('/api/users/');
        const responseData = await response.json();
        setUsers(responseData.users);
    }, [dispatch,photo_id])
    //console.log('users',users)
    return (
        <div className='photo-detail'>
            <div className='photo-post'>
                <h1>{mainPhoto[0]?.title}</h1>
                <img src={mainPhoto[0]?.photo_url} alt={mainPhoto[0]?.title}/>
                {users?.map(user =>{
                    //console.log(user)
                        if(mainPhoto[0]?.user_id == user?.id){
                            return (
                                <p key={user?.id}>Posted By: {user.username}</p>
                            )
                        }
                    })
                    }
                    <p key={mainPhoto[0]?.id}>{mainPhoto[0]?.description}</p>
                    {sessionUser && sessionUser.id === owner[0]?.id &&
                    <div id="edit-delete">
                        <EditPhotoModal photo={mainPhoto[0]}/>
                        <DeletePhotoModal photo={mainPhoto[0]}/>
                    </div>
                    }

            </div>

            <div className='photo-comments'>
                <h4>Comments</h4>
                {sessionUser && <AddCommentForm photo={mainPhoto[0]}/>}
                {photoComments?.map(comment=>{
                    return(
                    <div className='comment'>
                    <p>{comment.comment}</p>
                    {users?.map(user =>{
                        if(comment?.user_id == user?.id){
                            return (
                                <p key={user?.id}>{user?.username}</p>
                            )
                        }
                    })}
                    {sessionUser && sessionUser.id === comment?.user_id &&
                    <div id="delete">
                        <DeleteCommentModal comment={comment}/>
                    </div>
                    }
                    </div>)
                })}
            </div>
        </div>
    )
}

export default PhotoDetail;
