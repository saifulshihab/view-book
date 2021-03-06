import {
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  SIGNUP_FAILED,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_FAILED,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_FETCH_USER_REQUEST,
  PROFILE_FETCH_USER_SUCCESS,
  PROFILE_FETCH_USER_FAILED,
  PROFILE_FETCH_USER_RESET,
  PROFILE_FETCH_PUBLIC_REQUEST,
  PROFILE_FETCH_PUBLIC_SUCCESS,
  PROFILE_FETCH_PUBLIC_FAILED,
  PROFILE_FETCH_PUBLIC_RESET,
  PROFILE_UPDATE_RESET,
  PROFILE_DP_UPDATE_REQUEST,
  PROFILE_DP_UPDATE_SUCCESS,
  PROFILE_DP_UPDATE_FAILED,
  PROFILE_DP_UPDATE_RESET,
  PROFILE_COVER_UPDATE_REQUEST,
  PROFILE_COVER_UPDATE_SUCCESS,
  PROFILE_COVER_UPDATE_FAILED,
  PROFILE_COVER_UPDATE_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAILED,
  FOLLOW_OTHERS_REQUEST,
  FOLLOW_OTHERS_SUCCESS,
  FOLLOW_OTHERS_FAILED,
  FOLLOW_OTHERS_RESET,
  UNFOLLOW_OTHERS_REQUEST,
  UNFOLLOW_OTHERS_SUCCESS,
  UNFOLLOW_OTHERS_FAILED,
  UNFOLLOW_OTHERS_RESET,
} from '../ActionTypes';

export const AuthReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true };
    case LOGIN_SUCCESS:
      return {
        isAuthenticated: true,
        loading: false,
        userInfo: action.payload,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };
    case LOGOUT_REQUEST:
      return { ...state, isAuthenticated: true };
    case LOGOUT_SUCCESS:
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
};

export const SignupReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return { loading: true };
    case SIGNUP_SUCCESS:
      return { loading: false, success: action.payload };
    case SIGNUP_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const profileInfoUserReducer = (
  state = {
    user: { social: [], education: [], following: [], followers: [] },
  },
  action
) => {
  switch (action.type) {
    case PROFILE_FETCH_USER_REQUEST:
      return { loading: true };
    case PROFILE_FETCH_USER_SUCCESS:
      return { loading: false, user: action.payload };
    case PROFILE_FETCH_USER_FAILED:
      return { loading: false, error: action.payload };
    case PROFILE_FETCH_USER_RESET:
      return {
        user: { social: [], education: [], following: [], followers: [] },
      };
    default:
      return state;
  }
};

export const profileInfoPublicReducer = (
  state = {
    user: { social: [], education: [], following: [], followers: [] },
  },
  action
) => {
  switch (action.type) {
    case PROFILE_FETCH_PUBLIC_REQUEST:
      return { loading: true };
    case PROFILE_FETCH_PUBLIC_SUCCESS:
      return { loading: false, user: action.payload };
    case PROFILE_FETCH_PUBLIC_FAILED:
      return { loading: false, error: action.payload };
    case PROFILE_FETCH_PUBLIC_RESET:
      return {
        user: { social: [], education: [], following: [], followers: [] },
      };
    default:
      return state;
  }
};

export const profileUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_UPDATE_REQUEST:
      return { loading: true };
    case PROFILE_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case PROFILE_UPDATE_FAILED:
      return { loading: false, error: action.payload };
    case PROFILE_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const profileDpUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_DP_UPDATE_REQUEST:
      return { loading: true };
    case PROFILE_DP_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case PROFILE_DP_UPDATE_FAILED:
      return { loading: false, error: action.payload };
    case PROFILE_DP_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const profileCoverUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_COVER_UPDATE_REQUEST:
      return { loading: true };
    case PROFILE_COVER_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case PROFILE_COVER_UPDATE_FAILED:
      return { loading: false, error: action.payload };
    case PROFILE_COVER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_LIST_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const followOtherReducer = (state = {}, action) => {
  switch (action.type) {
    case FOLLOW_OTHERS_REQUEST:
      return { loading: true };
    case FOLLOW_OTHERS_SUCCESS:
      return { loading: false, success: true };
    case FOLLOW_OTHERS_FAILED:
      return { loading: false, error: action.payload };
    case FOLLOW_OTHERS_RESET:
      return {};
    default:
      return state;
  }
};

export const unfollowOtherReducer = (state = {}, action) => {
  switch (action.type) {
    case UNFOLLOW_OTHERS_REQUEST:
      return { loading: true };
    case UNFOLLOW_OTHERS_SUCCESS:
      return { loading: false, success: true };
    case UNFOLLOW_OTHERS_FAILED:
      return { loading: false, error: action.payload };
    case UNFOLLOW_OTHERS_RESET:
      return {};
    default:
      return state;
  }
};
