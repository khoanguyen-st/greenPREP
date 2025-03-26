import { Image } from 'antd'
import navigateLogo from '@assets/Images/navigate-logo.png'
import NavigationButtons from '@shared/ui/NavigationButtons/NavigationButtons'

const FooterNavigator = ({ totalQuestions, currentQuestion, setCurrentQuestion, handleSubmit }) => {
  return (
    <>
      <div className="z-1 fixed bottom-12 left-4 hidden w-fit mdL:block">
        <Image src={navigateLogo} alt="Logo" preview={false} className="h-[100px] w-auto" />
      </div>

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
  )
}

export default FooterNavigator
