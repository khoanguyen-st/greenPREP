import { ListeningProvider } from '@shared/context/listening-context'
import { ConfigProvider } from 'antd'
import { Outlet } from 'react-router-dom'

import { LISTENING_DATA } from '@/__mock/listening'

const ListeningPage = () => {
  const theme = {
    token: {
      colorPrimary: '#003087',
      borderRadius: 4,
      fontFamily: 'sans-serif'
    }
  }

  return (
    <>
      <ListeningProvider data={LISTENING_DATA}>
        <ConfigProvider theme={theme}>
          <Outlet />
        </ConfigProvider>
      </ListeningProvider>
    </>
  )
}

export default ListeningPage
