import React from 'react';
import { Breadcrumb, Layout, Menu, Input, Button, Typography, Dropdown, Form, theme } from "antd";
import { DownOutlined, HeartOutlined } from "@ant-design/icons";
import * as Yup from "yup"; // Import Yup for validation

const { Header, Content,Footer } = Layout;
const { Title, Text } = Typography;

const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="/profile">Profile</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="/signout">Sign Out</a>
    </Menu.Item>
  </Menu>
);

const SubmitSuccessfully = () => {
  return (
    <Layout>
        <Header style={{ display: 'flex', alignItems: 'center' }}>
            <div className="logo" />            
        </Header>
        <Content style={{ padding: '0 50px' }}>
        <div
          style={{
            minHeight: 280,
            padding: 24,
          }}
        >
          Content
        </div>
        </Content>
    </ Layout>
  )
}

export default SubmitSuccessfully