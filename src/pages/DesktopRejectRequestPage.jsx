import { Component } from 'react'
import SharedHeader from "@shared/ui/SharedHeader";
import { Layout } from "antd";

export default class DesktopRejectRequestPage extends Component {
  render() {
    return (
    <Layout className="h-screen overflow-hidden">
      <SharedHeader/>
        <div className="h-[calc(100vh-64px)] flex flex-col items-center justify-center px-2 2xs:px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center h-full w-full max-w-7xl mx-auto">
            <h1 className="text-sm 2xs:text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold 
                         mb-1 2xs:mb-1.5 xs:mb-2 sm:mb-2.5 md:mb-3 lg:mb-4 
                         text-center w-[90%] sm:w-[80%] md:w-[70%] 
                         break-words">
              Oops! Your request has been denied
            </h1>
            <p className="text-gray-900 
                         text-[10px] 2xs:text-xxs xs:text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 
                         mb-2 2xs:mb-3 xs:mb-4 sm:mb-5 md:mb-6 lg:mb-7 
                         text-center w-[95%] sm:w-[85%] md:w-[75%] 
                         break-words">
              Please reach out to your teacher for support!
            </p>
            
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

            <button 
              className="bg-blue-900 text-white 
                       px-2 2xs:px-2.5 xs:px-3 sm:px-4 md:px-5 lg:px-6 xl:px-7 
                       py-1 2xs:py-1.5 xs:py-2 sm:py-2.5 md:py-3 
                       rounded-md 
                       text-[10px] 2xs:text-xxs xs:text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 
                       border-solid border-2 border-blue-900 
                       hover:bg-blue-800 transition-colors duration-200 
                       min-w-[70px] 2xs:min-w-[80px] xs:min-w-[90px] sm:min-w-[100px] md:min-w-[120px] lg:min-w-[130px]"
              onClick={() => window.location.href = './homepage'}
            >
              Go Back Home
            </button>
          </div>
        </div>
      </Layout>
    )
  }
}
