import React, { useEffect } from "react";
import { List, Avatar, Alert, Button } from "antd";
import { Link } from "react-router-dom";
import { UserDeleteOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  getProfileInfoUser,
  unfollowOthers,
} from "../Redux/actions/userAction";
import Loader from "../Components/Loader";
import { UNFOLLOW_OTHERS_RESET } from "../Redux/ActionTypes";
import _ from 'lodash';

const FollowersScreen = () => {
  const dispatch = useDispatch();

  const userProfileInfo = useSelector((state) => state.userProfileInfo);
  const {
    user,
    loading: userInfoLoading,
    error: userInfoError,
  } = userProfileInfo;

  const unfollowingOthers = useSelector((state) => state.unfollowingOthers);
  const {
    loading: unfollowLoading,
    success: unfollowSuccess,
    error,
  } = unfollowingOthers;


  useEffect(() => {
    window.scrollTo(0, 0);
    if (!user || unfollowSuccess) {
      dispatch(getProfileInfoUser(user.username));
      dispatch({ type: UNFOLLOW_OTHERS_RESET });
    }
  }, [dispatch, unfollowSuccess]);

  const unfollowOthersHandler = (id) => {
    console.log(id);
    dispatch(unfollowOthers(id));
  };

  return userInfoLoading ? (
    <Loader ind />
  ) : userInfoError ? (
    <Alert message={userInfoError} showIcon type="error" />
  ) : (
    <>
      <div className="following_list_header">
        <h2>Followers ({user.followers ? user.followers.length : 0})</h2>
      </div>
      <div className="following_list_wrapper">
        <List
          itemLayout="horizontal"
          dataSource={user.followers && user.followers}
          renderItem={(data) => (
            _.findIndex(user.following, function (o) {
              return o.userId === user._id;
            }) >= 0 ? 
            <List.Item
              className="following_list_item"
              actions={[
                <Button
                  type="dashed"
                  size="small"
                  onClick={() =>
                    unfollowOthersHandler(data.userId && data.userId)
                  }
                  icon={<UserDeleteOutlined />}
                >
                  Unfollow
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={user.dp && user.dp} />}
                title={
                  <Link to={`/user/${user.username}`}>{user.full_name}</Link>
                }
                description={`@${user.username}`}
              />
            </List.Item> :
            <List.Item
              className="following_list_item"
              actions={[
                <Button
                  type="dashed"
                  size="small"
                  onClick={() =>
                    unfollowOthersHandler(data.userId && data.userId)
                  }
                  icon={<UserDeleteOutlined />}
                >
                  Follow
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={user.dp && user.dp} />}
                title={
                  <Link to={`/user/${user.username}`}>{user.full_name}</Link>
                }
                description={`@${user.username}`}
              />
            </List.Item>
          )}
        />
      </div>
    </>
  );
};

export default FollowersScreen;
