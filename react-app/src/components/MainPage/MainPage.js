import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPhotosThunk } from '../../store/photos';
import { getAllAlbums } from '../../store/albums';
import AddPhotoModal from '../AddPhotoModal'
import UserPhotos from '../UserPhotos/UserPhotos';
import DisplayAlbums from '../DisplayAlbums/DisplayAlbums';
import AlbumList from "../AllAlbums/AllAlbums"
import './MainPage.css';

function MainPage() {
  const dispatch = useDispatch();
  // const state = useSelector(state => state)
  const albums = useSelector(state => Object.values(state.albums))
  const photos = useSelector(state => Object.values(state.photos))
  const user_id = useSelector(state => state?.session?.user);


  // const albums = Object.values(state.albums)
  useEffect(() => {
    dispatch(getAllAlbums())
    dispatch(getAllPhotosThunk())

  }, [dispatch])
  // useEffect(() => {

  //   setAlbums([...Object.values(albumsObj)])

  // }, [dispatch, albumsObj])


  return (
    <>
      {user_id && <div className="add-photo-div">
        <AddPhotoModal />
      </div>}
      <div className="photo-feed">
        <ul className="feed-ul">
          {photos?.map(photo => (
            <NavLink key={photo.id} to={`/photos/${photo.id}`}> <li >
              <img src={photo.photo_url} className="photo-source" alt={photo.title} />
            </li>
            </NavLink>
          ))}
        </ul>
      </div>
      <div id="user-photos-div">
        <UserPhotos photos={photos} />
      </div>
      <div>
        <DisplayAlbums albums={albums} />
      </div>

    </>
  )
}

export default MainPage;
