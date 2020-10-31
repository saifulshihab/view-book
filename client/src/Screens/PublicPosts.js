import React, { useState } from 'react';
import { Card, Typography } from 'antd';
import {
  CommentOutlined,
  LikeFilled,
  LikeOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import { Link } from 'react-router-dom';

const { Meta } = Card;
const { Title } = Typography;

const PublicPosts = ({ posts }) => {
  const [liked, setLiked] = useState(false);
  return (
    <>
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
            cover={post.image && <img alt="example" src={post.image} />}
            actions={[
              liked ? (
                <span style={{ display: 'inline-block' }}>
                  <LikeFilled style={{ color: '#1890ff' }} />
                  <span style={{ marginLeft: '5px' }}>{post.like}</span>
                </span>
              ) : (
                <span style={{ display: 'inline-block' }}>
                  <LikeOutlined style={{}} key="like" />
                  <span style={{ marginLeft: '5px' }}>{post.like}</span>
                </span>
              ),
              <CommentOutlined key="comment" />,
              <ShareAltOutlined key="share" />,
            ]}
          >
            <Meta
              avatar={<Avatar src={post.user.dp && post.user.dp} />}
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
    </>
  );
};

export default PublicPosts;
