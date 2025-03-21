import { useState } from "react";
const NavigationButtons = ({
  totalQuestions,
  currentQuestion,
  setCurrentQuestion,
  fetchQuestion,
}) => {
  const [isSubmitModalVisible, setIsSubmitModalVisible] = useState(false);
  const [error, setError] = useState(null);
  const handleNext = async () => {
    if (currentQuestion < totalQuestions - 1) {
      try {
        await fetchQuestion(currentQuestion + 1);
        setCurrentQuestion(currentQuestion + 1);
        setError(null);
      } catch {
        setError("Failed to load the next question. Please try again.");
      }
    }
  };
  const handlePrevious = async () => {
    if (currentQuestion > 0) {
      try {
        await fetchQuestion(currentQuestion - 1);
        setCurrentQuestion(currentQuestion - 1);
        setError(null);
      } catch {
        setError("Failed to load the previous question. Please try again.");
      }
    }
  };
  const handleSubmit = () => {
    setIsSubmitModalVisible(true);
  };
  const handleSubmitModalOk = () => {
    setIsSubmitModalVisible(false);
  };
  const handleSubmitModalCancel = () => {
    setIsSubmitModalVisible(false);
  };
  const retryNavigation = async (questionIndex) => {
    try {
      await fetchQuestion(questionIndex);
      setCurrentQuestion(questionIndex);
      setError(null);
    } catch {
      setError("Failed to load the question. Please try again.");
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 p-4 shadow-lg">
      <hr className="my-4 border-t border-gray-300" />
      <div className="max-w-4xl mx-auto flex justify-end items-center gap-4">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className={`flex items-center px-6 py-3 rounded-lg ${
            currentQuestion === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-white border border-gray-300 hover:bg-gray-100 text-gray-800"
          }`}
        >
          <span className="mr-2">←</span> Previous
        </button>
        {currentQuestion < totalQuestions - 1 ? (
          <button
            onClick={handleNext}
            className="flex items-center px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg"
          >
            Next <span className="ml-2">→</span>
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="flex items-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg"
          >
            Submit
          </button>
        )}
      </div>

      {/* Modal error message */}
      {error && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 text-red-600">Error</h2>
            <p className="text-gray-700">{error}</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => retryNavigation(currentQuestion)}
                className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded"
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
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Submit Test</h2>
            <p>Are you sure you want to submit the test?</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleSubmitModalCancel}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitModalOk}
                className="px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavigationButtons;
