import * as ActionType from './ActionTypes';

export const profileInfoReucer = (
  state = {
    user: {},
  },
  action
) => {
  switch (action.type) {
    case ActionType.PROFILE_FETCH_REQUEST:
      return { ...state, loading: true };
    case ActionType.PROFILE_FETCH_SUCCESS:
      return { loading: false, user: action.payload };
    default:
      return state;
  }
};

export const profileUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionType.PROFILE_UPDATE_SUCCESS:
      return { successMessage: action.message };
    case ActionType.PROFILE_UPDATE_FAILED:
      return { errMessage: action.message };
    default:
      return state;
  }
};
