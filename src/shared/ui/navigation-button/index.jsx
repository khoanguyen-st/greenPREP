import { Button, Modal } from 'antd'
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
    <div className="fixed bottom-0 left-0 right-0 z-10 border-t border-gray-300 bg-white p-4 shadow-lg">
      <hr className="my-4 border-t border-gray-300" />
      <div className="mx-auto flex max-w-4xl items-center justify-end gap-4">
        <Button size="large" onClick={handlePrevious} disabled={currentQuestion === 0}>
          <span className="mr-2">←</span> Previous
        </Button>
        {currentQuestion < totalQuestions - 1 ? (
          <Button
            type="primary"
            size="large"
            onClick={handleNext}
            className="!h-[38px] !rounded-md !border-[#003087] !bg-[#003087] !px-6 !text-sm !text-white hover:!bg-[#002670]"
          >
            Next <span className="ml-2">→</span>
          </Button>
        ) : (
          <Button
            type="primary"
            size="large"
            onClick={handleSubmit}
            className="!h-[38px] !rounded-md !border-[#003087] !bg-[#003087] !px-6 !text-sm !text-white hover:!bg-[#002670]"
          >
            Submit
          </Button>
        )}
      </div>

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

      {isSubmitModalVisible && (
        <Modal
          title="Submit Test"
          visible={isSubmitModalVisible}
          onCancel={handleSubmitModalCancel}
          footer={[
            <Button key="cancel" onClick={handleSubmitModalCancel} className="!h-[38px] !rounded-md !px-6 !text-sm">
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={handleSubmitModal}
              className="!h-[38px] !rounded-md !border-[#003087] !bg-[#003087] !px-6 !text-sm !text-white hover:!bg-[#002670]"
            >
              Submit
            </Button>
          ]}
        >
          <p>Are you sure you want to submit the test?</p>
        </Modal>
      )}
    </div>
  )
}

export default NavigationButtons
