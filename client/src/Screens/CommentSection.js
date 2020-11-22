import { List, Avatar, Alert } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../Components/Loader";
import { getPostComments } from "../Redux/actions/postAction";

const CommentSection = ({ post }) => {
  const dispatch = useDispatch();

  const getComments = useSelector((state) => state.getComments);
  const {
    loading: commentsLoading,
    error: commentsError,
    comments,
  } = getComments;

  useEffect(() => {
    dispatch(getPostComments(post._id));
  }, [dispatch]);

  return (
    <div className="commentSection">
      {commentsLoading && <Loader ind />}
      <p>Comments</p>
      <div className="input_box">
        <input placeholder="Write a comment..." />
        <i className="fa fa-paper-plane" aria-hidden="true"></i>
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
                description={<p>{item.comment}</p>}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default CommentSection;
