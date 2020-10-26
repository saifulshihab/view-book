import React from 'react';
import { Col, Row, Input, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Search } = Input;
const { Title } = Typography;
const Header = () => {
  return (
    <Row className="header">
      <Col
        span={7}
        style={{
          display: 'flex',
          alignItems: 'center',
          left: '14%'
        }}
      >
        <Title style={{ marginBottom: '0', float: 'right' }} level={2}>
          Viewbook
        </Title>
      </Col>
      <Col
        span={10}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Link to="/">
          <img className="apps_logo" src="/logo.png" alt="App Logo" />
        </Link>
      </Col>
      <Col
        span={7}
        style={{
          display: 'flex',
          justifyContent: 'left',
          alignItems: 'center',
        }}
      >
        <Search
          size="large"
          placeholder="Search.."
          onSearch={(value) => console.log(value)}
          style={{ width: '300px', borderRadius: '40px' }}
        />
      </Col>
    </Row>
  );
};

export default Header;
