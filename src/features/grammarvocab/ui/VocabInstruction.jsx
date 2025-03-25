import { Layout, Typography, Button, Space, Row, Col } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'

const { Content, Footer } = Layout
const { Title, Text } = Typography

const VocabInstruction = ({ setStep }) => {
  const handleNext = () => {
    setStep(3)
  }

  return (
    <Layout className="min-h-screen">
      <Content className="bg-[white] px-0 py-0">
        <Row className="mx-auto w-full flex-col border-t border-[#f8d7da]">
          <Col className="border-b border-[#f8d7da] py-4 sm:py-6 md:py-8 lg:py-12" span={24}></Col>

          <Col className="border-b border-[#f8d7da]" span={24}>
            <Row className="mx-auto px-2 py-4 text-center sm:px-4 sm:py-6 md:px-6 md:py-8">
              <Col span={24}>
                <Title level={3} className="m-0 mx-auto text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl">
                  Aptis General Grammar and Vocabulary Test Instructions
                </Title>
              </Col>
            </Row>
          </Col>

          <Col className="border-b border-[#f8d7da]" span={24}>
            <Row className="mx-auto max-w-xs px-4 py-4 text-left sm:max-w-sm sm:px-6 md:max-w-md md:px-10 lg:max-w-lg lg:px-16">
              <Col span={24}>
                <Space direction="vertical" size={0} className="w-full">
                  <Text strong className="mb-2 block text-sm sm:mb-3 sm:text-base md:mb-4">
                    Grammar and Vocabulary
                  </Text>

                  <Text className="mb-2 block text-sm sm:text-base">The test consists of two sections:</Text>

                  <Text className="mb-2 block text-sm sm:text-base">Grammar: 25 questions</Text>

                  <Text className="mb-2 block whitespace-nowrap text-sm sm:text-base">
                    Vocabulary: 5 tasks with 5 questions each task
                  </Text>

                  <Text className="mb-4 block text-sm sm:mb-6 sm:text-base">Total Time: 25 minutes</Text>

                  <Text className="mb-2 block whitespace-nowrap text-sm sm:mb-4 sm:text-base md:mb-6">
                    When you click on the &quot;Next&quot; button, the test will begin.
                  </Text>
                </Space>
              </Col>
            </Row>
          </Col>
        </Row>
      </Content>

      <Footer className="bg-[#f3f4f6] p-0">
        <Row className="w-full">
          <Col span={24} className="border-t-[3px] border-solid border-[#cccccc]">
            <Row justify="end" className="bg-white px-8 py-6">
              <Button
                type="primary"
                size="large"
                className="flex h-14 w-32 items-center justify-center rounded-[5px] bg-[#003087]"
                onClick={handleNext}
              >
                Next <ArrowRightOutlined />
              </Button>
            </Row>
          </Col>
        </Row>
      </Footer>
    </Layout>
  )
}

export default VocabInstruction
