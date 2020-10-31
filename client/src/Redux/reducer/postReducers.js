import {
  POST_SUBMIT_FAILED,
  POST_SUBMIT_REQUEST,
  POST_SUBMIT_SUCCESS,
  PUBLIC_POST_FETCH_FAILED,
  PUBLIC_POST_FETCH_REQUEST,
  PUBLIC_POST_FETCH_SUCCESS,
  USER_POST_FETCH_FAILED,
  USER_POST_FETCH_REQUEST,
  USER_POST_FETCH_SUCCESS,
} from '../ActionTypes';

export const getPostReducer = (
  state = {
    posts: [],
  },
  action
) => {
  switch (action.type) {
    case USER_POST_FETCH_REQUEST:
      return { ...state, loading: true };
    case USER_POST_FETCH_SUCCESS:
      return { loading: false, posts: action.payload };
    case USER_POST_FETCH_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getPublicPostReducer = (
  state = {
    posts: [],
  },
  action
) => {
  switch (action.type) {
    case PUBLIC_POST_FETCH_REQUEST:
      return { ...state, loading: true };
    case PUBLIC_POST_FETCH_SUCCESS:
      return { loading: false, posts: action.payload };
    case PUBLIC_POST_FETCH_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postSubmitReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case POST_SUBMIT_REQUEST:
      return { ...state, loading: true };
    case POST_SUBMIT_SUCCESS:
      return { loading: false, success: true };
    case POST_SUBMIT_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
