import React, { useEffect } from 'react';
import { NavLink } from "react-router-dom"
import AddAlbumModal from '../AddAlbumModal.js/index.js';
import EditAlbumModel from "../EditAlbumsModel"
import "./DisplayAlbums.css"


export default function DisplayAlbums({ albums }) {
    // const dispatch = useDispatch();
    // const albums = useSelector(state => state?.albums)

    // useEffect(() => {
    //     dispatch(getAllAlbums())
    // }, [dispatch])


    return (
        <div>
            <h3>Albums</h3>
            <AddAlbumModal></AddAlbumModal>

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
                        <EditAlbumModel album={album}></EditAlbumModel>
                    </>
                ))}
            </ul>
        </div>
    )
}
