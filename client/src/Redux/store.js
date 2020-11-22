import { createStore, combineReducers, applyMiddleware } from "redux";
import {
  AuthReducer,
  profileCoverUpdateReducer,
  SignupReducer,
} from "../Redux/reducer/userReducer";
import {
  profileUpdateReducer,
  profileInfoUserReducer,
  profileInfoPublicReducer,
  profileDpUpdateReducer,
  userListReducer,
  followOtherReducer,
  unfollowOtherReducer,
} from "../Redux/reducer/userReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  getUserPostReducer,
  getPublicPostReducer,
  postDeatilsReducer,
  postSubmitReducer,
  postDeleteReducer,
  postEditReducer,
  postLikeReducer,
  postUnLikeReducer,
  getCommentsReducer,
  commentPostReducer,
  commentDeleteReducer,
} from "../Redux/reducer/postReducers";

const reducer = combineReducers({
  auth: AuthReducer,
  signup: SignupReducer,
  userProfileInfo: profileInfoUserReducer,
  publicProfileInfo: profileInfoPublicReducer,
  userProfileUpdate: profileUpdateReducer,
  getUserPosts: getUserPostReducer,
  getPublicPosts: getPublicPostReducer,
  postDetails: postDeatilsReducer,
  postSubmit: postSubmitReducer,
  postDelete: postDeleteReducer,
  postEdit: postEditReducer,
  postLike: postLikeReducer,
  postUnLike: postUnLikeReducer,
  profileDpUpdate: profileDpUpdateReducer,
  profileCoverUpdate: profileCoverUpdateReducer,
  usersList: userListReducer,
  followingOthers: followOtherReducer,
  unfollowingOthers: unfollowOtherReducer,
  getComments: getCommentsReducer,
  commentPost: commentPostReducer,
  commentDelete: commentDeleteReducer,
});

const initialState = {
  auth: {
    isAuthenticated: localStorage.getItem("userInfo") ? true : false,
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
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
