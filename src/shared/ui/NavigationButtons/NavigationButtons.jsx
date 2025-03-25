import { useState } from 'react'
const NavigationButtons = ({ totalQuestions, currentQuestion, setCurrentQuestion, fetchQuestion, onSubmit }) => {
  const [isSubmitModalVisible, setIsSubmitModalVisible] = useState(false)
  const [error, setError] = useState(null)
  const handleNext = async () => {
    if (currentQuestion < totalQuestions - 1) {
      try {
        await fetchQuestion(currentQuestion + 1)
        setCurrentQuestion(currentQuestion + 1)
        setError(null)
      } catch {
        setError('Failed to load the next question. Please try again.')
      }
    }
  }
  const handlePrevious = async () => {
    if (currentQuestion > 0) {
      try {
        await fetchQuestion(currentQuestion - 1)
        setCurrentQuestion(currentQuestion - 1)
        setError(null)
      } catch {
        setError('Failed to load the previous question. Please try again.')
      }
    }
  }
  const handleSubmit = () => {
    setIsSubmitModalVisible(true)
  }
  const handleSubmitModal = () => {
    setIsSubmitModalVisible(false)
    onSubmit()
  }
  const handleSubmitModalCancel = () => {
    setIsSubmitModalVisible(false)
  }
  const retryNavigation = async questionIndex => {
    try {
      await fetchQuestion(questionIndex)
      setCurrentQuestion(questionIndex)
      setError(null)
    } catch {
      setError('Failed to load the question. Please try again.')
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-gray-300 bg-white shadow-lg">
      <hr className="my-4 border-t border-gray-300" />
      <div className="mx-auto flex max-w-4xl items-center justify-end gap-4">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className={`flex items-center rounded-lg px-6 py-3 ${
            currentQuestion === 0
              ? 'cursor-not-allowed bg-gray-300'
              : 'border border-gray-300 bg-white text-gray-800 hover:bg-gray-100'
          }`}
        >
          <span className="mr-2">←</span> Previous
        </button>
        {currentQuestion < totalQuestions - 1 ? (
          <button
            onClick={handleNext}
            className="flex items-center rounded-lg bg-blue-700 px-6 py-3 text-white hover:bg-blue-800"
          >
            Next <span className="ml-2">→</span>
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="flex items-center rounded-lg bg-green-500 px-6 py-3 text-white hover:bg-green-600"
          >
            Submit
          </button>
        )}
      </div>

      {/* Modal error message */}
      {error && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold text-red-600">Error</h2>
            <p className="text-gray-700">{error}</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => retryNavigation(currentQuestion)}
                className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-700"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Modal */}
      {isSubmitModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold">Submit Test</h2>
            <p>Are you sure you want to submit the test?</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleSubmitModalCancel}
                className="mr-2 rounded bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitModal}
                className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NavigationButtons
