import { useEffect, useState, useRef } from 'react'
const QuestionDisplay = ({
  data,
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  onNextQuestion,
  onNextPart,
  isLastQuestion,
  showNavigation,
  isPart4,
  isUploading,
  isButtonLoading,
  buttonRef
}) => {
  const [imageUrl, setImageUrl] = useState(null)
  const [audioUrl, setAudioUrl] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [buttonClicked, setButtonClicked] = useState(false)
  const pendingActionRef = useRef(null)

  useEffect(() => {
    if (currentQuestion?.ImageKeys?.[0]) {
      setImageUrl(currentQuestion.ImageKeys[0])
    } else if (currentQuestion?.AnswerContent?.imageKeys?.[0]) {
      setImageUrl(currentQuestion.AnswerContent.imageKeys[0])
    } else {
      setImageUrl(null)
    }

    const speakingAnswerStr = localStorage.getItem('speaking_answer')
    if (speakingAnswerStr && currentQuestion) {
      const speakingAnswer = JSON.parse(speakingAnswerStr)
      const questionAnswer = speakingAnswer.questions.find(q => q.questionId === currentQuestion.ID)
      if (questionAnswer && questionAnswer.answerAudio) {
        setAudioUrl(questionAnswer.answerAudio)
      } else {
        setAudioUrl(null)
      }
    } else {
      setAudioUrl(null)
    }
  }, [currentQuestion])

  useEffect(() => {
    setButtonClicked(false)
    pendingActionRef.current = null
  }, [currentQuestionIndex])

  useEffect(() => {
    if (pendingActionRef.current && !isUploading && buttonClicked) {
      executeAction(pendingActionRef.current)
      pendingActionRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUploading])

  const executeAction = async action => {
    setIsLoading(true)

    try {
      if (action === 'nextQuestion') {
        await onNextQuestion()
      } else if (action === 'nextPart') {
        await onNextPart()
      }
    } catch (error) {
      console.error('Error during navigation:', error)
    } finally {
      setIsLoading(false)
      setButtonClicked(false)
    }
  }

  const handleButtonClick = action => {
    if (
      buttonRef.current?.parentElement?.parentElement?.parentElement?.parentElement?.querySelector(
        '[data-auto-submit-timer]'
      )
    ) {
      const timerElement =
        buttonRef.current.parentElement.parentElement.parentElement.parentElement.querySelector(
          '[data-auto-submit-timer]'
        )
      if (timerElement) {
        clearTimeout(Number(timerElement.dataset.autoSubmitTimer))
      }
    }

    setButtonClicked(true)
    if (isUploading) {
      pendingActionRef.current = action
    } else {
      executeAction(action)
    }
  }

  const showLoading = buttonClicked && (isUploading || isLoading || isButtonLoading)

  return (
    <div className="relative flex h-screen w-full flex-col bg-white p-4 lg:w-2/3 lg:p-12">
      <div className="mb-4 lg:mb-8">
        <h1 className="text-3xl font-bold text-[#003087] lg:text-5xl">{data?.Content || 'Speaking Test'}</h1>
        {data?.SubContent && (
          <h2 className="mt-2 text-xl font-medium text-gray-600 lg:mt-4 lg:text-3xl">{data.SubContent}</h2>
        )}
      </div>

      {imageUrl && (
        <div className="mb-4 flex justify-center lg:mb-8">
          <div className="relative w-full max-w-lg">
            <div className="absolute -inset-1 rounded-2xl bg-[#003087] opacity-10" />
            <img
              src={imageUrl}
              alt="Question visual"
              className="relative h-auto min-h-[160px] w-full rounded-2xl object-contain shadow-lg transition-transform duration-300 hover:scale-105 lg:min-h-[220px]"
            />
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto rounded-2xl bg-gray-50 p-4 shadow-lg lg:p-8">
        {currentQuestion ? (
          <>
            <div className="mb-4 flex items-center justify-between lg:mb-6">
              <span className="rounded-xl bg-[#003087] px-4 py-1 text-base font-semibold text-white lg:px-6 lg:py-2 lg:text-xl">
                {isPart4 ? 'Questions' : `Question ${currentQuestionIndex + 1} of ${totalQuestions}`}
              </span>
            </div>
            {isPart4 ? (
              <div className="grid grid-cols-1 gap-2 lg:gap-4">
                {data.Questions.map((question, index) => (
                  <div
                    key={index}
                    className="group relative rounded-xl bg-white p-3 shadow-md transition-all duration-300 hover:shadow-lg lg:p-4"
                  >
                    <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#003087]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-[#003087] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="flex items-start gap-2 lg:gap-4">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#003087] text-xs font-bold text-white lg:h-8 lg:w-8 lg:text-sm">
                        {index + 1}
                      </div>
                      <p className="text-base leading-relaxed text-gray-800 lg:text-xl">{question.Content}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <p className="text-lg leading-relaxed text-gray-800 lg:text-2xl">{currentQuestion.Content}</p>

                {audioUrl && (
                  <div className="mt-4 rounded-lg bg-green-50 p-3 lg:mt-6 lg:p-4">
                    <audio controls className="w-full">
                      <source src={audioUrl} type="audio/webm" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <p className="text-lg text-gray-600 lg:text-2xl">No questions available.</p>
        )}
      </div>

      {showNavigation && (
        <div className="mt-4 flex justify-end lg:mt-6">
          <button
            ref={buttonRef}
            onClick={() => handleButtonClick(isLastQuestion || isPart4 ? 'nextPart' : 'nextQuestion')}
            disabled={showLoading}
            className={`rounded-[6px] bg-[#003087] px-4 py-2 text-base font-medium text-white transition-all hover:bg-[#002b6c] lg:px-8 lg:py-4 lg:text-xl ${
              showLoading ? 'cursor-not-allowed opacity-70' : ''
            }`}
          >
            {showLoading ? (
              <span className="flex items-center">
                <svg
                  className="mr-2 h-4 w-4 animate-spin text-white lg:h-5 lg:w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Loading...
              </span>
            ) : isPart4 ? (
              'Submit'
            ) : isLastQuestion ? (
              'Next Part'
            ) : (
              'Next Question'
            )}
          </button>
        </div>
      )}
    </div>
  )
}

export default QuestionDisplay
