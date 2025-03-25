import { ConfigProvider } from 'antd'
import useAntiCheat from '@shared/utils/antiCheat.js'
import CustomAlert from '@shared/ui/CustomAlert/CustomAlert.jsx'
import { Outlet } from 'react-router-dom'

const ReadingPage = () => {
  const { showAlert, alertMessage, enableFullScreen } = useAntiCheat()

  const theme = {
    token: {
      colorPrimary: '#003087',
      borderRadius: 4,
      fontFamily: 'sans-serif'
    }
  }

  return (
    <ConfigProvider theme={theme}>
      <CustomAlert show={showAlert} onConfirm={enableFullScreen} message={alertMessage} />
      <Outlet />
    </ConfigProvider>
  )
}

export default ReadingPage
