import React, { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPhotosThunk } from '../../store/photos';
import './AlbumDetails.css';

function AlbumDetails() {
  const dispatch = useDispatch();
  const albumId = useParams();
  const photos = useSelector(state => Object.values(state.albums.photos))
  const filteredPhotos = photos?.filter(photo => photo?.album_id === albumId)
  console.log("======>>>>>>>>>", filteredPhotos);

  useEffect(() => {
    dispatch(getAllPhotosThunk())
  }, [dispatch])


  return (
    <>
      <h3>ALBUM DETAILS</h3>
      <ul>
        { filteredPhotos?.map(photo => (
          <li key={photo?.id}>
            <img src={photo?.photo_url} alt={photo.title}/>
          </li>
        )) }
      </ul>
    </>
  )
}

export default AlbumDetails;
