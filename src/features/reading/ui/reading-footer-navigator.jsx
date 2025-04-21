import { navigateLogo } from '@assets/images'
import NavigationButtons from '@shared/ui/navigation-button'
import { Image } from 'antd'

// eslint-disable-next-line no-unused-vars
const FooterNavigator = ({ totalParts, currentPart, setCurrentPart, handleSubmit, isLastPart = false }) => {
  return (
    <>
      <div className="fixed bottom-8 left-4 z-20 hidden w-fit select-none mdL:block">
        <Image src={navigateLogo} alt="Logo" preview={false} className="h-[100px] w-auto" draggable="false" />
      </div>

      <div className="fixed bottom-0 left-0 w-full shadow-md">
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
