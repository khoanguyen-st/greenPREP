import { DownOutlined } from '@ant-design/icons'
import { Logo } from '@assets/images'
import LogoutModal from '@pages/logout-modal'
import { Avatar, Dropdown, Image, Layout, Menu } from 'antd'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const { Header } = Layout

const SharedHeader = () => {
  // @ts-ignore
  const { user } = useSelector(state => state.auth)
  const navigate = useNavigate()
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Link to={`/profile/${user?.userId}`}>Profile</Link>
      </Menu.Item>
      <Menu.Item key="1" onClick={() => setIsLogoutModalOpen(true)}>
        Sign Out
      </Menu.Item>
    </Menu>
  )

  return (
    <>
      <Header className="flex h-[80px] items-center justify-between border-0 border-l border-solid border-neutral-400 bg-[#003087] px-12">
        <div className="flex cursor-pointer items-center justify-center" onClick={() => navigate('/')}>
          <Image className="max-w-[155px] object-contain" src={Logo} alt="Logo" preview={false} />
        </div>
        <div className="flex items-center justify-center">
          <Dropdown overlay={menu} trigger={['click']} overlayClassName="border-none shadow-none">
            <a
              className="bg-primary-color hover:bg-primary-color/80 flex h-12 w-auto min-w-[150px] max-w-[220px] cursor-pointer items-center gap-3 rounded-md px-3 text-white transition"
              onClick={e => e.preventDefault()}
            >
              <Avatar className="bg-primary-color flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-lg font-semibold text-white">
                {user?.lastName?.charAt(0)}
              </Avatar>
              <span className="flex items-center space-x-1 text-base">
                <span className="font-medium">{user?.lastName}</span>
                <DownOutlined className="text-base text-white" />
              </span>
            </a>
          </Dropdown>
        </div>
      </Header>
      <LogoutModal isOpen={isLogoutModalOpen} onClose={() => setIsLogoutModalOpen(false)} />
    </>
  )
}

export default SharedHeader
