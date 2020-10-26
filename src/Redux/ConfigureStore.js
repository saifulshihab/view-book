import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Auth } from './auth';
import { Signup } from './signup';
import { profileUpdateReducer, profileInfoReucer } from './profileReducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  getPostReducer,
  getPublicPostReducer,
  postSubmitReducer,
} from './postReducers';

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      auth: Auth,
      signup: Signup,
      userProfileInfo: profileInfoReucer,
      userProfileUpdate: profileUpdateReducer,
      getUserPosts: getPostReducer,
      getPublicPosts: getPublicPostReducer,
      postSubmit: postSubmitReducer,
    }),
    composeWithDevTools(applyMiddleware(thunk))
  );
  return store;
};
