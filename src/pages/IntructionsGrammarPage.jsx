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
          {/* Top empty space with border */}
          <div className="border-b border-[#f8d7da]"></div>
          <div className="border-b border-[#f8d7da]"></div>
          <div className="py-8 md:py-12 border-b border-[#f8d7da]"></div>
          
          {/* Title section - centered */}
          <div className="border-b border-[#f8d7da]">
            <div className="py-10 md:py-4 mx-auto text-center px-4">
              <Title level={3} className="m-0 text-2xl sm:text-3xl md:text-4xl font-bold mx-auto">
                Aptis General Grammar and Vocabulary Test Instructions
              </Title>
            </div>
          </div>
          
          {/* Content section - centered */}
          <div className="border-b border-[#f8d7da]">
            <div className="py-4 md:py-6 mx-auto px-6 sm:px-10 md:px-16 lg:px-20 text-center sm:text-left max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
              <Text className="block text-base font-bold mb-3 md:mb-4">
                Grammar and Vocabularies
              </Text>
              
              <Text className="block mb-2 text-base">
                The test consists of two sections:
              </Text>
              
              <Text className="block mb-2 text-base">
                Grammar: 25 questions
              </Text>
              
              <Text className="block mb-2 whitespace-nowrap text-base">
                Vocabulary: 5 tasks with 5 questions each task
              </Text>
              
              <Text className="block mb-6 md:mb-8 text-base">
                Total Time: 25 minutes
              </Text>
              
              <Text className="block mb-2 md:mb-8 whitespace-nowrap text-base">
                When you click on the &quot;Next&quot; button, the test will begin.
              </Text>
            </div>
          </div>
          
          {/* Button section - moved above the flexible space */}
          <div className="border-b border-[#f8d7da]">
            <div className="flex justify-end py-16 px-8 md:px-10 lg:px-42">
              <Button
                type="primary"
                size="large"
                className="bg-[#003087] w-20 sm:w-24 h-9 sm:h-10 flex items-center justify-center"
                onClick={handleNext}
              >
                Next <ArrowRightOutlined />
              </Button>
            </div>
          </div>
          
          {/* Empty space that fills the remaining vertical space */}
          <div className="flex-grow border-b border-[#f8d7da]"></div>
          
          {/* Bottom border */}
          <div className="border-b border-[#f8d7da]"></div>
        </div>
      </Content>
    </Layout>
  );
};

export default IntructionsGrammarPage;
