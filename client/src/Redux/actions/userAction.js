import axios from 'axios';
// import { baseURL } from '../../shared/baseURL';
import {
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  PROFILE_FETCH_PUBLIC_FAILED,
  PROFILE_FETCH_PUBLIC_REQUEST,
  PROFILE_FETCH_PUBLIC_SUCCESS,
  PROFILE_FETCH_USER_FAILED,
  PROFILE_FETCH_USER_REQUEST,
  PROFILE_FETCH_USER_SUCCESS,
  PROFILE_UPDATE_FAILED,
  PROFILE_UPDATE_SUCCESS,
  SIGNUP_FAILED,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from '../ActionTypes';

export const loginUser = (creds) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/users/login', creds, config);

    dispatch({
      type: LOGIN_SUCCESS,
      token: data.token,
      username: data.username,
    });

    localStorage.setItem('vbtoken', data.token);
    localStorage.setItem('un', data.username);
  } catch (error) {
    dispatch({
      type: LOGIN_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({
      type: LOGOUT_REQUEST,
    });

    localStorage.removeItem('vbtoken');
    localStorage.removeItem('un');

    dispatch({
      type: LOGOUT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signupUser = (values) => async (dispatch) => {
  try {
    dispatch({
      type: SIGNUP_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    await axios.post('/users/signup', values, config);

    dispatch({
      type: SIGNUP_SUCCESS,
      payload: true,
    });
  } catch (error) {
    dispatch({
      type: SIGNUP_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//Profile Data Fetch by username / only user
export const getProfileInfoUser = (username) => async (dispatch) => {
  try {
    dispatch({
      type: PROFILE_FETCH_USER_REQUEST,
    });

    const AuthHeader = `bearer ${localStorage.getItem('vbtoken')}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: AuthHeader,
      },
    };
    const { data } = await axios.get(`/users/${username}`, config);

    dispatch({
      type: PROFILE_FETCH_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_FETCH_USER_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//Profile Data Fetch by username / public
export const getProfileInfoPublic = (username) => async (dispatch) => {
  try {
    dispatch({
      type: PROFILE_FETCH_PUBLIC_REQUEST,
    });

    const AuthHeader = `bearer ${localStorage.getItem('vbtoken')}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: AuthHeader,
      },
    };
    const { data } = await axios.get(`/users/${username}`, config);

    dispatch({
      type: PROFILE_FETCH_PUBLIC_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_FETCH_PUBLIC_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//user profile update
export const profileUpdate = (values) => async (dispatch) => {
  try {
    const AuthHeader = `bearer ${localStorage.getItem('vbtoken')}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: AuthHeader,
      },
    };
    await axios.put(`users/${localStorage.getItem('un')}`, values, config);

    dispatch({
      type: PROFILE_UPDATE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_UPDATE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
