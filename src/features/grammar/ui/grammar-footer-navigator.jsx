import { navigateLogo } from '@assets/images'
import NavigationButtons from '@shared/ui/navigation-button'
import { Image } from 'antd'

const FooterNavigator = ({ totalQuestions, currentQuestion, setCurrentQuestion, handleSubmit }) => {
  return (
    <>
      <div className="fixed bottom-8 left-4 z-20 hidden w-fit mdL:block">
        <Image src={navigateLogo} alt="Logo" preview={false} className="h-[100px] w-auto" />
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-10 bg-white shadow-md">
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
