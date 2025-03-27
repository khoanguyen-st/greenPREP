import { GrammarProvider } from '@shared/context/grammar-context'
import { ConfigProvider } from 'antd'
import { Outlet } from 'react-router-dom'

import { GRAMMAR_DATA } from '@/__mock/grammar'

const GrammarPage = () => {
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
          <Outlet />
        </ConfigProvider>
      </GrammarProvider>
    </>
  )
}

export default GrammarPage
