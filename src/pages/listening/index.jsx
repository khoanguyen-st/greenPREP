import { ListeningProvider } from '@shared/context/listening-context'
import CustomAlert from '@shared/ui/CustomAlert/CustomAlert'
import useAntiCheat from '@shared/utils/antiCheat'
import { ConfigProvider } from 'antd'
import { Outlet } from 'react-router-dom'

import { LISTENING_DATA } from '@/__mock/listening'

export const ListeningPage = () => {
  const { showAlert, alertMessage, enableFullScreen } = useAntiCheat()

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
          <CustomAlert show={showAlert} onConfirm={enableFullScreen} message={alertMessage} />
          <Outlet />
        </ConfigProvider>
      </ListeningProvider>
    </>
  )
}
