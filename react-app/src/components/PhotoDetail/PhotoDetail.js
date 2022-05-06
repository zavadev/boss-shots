import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import { getOnePhotoThunk } from '../../store/photos';
import { getOnePhotoCommentsThunk } from '../../store/comments';
import EditPhotoModal from '../EditPhotoModal';
import DeletePhotoModal from '../DeletePhotoModal';
import DeleteCommentModal from '../DeleteCommentModal';
import AddCommentForm from '../AddComment';
import './PhotoDetail.css'
import { getAllTags} from '../../store/tags'
import {addTagToPhoto} from '../../store/photos'

function PhotoDetail() {
    const photo_id = useParams();
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const sessionUser = useSelector(state => state.session.user);
    const photos = useSelector(state => Object.values(state.photos))
    const photoComments = useSelector(state => Object.values(state.comments))
    const tags = useSelector(state => Object.values(state.tags))
    const my_tags = photos[0]?.tags

    const owner = users?.filter(user =>{
            if(photos[0]?.user_id === user?.id){
                return user;
            }
            return
    });


    useEffect(async () => {
        dispatch(getOnePhotoThunk(photo_id.photo_id))
        dispatch(getOnePhotoCommentsThunk(photo_id.photo_id))
        const response = await fetch('/api/users/');
        const responseData = await response.json();
        setUsers(responseData.users);
        dispatch(getAllTags())
    }, [dispatch,photo_id])

    return (
        <div className='photo-detail'>
            <div className='photo-post'>
                <h1>{photos[0]?.title}</h1>
                <img src={photos[0]?.photo_url} alt={photos[0]?.title}/>
                {users?.map(user =>{
                        if(photos[0]?.user_id == user?.id){
                            return (
                                <p key={user?.id}>Posted By: {user.username}</p>
                            )
                        }
                    })
                    }
                    <p key={photos[0]?.id}>{photos[0]?.description}</p>
                    {sessionUser && sessionUser.id === owner[0]?.id &&
                    <div id="edit-delete">
                        <EditPhotoModal photo={photos[0]}/>
                        <DeletePhotoModal photo={photos[0]}/>
                    </div>
                    }
                <div>
                    <label>
                        Add a Tag
                    </label>
                    <select onChange={(e) => dispatch(addTagToPhoto(photo_id.photo_id, +e.target.value))}>
                        {tags?.map(tag => (<option value={tag.id} key={tag.id} >
                            {tag.tag_name}
                        </option>))}
                    </select>
                </div>
                <div>
                  {my_tags?.map(tag => (
                    <NavLink to={'/home'} key={tag.id}>{tag.tag_name}</NavLink>
                  ))}
                </div>
            </div>

            <div className='photo-comments'>
                <h4>Comments</h4>
                {sessionUser && <AddCommentForm photo={photos[0]}/>}
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
