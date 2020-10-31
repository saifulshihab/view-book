import { createStore, combineReducers, applyMiddleware } from 'redux';
import { AuthReducer, SignupReducer } from '../Redux/reducer/userReducer';
import {
  profileUpdateReducer,
  profileInfoUserReducer,
  profileInfoPublicReducer
} from '../Redux/reducer/userReducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  getPostReducer,
  getPublicPostReducer,
  postSubmitReducer,
} from '../Redux/reducer/postReducers';

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      auth: AuthReducer,
      signup: SignupReducer,
      userProfileInfo: profileInfoUserReducer,
      publicProfileInfo: profileInfoPublicReducer,
      userProfileUpdate: profileUpdateReducer,
      getUserPosts: getPostReducer,
      getPublicPosts: getPublicPostReducer,
      postSubmit: postSubmitReducer,
    }),
    composeWithDevTools(applyMiddleware(thunk))
  );
  return store;
};
