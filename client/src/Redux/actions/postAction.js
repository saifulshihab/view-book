import axios from 'axios';

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

// Fetch public Posts (GET all) (Public)
export const getPublicPostsAction = () => async (dispatch) => {
  try {
    dispatch({
      type: PUBLIC_POST_FETCH_REQUEST,
    });

    const AuthHeader = `Bearer ${localStorage.getItem('vbtoken')}`;
    const config = {
      headers: {
        Authorization: AuthHeader,
      },
    };
    const { data } = await axios.get(`/posts`, config);

    dispatch({
      type: PUBLIC_POST_FETCH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PUBLIC_POST_FETCH_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Fetch single user POst

export const getUserPostsAction = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: USER_POST_FETCH_REQUEST,
    });

    const AuthHeader = `bearer ${localStorage.getItem('vbtoken')}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: AuthHeader,
      },
    };
    const { data } = await axios.get(`/posts/${userId}`, config);

    dispatch({
      type: USER_POST_FETCH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_POST_FETCH_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// POst Submit Aciton (Private)
export const postSubmitAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: POST_SUBMIT_REQUEST,
    });

    const AuthHeader = `bearer ${localStorage.getItem('vbtoken')}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: AuthHeader,
      },
    };
    await axios.post('/posts', data, config);

    dispatch({
      type: POST_SUBMIT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: POST_SUBMIT_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
