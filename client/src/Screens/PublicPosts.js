import React, { useEffect } from 'react';
import { Alert, Card, Dropdown, Menu, Spin, Typography } from 'antd';
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
} from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../Redux/actions/postAction';
import { getPublicPostsAction } from '../Redux/actions/postAction';

const { Meta } = Card;
const { Title } = Typography;

const PublicPosts = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { userInfo } = auth;

  const getPublicPosts = useSelector((state) => state.getPublicPosts);
  const { loading, error, posts } = getPublicPosts;

  const postDelete = useSelector((state) => state.postDelete);
  const { success } = postDelete;

  useEffect(() => {
    dispatch(getPublicPostsAction());
  }, [dispatch, success]);

  const postDeleteHandler = (id) => {
    dispatch(deletePost(id));
  };
  return (
    <>
      {loading ? (
        <Spin />
      ) : error ? (
        <Alert type="error" message={error} showIcon />
      ) : (
        posts &&
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
                <HeartOutlined style={{}} key="like" />
                <span style={{ marginLeft: '5px' }}>{post.like}</span>
              </span>,

              <CommentOutlined key="comment" />,
              <ShareAltOutlined key="share" />,
              <Dropdown
                overlay={
                  <Menu>
                    {userInfo && userInfo._id === post.user._id && (
                      <Menu.Item key="1" onClick={() => alert('Hi')}>
                        <EditOutlined /> Edit Post
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
              avatar={
                <Avatar
                  className="public_post_img"
                  src={post.user.dp && post.user.dp}
                />
              }
              title={
                <Link
                  to={`/user/${post.user.username}`}
                  style={{ color: 'black' }}
                >
                  {post.user.full_name}
                </Link>
              }
              description={
                <>
                  <Title className="post_time">
                    {new Intl.DateTimeFormat('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: '2-digit',
                      hour12: true,
                      hour: 'numeric',
                      minute: 'numeric',
                      second: 'numeric',
                    }).format(new Date(post.createdAt))}
                  </Title>
                  {!post.image ? (
                    <Link to={`/user/post/${post._id}`}>
                      <Title className="post_caption" level={3}>
                        {post.caption}
                      </Title>
                    </Link>
                  ) : (
                    <Link to={`/user/post/${post._id}`}>
                      <Title className="post_caption" level={4}>
                        {post.caption}
                      </Title>
                    </Link>
                  )}
                </>
              }
            />
          </Card>
        ))
      )}
    </>
  );
};

export default PublicPosts;
