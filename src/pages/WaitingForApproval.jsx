import { Layout, Typography, Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const menu = (
  <Menu className="border border-[#1741b7]">
    <Menu.Item key="0">
      <a href="/profile">Profile</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="/signout">Sign Out</a>
    </Menu.Item>
  </Menu>
);

const WaitingForApproval = () => {
  return (
    <Layout className="min-h-screen">
      <Header className="flex justify-between items-center bg-[#003087] !p-2 sm:!p-5">
        <Title level={2} className="!text-white !m-0">
          <img
            src="src\assets\Images\logo.png"
            alt=""
            className="h-[40px] sm:h-[50px] w-auto"
          />
        </Title>

        <Dropdown overlay={menu} trigger={["click"]}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            <Text className="text-white text-sm sm:text-base">Hi, </Text>
            <Text className="text-[#f26f21] hover:text-[#e87a39] font-bold text-sm sm:text-base">
              Student name
            </Text>
            <DownOutlined className="!pl-1 text-white !text-[0.8rem]" />
          </a>
        </Dropdown>
      </Header>

      <Content className="p-4 sm:p-8 md:p-12">
        <div className="flex flex-col items-center mt-8 sm:mt-12 md:mt-16">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center px-4">
            Your request is in the teacher&apos;s hands!
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-center mt-2 px-4">
            Sit tight and hold on for a moment!
          </p>
          <img
            src="src/assets/Images/06.gif"
            alt="Notification"
            className="w-48 h-48 sm:w-64 sm:h-64 mt-6 sm:mt-8"
          />
        </div>
      </Content>
    </Layout>
  );
};

export default WaitingForApproval;
