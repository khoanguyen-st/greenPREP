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
      <div className="mb-4">
        <h1 className="text-5xl font-bold text-[#003087]">{data?.Content || 'Speaking Test'}</h1>
        {data?.SubContent && <h2 className="mt-2 text-3xl font-medium text-gray-600">{data.SubContent}</h2>}
      </div>

      <div className="flex flex-1 flex-col min-h-0 overflow-hidden">
        <div className={`flex-none ${isPart4 ? 'mb-2' : 'mb-4'}`}>
          {currentQuestion ? (
            <>
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded-full bg-[#003087] px-6 py-2 text-xl font-semibold text-white">
                  {isPart4 ? 'Part 4 Questions' : `Question ${currentQuestionIndex + 1} of ${totalQuestions}`}
                </span>
              </div>
              {isPart4 ? (
                <div className="grid grid-cols-1 gap-2">
                  {data.Questions.map((question, index) => (
                    <div
                      key={index}
                      className="group relative rounded-xl bg-white p-2.5 shadow-md transition-all duration-300 hover:shadow-lg"
                    >
                      <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#003087]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-[#003087] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                      <div className="flex items-start gap-4">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#003087] text-sm font-bold text-white">
                          {index + 1}
                        </div>
                        <p className="text-lg leading-relaxed text-gray-800">{question.Content}</p>
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

        {imageUrl && (
          <div className="flex-1 flex items-center justify-center min-h-0">
            <div className="relative w-full flex justify-center items-center">
              <div className="absolute -inset-1 rounded-2xl bg-[#003087] opacity-10" />
              <img
                src={imageUrl}
                alt="Question visual"
                className="relative rounded-2xl object-contain shadow-lg transition-transform duration-300 hover:scale-105"
                style={{ 
                  maxHeight: data.Content === 'PART 4' 
                    ? 'calc(100vh - 450px)'
                    : data.Content === 'PART 2' || data.Content === 'PART 3'
                    ? 'calc(100vh - 250px)' 
                    : 'calc(100vh - 350px)',
                  width: 'auto',
                  height: data.Content === 'PART 4'
                    ? '300px'
                    : data.Content === 'PART 2' || data.Content === 'PART 3'
                    ? '450px'
                    : '350px'
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default QuestionDisplay
