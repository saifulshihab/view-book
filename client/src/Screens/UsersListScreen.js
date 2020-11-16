import React, { useEffect } from 'react';
import { List, Avatar, Alert, Button } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons';
import {
  FOLLOW_OTHERS_RESET,
  UNFOLLOW_OTHERS_RESET,
} from '../Redux/ActionTypes';
import Loader from '../Components/Loader';
import {
  listUsers,
  followOthers,
  unfollowOthers,
} from '../Redux/actions/userAction';
import _ from 'lodash';

const UsersListScreen = () => {
  const dispatch = useDispatch();

  const userProfileInfo = useSelector((state) => state.userProfileInfo);
  const {
    user: currentUser,
    loading: userInfoLoading,
    error: userInfoError,
  } = userProfileInfo;

  const unfollowingOthers = useSelector((state) => state.unfollowingOthers);
  const {
    loading: unfollowLoading,
    success: unfollowSuccess,
    error: unfollowError,
  } = unfollowingOthers;

  const followingOthers = useSelector((state) => state.followingOthers);
  const {
    loading: followLoading,
    error: followError,
    success: followSuccess,
  } = followingOthers;

  const usersList = useSelector((state) => state.usersList);
  const { loading: usersListLoading, error: usersListError, users } = usersList;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!users || unfollowSuccess || followSuccess) {
      window.scrollTo(0, 0);
      dispatch(listUsers());
      dispatch({ type: UNFOLLOW_OTHERS_RESET });
      dispatch({ type: FOLLOW_OTHERS_RESET });
    }
  }, [dispatch, followSuccess, unfollowSuccess]);

  const followOthersHandler = (id) => {
    dispatch(followOthers(id));
  };

  const unfollowOthersHandler = (id) => {
    dispatch(unfollowOthers(id));
  };

  return usersListLoading ? (
    <Loader ind />
  ) : usersListError ? (
    <Alert message={userInfoError} showIcon type="error" />
  ) : (
    users && (
      <>
        <div className="following_list_header">
          <h2>
            Find People {unfollowLoading && <Loader ind />}
            {followLoading && <Loader ind />}
          </h2>
        </div>
        {unfollowError && (
          <Alert message={unfollowError} type="error" showIcon />
        )}
        {followError && <Alert message={followError} type="error" showIcon />}
        <div className="following_list_wrapper">
          <List
            itemLayout="horizontal"
            dataSource={users && users}
            renderItem={(user) =>
              user._id !== currentUser._id && (
                <List.Item
                  className="following_list_item"
                  actions={[
                    _.findIndex(currentUser.following, function (o) {
                      return o.userId === user._id;
                    }) < 0 ? (
                      <Button
                        type="dashed"
                        size="small"
                        onClick={() =>
                          followOthersHandler(user._id && user._id)
                        }
                        icon={<UserAddOutlined />}
                      >
                        Follow
                      </Button>
                    ) : (
                      <Button
                        type="dashed"
                        size="small"
                        onClick={() =>
                          unfollowOthersHandler(user._id && user._id)
                        }
                        icon={<UserDeleteOutlined />}
                      >
                        Unfollow
                      </Button>
                    ),
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
      </>
    )
  );
};

export default UsersListScreen;
