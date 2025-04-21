import SharedHeader from '@shared/ui/base-header'
import useAntiCheat from '@shared/utils/antiCheat'
import { Layout, Button, Typography, Card } from 'antd'
import { useNavigate } from 'react-router-dom'

const { Content } = Layout
const { Title } = Typography

const IntroductionPage = () => {
  const navigate = useNavigate()

  const { enableFullScreen } = useAntiCheat()

  const handleNext = async () => {
    await enableFullScreen()
    navigate('/speaking')
  }

  const testSections = [
    {
      number: '01',
      title: 'Speaking',
      description: "You'll describe pictures, share experiences, and give opinions to showcase your speaking abilities."
    },
    {
      number: '02',
      title: 'Listening',
      description:
        'Tune in to various accents and contexts as you answer questions based on dialogues, monologues, and everyday conversations.'
    },
    {
      number: '03',
      title: 'Grammar & Vocabulary',
      description:
        'Demonstrate your understanding of English grammar structures and word usage through a series of engaging questions.'
    },
    {
      number: '04',
      title: 'Reading',
      description:
        'Analyze different texts, extract key information, and improve your reading comprehension skills with multiple-choice and short-answer questions.'
    },
    {
      number: '05',
      title: 'Writing',
      description:
        'Conclude your test with a writing task that challenges you to organize your ideas clearly and effectively in written form.'
    }
  ]

  return (
    <Layout>
      <SharedHeader />
      <Content className="px-4 py-4 md:px-6">
        <div className="p-3">
          <Card className="mx-auto w-full rounded-2xl px-4 shadow-lg md:w-[95%]">
            <p className="p-2 text-lg text-blue-500">Test structure & Flow</p>
            <Title level={2} className="p-2 !text-[30px] font-bold">
              Welcome to English Mock Test Journey!
            </Title>
            <p className="p-2 text-lg font-bold">
              The test is structured to assess different aspects of your language proficiency in the following order:
            </p>
            <ul className="p-0">
              {testSections.map((item, index) => (
                <li key={index} className="mb-3 flex w-full items-start gap-4 rounded-lg p-3">
                  <div className="border-1 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-solid border-blue-500 text-base font-bold text-blue-500 md:h-16 md:w-16">
                    {item.number}
                  </div>
                  <div className="flex-1">
                    <p className="text-xl font-semibold">{item.title}</p>
                    <p className="mt-1 text-sm text-gray-600">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex justify-center">
              <Button type="primary" size="large" className="w-72 bg-[#003087] hover:bg-[#002570]" onClick={handleNext}>
                Start Now
              </Button>
            </div>
          </Card>
        </div>
      </Content>
    </Layout>
  )
}

export default IntroductionPage
