import React, { useEffect } from 'react';
import { Alert, Button, Col, Row, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  EditOutlined,
  FacebookOutlined,
  HeartOutlined,
  InstagramOutlined,
  MailOutlined,
  WifiOutlined,
} from '@ant-design/icons';
import PublicPosts from './UserPosts';
import { getProfileInfoPublic } from '../Redux/actions/userAction';
import { baseURL } from '../shared/baseURL';
// import { PROFILE_FETCH_PUBLIC_RESET } from '../Redux/ActionTypes';

const UserProfileVisitScreen = ({ match }) => {
  const dispatch = useDispatch();
  const username = match.params.username;
  const publicProfileInfo = useSelector((state) => state.publicProfileInfo);
  const { user: userPublic, loading, error } = publicProfileInfo;

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getProfileInfoPublic(username));
  }, [dispatch, username]);

  return (
    <Row>
      <Col span="24">
        {loading ? (
          <Spin />
        ) : error ? (
          <Alert type="error" message={error} showIcon />
        ) : (
          <>
            <div className="_pro_dp_wrapper">
              <div className="profile_cover">
                {userPublic.cover ? (
                  <img
                    alt={userPublic.username}
                    src={baseURL + userPublic.cover}
                  />
                ) : (
                  <img src="" alt="" />
                )}
              </div>
              <div className="dp">
                {userPublic.dp ? (
                  <img
                    alt={userPublic.username}
                    src={baseURL + userPublic.dp}
                  />
                ) : (
                  <img src="" alt="" />
                )}
              </div>
              <div className="pro_info_1">
                <h2>{userPublic.full_name && userPublic.full_name}</h2>
                <p className="bio">{userPublic.bio && userPublic.bio} </p>
                <p className="views">Views: {userPublic.view}</p>
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
                        {userPublic.education &&
                          userPublic.education.map((el) => (
                            <div key={el._id}>
                              <EditOutlined />
                              <span>{el.institute}</span>
                            </div>
                          ))}
                      </li>
                      <li>
                        {userPublic.social &&
                          userPublic.social.map((el) => (
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
                        <span>{userPublic.email && userPublic.email}</span>
                      </li>
                      <li>
                        <HeartOutlined />
                        <span>
                          {userPublic.relationship && userPublic.relationship}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <Button type="primary" size="middle" block>
                    View Details
                  </Button>
                </div>
              </Col>
              <Col span={1}></Col>
              <Col span={13}>
                <h2 className="user_post_heading_h1">Posts</h2>
                {userPublic._id && <PublicPosts userId={userPublic._id} />}
              </Col>
              <Col span={1} />
            </Row>
          </>
        )}
      </Col>
    </Row>
  );
};

export default UserProfileVisitScreen;
