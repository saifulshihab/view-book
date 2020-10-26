import * as ActionTypes from './ActionTypes';

export const Auth = (
  state = {
    isAuthenticated: localStorage.getItem('vbtoken') ? true : false,
    username: localStorage.getItem('un') ? localStorage.getItem('un') : null,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        token: action.token,
        isLoading: false,
        username: action.username,
      };
    case ActionTypes.LOGIN_FAILED:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        errMessage: action.message,
      };
    case ActionTypes.LOGOUT_REQUEST:
      return { ...state, isAuthenticated: true };
    case ActionTypes.LOGOUT_SUCCESS:
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
};
