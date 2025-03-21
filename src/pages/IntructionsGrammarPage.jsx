import { Layout, Typography, Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;
const { Title, Text } = Typography;

const IntructionsGrammarPage = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    console.log("Starting the test");
    navigate("/grammar-test1");
  };

  return (
    <Layout className="min-h-screen">
      <Content className="px-0 py-0">
        <div className="w-full mx-auto border-t border-[#f8d7da] flex flex-col min-h-screen">
        
          <div className="border-b border-[#f8d7da]"></div>
          <div className="border-b border-[#f8d7da]"></div>
          <div className="py-4 sm:py-6 md:py-8 lg:py-12 border-b border-[#f8d7da]"></div>
          
       
          <div className="border-b border-[#f8d7da]">
            <div className="py-4 sm:py-6 md:py-8 mx-auto text-center px-2 sm:px-4 md:px-6">
              <Title level={3} className="m-0 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mx-auto">
                Aptis General Grammar and Vocabulary Test Instructions
              </Title>
            </div>
          </div>
          
         
          <div className="border-b border-[#f8d7da]">
            <div className="py-4 mx-auto px-4 sm:px-6 md:px-10 lg:px-16 text-left max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
              <Text className="block text-sm sm:text-base font-bold mb-2 sm:mb-3 md:mb-4">
                Grammar and Vocabulary
              </Text>
              
              <Text className="block mb-2 text-sm sm:text-base">
                The test consists of two sections:
              </Text>
              
              <Text className="block mb-2 text-sm sm:text-base">
                Grammar: 25 questions
              </Text>
              
              <Text className="block mb-2 whitespace-nowrap text-sm sm:text-base">
                Vocabulary: 5 tasks with 5 questions each task
              </Text>
              
              <Text className="block mb-4 sm:mb-6 text-sm sm:text-base">
                Total Time: 25 minutes
              </Text>
              
              <Text className="block mb-2 sm:mb-4 md:mb-6 whitespace-nowrap text-sm sm:text-base">
                When you click on the &quot;Next&quot; button, the test will begin.
              </Text>
            </div>
          </div>
          

          <div className="border-b border-[#f8d7da]">
            <div className="flex justify-end py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-10 lg:px-16">
              <Button
                type="primary"
                size="large"
                className="bg-[#003087] w-20 sm:w-24 md:w-28 h-8 sm:h-9 md:h-10 flex items-center justify-center"
                onClick={handleNext}
              >
                Next <ArrowRightOutlined />
              </Button>
            </div>
          </div>
          

          <div className="flex-grow border-b border-[#f8d7da]"></div>
          
 
          <div className="border-b border-[#f8d7da]"></div>
        </div>
      </Content>
    </Layout>
  );
};

export default IntructionsGrammarPage;