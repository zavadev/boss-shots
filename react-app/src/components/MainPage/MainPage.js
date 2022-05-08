import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPhotosThunk } from '../../store/photos';
import { getAllAlbums } from '../../store/albums';

import UserPhotos from '../UserPhotos/UserPhotos';
import DisplayAlbums from '../DisplayAlbums/DisplayAlbums';
import './MainPage.css';

function MainPage() {
  const dispatch = useDispatch();
  const albums = useSelector(state => Object.values(state.albums))
  const photos = useSelector(state => Object.values(state.photos))
  const sessionUser = useSelector(state => state?.session?.user);

  useEffect(() => {
    dispatch(getAllAlbums())
    dispatch(getAllPhotosThunk())
  }, [dispatch])


  return (
    <>

      <div id="main-page-container">
        <div className="photo-feed">
          <ul className="feed-ul">
            {photos?.map(photo => (
              <NavLink key={photo.id} to={`/photos/${photo.id}`} className="photo-display-main"> <li >
                <img src={photo.photo_url} className="photo-source" alt={photo.title} />
              </li>
              </NavLink>
            ))}
          </ul>
        </div>
        {sessionUser && (
          <>
            <div id="user-photos-div">

              <UserPhotos photos={photos} />

            </div>
            <div id="my-albums-div">
              <DisplayAlbums albums={albums} />
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default MainPage;

// {user_id && <div className="add-photo-div">
// <AddPhotoModal />
// </div>}
