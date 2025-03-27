export const ErrorDisplay = ({ message, onRetry }) => (
  <div className="flex h-screen items-center justify-center">
    <div className="text-center">
      <p className="text-red-500">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="mr-2 mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          Try Again
        </button>
      )}
      <button
        onClick={() => (window.location.href = '/')}
        className="mt-4 rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
      >
        Return to Home
      </button>
    </div>
  </div>
)
