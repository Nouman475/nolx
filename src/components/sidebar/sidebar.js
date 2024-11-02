// Sidebar.js
import React from "react";
import { Drawer, Menu, Dropdown} from "antd";
import {
  BellOutlined,
  MessageOutlined,
  UserOutlined,
  AppstoreAddOutlined,
  EyeOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  SettingOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

export default function Sidebar({ visible, onClose, userMenu }) {
  return (
    <Drawer title="Menu" placement="left" onClose={onClose} visible={visible}>
      <Menu mode="inline">
        <Menu.Item icon={<BellOutlined />}>
          <Link to="/">Notifications</Link>
        </Menu.Item>
        <Menu.Item icon={<MessageOutlined />}>
          <Link to="/">Messages</Link>
        </Menu.Item>
        <Menu.Item icon={<UserOutlined />}>
          <Dropdown overlay={userMenu}>
            <Link to="/">Account</Link>
          </Dropdown>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item icon={<AppstoreAddOutlined />}>My Ads</Menu.Item>
        <Menu.Item icon={<HeartOutlined />}>Favourites</Menu.Item>
        <Menu.Item icon={<EyeOutlined />}>Public Profile</Menu.Item>
        <Menu.Item icon={<ShoppingCartOutlined />}>Buy Packages</Menu.Item>
        <Menu.Divider />
        <Menu.Item icon={<QuestionCircleOutlined />}>Help</Menu.Item>
        <Menu.Item icon={<SettingOutlined />}>Settings</Menu.Item>
        <Menu.Item icon={<LogoutOutlined />}>Logout</Menu.Item>
      </Menu>
    </Drawer>
  );
}
