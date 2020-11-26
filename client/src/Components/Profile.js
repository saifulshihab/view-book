import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Button,
  Row,
  Col,
  Form,
  Modal,
  Input,
  Select,
  Alert,
  Upload,
  Image,
  List,
} from "antd";
import {
  CameraOutlined,
  EditOutlined,
  FacebookOutlined,
  HeartOutlined,
  InstagramOutlined,
  MailOutlined,
  UserSwitchOutlined,
  WifiOutlined,
} from "@ant-design/icons";
import {
  getProfileInfoUser,
  profileUpdate,
  updateProfileDp,
  updateProfileCover,
} from "../Redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import PublicPosts from "../Screens/UserPosts";
import {
  PROFILE_COVER_UPDATE_RESET,
  PROFILE_DP_UPDATE_RESET,
  PROFILE_FETCH_USER_RESET,
  PROFILE_UPDATE_RESET,
} from "../Redux/ActionTypes";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const { Option } = Select;

function Profile({ username }) {
  const dispatch = useDispatch();

  const [isModalOpen, setModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dpModal, setDpmodal] = useState(false);
  const [detailsModal, setDetailsModal] = useState(false);
  const [coverModal, setCovermodal] = useState(false);
  const [dp, setDp] = useState("");
  const [cover, setCover] = useState("");

  const userProfileInfo = useSelector((state) => state.userProfileInfo);
  const {
    user,
    loading: userInfoLoading,
    error: userInfoError,
  } = userProfileInfo;

  const profileDpUpdate = useSelector((state) => state.profileDpUpdate);
  const {
    loading: dpupdateLoading,
    success: dpupdateSuccess,
    error: dpupdateError,
  } = profileDpUpdate;

  const profileCoverUpdate = useSelector((state) => state.profileCoverUpdate);
  const {
    loading: coverupdateLoading,
    success: coverupdateSuccess,
    error: coverupdateError,
  } = profileCoverUpdate;

  const userProfileUpdate = useSelector((state) => state.userProfileUpdate);
  const {
    loading: loadingProfileEdit,
    success: successProfileEdit,
    error: errorProfileEdit,
  } = userProfileUpdate;

  useEffect(() => {
    if (!user || successProfileEdit || dpupdateSuccess || coverupdateSuccess) {
      window.scrollTo(0, 0);
      dispatch({ type: PROFILE_DP_UPDATE_RESET });
      dispatch({ type: PROFILE_UPDATE_RESET });
      dispatch({ type: PROFILE_COVER_UPDATE_RESET });
      dispatch(getProfileInfoUser(username));
    }
    window.scrollTo(0, 0);
  }, [
    dispatch,
    username,
    user,
    successProfileEdit,
    dpupdateSuccess,
    coverupdateSuccess,
  ]);

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
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/upload", formData, config);

      setDp(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const uploadCoverFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/upload", formData, config);

      setCover(data);
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

  const profileDpUpdateHandler = () => {
    dispatch(updateProfileDp(dp));
  };
  const profileCoverUpdateHandler = () => {
    dispatch(updateProfileCover(cover));
  };

  return userInfoLoading ? (
    <Loader large />
  ) : userInfoError ? (
    <Alert message={userInfoError} showIcon type="error" />
  ) : (
    user && (
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
                    shape="circle"
                    onClick={() => setCovermodal(true)}
                    icon={<CameraOutlined />}
                  />
                )}
              </div>
              <div className="dp dp_img">
                {user.dp ? (
                  <img alt={user.username} src={user.dp} />
                ) : (
                  <>
                    <Button
                      type="primary"
                      shape="circle"
                      onClick={() => setDpmodal(true)}
                      icon={<CameraOutlined />}
                    />
                  </>
                )}
              </div>
              <div className="pro_info_1">
                <h2>{user.full_name && user.full_name}</h2>
                <p className="bio">{user.bio && user.bio} </p>
                <p className="views">Views: {user.view}</p>
              </div>
            </div>
            <Row>
              {/* <Col span={1}></Col> */}
              <Col span={24}>
                <h2 className="user_post_heading_h1">Intro</h2>
                {loadingProfileEdit ? (
                  <Loader />
                ) : (
                  <div className="pro_info_2_wrapper">
                    <div className="pro_info_2">
                      <ul>
                        <li>
                          {user.education &&
                             user.education.map((el) => (
                              <div key={el._id}>
                                <i class="fas fa-graduation-cap"></i>
                                <span>{el.institute}</span>
                              </div>
                            ))}
                        </li>
                        <li>
                          {user.social &&
                            user.social.map((el) => (
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
                          {user.email && <MailOutlined />}
                          <span>{user.email && user.email}</span>
                        </li>
                        <li>
                          {user.relationship && <HeartOutlined />}
                          <span>{user.relationship && user.relationship}</span>
                        </li>
                      </ul>
                      <div className="pro_info_3">
                        <ul>
                          <Link to={`/followers`}>
                            <li>
                              <UserSwitchOutlined /> {user.followers.length}{" "}
                              Followers
                            </li>
                          </Link>
                          <Link to={"/following"}>
                            <li>
                              <UserSwitchOutlined /> {user.following.length}{" "}
                              Following
                            </li>
                          </Link>
                        </ul>
                      </div>
                    </div>
                    <Button.Group>
                      <Button
                        type="primary"
                        onClick={() => setDetailsModal(true)}
                        block
                      >
                        View Details
                      </Button>
                      <Button
                        type="primary"
                        onClick={() => setModalOpen(true)}
                        block
                      >
                        Edit Profile
                      </Button>
                      <Button
                        onClick={() => setDpmodal(true)}
                        icon={<CameraOutlined />}
                      >
                        Change DP
                      </Button>
                      <Button
                        onClick={() => setCovermodal(true)}
                        icon={<CameraOutlined />}
                      >
                        Change Cover
                      </Button>
                    </Button.Group>
                  </div>
                )}

                {successProfileEdit && (
                  <Alert
                    message={"Profile Updated!"}
                    type="success"
                    closable
                    showIcon
                  />
                )}
                {errorProfileEdit && (
                  <Alert message={errorProfileEdit} type="error" showIcon />
                )}
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <h2 className="user_post_heading_h1">Posts</h2>
                {user._id && <PublicPosts userId={user._id} />}
              </Col>
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

            {user.education && user.education.length === 0 ? (
              <>
                <Form.Item label="Education" key={0} name={`edu1`}>
                  <Input />
                </Form.Item>
                <Form.Item label="Education" key={1} name={`edu2`}>
                  <Input />
                </Form.Item>
                <Form.Item label="Education" key={2} name={`edu3`}>
                  <Input />
                </Form.Item>
              </>
            ) : (
              user.education && (
                /*  user.education.map((el, idx) => (
              <Form.Item label="Education" key={idx} name={`edu${idx}`}>
                <Input defaultValue={el.institute} />
              </Form.Item>
            )) */
                <>
                  <Form.Item label="Education 1" key={0} name={`edu1`}>
                    <Input
                      defaultValue={user.education.map((d) => d.institute)[0]}
                    />
                  </Form.Item>
                  <Form.Item label="Education 2" key={1} name={`edu2`}>
                    <Input
                      defaultValue={user.education.map((d) => d.institute)[1]}
                    />
                  </Form.Item>
                  <Form.Item label="Education 3" key={2} name={`edu3`}>
                    <Input
                      defaultValue={user.education.map((d) => d.institute)[2]}
                    />
                  </Form.Item>
                </>
              )
            )}
            {/* {user.social &&
            user.social.map((el, idx) => (
              <Input.Group label="Social" key={idx} compact>
                <Select defaultValue={el.platform}>
                  <Option value="Zhejiang">Facebook</Option>
                  <Option value="Jiangsu">Instrgram</Option>
                  <Option value="Linkedin">Linkedin</Option>
                </Select>
                <Form.Item name={`social${el.platform}`}>
                  <Input defaultValue={el.link} />
                </Form.Item>
              </Input.Group>
            ))} */}

            {user.social && user.social.length === 0 ? (
              <>
                <Form.Item label="Facebook" key={0} name={`social1`}>
                  <Input />
                </Form.Item>
                <Form.Item label="Instagram" key={1} name={`social2`}>
                  <Input />
                </Form.Item>
                <Form.Item label="Linkdin" key={2} name={`social3`}>
                  <Input />
                </Form.Item>
              </>
            ) : (
              user.education && (
                <>
                  <Form.Item label="Facebook" key={0} name={`social1`}>
                    <Input defaultValue={user.social.map((d) => d.link)[0]} />
                  </Form.Item>
                  <Form.Item label="Instagram" key={1} name={`social2`}>
                    <Input defaultValue={user.social.map((d) => d.link)[1]} />
                  </Form.Item>
                  <Form.Item label="Linkdin" key={2} name={`social3`}>
                    <Input defaultValue={user.social.map((d) => d.link)[2]} />
                  </Form.Item>
                </>
              )
            )}

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
        <Modal
          title="Update DP"
          onCancel={() => setDpmodal(false)}
          visible={dpModal}
          footer={null}
        >
          <Form>
            <Form.Item>
              <Image src={user.dp && user.dp} alt={user.username} />
            </Form.Item>
            <Form.Item
              name="image"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              onChange={uploadFileHandler}
            >
              <Upload>
                <Button listtype="picture" icon={<CameraOutlined />}>
                  Upload image
                </Button>
              </Upload>
            </Form.Item>
            {uploading && (
              <Form.Item>
                <Alert message="Uploading ..." showIcon type="info" />
              </Form.Item>
            )}

            <Form.Item>
              <Button type="primary" onClick={profileDpUpdateHandler}>
                Update
              </Button>
            </Form.Item>
          </Form>
          {dpupdateError && (
            <Alert type="error" message={dpupdateError} showIcon closable />
          )}
        </Modal>
        <Modal
          title="Update Cover"
          onCancel={() => setCovermodal(false)}
          visible={coverModal}
          footer={null}
        >
          <Form>
            <Form.Item>
              <Image src={user.cover && user.cover} alt={user.username} />
            </Form.Item>
            <Form.Item
              name="image"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              onChange={uploadCoverFileHandler}
            >
              <Upload>
                <Button listtype="picture" icon={<CameraOutlined />}>
                  Upload image
                </Button>
              </Upload>
            </Form.Item>
            {uploading && (
              <Form.Item>
                <Alert message="Uploading ..." showIcon type="info" />
              </Form.Item>
            )}

            <Form.Item>
              <Button type="primary" onClick={profileCoverUpdateHandler}>
                Update
              </Button>
            </Form.Item>
          </Form>
          {coverupdateError && (
            <Alert type="error" message={coverupdateError} showIcon closable />
          )}
        </Modal>
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
              {user && user.email}
            </List.Item>
            <List.Item>
              <List.Item.Meta
                title={"Education"}
                avatar={<i class="fa fa-graduation-cap" aria-hidden="true"></i>}
              />
            </List.Item>
            {user.education &&
              user.education.map((d) => (
                <>
                  <h4>{d.institute}</h4>  
                  <p>{d.desc}</p>  
                  <p style={{fontStyle: "italic"}}>
                    {d.from} - {d.to ? d.to : d.present && "Present"}
                  </p>
                </>
              ))}
            <List.Item>
              <List.Item.Meta
                title={"Social Links"}
                avatar={<i class="fa fa-link" aria-hidden="true"></i>}
              />
            </List.Item>
            {user.social &&
              user.social.map((d) => (
                <>
                  <h4>{d.platform}</h4>           
                  <p>{d.link}</p>
                </>
              ))}
          </List>
        </Modal>
      </div>
    )
  );
}
export default Profile;
