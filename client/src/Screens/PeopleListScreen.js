import React, { useEffect } from 'react';
import { List, Avatar, Button, Spin, Alert } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { listUsers } from '../Redux/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const PeopleListScreen = () => {
  const dispatch = useDispatch();

  const userProfileInfo = useSelector((state) => state.userProfileInfo);
  const {
    user: currentUser,
    loading: userInfoLoading,
    error: userInfoError,
  } = userProfileInfo;

  const usersList = useSelector((state) => state.usersList);
  const { loading: usersListLoading, error: usersListError, users } = usersList;

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  return (
    <>
      <h2>Who To Follow</h2>
      {usersListLoading ? (
        <Spin />
      ) : usersListError ? (
        <Alert message={usersListError} showIcon type="error" />
      ) : (
        <>
          <List
            itemLayout="horizontal"
            dataSource={users}
            renderItem={(user) =>
              user.username !== currentUser.username &&
              currentUser.following &&
              currentUser.following.map(
                (d) =>
                  d.user.toString() !== user._id.toString() && (
                    <List.Item
                      actions={[
                        <Button
                          type="dashed"
                          size="small"
                          icon={<UserAddOutlined />}
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
              )
            }
          />
          <Button block type="dashed">
            Show More
          </Button>
        </>
      )}
    </>
  );
};

export default PeopleListScreen;
