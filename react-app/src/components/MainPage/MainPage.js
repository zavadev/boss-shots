import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPhotosThunk } from '../../store/photos';
import AddPhotoModal from '../AddPhotoModal'
import './MainPage.css';

function MainPage () {
  const dispatch = useDispatch();

  const photos = useSelector(state => Object.values(state.photos))

  useEffect(() => {
    dispatch(getAllPhotosThunk())
  }, [dispatch])

  return (
    <>
      <div className="add-photo-div">
        <AddPhotoModal />
      </div>
      <div className="photo-feed">
        <ul className="feed-ul">
          {photos?.map(photo => (
            <li key={photo.id}>
              <img src={photo.photo_url} className="photo-source" alt={photo.title}/>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default MainPage;
