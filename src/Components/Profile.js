import React from 'react';
import { Button, Row, Col } from 'antd';
import {
  CameraOutlined,
  EditOutlined,
  FacebookOutlined,
  HeartOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { baseURL } from '../shared/baseURL';

function Profile(props) {
  return (
    <div>
      <Row>
        <Col span="24">
          <div className="profile_cover">
            {props.user.cover ? (
              <img alt={props.user.username} src={baseURL + props.user.cover} />
            ) : (
              <Button type="primary" shape="circle" icon={<CameraOutlined />} />
            )}
          </div>
          <div className="dp">
            {props.user.dp ? (
              <img alt={props.user.username} src={baseURL + props.user.dp} />
            ) : (
              <Button type="primary" shape="circle" icon={<CameraOutlined />} />
            )}
          </div>
          <div className="pro_info_1">
            <h2>{props.user.full_name}</h2>
            <p className="bio">{props.user.bio}</p>
            <p className="views">Views: {props.user.view}</p>
          </div>
          <div className="pro_info_2">
            <ul>
              <li>
                <EditOutlined /> <span> {props.user.education}</span>
              </li>
              <li>
                <FacebookOutlined /> <span><a href={props.user.social}>{props.user.social}</a></span>
              </li>
              <li>
                <MailOutlined /> <span>{props.user.email}</span>
              </li>
              <li>
                <HeartOutlined /> <span>{props.user.relationship}</span>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </div>
  );
}
export default Profile;
