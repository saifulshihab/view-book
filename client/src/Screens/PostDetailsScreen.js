import React, { useEffect } from "react";

import { Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { detailsPost } from "../Redux/actions/postAction";

import Loader from "../Components/Loader";

import Post from "../Components/Post";

const PostDetailsScreen = ({ history, match }) => {
  const postId = match.params.postId;
  const dispatch = useDispatch();

  const postDetails = useSelector((state) => state.postDetails);
  const { loading, error, post } = postDetails;

  useEffect(() => {
    dispatch(detailsPost(postId));
  }, [dispatch, postId, history]);

  return loading ? (
    <Loader ind />
  ) : error ? (
    <Alert message={error} type="error" showIcon />
  ) : (
    <>{post && <Post post={post} />}</>
  );
};

export default PostDetailsScreen;
