import React, { Component } from 'react'

export default class DesktopRejectRequestPage extends Component {
  render() {
    return (
      <div className="h-screen overflow-hidden">
        <nav className="bg-blue-900 h-[64px] w-full fixed top-0 z-50 flex items-center">
          <div className="flex justify-between items-center h-full w-full px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10">
            <div className="flex items-center">
              <img  
                src="src\assets\Images\logo.png" 
                alt="GreenPREP Logo" 
                className="h-6 xs:h-8 sm:h-10 md:h-12 lg:h-14 w-8 xs:w-10 sm:w-12 md:w-14 lg:w-16 mr-2 xs:mr-3 sm:mr-4"
              />
              <span className="text-white text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold font-sans">
                <span className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-outfit">G</span>reenPREP
              </span>
            </div>
            
            <div className="bg-blue-700 py-1 xs:py-1.5 sm:py-2 md:py-2.5 px-2 xs:px-3 sm:px-4 md:px-5 rounded-md flex items-center gap-1 xs:gap-1.5 sm:gap-2 md:gap-2.5">
              <span className="text-white text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl">Hi, student name</span>
              <div className="w-5 xs:w-6 sm:w-7 md:w-8 lg:w-9 h-5 xs:h-6 sm:h-7 md:h-8 lg:h-9 rounded-full bg-white flex items-center justify-center">
                <span className="text-blue-900 text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl font-medium border-2 border-black">Y</span>
              </div>
              <svg className="w-2.5 xs:w-3 sm:w-3.5 md:w-4 lg:w-4.5 h-2.5 xs:h-3 sm:h-3.5 md:h-4 lg:h-4.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </nav>

        <div className="h-[calc(100vh-64px)] mt-16 flex flex-col items-center justify-center px-4">
          <h1 className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-1 xs:mb-1.5 sm:mb-2 md:mb-3 text-center">
            Oops! Your request has been denied
          </h1>
          <p className="text-gray-900 text-xxs xs:text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl mb-3 xs:mb-4 sm:mb-5 md:mb-6 lg:mb-7 text-center">
            Please reach out to your teacher for support!
          </p>
          
          <img 
            src="src\assets\Images\icon_re.jpg" 
            className="w-24 xs:w-32 sm:w-40 md:w-48 lg:w-56 xl:w-64 h-24 xs:h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64 mb-3 xs:mb-4 sm:mb-5 md:mb-6 lg:mb-7"
            alt="Reject Request Icon"
          />

          <button 
            className="bg-blue-900 text-white px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 py-1 xs:py-1.5 sm:py-2 md:py-2.5 rounded-md text-xxs xs:text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl border-solid border-2 border-blue-900 hover:bg-blue-800 transition-colors duration-200"
            onClick={() => window.location.href = './homepage'}
          >
            Go Back Home
          </button>
        </div>
      </div>
    )
  }
}
