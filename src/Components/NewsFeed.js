import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Input,
  Row,
  Spin,
  Form,
  Alert,
  Typography,
} from 'antd';
import { baseURL } from '../shared/baseURL';
import {
  CommentOutlined,
  FileImageOutlined,
  FolderAddOutlined,
  GifOutlined,
  LikeFilled,
  LikeOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import { getPublicPostsAction } from '../Redux/ActionCreators';
import Avatar from 'antd/lib/avatar/avatar';
import { useDispatch, useSelector } from 'react-redux';
import { postSubmitAction } from '../Redux/ActionCreators';

const { Meta } = Card;
const { Title } = Typography;

const NewsFeed = () => {
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const [form] = Form.useForm();

  const postSubmit = useSelector((state) => state.postSubmit);
  const { success } = postSubmit;
  useEffect(() => {
    dispatch(getPublicPostsAction());
  }, [dispatch, success]);

  const getPublicPosts = useSelector((state) => state.getPublicPosts);
  const { loading, error, posts } = getPublicPosts;
  const submitHandler = (values) => {
    dispatch(
      postSubmitAction({
        caption: values.caption,
      })
    );

    form.resetFields();
  };
  return (
    <div className="newsfeed">
      <Card
        bordered={true}
        style={{
          width: '100%',
          borderRadius: '10px',
          marginBottom: '10px',
          boxShadow: '1px 2px 2px #ddd',
        }}
      >
        <Row>
          <Col span={24}>
            <Form style={{ width: '100%' }} onFinish={submitHandler}>
              <Form.Item name="caption">
                <Input
                  size="large"
                  placeholder="Whats on your mind?"
                  style={{ borderRadius: '40px' }}
                />
              </Form.Item>
              <div className="postactions">
                <div className="postactions_btns">
                  <Button shape="circle" icon={<FileImageOutlined />} />
                  <Button shape="circle" icon={<FolderAddOutlined />} />
                  <Button shape="circle" icon={<GifOutlined />} />
                </div>
                <div className="post_btn">
                  <Button htmlType="submit" type="primary">
                    POST
                  </Button>
                </div>
              </div>
            </Form>
          </Col>
        </Row>
      </Card>
      <div className="public_posts">
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
    </div>
  );
};

export default NewsFeed;
