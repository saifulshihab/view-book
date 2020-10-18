import React, { useContext, useEffect, useState } from 'react';
import { Switch, Route, withRouter, Link, Redirect } from 'react-router-dom';
import { Row, Col, Menu, Input, List, Avatar, Button } from 'antd';
import {
  MessageOutlined,
  HomeOutlined,
  LogoutOutlined,
  UnorderedListOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import { UserContext } from './Main';
import Profile from './Profile';

const { Search } = Input;

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

function NewsFeed(props) {
  const [userdata, setUserdata] = useState({});
  const user = useContext(UserContext);

  useEffect(() => {
    fetch(`http://localhost:5000/users/${user.username}`)
      .then((res) => {
        if (res.ok) {
          return res;
        } else {
          const error = new Error(res.status + res.statusText);
          error.response = res;
          throw error;
        }
      }, err => {throw(err)})
      .then((res) => res.json())
      .then(res => {
        setUserdata(res.user);
      })
      .catch(err => console.log(err));
  }, []);

  const logoutHandler = () => {
    props.logoutUser();
  };
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        user.isAuthenticated ? (
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
                Home
              </Menu.Item>

              <Menu.Item key="2" icon={<UnorderedListOutlined />}>
                Profile
              </Menu.Item>

              <Menu.Item key="3" icon={<ToolOutlined />}>
                Settings
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
              <img src="/logo.png" />
            </Link>
          </div>
          <Switch>
            <PrivateRoute
              exact
              path="/profile"
              component={() => <Profile user={userdata} />}
            />
          </Switch>
        </Col>
        <Col span={7}>
          <div className="right_sidebar">
            <div className="profile__btn">
              <img src="/" alt={''} />
              <div className="fullname">
                <Link to="/profile">
                  <Button type="link">{userdata.full_name && userdata.full_name}</Button>
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

export default withRouter(NewsFeed);
