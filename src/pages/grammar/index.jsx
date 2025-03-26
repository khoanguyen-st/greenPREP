import { GrammarProvider } from '@shared/context/grammar-context'
import CustomAlert from '@shared/ui/CustomAlert/CustomAlert'
import useAntiCheat from '@shared/utils/antiCheat'
import { ConfigProvider } from 'antd'
import { Outlet } from 'react-router-dom'

import { GRAMMAR_DATA } from '@/__mock/grammar'

export const GrammarPage = () => {
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
      <GrammarProvider data={GRAMMAR_DATA}>
        <ConfigProvider theme={theme}>
          <CustomAlert show={showAlert} onConfirm={enableFullScreen} message={alertMessage} />
          <Outlet />
        </ConfigProvider>
      </GrammarProvider>
    </>
  )
}
