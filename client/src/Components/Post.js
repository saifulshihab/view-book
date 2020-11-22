import React, { useEffect, useState } from "react";
import { Card, Dropdown, Menu, Typography } from "antd";
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
import { likePost, unlikePost } from "../Redux/actions/postAction";
import CommentSection from "../Screens/CommentSection";

const { Meta } = Card;
const { Title } = Typography;

const Post = ({ post }) => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  const { userInfo } = auth;
  const [commentSection, setCommentSection] = useState(false);

  const postDelete = useSelector((state) => state.postDelete);
  const { success: deleteSuccess } = postDelete;

  const postLike = useSelector((state) => state.postLike);
  const { success: likeSuccess } = postLike;

  const postUnLike = useSelector((state) => state.postUnLike);
  const { success: unlikeSuccess } = postUnLike;

  useEffect(() => {}, [deleteSuccess, likeSuccess, unlikeSuccess]);

  const postDeleteHandler = (id) => {
    dispatch(deletePost(id));
  };
  const likePostHandler = (id) => {
    dispatch(likePost(id));
  };
  const unlikePostHandler = (id) => {
    dispatch(unlikePost(id));
  };

  return (
    <>
      <Card
        style={{
          borderRadius: "10px",
          width: "100%",
          marginBottom: "10px",
          boxShadow: "rgb(191 191 191) 0px 1px 1px",
        }}
        key={post._id}
        size="small"
        bordered={true}
        cover={post.image && <img alt={post.caption} src={post.image} />}
        actions={[
          userInfo &&
          _.findIndex(
            post.like,
            (o) => o.user.toString() === userInfo._id.toString()
          ) >= 0 ? (
            <span style={{ display: "inline-block" }}>
              <HeartFilled
                style={{ color: "#ff4d4f" }}
                key="like"
                onClick={() => unlikePostHandler(post._id)}
              />
              <span style={{ marginLeft: "5px" }}>{post.like.length}</span>
            </span>
          ) : (
            <span style={{ display: "inline-block" }}>
              <HeartOutlined
                style={{ color: "#ff4d4f" }}
                key="unlike"
                onClick={() => likePostHandler(post._id)}
              />
              <span style={{ marginLeft: "5px" }}>{post.like.length}</span>
            </span>
          ),
          <CommentOutlined
            key="comment"
            onClick={() => setCommentSection(true)}
          />,
          <ShareAltOutlined key="share" />,
          <Dropdown
            overlay={
              <Menu>
                {userInfo && userInfo._id === post.user._id && (
                  <Menu.Item key="1">
                    <Link to={`/user/post/${post._id}`}>
                      <EditOutlined /> Edit Post
                    </Link>
                  </Menu.Item>
                )}
                {userInfo && userInfo._id === post.user._id && (
                  <Menu.Item
                    key="2"
                    onClick={() => postDeleteHandler(post._id)}
                  >
                    <DeleteOutlined /> Delete
                  </Menu.Item>
                )}
                {userInfo && userInfo._id === post.user._id && (
                  <Menu.Item
                    key="3"
                    onClick={() => postDeleteHandler(post._id)}
                  >
                    <HddOutlined /> Hide from timeline
                  </Menu.Item>
                )}
                <Menu.Item key="4" onClick={() => alert("Hi")}>
                  <SaveOutlined /> Save Post
                </Menu.Item>
                <Menu.Item key="5" onClick={() => alert("Hi")}>
                  <HddOutlined /> Hide Post
                </Menu.Item>
                <Menu.Item key="6" onClick={() => alert("Hi")}>
                  <SendOutlined /> Unfollow {post.user.full_name}
                </Menu.Item>
                <Menu.Item key="7" onClick={() => alert("Hi")}>
                  <SwitcherOutlined /> Turn on notification for this post
                </Menu.Item>
              </Menu>
            }
          >
            <a
              href="/"
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <EllipsisOutlined />
            </a>
          </Dropdown>,
        ]}
      >
        <Meta
          avatar={
            <Avatar
              className="public_post_img"
              src={post.user.dp && post.user.dp}
            />
          }
          title={
            <Link to={`/user/${post.user.username}`} style={{ color: "black" }}>
              {post.user.full_name}
            </Link>
          }
          description={
            <>
              <Title className="post_time">
                {moment(post.createdAt).fromNow(true)}
              </Title>
              {!post.image ? (
                <Link to={`/user/post/${post._id}`}>
                  <Title className="post_caption" level={3}>
                    {post.caption}
                  </Title>
                </Link>
              ) : (
                <Link to={`/user/post/${post._id}`}>
                  <Title className="post_caption" style={{ fontSize: "14px" }}>
                    {post.caption}
                  </Title>
                </Link>
              )}
            </>
          }
        />
      </Card>
      {commentSection && <CommentSection post={post} />}
    </>
  );
};

export default Post;
