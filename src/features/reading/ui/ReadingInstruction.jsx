import { Button, Typography } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

const { Title } = Typography;

const ReadingTestInstructions = ({ testData, onStartTest }) => {
  return (
    <div className="flex min-h-screen flex-col font-sans ">
      <div className="mx-auto max-w-3xl flex-1 px-6 py-10 text-left mt-16">
        <Title level={2} className="mb-4 text-2xl">
          {testData.testName} Instructions
        </Title>

        <Title level={4} className="mb-6 text-xl">
          {testData.section}
        </Title>

        <Typography className="mb-4 text-base">The test has five parts.</Typography>

        <Typography className="mb-4 text-base">
          You have {testData.timeAllowed} to complete the test.
        </Typography>

        <Typography className="mt-14 text-base">
          When you click on the &#39;Next&#39; button, the test will begin.
        </Typography>
      </div>

      <hr className = "border-t border-gray-200 "></hr>
      <div className="flex justify-end border-t border-gray-200 p-4">
        <Button
          type="primary"
          className="flex h-[55px] min-w-[130px] items-center rounded border-[#003087] bg-[#003087] px-5"
          onClick={onStartTest}
        >
          <span>Next</span> <ArrowRightOutlined className="ml-3 text-lg" />
        </Button>
      </div>
    </div>
  );
};

export default ReadingTestInstructions;
