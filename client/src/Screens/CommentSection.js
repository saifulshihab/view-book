import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../Components/Loader";
import { List, Avatar, Alert, Menu, Dropdown } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import {
  getPostComments,
  commentOnPost,
  deleteComment,
} from "../Redux/actions/postAction";
import { COMMENT_DELETE_RESET, COMMENT_RESET } from "../Redux/ActionTypes";
import moment from "moment";

const CommentSection = ({ post }) => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  const { userInfo } = auth;

  const [comment, setComment] = useState("");

  const getComments = useSelector((state) => state.getComments);
  const {
    loading: commentsLoading,
    error: commentsError,
    comments,
  } = getComments;

  const commentPost = useSelector((state) => state.commentPost);
  const { loading, error, success: commentSuccess } = commentPost;

  const commentDelete = useSelector((state) => state.commentDelete);
  const {
    success: commentDeleteSuccess,
    error: commentDeleteError,
  } = commentDelete;

  useEffect(() => {
    if (commentSuccess) {
      setComment("");
    }
    dispatch(getPostComments(post._id));
  }, [dispatch, commentSuccess, commentDeleteSuccess]);

  const submitCommentHandler = (id) => {
    dispatch(commentOnPost(id, comment));
    dispatch({ type: COMMENT_RESET });
  };
  const deleteCommentHandler = (postId, commentId) => {
    dispatch(deleteComment(postId, commentId));
    dispatch({ type: COMMENT_DELETE_RESET });
  };

  return (
    <div className="commentSection">
      <p>Comments</p>
      <div className="input_box">
        <input
          placeholder="Write a comment..."
          onChange={(e) => setComment(e.target.value)}
          />
        <i
          className="fa fa-paper-plane"
          aria-hidden="true"
          onClick={() => submitCommentHandler(post && post._id)}
          ></i>
      </div>
      {commentsLoading && <Loader ind />}
      {commentsError && <Alert type="info" message={commentsError} showIcon />}
      <div className="comment_list">
        <List
          className="demo-loadmore-list"
          // loading={initLoading}
          itemLayout="horizontal"
          // loadMore={loadMore}
          dataSource={comments && comments}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Dropdown
                  overlay={
                    <Menu>
                      {userInfo && userInfo._id === item.user._id && (
                        <Menu.Item key="1">
                          <Link to={`/user/post/${post._id}`}>
                            <EditOutlined /> Edit comment
                          </Link>
                        </Menu.Item>
                      )}
                      {userInfo && userInfo._id === item.user._id && (
                        <Menu.Item
                          key="2"
                          onClick={() => deleteCommentHandler(post._id, item._id)}
                        >
                          <DeleteOutlined /> Delete
                        </Menu.Item>
                      )}
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
              <List.Item.Meta
                avatar={<Avatar src={item.user.dp} />}
                title={
                  <Link
                    to={`/user/${item.user.username}`}
                    style={{ color: "black" }}
                  >
                    {item.user.full_name}
                  </Link>
                }
                description={<p className="comment">{item.comment}</p>}
              />
              <div>{moment(item.createdAt).fromNow(true)}</div>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default CommentSection;
