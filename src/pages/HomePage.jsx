import { Layout } from 'antd'
import EnterSessionKey from '@features/welcome/ui/EnterSessionKey'
import SharedHeader from '@shared/ui/SharedHeader'

const HomePage = () => {
  return (
    <Layout className="h-screen overflow-auto md:overflow-hidden">
      <SharedHeader />
      <EnterSessionKey />
    </Layout>
  )
}

export default HomePage
