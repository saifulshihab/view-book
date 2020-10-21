import React, { useState } from 'react';
import { Button, Card, Col, Input, Row } from 'antd';
import {
  CommentOutlined,
  FileImageOutlined,
  FolderAddOutlined,
  GifOutlined,
  LikeFilled,
  LikeOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
const { Meta } = Card;
const NewsFeed = () => {
  const [liked, setLiked] = useState(false);
  return (
    <div className="newsfeed">
      <Card bordered={true} style={{ width: '100%' }}>
        <Row>
          <Col span={24}>
            <Input
              size="large"
              placeholder="Whats on your mind?"
              style={{ width: '100%', borderRadius: '40px' }}
            />
          </Col>
          <div className="postactions">
            <Col span={24}>
              <div className="postactions_btns">
                <Button shape="circle" icon={<FileImageOutlined />} />
                <Button shape="circle" icon={<FolderAddOutlined />} />
                <Button shape="circle" icon={<GifOutlined />} />
              </div>
              <div className="post_btn">
                <Button type="dashed">POST</Button>
              </div>
            </Col>
          </div>
        </Row>
      </Card>
      <div className="post_section">
        <Card
          size="small"
          bordered={true}
          style={{ width: '100%' }}
          cover={
            <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }
          actions={[
            liked ? (
              <LikeFilled
                style={{ color: '#1890ff' }}
                onClick={() => setLiked(false)}
              />
            ) : (
              <LikeOutlined onClick={() => setLiked(true)} key="setting" />
            ),
            <CommentOutlined key="edit" />,
            <ShareAltOutlined key="ellipsis" />,
          ]}
        >
          <Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title="Saiful Islam Shihab"
            description="This is my white Bear from white hervs,,,,,,"
          />
        </Card>
        <Card
          size="small"
          bordered={true}
          style={{ width: '100%' }}
          cover={
            <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }
          actions={[
            liked ? (
              <LikeFilled
                style={{ color: '#1890ff' }}
                onClick={() => setLiked(false)}
              />
            ) : (
              <LikeOutlined onClick={() => setLiked(true)} key="setting" />
            ),
            <CommentOutlined key="edit" />,
            <ShareAltOutlined key="ellipsis" />,
          ]}
        >
          <Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title="Saiful Islam Shihab"
            description="This is my white Bear from white hervs,,,,,,"
          />
        </Card>
      </div>
    </div>
  );
};

export default NewsFeed;
