import { Component } from 'react'
import SharedHeader from "@shared/ui/SharedHeader";
import { Layout, Typography,  Button } from "antd";
const { Title ,Text } = Typography;

export default class DesktopRejectRequestPage extends Component {
  render() {
    return (
    <Layout className="h-screen overflow-hidden bg-gray-50">
      <SharedHeader/>
        <div className="h-[calc(100vh-64px)] flex flex-col items-center justify-center px-2 2xs:px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 bg-white">
          <div className="flex flex-col items-center justify-center h-full w-full max-w-7xl mx-auto">
            <Title level={1} className="text-sm 2xs:text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold 
                         mb-1 2xs:mb-1.5 xs:mb-2 sm:mb-2.5 md:mb-3 lg:mb-4 
                         text-center w-[90%] sm:w-[80%] md:w-[70%] 
                         break-words">
              Oops! Your request has been denied
            </Title>
            <Text className="text-gray-900 
                         text-[10px] 2xs:text-xxs xs:text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 
                         mb-2 2xs:mb-3 xs:mb-4 sm:mb-5 md:mb-6 lg:mb-7 
                         text-center w-[95%] sm:w-[85%] md:w-[75%] 
                         break-words">
              Please reach out to your teacher for support!
            </Text>
            
            <div className="flex justify-center items-center w-full">
              <img 
                src="src\assets\Images\icon_re.jpg" 
                className="w-16 2xs:w-20 xs:w-28 sm:w-36 md:w-44 lg:w-52 xl:w-60 2xl:w-68
                         h-16 2xs:h-20 xs:h-28 sm:h-36 md:h-44 lg:h-52 xl:h-60 2xl:h-68 
                         mb-2 2xs:mb-3 xs:mb-4 sm:mb-5 md:mb-6 lg:mb-7 
                         object-contain"
                alt="Reject Request Icon"
              />
            </div>

            <div>
            <Button 
              className="bg-blue-900 text-white
                       px-4 2xs:px-5 xs:px-6 sm:px-7 md:px-8 lg:px-9 xl:px-10 
                       py-2 2xs:py-2.5 xs:py-3 sm:py-3.5 md:py-4 
                       rounded-md 
                       text-[12px] 2xs:text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 
                       border-solid border-2 border-blue-900 
                       hover:bg-blue-800 transition-colors duration-200 
                       min-w-[100px] 2xs:min-w-[120px] xs:min-w-[140px] sm:min-w-[160px] md:min-w-[180px] lg:min-w-[200px]
                       p-2 2xs:p-3 xs:p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8"
              onClick={() => window.location.href = './homepage'}
            >
              Go Back Home
            </Button>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
