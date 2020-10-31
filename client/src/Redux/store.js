import { createStore, combineReducers, applyMiddleware } from 'redux';
import { AuthReducer, SignupReducer } from '../Redux/reducer/userReducer';
import {
  profileUpdateReducer,
  profileInfoUserReducer,
  profileInfoPublicReducer,
} from '../Redux/reducer/userReducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  getPostReducer,
  getPublicPostReducer,
  postSubmitReducer,
  postDeleteReducer,
} from '../Redux/reducer/postReducers';

const reducer = combineReducers({
  auth: AuthReducer,
  signup: SignupReducer,
  userProfileInfo: profileInfoUserReducer,
  publicProfileInfo: profileInfoPublicReducer,
  userProfileUpdate: profileUpdateReducer,
  getUserPosts: getPostReducer,
  getPublicPosts: getPublicPostReducer,
  postSubmit: postSubmitReducer,
  postDelete: postDeleteReducer,
});

const initialState = {
  auth: {
    isAuthenticated: localStorage.getItem('userInfo') ? true : false,
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : {},
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
