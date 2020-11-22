import { List, Avatar, Alert } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../Components/Loader";
import { getPostComments, commentOnPost } from "../Redux/actions/postAction";
import { COMMENT_RESET } from "../Redux/ActionTypes";
import moment from "moment";

const CommentSection = ({ post }) => {
  const dispatch = useDispatch();

  const [comment, setComment] = useState("");

  const getComments = useSelector((state) => state.getComments);
  const {
    loading: commentsLoading,
    error: commentsError,
    comments,
  } = getComments;

  const commentPost = useSelector((state) => state.commentPost);
  const { loading, error, success: commentSuccess } = commentPost;

  useEffect(() => {
    if(commentSuccess){
      setComment('')
    }
    dispatch(getPostComments(post._id));
  }, [dispatch, commentSuccess]);

  const submitCommentHandler = (id) => {
    dispatch(commentOnPost(id, comment));
    dispatch({ type: COMMENT_RESET });
  };

  return (
    <div className="commentSection">
      {commentsLoading && <Loader ind />}
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
      {commentsError && <Alert type="info" message={commentsError} showIcon />}
      <div className="comment_list">
        <List
          className="demo-loadmore-list"
          // loading={initLoading}
          itemLayout="horizontal"
          // loadMore={loadMore}
          dataSource={comments && comments}
          renderItem={(item) => (
            <List.Item actions={[<a key="list-loadmore-more">more</a>]}>
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
