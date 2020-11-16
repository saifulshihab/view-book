import React, { useEffect } from 'react';
import { List, Avatar, Button, Alert } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { listUsers, unfollowOthers } from '../Redux/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { followOthers } from '../Redux/actions/userAction';
import Loader from '../Components/Loader';
import _ from 'lodash';

const WhoToFollowScreen = () => {
  const dispatch = useDispatch();

  const userProfileInfo = useSelector((state) => state.userProfileInfo);
  const {
    user: currentUser,
    loading: userInfoLoading,
    error: userInfoError,
  } = userProfileInfo;

  const usersList = useSelector((state) => state.usersList);
  const { loading: usersListLoading, error: usersListError, users } = usersList;

  const followingOthers = useSelector((state) => state.followingOthers);
  const { loading, error, success: followSuccess } = followingOthers;

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch, followSuccess]);

  const followOthersHandler = (id) => {
    dispatch(followOthers(id));
  };

  const unfollowOthersHandler = (id) => {
    alert('Unfolloe', id);
  };

  return (
    <>
      <h2>Who To Follow</h2>
      {usersListLoading ? (
        <Loader large ind />
      ) : usersListError ? (
        <Alert message={usersListError} showIcon type="error" />
      ) : (
        <>
          <div className="whotofollow_body">
            <List
              itemLayout="horizontal"
              dataSource={users && users}
              renderItem={(user) =>
                user._id !== currentUser._id &&
                _.findIndex(user.followers, function (o) {
                  return o.userId === currentUser._id;
                }) < 0 && (
                  <List.Item
                    actions={[
                      <Button
                        type="dashed"
                        size="small"
                        icon={<UserAddOutlined />}
                        onClick={() =>
                          followOthersHandler(user._id && user._id)
                        }
                      >
                        Follow
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={user.dp && user.dp} />}
                      title={
                        <Link to={`/user/${user.username}`}>
                          {user.full_name}
                        </Link>
                      }
                      description={`@${user.username}`}
                    />
                  </List.Item>
                )
              }
            />
          </div>
          <Link to={`/people`}>
            <Button block type="dashed">
              Show More
            </Button>
          </Link>
        </>
      )}
    </>
  );
};

export default WhoToFollowScreen;
