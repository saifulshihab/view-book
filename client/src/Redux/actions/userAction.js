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
  PROFILE_DP_UPDATE_REQUEST,
  PROFILE_DP_UPDATE_SUCCESS,
  PROFILE_DP_UPDATE_FAILED,
  PROFILE_COVER_UPDATE_REQUEST,
  PROFILE_COVER_UPDATE_SUCCESS,
  PROFILE_COVER_UPDATE_FAILED,
  SIGNUP_FAILED,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAILED,
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
      payload: data,
    });
    localStorage.setItem('userInfo', JSON.stringify(data));
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

    localStorage.removeItem('userInfo');

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
export const getProfileInfoUser = (username) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROFILE_FETCH_USER_REQUEST,
    });

    const {
      auth: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
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
export const getProfileInfoPublic = (username) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: PROFILE_FETCH_PUBLIC_REQUEST,
    });
    const {
      auth: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
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
export const profileUpdate = (values) => async (dispatch, getState) => {
  try {
    const {
      auth: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(`users/${userInfo.username}`, values, config);

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

//user profile dp update
export const updateProfileDp = (dp) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROFILE_DP_UPDATE_REQUEST,
    });
    const {
      auth: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(`users/${userInfo._id}/dp`, { dp }, config);

    dispatch({
      type: PROFILE_DP_UPDATE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_DP_UPDATE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//user profile cover update
export const updateProfileCover = (cover) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROFILE_COVER_UPDATE_REQUEST,
    });
    const {
      auth: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(`users/${userInfo._id}/cover`, { cover }, config);

    dispatch({
      type: PROFILE_COVER_UPDATE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_COVER_UPDATE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//GET users list
export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    });
    const {
      auth: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`users/`, config);

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
