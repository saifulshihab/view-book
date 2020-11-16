import React, { useEffect, useState } from 'react';
import { List, Avatar, Alert, Button } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { UserDeleteOutlined } from '@ant-design/icons';
import { getProfileInfoUser } from '../Redux/actions/userAction';
import { unfollowOthers } from '../Redux/actions/userAction';
import { UNFOLLOW_OTHERS_RESET } from '../Redux/ActionTypes';
import Loader from '../Components/Loader';

const FollowingScreen = () => {
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
      window.scrollTo(0, 0);
      dispatch(getProfileInfoUser(user.username));
      dispatch({ type: UNFOLLOW_OTHERS_RESET });
    }
  }, [dispatch, user, unfollowSuccess]);

 
  const unfollowOthersHandler = (id) => {
    dispatch(unfollowOthers(id));
  };

  return userInfoLoading ? (
    <Loader ind />
  ) : userInfoError ? (
    <Alert message={userInfoError} showIcon type="error" />
  ) : (
    user && (
      <>
        <div className="following_list_header">
          <h2>
            Following ({user.following ? user.following.length : 0})
            {unfollowLoading && <Loader ind />}
          </h2>
        </div>
        <div className="following_list_wrapper">
          <List
            itemLayout="horizontal"
            dataSource={user.following && user.following}
            renderItem={(user) => (
              <List.Item
                className="following_list_item"
                actions={[
                  <Button
                    type="dashed"
                    size="small"
                    onClick={() =>
                      unfollowOthersHandler(user.userId && user.userId)
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
              </List.Item>
            )}
          />
        </div>
      </>
    )
  );
};

export default FollowingScreen;
