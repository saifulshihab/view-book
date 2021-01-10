import React, { useEffect, useState } from 'react';
import {
  Card,
  Dropdown,
  Menu,
  Typography,
  Modal,
  Button,
  Form,
  Upload,
  Input,
  Image,
} from 'antd';
import moment from 'moment';
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
  FileImageOutlined,
} from '@ant-design/icons';
import _ from 'lodash';
import Avatar from 'antd/lib/avatar/avatar';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  likePost,
  unlikePost,
  detailsPost,
  editPost,
  deletePost,
} from '../Redux/actions/postAction';
import CommentSection from '../Screens/CommentSection';
import { POST_EDIT_RESET } from '../Redux/ActionTypes';
import Loader from '../Components/Loader';

import axios from 'axios';

const { Meta } = Card;
const { Title } = Typography;

const Post = ({ post }) => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  const { userInfo } = auth;
  const [caption, setCaption] = useState('');
  const [postImage, setPostImage] = useState('');

  const [isModalOpen, setModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [commentSection, setCommentSection] = useState(false);

  const postDelete = useSelector((state) => state.postDelete);
  const { success: deleteSuccess } = postDelete;

  const postLike = useSelector((state) => state.postLike);
  const { success: likeSuccess } = postLike;

  const postUnLike = useSelector((state) => state.postUnLike);
  const { success: unlikeSuccess } = postUnLike;

  const postEdit = useSelector((state) => state.postEdit);
  const { success: editSuccess, error: editError } = postEdit;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (editSuccess) {
      dispatch({ type: POST_EDIT_RESET });
      dispatch(detailsPost(post && post._id));
      setModalOpen(false);
    } else {
      if (!post.caption || likeSuccess || unlikeSuccess) {
        dispatch(detailsPost(post && post._id));
      } else {
        setCaption(post.caption);
        setPostImage(post.image);
      }
    }
  }, [dispatch, editSuccess, post, deleteSuccess, likeSuccess, unlikeSuccess]);

  const postDeleteHandler = (id) => {
    dispatch(deletePost(id));
  };
  const likePostHandler = (id) => {
    dispatch(likePost(id));
  };
  const unlikePostHandler = (id) => {
    dispatch(unlikePost(id));
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
        _id: post && post._id,
        caption: caption,
        image: postImage,
      })
    );
  };

  return (
    post && (
      <>
        <Card
          style={{
            width: '100%',
            marginBottom: '10px',
            boxShadow: 'rgb(191 191 191) 0px 1px 1px',
          }}
          key={post._id}
          size='small'
          bordered={true}
          cover={
            post.images &&
            post.images.map((el) => <img alt={el._id} src={el.image} />)
          }
          actions={[
            userInfo &&
            _.findIndex(
              post.like,
              (o) => o.user.toString() === userInfo._id.toString()
            ) >= 0 ? (
              <span style={{ display: 'inline-block' }}>
                <HeartFilled
                  style={{ color: '#ff4d4f' }}
                  key='like'
                  onClick={() => unlikePostHandler(post._id)}
                />
                <span style={{ marginLeft: '5px' }}>
                  {post && post.like.length}
                </span>
              </span>
            ) : (
              <span style={{ display: 'inline-block' }}>
                <HeartOutlined
                  style={{ color: '#ff4d4f' }}
                  key='unlike'
                  onClick={() => likePostHandler(post._id)}
                />
                <span style={{ marginLeft: '5px' }}>
                  {post && post.like.length}
                </span>
              </span>
            ),
            <CommentOutlined
              key='comment'
              onClick={() => setCommentSection(!commentSection)}
            />,
            <ShareAltOutlined key='share' />,
            <Dropdown
              overlay={
                <Menu>
                  {userInfo && userInfo._id === post.user._id && (
                    <Menu.Item key='1' onClick={() => setModalOpen(true)}>
                      <EditOutlined /> Edit Post
                    </Menu.Item>
                  )}
                  {userInfo && userInfo._id === post.user._id && (
                    <Menu.Item
                      key='2'
                      onClick={() => postDeleteHandler(post._id)}
                    >
                      <DeleteOutlined /> Delete
                    </Menu.Item>
                  )}
                  {userInfo && userInfo._id === post.user._id && (
                    <Menu.Item
                      key='3'
                      onClick={() => postDeleteHandler(post._id)}
                    >
                      <HddOutlined /> Hide from timeline
                    </Menu.Item>
                  )}
                  <Menu.Item key='4' onClick={() => alert('Hi')}>
                    <SaveOutlined /> Save Post
                  </Menu.Item>
                  <Menu.Item key='5' onClick={() => alert('Hi')}>
                    <HddOutlined /> Hide Post
                  </Menu.Item>
                  <Menu.Item key='6' onClick={() => alert('Hi')}>
                    <SendOutlined /> Unfollow {post.user.full_name}
                  </Menu.Item>
                  <Menu.Item key='7' onClick={() => alert('Hi')}>
                    <SwitcherOutlined /> Turn on notification for this post
                  </Menu.Item>
                </Menu>
              }
            >
              <a
                href='/'
                className='ant-dropdown-link'
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
                className='public_post_img'
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
                <Title className='post_time'>
                  {moment(post.createdAt).fromNow(true)}
                </Title>
                {!post.images ? (
                  <Link to={`/user/post/${post._id}`}>
                    <Title className='post_caption' level={3}>
                      {post.caption}
                    </Title>
                  </Link>
                ) : (
                  <Link to={`/user/post/${post._id}`}>
                    <Title
                      className='post_caption'
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
        {commentSection && <CommentSection post={post} />}
        <Modal
          title='Edit Post'
          onCancel={() => setModalOpen(false)}
          visible={isModalOpen}
          footer={null}
        >
          <Form>
            <Form.Item
              onChange={(e) => setCaption(e.target.value)}
              label='Caption'
              name='caption'
            >
              <Input defaultValue={post.caption} />
            </Form.Item>
            {post.images.map((img) => (
              <Image src={img.image} alt={post.caption} />
            ))}
            <Form.Item
              name='image'
              valuePropName='fileList'
              getValueFromEvent={normFile}
              onChange={uploadFileHandler}
            >
              <Upload>
                <Button
                  listtype='picture'
                  icon={<FileImageOutlined />}
                ></Button>
              </Upload>
            </Form.Item>
            {uploading && <Loader ind />}
            <Form.Item>
              <Button onClick={postUpdateHandler} type='dashed' block>
                Update
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    )
  );
};

export default Post;
