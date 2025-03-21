import { Layout, Button, Typography, Space, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;
const { Title, Text } = Typography;

const GrammarVocabPage = () => {
  const navigate = useNavigate();
  
  const handleStart = () => {
    console.log("Navigating to instructions page");
    navigate("/grammar-instructions");
  };

  return (
    <Layout className="min-h-screen">
      <Content className="px-0 py-0">
        <div className="w-full mx-auto border-t border-[#f8d7da] flex flex-col min-h-screen">
   
          <div className="border-b border-[#f8d7da]"></div>
          
          <div className="py-6 sm:py-8 md:py-12 border-b border-[#f8d7da]"></div>
          
          <div className="text-center py-4 sm:py-5 md:py-6 border-b border-[#f8d7da]">
            <Title level={1} className="!m-0 !text-[#003087] text-3xl sm:text-4xl md:text-5xl">
              GreenPREP
            </Title>
          </div>
          
          <div className="border-b border-[#f8d7da]">
            <div className="max-w-xs sm:max-w-sm md:max-w-md mx-auto py-4 sm:py-5 px-3 sm:px-4">
              <Space direction="vertical" size={0} className="w-full text-left mb-2 sm:mb-3">
                <Text className="block text-base sm:text-lg font-medium">
                  Aptis General Practice Test
                </Text>
                <Text strong className="block text-base sm:text-lg">
                  Grammar & Vocabs
                </Text>
              </Space>
              
              <Row className="mt-3 sm:mt-4">
                <Col span={12}>
                  <Space direction="vertical" size={1}>
                    <Text strong className="block mb-1 text-sm sm:text-base">Number of Questions</Text>
                    <Text className="text-sm sm:text-base">30</Text>
                  </Space>
                </Col>
                <Col span={12} className="text-right">
                  <Space direction="vertical" size={1} className="inline-flex">
                    <Text strong className="block mb-1 text-sm sm:text-base">Time Allowed</Text>
                    <Text className="text-sm sm:text-base">25 mins</Text>
                  </Space>
                </Col>
              </Row>
              
              <Space direction="vertical" size={10} className="w-full">
                <div className="mt-2 sm:mt-3">
                  <Text strong className="block mb-1 text-sm sm:text-base">Assessment Description</Text>
                  <Text className="block text-sm sm:text-base"></Text>
                </div>
                
                <div className="mt-2 sm:mt-3">
                  <Text strong className="block mb-1 text-sm sm:text-base">Form Description</Text>
                  <Text className="block text-sm sm:text-base"></Text>
                </div>
              </Space>
            </div>
          </div>
          
          <div className="text-center py-3 sm:py-4 border-b border-[#f8d7da]">
            <Button
              type="primary"
              size="large"
              className="w-28 sm:w-32 md:w-40 bg-[#003087] h-8 sm:h-9 md:h-10"
              onClick={handleStart}
            >
              Start
            </Button>
          </div>
          
          <div className="flex-grow border-b border-[#f8d7da]"></div>
        </div>
      </Content>
    </Layout>
  );
};

export default GrammarVocabPage;