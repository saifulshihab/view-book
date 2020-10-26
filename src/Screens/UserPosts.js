import React, { useEffect, useState } from 'react';
import {
  CommentOutlined,
  LikeFilled,
  LikeOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import { baseURL } from '../shared/baseURL';
import { Alert, Card, Spin, Typography } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPostsAction } from '../Redux/ActionCreators';

const { Meta } = Card;
const { Title } = Typography;

const UserPosts = ({ username }) => {
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    dispatch(getUserPostsAction(username));
  }, [dispatch, username]);

  const getUserPosts = useSelector((state) => state.getUserPosts);
  const { loading, error, posts } = getUserPosts;

  return (
    <div className="user_personal_post">
      {loading && <Spin />}
      {error && <Alert message={error} type="error" showIcon />}
      {posts.length > 0 &&
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
                !post.image && (
                  <Title style={{ fontWeight: '400' }} level={3}>
                    {post.caption}
                  </Title>
                )
              }
            />
          </Card>
        ))}
    </div>
  );
};

export default UserPosts;
