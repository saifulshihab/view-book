import React, { useEffect } from "react";
import { Alert } from "antd";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";

import { getPublicPostsAction } from "../Redux/actions/postAction";
import Loader from "../Components/Loader";

import Post from "../Components/Post";

const PublicPosts = () => {
  const dispatch = useDispatch();

  const getPublicPosts = useSelector((state) => state.getPublicPosts);
  const { loading, error, posts } = getPublicPosts;

  useEffect(() => {
    dispatch(getPublicPostsAction());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader large />
      ) : error ? (
        <Alert type="error" message={error} showIcon />
      ) : (
        posts && posts.map((post) => <Post key={post._id} post={post} />)
      )}
    </>
  );
};

export default PublicPosts;
