import { Layout, Button, theme } from 'antd'
import SharedHeader from '@shared/ui/SharedHeader'

const { Content } = Layout

const IntroductionScreen = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken()
  return (
    <Layout>
      <SharedHeader />
      <Content className="px-4 py-6 md:px-6">
        <div className="p-3">
          <div
            className="mx-auto w-full rounded-2xl bg-white p-4 shadow-lg md:w-[95%] md:p-10"
            style={{ background: colorBgContainer }}
          >
            <div>
              <p className="p-2 text-lg text-blue-500">Test structure & Flow</p>
              <p className="p-2 text-2xl font-bold md:text-[30px]">Welcome to English Mock Test Journey!</p>
              <p className="p-2 text-lg font-bold">
                The test is structured to assess different aspects of your language proficiency in the following order:
              </p>
              <ol className="list-none p-0">
                {[
                  {
                    number: '01',
                    title: 'Speaking',
                    description:
                      "You'll describe pictures, share experiences, and give opinions to showcase your speaking abilities."
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
                ].map((item, index) => (
                  <li key={index} className="mb-3 flex w-full items-start gap-4 rounded-lg p-3">
                    <div className="border-1 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-solid border-blue-500 text-base font-bold text-blue-500 md:h-16 md:w-16">
                      {item.number}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="text-xl">{item.title}</p>
                      <p className="mt-1 text-sm text-gray-600 md:overflow-hidden md:text-ellipsis md:whitespace-nowrap">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-6 flex justify-center">
                <Button type="primary" size="large" className="w-72 bg-[#003087] hover:bg-[#003087]">
                  Start Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  )
}

export default IntroductionScreen
