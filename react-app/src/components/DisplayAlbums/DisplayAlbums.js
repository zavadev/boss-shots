import React, { useEffect } from 'react';
import { getAllAlbums } from "../../store/albums"
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom"
import AddAlbumModal from '../AddAlbumModal.js/index.js';

import "./DisplayAlbums.css"


export default function DisplayAlbums({ albums }) {
    const dispatch = useDispatch();
    const albums1 = useSelector(state => Object.values(state?.albums))
    const userId = useSelector(state => state.session?.user?.id)
    const myAlbums = albums1.filter(album => album.user_id === userId);


    useEffect(() => {
        dispatch(getAllAlbums())
    }, [dispatch])


    return (
        <div>
            <h3>My Albums</h3>
            {userId && <AddAlbumModal/>}


            <ul className="albumClass">
                {myAlbums?.map(album => (
                    <>

                        <NavLink key={album.id} to={`/albums/${album.id}`} exact={true} activeClassName='active'>
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
        </div>
    )
}
