import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllPhotosThunk } from '../../store/photos';
import './UserPhotos.css'

function UserPhotos({photos}) {
  const dispatch = useDispatch()

  const user_id = useSelector(state => state.session?.user.id);
  const filteredPhotos = photos?.filter(photo => photo?.user_id === user_id )


  useEffect(() => {
    dispatch(getAllPhotosThunk())
  }, [dispatch])

  return (
    <>
      <div id="user-photos-title">
        My Photos
      </div>
      <div>
        <ul>
          { filteredPhotos?.map(photo => (
            <li key={photo?.id}>
              <img src={photo?.photo_url} alt={photo.title}/>
            </li>
          )) }
        </ul>
      </div>
    </>
  )
}

export default UserPhotos;
