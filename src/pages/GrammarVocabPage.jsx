import { Layout, Button, Typography } from "antd";
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
          {/* Top border */}
          <div className="border-b border-[#f8d7da]"></div>
          
          {/* Empty space - reduced */}
          <div className="py-12 border-b border-[#f8d7da]"></div>
          
          {/* GreenPREP title */}
          <div className="text-center py-6 border-b border-[#f8d7da]">
            <Title level={1} className="!m-0 !text-[#003087] text-4xl">
              GreenPREP
            </Title>
          </div>
          
          {/* Test details section */}
          <div className="border-b border-[#f8d7da]">
            <div className="max-w-md mx-auto py-5 px-4">
              {/* Test title section */}
              <div className="text-left mb-3">
                <Text className="block text-lg font-medium">
                  Aptis General Practice Test
                </Text>
                <Text className="block text-lg font-bold">
                  Grammar & Vocabs
                </Text>
              </div>
              
              {/* Questions and time section */}
              <div className="flex mt-4">
                <div className="w-1/2">
                  <Text strong className="block mb-1">Number of Questions</Text>
                  <Text>30</Text>
                </div>
                <div className="w-1/2 text-right">
                  <Text strong className="block mb-1">Time Allowed</Text>
                  <Text>25 mins</Text>
                </div>
              </div>
              
              {/* Assessment description */}
              <div className="mt-3">
                <Text strong className="block mb-1">Assessment Description</Text>
                <Text className="block"></Text>
              </div>
              
              {/* Form description */}
              <div className="mt-3">
                <Text strong className="block mb-1">Form Description</Text>
                <Text className="block"></Text>
              </div>
            </div>
          </div>
          
          {/* Start button section */}
          <div className="text-center py-4 border-b border-[#f8d7da]">
            <Button
              type="primary"
              size="large"
              className="w-40 bg-[#003087]"
              onClick={handleStart}
            >
              Start
            </Button>
          </div>
          
          {/* Flexible space that grows to fill remaining screen */}
          <div className="flex-grow border-b border-[#f8d7da]"></div>
        </div>
      </Content>
    </Layout>
  );
};

export default GrammarVocabPage;
