import React, { useEffect, useState } from 'react';

import { Button, Row, Col, Form, Modal, Input, Select, Alert } from 'antd';
import {
  CameraOutlined,
  EditOutlined,
  FacebookOutlined,
  HeartOutlined,
  InstagramOutlined,
  MailOutlined,
  WifiOutlined,
} from '@ant-design/icons';
import { getProfileInfoUser, profileUpdate } from '../Redux/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import PublicPosts from '../Screens/UserPosts';
import { PROFILE_FETCH_USER_RESET } from '../Redux/ActionTypes';

const { Option } = Select;

function Profile({ user }) {
  // const [uploading, setUploading] = useState(false);

  const [isModalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();

  const userProfileUpdate = useSelector((state) => state.userProfileUpdate);
  const { success, error } = userProfileUpdate;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [dispatch]);

  const profileUpdateHandler = (values) => {
    dispatch(
      profileUpdate({
        full_name: values.full_name,
        email: values.email,
        bio: values.bio,
        gender: values.gender,
        relationship: values.relationship,
      })
    );
    dispatch(getProfileInfoUser(user.username));
    dispatch({
      type: PROFILE_FETCH_USER_RESET,
    });
  };

  return (
    <div className="profile_details_wrapper">
      <Row>
        <Col span="24">
          <div className="_pro_dp_wrapper">
            <div className="profile_cover">
              {user.cover ? (
                <img alt={user.username} src={user.cover} />
              ) : (
                <Button
                  type="primary"
                  htmlType="button"
                  shape="circle"
                  icon={<CameraOutlined />}
                />
              )}
            </div>
            <div className="dp">
              {user.dp ? (
                <img alt={user.username} src={user.dp} />
              ) : (
                <Button
                  type="primary"
                  shape="circle"
                  icon={<CameraOutlined />}
                />
              )}
            </div>
            <div className="pro_info_1">
              <h2>{user.full_name && user.full_name}</h2>
              <p className="bio">{user.bio && user.bio} </p>
              <p className="views">Views: {user.view}</p>
            </div>
          </div>
          <Row>
            <Col span={1}></Col>
            <Col span={8}>
              <h2 className="user_post_heading_h1">Intro</h2>
              <div className="pro_info_2_wrapper">
                <div className="pro_info_2">
                  <ul>
                    <li>
                      {user.education &&
                        user.education.map((el) => (
                          <div key={el._id}>
                            <EditOutlined />
                            <span>{el.institute}</span>
                          </div>
                        ))}
                    </li>
                    <li>
                      {user.social &&
                        user.social.map((el) => (
                          <div key={el._id}>
                            {el.platform === 'Instagram' ? (
                              <InstagramOutlined />
                            ) : el.platform === 'Facebook' ? (
                              <FacebookOutlined />
                            ) : (
                              <WifiOutlined />
                            )}
                            <span>
                              <a href={el.link}>{el.link}</a>
                            </span>
                          </div>
                        ))}
                    </li>
                    <li>
                      <MailOutlined />
                      <span>{user.email && user.email}</span>
                    </li>
                    <li>
                      <HeartOutlined />
                      <span>{user.relationship && user.relationship}</span>
                    </li>
                  </ul>
                </div>
                <Button type="primary" size="middle" block>
                  View Details
                </Button>
                <Button
                  type="primary"
                  onClick={() => setModalOpen(true)}
                  size="middle"
                  block
                >
                  Edit Profile
                </Button>
              </div>
              {success && (
                <Alert
                  message={'Profile Updated!'}
                  type="success"
                  closable
                  showIcon
                />
              )}
              {error && <Alert message={error} type="error" showIcon />}
            </Col>
            <Col span={1}></Col>
            <Col span={13}>
              <h2 className="user_post_heading_h1">Posts</h2>
              {user._id && <PublicPosts userId={user._id} />}
            </Col>
            <Col span={1} />
          </Row>
        </Col>
      </Row>
      <Modal
        title="Update Profile"
        onCancel={() => setModalOpen(false)}
        visible={isModalOpen}
        footer={null}
      >
        <Form onFinish={profileUpdateHandler}>
          <Form.Item label="Full Name" name="full_name">
            <Input defaultValue={user.full_name && user.full_name} />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input defaultValue={user.email && user.email} />
          </Form.Item>
          <Form.Item label="Bio" name="bio">
            <Input defaultValue={user.bio && user.bio} />
          </Form.Item>
          {user.education &&
            user.education.map((el, idx) => (
              <Form.Item label="Education" key={idx} name={`${idx}`}>
                <Input defaultValue={el.institute} />
              </Form.Item>
            ))}

          {user.social &&
            user.social.map((el, idx) => (
              <Input.Group label="Social" key={idx} compact>
                <Select defaultValue={el.platform}>
                  <Option value="Zhejiang">Facebook</Option>
                  <Option value="Jiangsu">Instrgram</Option>
                  <Option value="Linkedin">Linkedin</Option>
                </Select>

                <Form.Item name={`${el.platform}`}>
                  <Input defaultValue={el.link} />
                </Form.Item>
              </Input.Group>
            ))}
          <Form.Item label="Gender" name="gender">
            <Select defaultValue={user.gender} allowClear>
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Relationship status" name="relationship">
            <Input defaultValue={user.relationship && user.relationship} />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="dashed" block>
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
export default Profile;
