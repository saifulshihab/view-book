import * as ActionType from './ActionTypes';

export const getPostReducer = (
  state = {
    posts: {},
  },
  action
) => {
  switch (action.type) {
    case ActionType.USER_POST_FETCH_REQUEST:
      return { ...state, loading: true };
    case ActionType.USER_POST_FETCH_SUCCESS:
      return { loading: false, posts: action.payload };
    case ActionType.USER_POST_FETCH_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getPublicPostReducer = (
  state = {
    posts: {},
  },
  action
) => {
  switch (action.type) {
    case ActionType.PUBLIC_POST_FETCH_REQUEST:
      return { ...state, loading: true };
    case ActionType.PUBLIC_POST_FETCH_SUCCESS:
      return { loading: false, posts: action.payload };
    case ActionType.PUBLIC_POST_FETCH_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postSubmitReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case ActionType.POST_SUBMIT_REQUEST:
      return { ...state, loading: true };
    case ActionType.POST_SUBMIT_SUCCESS:
      return { loading: false, success: true };
    case ActionType.POST_SUBMIT_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
