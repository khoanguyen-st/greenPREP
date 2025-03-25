const Introduction = ({ onNext }) => {
  return (
    <div className="w-full max-w-2xl rounded-2xl bg-white p-10 text-center">
      {/* Title */}
      <h1 className="mb-8 text-2xl font-bold text-[#1A4C96]">GreenPREP</h1>
      <h2 className="mb-8 text-xl font-semibold text-gray-800">Speaking</h2>

      {/* Test Info */}
      <div className="mb-8 flex justify-between text-left text-sm font-medium text-gray-800">
        <div>
          <p>Number of Parts</p>
          <p className="text-lg font-semibold">4</p>
        </div>
        <div>
          <p>Time Allowed</p>
          <p className="text-lg font-semibold">12 mins</p>
        </div>
      </div>

      {/* Descriptions */}
      <div className="mb-8 space-y-6 text-left text-gray-700">
        <div>
          <h3 className="mb-1 font-semibold text-gray-800">Assessment Description</h3>
          <p>This is a practice test for the Aptis General Speaking section.</p>
        </div>
        <div>
          <h3 className="mb-1 font-semibold text-gray-800">Form Description</h3>
          <p>You will answer some questions about yourself and then do three short speaking tasks.</p>
        </div>
      </div>

      {/* Start Button */}
      <button
        onClick={onNext}
        className="mt-4 rounded-md bg-[#1A4C96] px-6 py-2 text-white transition-all hover:bg-[#163e78]"
      >
        Next <span className="ml-2">→</span>
      </button>
    </div>
  )
}

export default Introduction
