import React from 'react';
import {NavLink} from 'react-router-dom';
import './SplashPage.css';

function SplashPage() {
  return (
    <>
      <div id="splash-main-div">
        <img src='../../../public/boss-shots.png' alt="boss-shots-logo" id="splash-logo" style={{width: "600px", height: "auto"}}/>
        <div id="splash-slogan">Beat the Boss,</div>
        <div id="splash-slogan-two">Share the Battle</div>
        <div id="splash-links-div">
          <NavLink to='/login' className="splash-links" exact={true}>Log In</NavLink>
          <NavLink to='/sign-up' className="splash-links" exact={true}>Sign Up</NavLink>
        </div>
      </div>
    </>
  )
}

export default SplashPage;
