import * as ActionType from './ActionTypes';

export const Signup = (
  state = {
    errMessage: null,
    successMessage: null,
  },
  action
) => {
  switch (action.type) {
    case ActionType.SIGNUP_SUCCESS:
      return { ...state, errMessage: null, successMessage: action.message };
    case ActionType.SIGNUP_FAILED:
      return { ...state, errMessage: action.message, successMessage: null };
    default:
      return state;
  }
};
