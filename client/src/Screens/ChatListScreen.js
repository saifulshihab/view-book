import React from "react";
import { List, Avatar } from "antd";

const data = [
  {
    title: "Brad Traversy",
  },
  {
    title: "Fireship.io",
  },
  {
    title: "Ben Awad",
  },
  {
    title: "Maximaz Shwarznagger",
  },
];

const ChatListScreen = () => {
  return (
    <>
      <h2>Chat List</h2>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src="" />}
              title={<a href="/">{item.title}</a>}
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default ChatListScreen;
