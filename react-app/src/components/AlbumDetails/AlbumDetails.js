import React, { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSingleAlbum } from '../../store/albums';
import EditAlbumModal from '../EditAlbumModal';
import DeleteAlbumModal from '../DeleteAlbumModal';
import AddPhotoToAlbumModal from "../AddPhotoToAlbum"
import './AlbumDetails.css';
import DeadEnd from '../404Page/DeadEnd';

function AlbumDetails() {
  const dispatch = useDispatch();
  const { album_id } = useParams();
  const album = useSelector(state => state.albums[album_id]);
  const photos = album?.photos?.photos?.map(photo => ({ id: photo.id, photo_url: photo.photo_url, title: photo.title }));

  useEffect(() => {
    dispatch(getSingleAlbum(album_id))
  }, [dispatch])

  if(!album){
    return(
      <DeadEnd/>
    )
  }

  return (
    <>
      <div id="album-details-container">
        <div id="album-details-title">
          <h3>{album?.title}</h3>
        </div>
        <div>
          <EditAlbumModal album={album} />
        </div>
        <div>
          <DeleteAlbumModal album={album} id={album_id} />
        </div>
        <div>
          <AddPhotoToAlbumModal id={album_id}></AddPhotoToAlbumModal>
        </div>
        <div id="album-photos-div">
          <dl id="album-dl">
            {photos?.map(photo => (
              <>
                <NavLink key={photo.id} to={`/photos/${photo.id}`} ><dt >
                  <img src={photo?.photo_url} alt={photo.title} className="album-images" />
                </dt> </NavLink>
              </>
            ))}
          </dl>
        </div>
      </div>
    </>
  )
}

export default AlbumDetails;
