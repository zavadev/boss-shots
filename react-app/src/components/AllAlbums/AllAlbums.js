import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as albumActions from '../../store/albums';

export default function AlbumList() {
  // const [albums, setAlbums] = useState([])
  const dispatch = useDispatch()
  const state = useSelector(state => state)

  const albums = Object.values(state.albums)
  useEffect(() => {
    dispatch(albumActions.getAllAlbums())
  }, [dispatch])

  return (
    <div>
      <ul>
        {albums.map(album => (
          <li key={album?.id}>
            <h1>{album.title}</h1>
          </li>
        ))}
      </ul>

    </div>
  )
}
