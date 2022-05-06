
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';



const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/home' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        {!sessionUser &&
          <div>
            <li>
              <NavLink to='/login' exact={true} activeClassName='active'>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to='/sign-up' exact={true} activeClassName='active'>
                Sign Up
              </NavLink>
            </li>
          </div>
        }
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to='/allAlbums' exact={true} activeClassName='active'>
            All Albums
          </NavLink>
        </li>
        <li>
          <NavLink to='/test' exact={true} activeClassName='active'>
            Test
          </NavLink>
        </li>
        {sessionUser &&
          <li>
            <LogoutButton />
          </li>}
      </ul>
    </nav>
  );
}

export default NavBar;
