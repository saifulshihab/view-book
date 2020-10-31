import React, { useEffect, useState } from 'react';
import {
  CommentOutlined,
  LikeFilled,
  LikeOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import { Alert, Card, Spin, Typography } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPostsAction } from '../Redux/actions/postAction';
import { baseURL } from '../shared/baseURL';

const { Meta } = Card;
const { Title } = Typography;

const UserPosts = ({ userId }) => {
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);

  const getUserPosts = useSelector((state) => state.getUserPosts);
  const { loading, error, posts } = getUserPosts;

  useEffect(() => {
    dispatch(getUserPostsAction(userId));
  }, [dispatch, userId]);

  return (
    <div className="user_personal_post">
      {loading && <Spin />}
      {error && <Alert message={error} type="error" showIcon />}
      {posts &&
        posts.map((post) => (
          <Card
            style={{
              borderRadius: '10px',
              width: '100%',
              marginBottom: '10px',
              boxShadow: '1px 2px 2px #ddd',
            }}
            key={post._id}
            size="small"
            bordered={true}
            cover={
              post.image && (
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              )
            }
            actions={[
              liked ? (
                <span style={{ display: 'inline-block' }}>
                  <LikeFilled
                    style={{ color: '#1890ff' }}
                    onClick={() => setLiked(false)}
                  />
                  <span style={{ marginLeft: '5px' }}>{post.like}</span>
                </span>
              ) : (
                <span style={{ display: 'inline-block' }}>
                  <LikeOutlined
                    style={{}}
                    onClick={() => setLiked(true)}
                    key="like"
                  />
                  <span style={{ marginLeft: '5px' }}>{post.like}</span>
                </span>
              ),
              <CommentOutlined key="comment" />,
              <ShareAltOutlined key="share" />,
            ]}
          >
            <Meta
              avatar={<Avatar src={post.user.dp && baseURL + post.user.dp} />}
              title={post.user.full_name}
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
                  {!post.image && (
                    <Title className="post_caption" level={3}>
                      {post.caption}
                    </Title>
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
