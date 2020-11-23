import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Row, Modal, List } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  EditOutlined,
  FacebookOutlined,
  HeartOutlined,
  InstagramOutlined,
  MailOutlined,
  WifiOutlined,
} from "@ant-design/icons";
import PublicPosts from "./UserPosts";
import { getProfileInfoPublic } from "../Redux/actions/userAction";
import Loader from "../Components/Loader";
// import { PROFILE_FETCH_PUBLIC_RESET } from '../Redux/ActionTypes';

const UserProfileVisitScreen = ({ match }) => {
  const dispatch = useDispatch();
  const username = match.params.username;
  const [detailsModal, setDetailsModal] = useState(false);
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
          <Loader large />
        ) : error ? (
          <Alert type="error" message={error} showIcon />
        ) : (
          <>
            <div className="_pro_dp_wrapper">
              <div className="profile_cover">
                {userPublic.cover ? (
                  <img alt={userPublic.username} src={userPublic.cover} />
                ) : (
                  <img src="" alt="" />
                )}
              </div>
              <div className="dp">
                {userPublic.dp ? (
                  <img alt={userPublic.username} src={userPublic.dp} />
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
              <Col span={24}>
                <h2 className="user_post_heading_h1">Intro</h2>
                <div className="pro_info_2_wrapper">
                  <div className="pro_info_2">
                    <ul>
                      <li>
                        {userPublic.education &&
                          userPublic.education.map((el) => (
                            <div key={el._id}>
                             <i class="fas fa-graduation-cap"></i>
                              <span>{el.institute}</span>
                            </div>
                          ))}
                      </li>
                      <li>
                        {userPublic.social &&
                          userPublic.social.map((el) => (
                            <div key={el._id}>
                              {el.platform === "Instagram" ? (
                                <InstagramOutlined />
                              ) : el.platform === "Facebook" ? (
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
                        {userPublic.email && <MailOutlined />}
                        <span>{userPublic.email && userPublic.email}</span>
                      </li>
                      <li>
                        {userPublic.relationship && <HeartOutlined />}
                        <span>
                          {userPublic.relationship && userPublic.relationship}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <Button
                    type="primary"
                    onClick={() => setDetailsModal(true)}
                    size="middle"
                    block
                  >
                    View Details
                  </Button>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <h2 className="user_post_heading_h1">Posts</h2>
                {userPublic._id && <PublicPosts userId={userPublic._id} />}
              </Col>
            </Row>
          </>
        )}
      </Col>
      <Modal
        title="Profile Details"
        onCancel={() => setDetailsModal(false)}
        visible={detailsModal}
        footer={null}
      >
        <List size="large">
          <List.Item>
            <List.Item.Meta
              title={"Email"}
              avatar={<i class="fas fa-envelope"></i>}
            />
            {userPublic && userPublic.email}
          </List.Item>
          <List.Item>
            <List.Item.Meta
              title={"Education"}
              avatar={<i class="fa fa-graduation-cap" aria-hidden="true"></i>}
            />
            {/* {userPublic.education &&
              userPublic.education.map((d) => (
                <>
                  <h6>{d.institute}</h6>
                  <p>{d.desc}</p>
                  <p>
                    {d.from} - {d.to ? d.to : d.present}
                  </p>
                </>
              ))} */}
          </List.Item>
          <List.Item>
            <List.Item.Meta
              title={"Social Links"}
              avatar={<i class="fa fa-link" aria-hidden="true"></i>}
            />
            {/* {userPublic.social &&
              userPublic.social.map((d) => (
                <>
                  <h6>{d.platform}</h6>
                  <p>{d.link}</p>
                </>
              ))} */}
          </List.Item>
        </List>
      </Modal>
    </Row>
  );
};

export default UserProfileVisitScreen;
