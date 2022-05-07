import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import MainPage from './components/MainPage/MainPage.js'
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import AlbumDetails from './components/AlbumDetails/AlbumDetails';
import PhotoDetail from './components/PhotoDetail/PhotoDetail';
import DisplayAlbums from './components/DisplayAlbums/DisplayAlbums';
import AllTaggedPhotos from './components/AllTaggedPhotos/AllTaggedPhotos'
import DeadEnd from './components/404Page/DeadEnd';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/allAlbums' exact={true}>
          <DisplayAlbums />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/photos/:photo_id' exact={true}>
          <PhotoDetail />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
        </ProtectedRoute>
        <Route path='/home' exact={true} >
          <MainPage />
        </Route>
        <Route path='/albums/:album_id' exact={true}>
          <AlbumDetails />
        </Route>
        <Route path='/tags/:tag_id/photos' exact={true}>
          <AllTaggedPhotos />
        </Route>
        <Route>
          <DeadEnd/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
