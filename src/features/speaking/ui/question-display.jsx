import { useEffect, useState } from 'react'

const QuestionDisplay = ({
  data,
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  onNextQuestion,
  onNextPart,
  isLastQuestion,
  showNavigation,
  isPart4
}) => {
  const [imageUrl, setImageUrl] = useState(null)

  useEffect(() => {
    if (currentQuestion?.ImageKeys?.[0]) {
      setImageUrl(currentQuestion.ImageKeys[0])
    } else if (currentQuestion?.AnswerContent?.imageKeys?.[0]) {
      setImageUrl(currentQuestion.AnswerContent.imageKeys[0])
    } else {
      setImageUrl(null)
    }
  }, [currentQuestion])

  return (
    <div className="relative flex h-screen w-2/3 flex-col bg-white p-12">
      <div className="mb-8">
        <h1 className="text-5xl font-bold text-[#003087]">{data?.Content || 'Speaking Test'}</h1>
        {data?.SubContent && <h2 className="mt-4 text-3xl font-medium text-gray-600">{data.SubContent}</h2>}
      </div>

      {imageUrl && (
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute -inset-1 rounded-2xl bg-[#003087] opacity-10" />
            <img
              src={imageUrl}
              alt="Question visual"
              className="relative h-[300px] rounded-2xl object-contain shadow-lg transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      )}

      <div className="flex-1 rounded-2xl bg-gray-50 p-8 shadow-lg">
        {currentQuestion ? (
          <>
            <div className="mb-6 flex items-center justify-between">
              <span className="rounded-full bg-[#003087] px-6 py-2 text-xl font-semibold text-white">
                {isPart4 ? 'Part 4 Questions' : `Question ${currentQuestionIndex + 1} of ${totalQuestions}`}
              </span>
            </div>
            {isPart4 ? (
              <div className="grid grid-cols-1 gap-4">
                {data.Questions.map((question, index) => (
                  <div
                    key={index}
                    className="group relative rounded-xl bg-white p-4 shadow-md transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#003087]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-[#003087] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="flex items-start gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#003087] text-sm font-bold text-white">
                        {index + 1}
                      </div>
                      <p className="text-xl leading-relaxed text-gray-800">{question.Content}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-2xl leading-relaxed text-gray-800">{currentQuestion.Content}</p>
            )}
          </>
        ) : (
          <p className="text-2xl text-gray-600">No questions available.</p>
        )}
      </div>

      {showNavigation && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={isLastQuestion || isPart4 ? onNextPart : onNextQuestion}
            className="rounded-full bg-[#003087] px-8 py-4 text-xl font-medium text-white transition-all hover:bg-[#002b6c]"
          >
            {isPart4 ? 'Submit' : isLastQuestion ? 'Next Part' : 'Next Question'}
          </button>
        </div>
      )}
    </div>
  )
}

export default QuestionDisplay
