import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import {
  MessageOutlined,
  HomeOutlined,
  LogoutOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import { logoutUser } from "../Redux/actions/userAction";
import { useDispatch } from "react-redux";

const LeftSidebar = () => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutUser());
  };
  return (
    <div className="left_sidebar">
      <Menu defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to="/newsfeed">Home</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<ToolOutlined />}>
          <Link to="/settings">Settings</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<MessageOutlined />}>
          Chats
        </Menu.Item>
        <Menu.Item onClick={logoutHandler} key="5" icon={<LogoutOutlined />}>
          Logout
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default LeftSidebar;
