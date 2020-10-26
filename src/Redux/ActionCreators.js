import * as ActionType from './ActionTypes';
import { baseURL } from '../shared/baseURL';

//Login User
// export const requestLogin = (creds) => {
//   return {
//     type: ActionType.LOGIN_REQUEST,
//     creds,
//   };
// };
export const loginSuccess = (res) => {
  return {
    type: ActionType.LOGIN_SUCCESS,
    token: res.token,
    username: res.username,
  };
};
export const loginFailed = (message) => {
  return {
    type: ActionType.LOGIN_FAILED,
    message,
  };
};
export const loginUser = (creds) => async (dispatch) => {
  //dispatch requestLogin to kickoff the call to the API

  return await fetch(baseURL + 'users/login', {
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
          let error;
          if (res.status === 401) {
            error = new Error('Invalid username or password!');
          } else {
            error = new Error(res.status + ': ' + res.statusText);
          }
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
        localStorage.setItem('un', res.username);
        // localStorage.setItem('creds', JSON.stringify(creds));
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

// Logout user
export const requestLogout = () => {
  return {
    type: ActionType.LOGOUT_REQUEST,
  };
};
export const logoutSuccess = () => {
  return {
    type: ActionType.LOGOUT_SUCCESS,
  };
};

export const logoutUser = () => (dispatch) => {
  dispatch(requestLogout());
  localStorage.removeItem('vbtoken');
  localStorage.removeItem('creds');
  localStorage.removeItem('un');
  dispatch(logoutSuccess());
};

// User Signup

export const signupSuccess = (message) => {
  return {
    type: ActionType.SIGNUP_SUCCESS,
    message,
  };
};
export const signupFailed = (message) => {
  return {
    type: ActionType.SIGNUP_FAILED,
    message,
  };
};

export const signupUser = (values) => (dispatch) => {
  return fetch(baseURL + 'users/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  })
    .then(
      (res) => {
        if (res.ok) {
          return res;
        } else {
          let error;
          if (res.status === 500) {
            error = new Error('Username already exist!');
          } else {
            error = new Error(res.status + ': ' + res.statusText);
          }
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
        dispatch(signupSuccess(res.status));
      } else {
        const error = new Error(res.status);
        error.response = res;
        throw error;
      }
    })
    .catch((err) => {
      dispatch(signupFailed(err.message));
    });
};

//Profile Data Fetch bu username

export const getProfileInfo = (username) => async (dispatch) => {
  dispatch({
    type: ActionType.PROFILE_FETCH_REQUEST,
  });
  const AuthHeader = `bearer ${localStorage.getItem('vbtoken')}`;
  return await fetch(baseURL + `users/${username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: AuthHeader,
    },
  })
    .then(
      (res) => {
        if (res) {
          return res;
        }
      },
      (err) => {
        throw err;
      }
    )
    .then((res) => res.json())
    .then((res) => {
      dispatch({
        type: ActionType.PROFILE_FETCH_SUCCESS,
        payload: res.user,
      });
    });
};

// Profile update success
export const profileUpdateSuccess = (message) => {
  return {
    type: ActionType.PROFILE_UPDATE_SUCCESS,
    message,
  };
};
// Profile update Failed
export const profileUpdateFailed = (message) => {
  return {
    type: ActionType.PROFILE_UPDATE_FAILED,
    message,
  };
};

export const profileUpdate = (values) => (dispatch) => {
  const AuthHeader = `bearer ${localStorage.getItem('vbtoken')}`;
  return fetch(baseURL + `users/${localStorage.getItem('un')}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: AuthHeader,
    },
    body: JSON.stringify(values),
  })
    .then(
      (res) => {
        if (res.ok) {
          return res;
        }
      },
      (err) => {
        throw err;
      }
    )
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        dispatch(profileUpdateSuccess(res.status));
      } else {
        const error = new Error(res.status);
        error.response = res;
        throw error;
      }
    })
    .catch((err) => {
      dispatch(profileUpdateFailed(err.message));
    });
};

// Fetch single user POst

export const getUserPostsAction = (username) => async (dispatch) => {
  dispatch({
    type: ActionType.USER_POST_FETCH_REQUEST,
  });
  const AuthHeader = `bearer ${localStorage.getItem('vbtoken')}`;
  return await fetch(baseURL + `posts/${username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: AuthHeader,
    },
  })
    .then(
      (res) => {
        if (res) {
          return res;
        }
      },
      (err) => {
        throw err;
      }
    )
    .then((res) => res.json())
    .then((res) => {
      dispatch({
        type: ActionType.USER_POST_FETCH_SUCCESS,
        payload: res,
      });
    })
    .catch((err) => {
      dispatch({
        type: ActionType.USER_POST_FETCH_FAILED,
        payload: err.message,
      });
    });
};

// Fetch public Posts (GET all) (Public)

export const getPublicPostsAction = () => async (dispatch) => {
  dispatch({
    type: ActionType.PUBLIC_POST_FETCH_REQUEST,
  });

  return await fetch(baseURL + `posts`)
    .then(
      (res) => {
        if (res) {
          return res;
        }
      },
      (err) => {
        throw err;
      }
    )
    .then((res) => res.json())
    .then((res) => {
      dispatch({
        type: ActionType.PUBLIC_POST_FETCH_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: ActionType.PUBLIC_POST_FETCH_FAILED,
        payload: err.message,
      });
    });
};

// POst Submit Aciton (Private)
export const postSubmitAction = (data) => async (dispatch) => {
  dispatch({
    type: ActionType.POST_SUBMIT_REQUEST,
  });
  const AuthHeader = `bearer ${localStorage.getItem('vbtoken')}`;
  return await fetch(baseURL + `posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: AuthHeader,
    },
    body: JSON.stringify(data),
  })
    .then(
      (res) => {
        if (res) {
          return res;
        }
      },
      (err) => {
        throw err;
      }
    )
    .then((res) => res.json())
    .then((res) => {
      dispatch({ type: ActionType.POST_SUBMIT_SUCCESS });
    })
    .catch((err) => {
      dispatch({
        type: ActionType.POST_SUBMIT_FAILED,
        payload: err.message,
      });
    });
};
