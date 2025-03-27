import { Image } from 'antd'
import NavigationButtons from '@shared/ui/NavigationButtons/NavigationButtons'
import { navigateLogo } from '@assets/images'

// eslint-disable-next-line no-unused-vars
const FooterNavigator = ({ totalParts, currentPart, setCurrentPart, handleSubmit, isLastPart = false }) => {
  return (
    <>
      <div className="fixed bottom-8 left-4 z-20 hidden w-fit mdL:block">
        <Image src={navigateLogo} alt="Logo" preview={false} className="h-[100px] w-auto" />
      </div>

      <div className="fixed bottom-0 left-0 z-[48] w-full bg-white shadow-lg">
        <NavigationButtons
          totalQuestions={totalParts}
          currentQuestion={currentPart}
          setCurrentQuestion={setCurrentPart}
          fetchQuestion={() => Promise.resolve()}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  )
}

export default FooterNavigator
