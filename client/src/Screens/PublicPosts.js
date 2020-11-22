import React, { useEffect, useState } from "react";
import { Alert, Card, Dropdown, Input, Menu, Typography } from "antd";
import moment from "moment";
import {
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  HddOutlined,
  HeartFilled,
  HeartOutlined,
  SaveOutlined,
  SendOutlined,
  ShareAltOutlined,
  SwitcherOutlined,
} from "@ant-design/icons";
import _ from "lodash";
import Avatar from "antd/lib/avatar/avatar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../Redux/actions/postAction";
import {
  getPublicPostsAction,
  likePost,
  unlikePost,
} from "../Redux/actions/postAction";
import Loader from "../Components/Loader";
import CommentSection from "./CommentSection";
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
        posts && posts.map((post) => <Post post={post} />)
      )}
    </>
  );
};

export default PublicPosts;
