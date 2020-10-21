import React from 'react';
import { Form, Input, Button, Checkbox, Alert, Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

function Login(props) {
  let location = useLocation();

  let { from } = location.state || { from: { pathname: '/' } };
  console.log(from);
  const onFinish = (values) => {
    props.loginUser({
      username: values.username,
      password: values.password,
    });
  };

  return (
    <div>
      <div className="login_wrap">
        <h1>Login</h1>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
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
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="/">
              Forgot password
            </a>
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
          {props.isLoading && <Spin size="small" />}
          {props.errMess !== null && (
            <Alert message={props.errMess} type="error" showIcon />
          )}
        </Form>
      </div>
    </div>
  );
}

export default Login;
