import {
  LIKE_POST_FAILED,
  LIKE_POST_SUCCESS,
  LIKE_POST_RESET,
  UNLIKE_POST_FAILED,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_RESET,
  POST_DELETE_FAILED,
  POST_DELETE_REQUEST,
  POST_DELETE_RESET,
  POST_DELETE_SUCCESS,
  POST_DETAILS_FAILED,
  POST_DETAILS_REQUEST,
  POST_DETAILS_RESET,
  POST_DETAILS_SUCCESS,
  POST_EDIT_FAILED,
  POST_EDIT_REQUEST,
  POST_EDIT_RESET,
  POST_EDIT_SUCCESS,
  POST_SUBMIT_FAILED,
  POST_SUBMIT_REQUEST,
  POST_SUBMIT_RESET,
  POST_SUBMIT_SUCCESS,
  PUBLIC_POST_FETCH_FAILED,
  PUBLIC_POST_FETCH_REQUEST,
  PUBLIC_POST_FETCH_SUCCESS,
  USER_POST_FETCH_FAILED,
  USER_POST_FETCH_REQUEST,
  USER_POST_FETCH_SUCCESS,
  COMMENTS_FETCH_REQUEST,
  COMMENTS_FETCH_SUCCESS,
  COMMENTS_FETCH_FAILED,
} from "../ActionTypes";

export const getUserPostReducer = (
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

export const postSubmitReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_SUBMIT_REQUEST:
      return { loading: true };
    case POST_SUBMIT_SUCCESS:
      return { loading: false, success: true };
    case POST_SUBMIT_FAILED:
      return { loading: false, error: action.payload };
    case POST_SUBMIT_RESET:
      return {};
    default:
      return state;
  }
};

export const postDeatilsReducer = (
  state = {
    post: { user: {}, comment: [] },
  },
  action
) => {
  switch (action.type) {
    case POST_DETAILS_REQUEST:
      return { ...state, loading: true };
    case POST_DETAILS_SUCCESS:
      return { loading: false, post: action.payload };
    case POST_DETAILS_FAILED:
      return { loading: false, error: action.payload };
    case POST_DETAILS_RESET:
      return { post: {} };
    default:
      return state;
  }
};

export const postDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_DELETE_REQUEST:
      return { loading: true };
    case POST_DELETE_SUCCESS:
      return { loading: false, success: true };
    case POST_DELETE_FAILED:
      return { loading: false, error: action.payload };
    case POST_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const postEditReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_EDIT_REQUEST:
      return { loading: true };
    case POST_EDIT_SUCCESS:
      return { loading: false, success: true };
    case POST_EDIT_FAILED:
      return { loading: false, error: action.payload };
    case POST_EDIT_RESET:
      return {};
    default:
      return state;
  }
};

export const postLikeReducer = (state = {}, action) => {
  switch (action.type) {
    case LIKE_POST_SUCCESS:
      return { success: true };
    case LIKE_POST_FAILED:
      return { error: action.payload };
    case LIKE_POST_RESET:
      return {};
    default:
      return state;
  }
};

export const postUnLikeReducer = (state = {}, action) => {
  switch (action.type) {
    case UNLIKE_POST_SUCCESS:
      return { success: true };
    case UNLIKE_POST_FAILED:
      return { error: action.payload };
    case UNLIKE_POST_RESET:
      return {};
    default:
      return state;
  }
};

export const getCommentsReducer = (state = {}, action) => {
  switch (action.type) {
    case COMMENTS_FETCH_REQUEST:
      return { loading: true };
    case COMMENTS_FETCH_SUCCESS:
      return { loading: false, comments: action.payload };
    case COMMENTS_FETCH_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
