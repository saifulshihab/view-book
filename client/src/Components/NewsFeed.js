import React, { useEffect } from 'react';
import { Button, Card, Col, Input, Row, Spin, Form, Alert } from 'antd';
import {
  FileImageOutlined,
  FolderAddOutlined,
  GifOutlined,
} from '@ant-design/icons';
import { getPublicPostsAction } from '../Redux/actions/postAction';

import { useDispatch, useSelector } from 'react-redux';
import { postSubmitAction } from '../Redux/actions/postAction';

import PublicPosts from '../Screens/PublicPosts';

const NewsFeed = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const postSubmit = useSelector((state) => state.postSubmit);
  const { success } = postSubmit;

  const getPublicPosts = useSelector((state) => state.getPublicPosts);
  const { loading, error, posts } = getPublicPosts;

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getPublicPostsAction());
  }, [dispatch, success]);

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
          boxShadow: 'rgb(191 191 191) 0px 1px 1px',
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
        {loading ? (
          <Spin />
        ) : error ? (
          <Alert message={error} type="error" showIcon />
        ) : (
          <PublicPosts posts={posts} />
        )}
      </div>
    </div>
  );
};

export default NewsFeed;
