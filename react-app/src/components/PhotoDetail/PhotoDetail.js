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
import {addTagToPhoto, removeTagFromPhoto} from '../../store/photos'


function PhotoDetail() {
    const photo_id = useParams();
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const sessionUser = useSelector(state => state.session.user);
    const photos = useSelector(state => Object.values(state.photos))
    const tags = useSelector(state => Object.values(state.tags))

    const comments = useSelector(state => Object.values(state.comments))

    let mainPhoto = photos?.filter(photo =>{
        if(photo?.id === parseInt( photo_id?.photo_id)){
            return photo;
        }
    });

    const my_tags = mainPhoto[0]?.tags

    let photoComments = comments?.filter(comment =>{

        if(comment?.photo_id === mainPhoto[0]?.id){
            return comment;
        }
    });

    const owner = users?.filter(user =>{
            if(mainPhoto[0]?.user_id === user?.id){
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
                <h1>{mainPhoto[0]?.title}</h1>
                <img src={mainPhoto[0]?.photo_url} alt={mainPhoto[0]?.title}/>
                {users?.map(user =>{
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
                <div>
                    <select onChange={(e) => dispatch(addTagToPhoto(photo_id.photo_id, +e.target.value))}>
                        <option value="none" selected disabled>Add a tag</option>
                        {tags?.map(tag => (<option value={tag?.id} key={tag?.id} >
                            {tag?.tag_name}
                        </option>))}
                    </select>
                </div>
                <div>
                    {my_tags?.map(tag => (
                        <>
                            <NavLink to={'/'} key={tag.id}>{tag.tag_name}</NavLink>
                            <button onClick={() => dispatch(removeTagFromPhoto(photo_id.photo_id, tag.id))}>RemoveTag</button>
                        </>
                    ))}
                </div>
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
