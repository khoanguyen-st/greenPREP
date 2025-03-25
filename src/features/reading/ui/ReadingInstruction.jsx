const ReadingTestInstructions = ({ onStartTest }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12">
        <div className="mb-12">
          <h1 className="mb-8 text-center text-3xl font-bold">Aptis General Reading Test Instructions</h1>
          <h2 className="mb-4 text-xl font-semibold">Reading</h2>
          <div className="space-y-4">
            <p>The test has five parts.</p>
            <p>You have 35 minutes to complete the test.</p>
            <p>When you click on the &apos;Next&apos; button, the test will begin.</p>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200 py-4">
        <div className="mx-auto flex max-w-3xl justify-end px-4">
          <button
            onClick={onStartTest}
            className="flex items-center gap-2 rounded bg-blue-900 px-6 py-2 text-white transition-colors hover:bg-blue-800"
          >
            Next
            <span className="ml-1">→</span>
          </button>
        </div>
      </footer>
    </div>
  )
}

export default ReadingTestInstructions
