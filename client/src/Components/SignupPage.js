import React from 'react';
import { Form, Input, Button, Alert, Select, Tooltip } from 'antd';
import { FacebookFilled, GoogleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signupUser } from '../Redux/actions/userAction';
import Loader from './Loader';

const { Option } = Select;

function Signup() {
  const dispatch = useDispatch();
  const signup = useSelector((state) => state.signup);

  const { loading, error, success } = signup;

  const [form] = Form.useForm();

  const registartionHandler = (values) => {
    dispatch(
      signupUser({
        fullname: values.fullname,
        username: values.username,
        email: values.email,
        password: values.password,
        gender: values.gender,
      })
    );
    form.resetFields();
  };

  return (
    <div>
      <>
        <div className="login_wrap">
          <h1>Registration</h1>
          <Form
            form={form}
            name="normal_login"
            className="login-form"
            onFinish={registartionHandler}
          >
            <Form.Item
              name="fullname"
              rules={[
                {
                  required: true,
                  message: 'Please input your Fullname!',
                },
              ]}
            >
              <Input placeholder="Full name" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your Email!',
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Choose a Username!',
                },
              ]}
            >
              <Input placeholder="Username" />
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
              <Input type="password" placeholder="Password" autoComplete="on" />
            </Form.Item>
            <Form.Item name="gender" rules={[{ required: true }]}>
              <Select placeholder="Gender" allowClear>
                <Option value="male">male</Option>
                <Option value="female">female</Option>
                <Option value="other">other</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Sign up
              </Button>

              <div style={{ textAlign: 'center', marginTop: 5 }}>
                <Tooltip title="Signup with Google">
                  <Button
                    style={{ marginRight: 5, color: '#40a9ff' }}
                    shape="circle"
                    icon={<FacebookFilled />}
                  />
                </Tooltip>
                <Tooltip title="Signup with Facebook">
                  <Button
                    style={{ color: 'red' }}
                    shape="circle"
                    icon={<GoogleOutlined />}
                  />
                </Tooltip>
              </div>
            </Form.Item>
            <Link to="/login">
              <Button type="link">Login now!</Button>
            </Link>
            {loading && <Loader />}
            {success && (
              <Alert
                message={'Registration Successfull!'}
                type="success"
                showIcon
              ></Alert>
            )}
            {error && <Alert message={error} type="error" showIcon></Alert>}
          </Form>
        </div>
      </>
    </div>
  );
}

export default Signup;
