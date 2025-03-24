import { Layout, Button, Typography, Space, Row, Col } from 'antd'
import { useNavigate } from 'react-router-dom'

const { Content } = Layout
const { Title, Text } = Typography

const GrammarVocabPage = () => {
  const navigate = useNavigate()

  const handleStart = () => {
    navigate('/grammar-instructions')
  }

  return (
    <Layout className="min-h-screen">
      <Content className="px-0 py-0">
        <Row className="mx-auto min-h-screen w-full flex-col border-t border-[#f8d7da]">
          <Col className="border-b border-[#f8d7da] py-6 sm:py-8 md:py-12" span={24}></Col>

          <Col className="border-b border-[#f8d7da] py-4 text-center sm:py-5 md:py-6" span={24}>
            <Title level={1} className="!m-0 text-3xl !text-[#003087] sm:text-4xl md:text-5xl">
              GreenPREP
            </Title>
          </Col>

          <Col className="border-b border-[#f8d7da]" span={24}>
            <Row className="mx-auto max-w-xs px-3 py-4 sm:max-w-sm sm:px-4 sm:py-5 md:max-w-md">
              <Col span={24}>
                <Space direction="vertical" size={0} className="mb-2 w-full text-left sm:mb-3">
                  <Text className="block text-base font-medium sm:text-lg">Aptis General Practice Test</Text>
                  <Text strong className="block text-base sm:text-lg">
                    Grammar & Vocabs
                  </Text>
                </Space>
              </Col>

              <Col span={24} className="mt-3 sm:mt-4">
                <Row>
                  <Col span={12}>
                    <Space direction="vertical" size={1}>
                      <Text strong className="mb-1 block text-sm sm:text-base">
                        Number of Questions
                      </Text>
                      <Text className="text-sm sm:text-base">30</Text>
                    </Space>
                  </Col>
                  <Col span={12} className="text-right">
                    <Space direction="vertical" size={1} className="inline-flex">
                      <Text strong className="mb-1 block text-sm sm:text-base">
                        Time Allowed
                      </Text>
                      <Text className="text-sm sm:text-base">25 mins</Text>
                    </Space>
                  </Col>
                </Row>
              </Col>

              <Col span={24}>
                <Space direction="vertical" size={10} className="w-full">
                  <Row className="mt-2 sm:mt-3">
                    <Col span={24}>
                      <Text strong className="mb-1 block text-sm sm:text-base">
                        Assessment Description
                      </Text>
                      <Text className="block text-sm sm:text-base"></Text>
                    </Col>
                  </Row>

                  <Row className="mt-2 sm:mt-3">
                    <Col span={24}>
                      <Text strong className="mb-1 block text-sm sm:text-base">
                        Form Description
                      </Text>
                      <Text className="block text-sm sm:text-base"></Text>
                    </Col>
                  </Row>
                </Space>
              </Col>
            </Row>
          </Col>

          <Col className="border-b border-[#f8d7da] py-3 text-center sm:py-4" span={24}>
            <Button
              type="primary"
              size="large"
              className="h-8 w-28 bg-[#003087] sm:h-9 sm:w-32 md:h-10 md:w-40"
              onClick={handleStart}
            >
              Start
            </Button>
          </Col>

          <Col className="flex-grow border-b border-[#f8d7da]" span={24}></Col>
        </Row>
      </Content>
    </Layout>
  )
}

export default GrammarVocabPage
