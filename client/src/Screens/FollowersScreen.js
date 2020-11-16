import React, { useEffect } from 'react';
import { List, Avatar, Alert, Button } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { UserAddOutlined } from '@ant-design/icons';
import { getProfileInfoUser } from '../Redux/actions/userAction';
import Loader from '../Components/Loader';

const FollowersScreen = () => {
  const dispatch = useDispatch();

  const userProfileInfo = useSelector((state) => state.userProfileInfo);
  const {
    user,
    loading: userInfoLoading,
    error: userInfoError,
  } = userProfileInfo;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!user) {
      window.scrollTo(0, 0);
      dispatch(getProfileInfoUser(user.username));
    }
  }, [dispatch, user]);

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
          renderItem={(user) => (
            <List.Item
              className="following_list_item"
              actions={[
                <Button type="dashed" size="small" icon={<UserAddOutlined />}>
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
  );
};

export default FollowersScreen;
