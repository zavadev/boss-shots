import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPhotosThunk } from '../../store/photos';
import { getAllAlbums } from '../../store/albums';
import AddPhotoModal from '../AddPhotoModal'
import AddAlbumModal from '../AddAlbumModel.js';
import './MainPage.css';

function MainPage() {
  const dispatch = useDispatch();

  const photos = useSelector(state => Object.values(state.photos))
  const albums = useSelector(state => Object.values(state.albums))

  useEffect(() => {
    dispatch(getAllPhotosThunk())
    dispatch(getAllAlbums())
  }, [dispatch])
  // let url = albums[0]?.photos?.photos[0]?.photo_url
  // if (!url) {
  //   url = "https://www.shutterbug.com/images/photo_post/[uid]/N9010100_mod4.jpg"
  // }
  // console.log(url)


  return (
    <>
      <div className="add-photo-div">
        <AddPhotoModal />
      </div>
      <div className="photo-feed">
        <ul className="feed-ul">
          {photos?.map(photo => (
            <li key={photo.id} >
              <img src={photo.photo_url} className="photo-source" alt={photo.title} />
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Albums</h3>
        <AddAlbumModal></AddAlbumModal>

        <ul className="albumClass">
          {albums.map(album => (


            <NavLink to='/' exact={true} activeClassName='active'>

              <li key={album.id} className="albumLi"
                style={{
                  listStyle: "none", width: "50px", height: "50px", background: `url(${album?.photos?.photos[0]?.photo_url})`, backgroundRepeat: "no-repeat",
                  backgroundSize: "50px 50px", borderRadius: "4px"
                }}>{album.title}</li>

            </NavLink>
          ))}
        </ul>
      </div>
    </>
  )
}

export default MainPage;
