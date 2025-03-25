import { Image } from "antd";
import NavigationButtons from "@shared/ui/NavigationButtons/NavigationButtons";
import { navigateLogo } from "@assets/images/index";

const FooterNavigator = ({ totalQuestions, currentQuestion, setCurrentQuestion, handleSubmit }) => {
  return (
    <>
      {/* Logo ở góc dưới bên trái */}
      <div className="fixed bottom-12 left-4 z-50 w-fit hidden mdL:block">
        <Image
          src={navigateLogo}
          alt="Logo"
          preview={false}
          className="h-[100px] w-auto"
        />
      </div>
      
      {/* Thanh điều hướng ở dưới */}
      <div className="bottom-0 shadow-md">
        <NavigationButtons
          totalQuestions={totalQuestions}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          fetchQuestion={() => Promise.resolve()}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default FooterNavigator;
