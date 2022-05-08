import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { getAllPhotosThunk } from '../../store/photos';
import AddPhotoModal from '../AddPhotoModal'
import './UserPhotos.css'

function UserPhotos({ photos }) {
  const dispatch = useDispatch()

  const user_id = useSelector(state => state.session?.user?.id);
  const filteredPhotos = photos?.filter(photo => photo?.user_id === user_id)


  useEffect(() => {
    dispatch(getAllPhotosThunk())
  }, [dispatch])

  return (
    <>
      <div id="user-photos-title">
        <h3>My Photos </h3>

        {user_id && <div className="add-photo-div">
          <div><AddPhotoModal /></div>

        </div>}

      </div>
      <dl id="my-photos-ul">
        {filteredPhotos?.map(photo => (
          <dt key={photo?.id}>
            <NavLink to={`/photos/${photo.id}`}><img src={photo?.photo_url} className="my-filtered-photos" alt={photo.title} /></NavLink>
          </dt>
        ))}
      </dl>
    </>
  )
}

export default UserPhotos;
