import React, { useEffect } from "react";

import { Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUserPostsAction } from "../Redux/actions/postAction";

import Loader from "../Components/Loader";
import _ from "lodash";
import Post from "../Components/Post";

const UserPosts = ({ userId }) => {
  const dispatch = useDispatch();

  const getUserPosts = useSelector((state) => state.getUserPosts);
  const { loading, error, posts } = getUserPosts;

  useEffect(() => {
    dispatch(getUserPostsAction(userId));
  }, [dispatch, userId]);

  return (
    <div className="user_personal_post">
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert message={error} type="error" showIcon />
      ) : (
        posts && posts.map((post) => <Post key={post._id} post={post} />)
      )}
    </div>
  );
};

export default UserPosts;
