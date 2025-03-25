const Instruction = ({ onNext }) => {
  return (
    <div className="w-full max-w-2xl rounded-2xl bg-white p-10 text-center">
      <h1 className="mb-8 text-2xl font-bold text-[#1A4C96]">GreenPREP</h1>

      <h2 className="mb-6 text-left text-lg font-semibold">General Speaking Test Instructions</h2>

      <div className="text-md mb-10 space-y-4 text-left text-gray-800">
        <p>You will answer some questions about yourself and then do three short speaking tasks.</p>
        <p>Listen to the instructions and speak clearly into your microphone when you hear the signal.</p>
        <p>Each part of the test will appear automatically.</p>
        <p>The test will take about 12 minutes.</p>
        <p>When you click on the Next button, go to test microphone.</p>
      </div>

      <button
        onClick={onNext}
        className="mb-2 rounded-md bg-[#1A4C96] px-6 py-2 font-medium text-white transition-all hover:bg-[#163e78]"
      >
        Next <span className="ml-2">→</span>
      </button>
    </div>
  )
}

export default Instruction
