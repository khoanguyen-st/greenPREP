export default function ReadingTestInstructions() {
  const handleNext = () => {
    console.log("Starting the test...")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 max-w-3xl mx-auto px-4 py-12 w-full">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-center mb-8">Aptis General Reading Test Instructions</h1>
          <h2 className="text-xl font-semibold mb-4">Reading</h2>
          <div className="space-y-4">
            <p>The test has five parts.</p>
            <p>You have 35 minutes to complete the test.</p>
            <p>When you click on the &apos;Next&apos; button, the test will begin.</p>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200 py-4">
        <div className="max-w-3xl mx-auto px-4 flex justify-end">
          <button
            onClick={handleNext}
            className="bg-blue-900 text-white px-6 py-2 rounded flex items-center gap-2 hover:bg-blue-800 transition-colors"
          >
            Next
            <span className="ml-1">→</span>
          </button> 
        </div>
      </footer>
    </div>
  )
}
