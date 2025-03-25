import { Button, Typography } from 'antd'

const { Title, Text } = Typography

export const Introduction = ({ data, onStart }) => {
  return (
    <div className="flex min-h-screen flex-col text-center font-sans">
      <div className="mx-auto mb-6 flex max-w-3xl flex-1 flex-col items-center justify-center text-center">
        <Title className="mb-6 text-3xl" style={{ color: '#003087' }}>
          GreenPREP
        </Title>
        <div className="mb-6 w-full text-left">
          <Title level={4} className="m-0 leading-normal">
            {data.testName}
          </Title>
          <Title level={5} className="m-0 leading-normal">
            {data.section}
          </Title>

          <div className="mb-6">
            <div className="mb-6 flex flex-col justify-between md:flex-row">
              <div className="mb-6 flex flex-1 flex-col md:mb-0">
                <Text strong className="mb-1">
                  Number of Questions
                </Text>
                <Text className="text-base">{data.questionCount}</Text>
              </div>
              <div className="mb-6 flex flex-1 flex-col">
                <Text strong className="mb-1">
                  Time Allowed
                </Text>
                <Text className="text-base">{data.timeAllowed}</Text>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex w-full flex-col">
                <Text strong className="mb-1">
                  Assessment Description
                </Text>
                <Text className="text-base">{data.assessmentDescription}</Text>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex w-full flex-col">
                <Text strong className="mb-1">
                  Form Description
                </Text>
                <Text className="text-base">{data.formDescription}</Text>
              </div>
            </div>
          </div>
        </div>

        <Button
          type="primary"
          size="large"
          className="h-10 w-[200px] text-base"
          style={{ backgroundColor: '#003087', borderColor: '#003087' }}
          onClick={onStart}
        >
          Start
        </Button>
      </div>
    </div>
  )
}
