import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Loader = ({ small, large, ind }) => {
  return (
    <div className="loader">
      {small ? (
        <Spin
          size="small"
          indicator={ind && <LoadingOutlined style={{ fontSize: 24 }} spin />}
        />
      ) : large ? (
        <Spin
          tip="Loading..."
          indicator={ind && <LoadingOutlined style={{ fontSize: 24 }} spin />}
          size="large"
        />
      ) : (
        <Spin
          indicator={ind && <LoadingOutlined style={{ fontSize: 24 }} spin />}
        />
      )}
    </div>
  );
};

export default Loader;
