import { Layout } from 'antd'
import EnterSessionKey from '@features/welcome/ui/EnterSessionKey'
import SharedHeader from '@shared/ui/SharedHeader'

const HomePage = () => {
  return (
    <Layout className="h-screen md:overflow-hidden overflow-auto">
      <SharedHeader />
      <EnterSessionKey />
    </Layout>
  )
}

export default HomePage
