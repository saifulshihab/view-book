import React, { useEffect } from 'react';

import {
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  HddOutlined,
  HeartFilled,
  SaveOutlined,
  SendOutlined,
  ShareAltOutlined,
  SwitcherOutlined,
} from '@ant-design/icons';
import { Alert, Card, Dropdown, Menu, Typography } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPostsAction, deletePost } from '../Redux/actions/postAction';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Loader from '../Components/Loader';

const { Meta } = Card;
const { Title } = Typography;

const UserPosts = ({ userId }) => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const { userInfo } = auth;

  const getUserPosts = useSelector((state) => state.getUserPosts);
  const { loading, error, posts } = getUserPosts;

  const postDelete = useSelector((state) => state.postDelete);
  const { success: deleteSuccess, error: deleteError } = postDelete;

  useEffect(() => {
    dispatch(getUserPostsAction(userId));
  }, [dispatch, userId, deleteSuccess]);

  const postDeleteHandler = (id) => {
    dispatch(deletePost(id));
  };

  return (
    <div className="user_personal_post">
      {loading && <Loader />}
      {error && <Alert message={error} type="error" showIcon />}
      {deleteError && <Alert message={deleteError} type="error" showIcon />}
      {posts &&
        posts.map((post) => (
          <Card
            style={{
              borderRadius: '10px',
              width: '100%',
              marginBottom: '10px',
              boxShadow: 'rgb(191 191 191) 0px 1px 1px',
            }}
            key={post._id}
            size="small"
            bordered={true}
            cover={post.image && <img alt={post.caption} src={post.image} />}
            actions={[
              <span style={{ display: 'inline-block' }}>
                <HeartFilled style={{ color: '#1890ff' }} />
                <span style={{ marginLeft: '5px' }}>{post.like}</span>
              </span>,

              <CommentOutlined key="comment" />,
              <ShareAltOutlined key="share" />,

              <Dropdown
                overlay={
                  <Menu>
                    {userInfo && userInfo._id === userId && (
                      <Menu.Item key="1">
                        <Link to={`/user/post/${post._id}`}>
                          <EditOutlined /> Edit Post
                        </Link>
                      </Menu.Item>
                    )}
                    {userInfo && userInfo._id === userId && (
                      <Menu.Item
                        key="2"
                        onClick={() => postDeleteHandler(post._id)}
                      >
                        <DeleteOutlined /> Delete
                      </Menu.Item>
                    )}
                    {userInfo && userInfo._id === userId && (
                      <Menu.Item
                        key="3"
                        onClick={() => postDeleteHandler(post._id)}
                      >
                        <HddOutlined /> Hide from timeline
                      </Menu.Item>
                    )}
                    <Menu.Item key="4" onClick={() => alert('Hi')}>
                      <SaveOutlined /> Save Post
                    </Menu.Item>
                    <Menu.Item key="5" onClick={() => alert('Hi')}>
                      <HddOutlined /> Hide Post
                    </Menu.Item>
                    <Menu.Item key="6" onClick={() => alert('Hi')}>
                      <SendOutlined /> Unfollow {post.user.full_name}
                    </Menu.Item>
                    <Menu.Item key="7" onClick={() => alert('Hi')}>
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
              avatar={<Avatar src={post.user.dp && post.user.dp} />}
              title={post.user.full_name}
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
                      <Title
                        className="post_caption"
                        style={{ fontSize: '14px' }}
                      >
                        {post.caption}
                      </Title>
                    </Link>
                  )}
                </>
              }
            />
          </Card>
        ))}
    </div>
  );
};

export default UserPosts;
