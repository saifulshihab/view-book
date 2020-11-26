import axios from "axios";

import {
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILED,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAILED,
  LIKE_POST_RESET,
  UNLIKE_POST_RESET,
  POST_DELETE_FAILED,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_DETAILS_FAILED,
  POST_DETAILS_REQUEST,
  POST_DETAILS_SUCCESS,
  POST_EDIT_FAILED,
  POST_EDIT_REQUEST,
  POST_EDIT_SUCCESS,
  POST_SUBMIT_FAILED,
  POST_SUBMIT_REQUEST,
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
  COMMENT_REQUEST,
  COMMENT_SUCCESS,
  COMMENT_FAILED,
  COMMENT_DELETE_REQUEST,
  COMMENT_DELETE_SUCCESS,
  COMMENT_DELETE_FAILED,
  COMMENT_EDIT_REQUEST,
  COMMENT_EDIT_SUCCESS,
  COMMENT_EDIT_FAILED,
} from "../ActionTypes";

// Fetch public Posts (GET all) (Public)
export const getPublicPostsAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PUBLIC_POST_FETCH_REQUEST,
    });

    const {
      auth: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
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

export const getUserPostsAction = (userId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_POST_FETCH_REQUEST,
    });

    const {
      auth: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/posts/user/${userId}`, config);

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
export const postSubmitAction = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POST_SUBMIT_REQUEST,
    });
    const {
      auth: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.post("/posts", data, config);

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

// Post Details Aciton
export const detailsPost = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POST_DETAILS_REQUEST,
    });
    const {
      auth: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/posts/${id}`, config);

    dispatch({
      type: POST_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_DETAILS_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// POst Delete Aciton (Private)
export const deletePost = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POST_DELETE_REQUEST,
    });
    const {
      auth: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/posts/${id}`, config);

    dispatch({
      type: POST_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: POST_DELETE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// POst Edit Aciton (Private)
export const editPost = (post) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POST_EDIT_REQUEST,
    });
    const {
      auth: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.put(`/posts/${post._id}`, post, config);

    dispatch({
      type: POST_EDIT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: POST_EDIT_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// POst Like Aciton (Public)
export const likePost = (id) => async (dispatch, getState) => {
  try {
    const {
      auth: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.put(`/posts/${id}/like`, {}, config);

    dispatch({
      type: LIKE_POST_SUCCESS,
    });
    dispatch({ type: LIKE_POST_RESET });
  } catch (error) {
    dispatch({
      type: LIKE_POST_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// POst Unlike Aciton (Public)
export const unlikePost = (id) => async (dispatch, getState) => {
  try {
    const {
      auth: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.put(`/posts/${id}/unlike`, {}, config);

    dispatch({
      type: UNLIKE_POST_SUCCESS,
    });
    dispatch({ type: UNLIKE_POST_RESET });
  } catch (error) {
    dispatch({
      type: UNLIKE_POST_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// GET Post comment (public)
export const getPostComments = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: COMMENTS_FETCH_REQUEST });
    const {
      auth: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/posts/${id}/comment`, config);

    dispatch({
      type: COMMENTS_FETCH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COMMENTS_FETCH_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// POST comment on post (public)
export const commentOnPost = (id, comment) => async (dispatch, getState) => {
  try {
    dispatch({ type: COMMENT_REQUEST });
    const {
      auth: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };
    await axios.post(`/posts/${id}/comment`, { comment }, config);

    dispatch({
      type: COMMENT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: COMMENT_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// DEL DELETE a comment (private)
export const deleteComment = (postId, commentId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: COMMENT_DELETE_REQUEST });
    const {
      auth: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/posts/${postId}/comment/${commentId}`, config);

    dispatch({
      type: COMMENT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: COMMENT_DELETE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// PUT Edit a comment (private)
export const editComment = (postId, commentId, comment) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: COMMENT_EDIT_REQUEST });
    const {
      auth: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.put(
      `/posts/${postId}/comment/${commentId}`,
      { comment },
      config
    );

    dispatch({
      type: COMMENT_EDIT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: COMMENT_EDIT_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
