import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as albumActions from '../../store/albums';
import { NavLink } from 'react-router-dom';
import "./AllAlbums.css"


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
      <h3>All Albums</h3>
      <ul className="albumClass">
        {albums.map(album => (
          <>
            <NavLink key={album.id} to='/' exact={true} activeClassName='active'>
              <li className="albumLi"
                style={{
                  listStyle: "none", width: "50px", height: "50px", background: `url(${album?.photos?.photos[0]?.photo_url})`, backgroundRepeat: "no-repeat",
                  backgroundSize: "50px 50px", borderRadius: "4px"
                }}>{album.title}

              </li>

            </NavLink>
          </>
        ))}
      </ul>

    </div >
  )
}
