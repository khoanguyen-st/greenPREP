import EnterSessionKey from '@features/welcome/ui/enter-session-key'
import SharedHeader from '@shared/ui/base-header'
import { Layout } from 'antd'

const HomePage = () => {
  return (
    <Layout className="h-screen overflow-auto md:overflow-hidden">
      <SharedHeader />
      <EnterSessionKey />
    </Layout>
  )
}

export default HomePage
