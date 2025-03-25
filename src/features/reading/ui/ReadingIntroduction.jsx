const ReadingIntroduction = ({ testData, onStartTest }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center font-sans">
      <div className="w-full max-w-3xl">
        <h1 className="mb-6 text-3xl font-bold text-blue-900">GreenPREP</h1>

        <div className="mb-6 text-left">
          <div className="flex items-center gap-2 text-lg">
            <p className="m-0">{testData.section}</p>
            <p className="m-0">{testData.testName}</p>
          </div>
          <h5 className="mt-2 text-lg font-semibold">{testData.section}</h5>

          <div className="mb-6">
            <div className="mb-6 flex flex-col justify-between md:flex-row">
              <div className="mb-6 flex-1 md:mb-0">
                <p className="mb-1 font-semibold">Number of Questions</p>
                <p className="text-base">{testData.questionCount}</p>
              </div>
              <div className="mb-6 flex-1">
                <p className="mb-1 font-semibold">Time Allowed</p>
                <p className="text-base">{testData.timeAllowed}</p>
              </div>
            </div>

            <div className="mb-5">
              <p className="mb-1 font-semibold">Assessment Description</p>
              <p className="text-base">{testData.assessmentDescription}</p>
            </div>

            <div className="mb-5">
              <p className="mb-1 font-semibold">Form Description</p>
              <p className="text-base">{testData.formDescription}</p>
            </div>
          </div>
        </div>

        <button
          className="h-10 w-48 rounded-md bg-blue-900 text-base font-medium text-white transition hover:bg-blue-800"
          onClick={onStartTest}
        >
          Start
        </button>
      </div>
    </div>
  )
}

export default ReadingIntroduction
