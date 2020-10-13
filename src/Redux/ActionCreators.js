import * as ActionType from './ActionTypes';
import { baseURL } from '../shared/baseURL';

//Login User

export const requestLogin = (creds) => {
  return {
    type: ActionType.LOGIN_REQUEST,
    creds,
  };
};
export const loginSuccess = (res) => {
  return {
    type: ActionType.LOGIN_SUCCESS,
    token: res.token,
  };
};
export const loginFailed = (message) => {
  return {
    type: ActionType.LOGIN_FAILED,
    message,
  };
};
export const loginUser = (creds) => (dispatch) => {
  //dispatch requestLogin to kickoff the call to the API
  dispatch(requestLogin(creds));

  return fetch(baseURL + 'users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(creds),
  })
    .then(
      (res) => {
        if (res.ok) {
          return res;
        } else {
          const error = new Error(res.status + ': ' + res.statusText);
          error.response = res;
          throw error;
        }
      },
      (err) => {
        throw err;
      }
    )
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        //if response is all ok with creds
        localStorage.setItem('vbtoken', res.token);
        localStorage.setItem('creds', JSON.stringify(creds));
        dispatch(loginSuccess(res));
      } else {
        const error = new Error(res.status);
        error.response = res;
        throw error;
      }
    })
    .catch((error) => {
      dispatch(loginFailed(error.message));
    });
};
