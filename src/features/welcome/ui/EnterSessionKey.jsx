import { Layout, Input, Button, Typography, Form } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;
const { Title, Text } = Typography;

const FAKE_SESSION_KEYS = [
  "ABC123XYZ",
  "TEST-SESSION-001",
  "MOCK_KEY_2025",
  "APTIS-EXAM-456",
  "VALIDKEY789",
];

const EnterSessionKey = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleStart = (sessionKey) => {
    navigate("/waiting-for-approval");
  };

  return (
    <Layout>
      <Content className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-white px-5 md:px-20 gap-10 md:gap-40">
        <div className="w-full md:w-[30%] flex justify-center items-center">
          <img
            src="src/assets/Images/session-key.png"
            alt="Mascot"
            className="max-w-[250px] md:max-w-[550px] object-contain"
          />
        </div>
        <div className="w-full md:w-[70%] flex flex-col pr-0 md:pr-5 items-center md:items-start mt-0 md:mt-[-20%]">
          <div className="text-center w-full mb-6">
            <Title className="text-[28px] md:text-[40px] font-bold mb-4 md:mb-5">
              Welcome to <span className="text-[#003087]">GreenPREP !</span>
            </Title>
            <div className="flex flex-col items-center md:items-start">
              <Text className="text-lg md:text-[40px] font-normal leading-tight text-center mb-4 md:mb-5">
                Have you received the session key?
              </Text>
              <Text className="text-gray-600 text-sm md:text-[20px] w-fit text-left">
                Please enter session key to start test
              </Text>
            </div>
          </div>
          <Form
            form={form}
            onFinish={handleStart}
            className="w-full max-w-[300px]"
          >
            <Form.Item
              name="sessionKey"
              rules={[
                { required: true, message: "Session key isn't empty!" },
                { max: 100, message: "Session key is too long!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || FAKE_SESSION_KEYS.includes(value.trim())) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("This session key is invalid. Please try again")
                    );
                  },
                }),
              ]}
              hasFeedback
            >
              <Input
                placeholder="Enter session key here"
                className="p-2 border border-gray-300 rounded-md w-full"
                suffix={
                  form.getFieldError("sessionKey").length > 0 ? (
                    <ExclamationCircleOutlined className="text-red-500" />
                  ) : null
                }
              />
            </Form.Item>
            <div className="w-full flex justify-center md:justify-start">
              <Button
                type="primary"
                size="large"
                className="bg-[#003087] hover:!bg-[#131663] rounded-md px-6 py-2"
                htmlType="submit"
              >
                Submit key
              </Button>
            </div>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default EnterSessionKey;
