import { Layout, Menu, Dropdown, Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";

const { Header } = Layout;
const { Title } = Typography;

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

const SharedHeader = () => {
  return (
    <Header className="flex justify-between items-center bg-[#003087] p-5 md:p-10 h-[80px] md:h-[107px]">
      <Title level={2} className="ml-2 mt-2 md:mt-4">
        <img
          className="h-[50px] md:h-[75px] w-[120px] md:w-[156px]"
          src="src/assets/Images/logo.png"
          alt="Logo"
        />
      </Title>
      <Dropdown overlay={menu} trigger={["click"]}>
        <a
          className="ant-dropdown-link bg-[#3758F96B] h-[40px] md:h-[50px] px-2 flex justify-between items-center rounded-[5px] text-white cursor-pointer w-auto min-w-[140px] md:min-w-[180px] max-w-[200px] md:max-w-[234px] gap-2.5"
          onClick={(e) => e.preventDefault()}
        >
          <span className="flex items-center space-x-1">
            <span>Hi,</span>
            <span className="">Student name</span>
          </span>
          <span className="flex justify-center items-center w-8 md:w-10 h-8 md:h-10 bg-white border border-black text-black rounded-full md:rounded-[50%] font-bold">
            Y
          </span>
          <DownOutlined className="text-white text-xs md:text-sm" />
        </a>
      </Dropdown>
    </Header>
  );
};

export default SharedHeader;
