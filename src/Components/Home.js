import React, { useEffect } from 'react';
import { Switch, Route, withRouter, Link, Redirect } from 'react-router-dom';
import { Row, Col, Menu, List, Avatar, Button } from 'antd';
import {
  MessageOutlined,
  HomeOutlined,
  LogoutOutlined,
  ToolOutlined,
} from '@ant-design/icons';

import Profile from './Profile';
import Settings from './Settings';
import { baseURL } from '../shared/baseURL';
import NewsFeed from './NewsFeed';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, getProfileInfo } from '../Redux/ActionCreators';
import Header from './Header';

const data = [
  {
    title: 'Brad Traversy',
  },
  {
    title: 'Fireship.io',
  },
  {
    title: 'Ben Awad',
  },
  {
    title: 'Maximaz Shwarznagger',
  },
];

function Home() {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const { username, isAuthenticated } = auth;

  useEffect(() => {
    dispatch(getProfileInfo(username));
  }, [username, dispatch]);

  const userProfileInfo = useSelector((state) => state.userProfileInfo);
  const { user } = userProfileInfo;

  const logoutHandler = () => {
    dispatch(logoutUser());
  };
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
  return (
    <div>
      <Header />      
      <Row className="home_body">
        <Col span={7}>
          <div className="left_sidebar">
            <Menu defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1" icon={<HomeOutlined />}>
                <Link to="/newsfeed">Home</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<ToolOutlined />}>
                <Link to="/settings">Settings</Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<MessageOutlined />}>
                Chats
              </Menu.Item>
              <Menu.Item
                onClick={logoutHandler}
                key="5"
                icon={<LogoutOutlined />}
              >
                Logout
              </Menu.Item>
            </Menu>
          </div>
        </Col>
        <Col span={10}>
          <Switch>
            <PrivateRoute
              path="/profile"
              component={() => <Profile user={user} />}
            />
            <PrivateRoute path="/settings" component={() => <Settings />} />
            <PrivateRoute path="/newsfeed" component={() => <NewsFeed />} />
            <Redirect to="/newsfeed" />
          </Switch>
        </Col>
        <Col span={7}>
          <div className="right_sidebar">
            <div className="profile__btn">
              {user.dp ? (
                <img src={baseURL + user.dp} alt={user.full_name} />
              ) : (
                <img src="/" alt={user.username} />
              )}
              <div className="fullname">
                <Link to="/profile">
                  <Button type="link">
                    {user.full_name && user.full_name}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="chats_wrap">
              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      }
                      title={<a href="/">{item.title}</a>}
                    />
                  </List.Item>
                )}
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default withRouter(Home);
