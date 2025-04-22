import { sessionKey } from '@assets/images'

const CustomAlert = ({ show, onConfirm, submittedText, countdown, warningCount, totalCount }) => {
  if (!show) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-lg md:max-w-lg">
        <img src={sessionKey} alt="Warning" width={160} height={160} className="mx-auto mb-3" />
        <h2 className="text-xl font-bold text-red-600">⚠️ Warning</h2>
        <div className="mt-2 flex flex-col gap-2 text-gray-600">
          <p className="mx-auto max-w-prose px-9">{submittedText}</p>
          <p>
            <span className="text-2xl font-bold text-red-600">{countdown}s</span>
          </p>
          <p>
            <span className="font-bold text-amber-300">Warning: {warningCount}/</span>
            <span className="font-bold text-amber-300">{totalCount}</span>
          </p>
        </div>
        <button
          onClick={onConfirm}
          className="mt-4 w-full rounded-lg bg-[#003087] px-5 py-2 text-white shadow-md transition-all hover:!bg-[#002b6c] md:w-auto"
        >
          Continue doing the test
        </button>
      </div>
    </div>
  )
}

export default CustomAlert
