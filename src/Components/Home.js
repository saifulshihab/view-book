import React, { useEffect, useState } from 'react';
import { Switch, Route, withRouter, Link, Redirect } from 'react-router-dom';
import { Row, Col, Menu, Input, List, Avatar, Button } from 'antd';
import {
  MessageOutlined,
  HomeOutlined,
  LogoutOutlined,
  UnorderedListOutlined,
  ToolOutlined,
} from '@ant-design/icons';

import Profile from './Profile';
import Settings from './Settings';
import { baseURL } from '../shared/baseURL';
import NewsFeed from './NewsFeed';

const { Search } = Input;

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

function Home({ auth, logoutUser }) {
  const [userdata, setUserdata] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/users/${auth.username}`)
      .then(
        (res) => {
          if (res.ok) {
            return res;
          } else {
            const error = new Error(res.status + res.statusText);
            error.response = res;
            throw error;
          }
        },
        (err) => {
          throw err;
        }
      )
      .then((res) => res.json())
      .then((res) => {
        setUserdata(res.user);
      })
      .catch((err) => console.log(err));
  }, [auth.username]);

  const logoutHandler = () => {
    logoutUser();
  };
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        auth.isAuthenticated ? (
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
      <Row>
        <Col span={7}>
          <div className="left_sidebar">
            <div className="left_app_title">
              <p>Viewbook</p>
            </div>
            <Menu defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1" icon={<HomeOutlined />}>
                <Link to="/newsfeed">Home</Link>
              </Menu.Item>

              <Menu.Item key="2" icon={<UnorderedListOutlined />}>
                Profile
              </Menu.Item>
              <Menu.Item key="3" icon={<ToolOutlined />}>
                <Link to="/settings">Settings</Link>
              </Menu.Item>
              <Menu.Item key="4" icon={<MessageOutlined />}>
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
          <div className="apps_logo">
            <Link to="/">
              <img src="/logo.png" alt="App Logo" />
            </Link>
          </div>
          <Switch>
            <PrivateRoute
              path="/profile"
              component={() => <Profile user={userdata} />}
            />
            <PrivateRoute
              path="/settings"
              component={() => <Settings user={userdata} />}
            />
            <PrivateRoute
              path="/newsfeed"
              component={() => <NewsFeed user={userdata} />}
            />
            <Redirect to="/newsfeed" />
          </Switch>
        </Col>
        <Col span={7}>
          <div className="right_sidebar">
            <div className="profile__btn">
              {userdata.dp ? (
                <img src={baseURL + userdata.dp} alt={userdata.full_name} />
              ) : (
                <img src="/" alt={userdata.username} />
              )}
              <div className="fullname">
                <Link to="/profile">
                  <Button type="link">
                    {userdata.full_name && userdata.full_name}
                  </Button>
                </Link>
              </div>
            </div>
            <Search
              placeholder="input search text"
              onSearch={(value) => console.log(value)}
              style={{ width: 200 }}
            />
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
