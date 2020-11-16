import React, { useEffect } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../Redux/actions/userAction';
import Loader from './Loader';

function Login({ history }) {
  // let location = useLocation();

  // let { from } = location.state || { from: { pathname: '/' } };

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { loading, error, isAuthenticated } = auth;

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
  }, [isAuthenticated, history]);

  const onFinish = (values) => {
    dispatch(
      loginUser({
        username: values.username,
        password: values.password,
      })
    );
  };

  return (
    <div>
      <div className="login_wrap">
        <h1>Login</h1>
        <Form name="normal_login" className="login-form" onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              autoComplete="on"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or
            <Link to="/signup">
              <Button type="link">Register now!</Button>
            </Link>
          </Form.Item>
          {loading && <Loader />}
          {error && (
            <Alert
              message={'Invalid Username or Password!'}
              type="error"
              showIcon
            />
          )}
        </Form>
      </div>
    </div>
  );
}

export default Login;
