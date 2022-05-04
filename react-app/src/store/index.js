import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import albumReducer from './albums'
import photosReducer from './photos';
import commentsReducer from './comments';
import tagReducer from './tags';

const rootReducer = combineReducers({
  'session': session,
  'photos': photosReducer,
  'comments': commentsReducer,
  albums: albumReducer,
  tags: tagReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
