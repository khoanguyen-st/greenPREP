const CustomAlert = ({ show, onConfirm, message }) => {
  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-lg md:max-w-lg">
        <img src="src/assets/Images/session-key.png" alt="Warning" width={160} height={160} className="mx-auto mb-3" />
        <h2 className="text-xl font-bold text-red-600">⚠️ Warning</h2>
        <p className="mt-2 text-gray-600">{message}</p>
        <button
          onClick={onConfirm}
          className="mt-4 w-full rounded-lg bg-blue-600 px-5 py-2 text-white shadow-md transition-all hover:bg-blue-700 md:w-auto"
        >
          Continue doing the test
        </button>
      </div>
    </div>
  )
}

export default CustomAlert
