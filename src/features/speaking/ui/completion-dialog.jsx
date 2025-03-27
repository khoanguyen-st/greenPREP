export const CompletionDialog = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-80 rounded-lg bg-white p-6 shadow-lg">
        <h3 className="mb-4 text-lg font-medium">Completion</h3>
        <p className="mb-4">You have completed all parts! Would you like to return to home?</p>
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="rounded bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400">
            Cancel
          </button>
          <button onClick={onConfirm} className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
            Return Home
          </button>
        </div>
      </div>
    </div>
  )
}
