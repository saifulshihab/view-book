import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  FileImageOutlined,
  HddOutlined,
  HeartFilled,
  SaveOutlined,
  SendOutlined,
  ShareAltOutlined,
  SwitcherOutlined,
} from '@ant-design/icons';
import {
  Alert,
  Button,
  Card,
  Dropdown,
  Input,
  Menu,
  Avatar,
  Spin,
  Typography,
  Upload,
  Modal,
  Form,
  Image,
  message,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { detailsPost } from '../Redux/actions/postAction';
import { baseURL } from '../shared/baseURL';
import { editPost, deletePost } from '../Redux/actions/postAction';
import { POST_DETAILS_RESET, POST_EDIT_RESET } from '../Redux/ActionTypes';

const { Title } = Typography;

const { Meta } = Card;

const PostDetailsScreen = ({ history, match }) => {
  const postId = match.params.postId;

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const { userInfo } = auth;

  const postDetails = useSelector((state) => state.postDetails);
  const { loading, error, post } = postDetails;

  const [isModalOpen, setModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const postDelete = useSelector((state) => state.postDelete);
  const { success: deleteSuccess, error: deleteError } = postDelete;

  const [caption, setCaption] = useState('');
  const [postImage, setPostImage] = useState('');

  const postEdit = useSelector((state) => state.postEdit);
  const { success: editSuccess, error: editError } = postEdit;

  useEffect(() => {
    if (editSuccess) {
      dispatch({ type: POST_EDIT_RESET });
      dispatch(detailsPost(postId));
      setModalOpen(false);
    } else {
      if (!post.caption || post._id !== postId) {
        window.scrollTo(0, 0);
        dispatch(detailsPost(postId));
      } else {
        setCaption(post.caption);
        setPostImage(post.image);
      }
    }
  }, [dispatch, postId, deleteSuccess, post, editSuccess, history]);

  const postDeleteHandler = (id) => {
    dispatch(deletePost(id));
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/upload', formData, config);

      setPostImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const postUpdateHandler = () => {
    dispatch(
      editPost({
        _id: postId,
        caption: caption,
        image: postImage,
      })
    );
  };
  return loading ? (
    <Spin />
  ) : error ? (
    <Alert message={error} type="error" showIcon />
  ) : (
    <>
      {deleteError && <Alert message={deleteError} type="error" showIcon />}
      {editError && <Alert message={editError} type="error" showIcon />}
      {/* {editSuccess && message.success('Post Updated!')} */}
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
        cover={post.image && <img alt="example" src={post.image} />}
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
                {userInfo && userInfo._id === post.user._id && (
                  <Menu.Item key="1" onClick={() => setModalOpen(true)}>
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

                <Menu.Item key="3">
                  <HddOutlined /> Hide from timeline
                </Menu.Item>

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
          avatar={<Avatar src={post.user.dp &&  post.user.dp} />}
          title={post.user.full_name}
          description={
            <>
              {!post.image ? (
                <Title className="post_caption" level={3}>
                  {post.caption}
                </Title>
              ) : (
                <Title className="post_caption" level={4}>
                  {post.caption}
                </Title>
              )}
            </>
          }
        />
      </Card>
      <Modal
        title="Edit Post"
        onCancel={() => setModalOpen(false)}
        visible={isModalOpen}
        footer={null}
      >
        <Form>
          <Form.Item
            onChange={(e) => setCaption(e.target.value)}
            label="Caption"
            name="caption"
          >
            <Input defaultValue={post.caption} />
          </Form.Item>

          <Image src={post.image} alt={post.caption} />
          <Form.Item
            name="image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            onChange={uploadFileHandler}
          >
            <Upload>
              <Button listtype="picture" icon={<FileImageOutlined />}></Button>
            </Upload>
          </Form.Item>
          {uploading && <Spin />}
          <Form.Item>
            <Button onClick={postUpdateHandler} type="dashed" block>
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default PostDetailsScreen;
