import { Button } from 'antd'

const PopupSubmission = ({ isOpen, type = 'timeout', onSubmit }) => {
  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50"></div>
      <div className="relative z-10 w-[500px] rounded-lg bg-white">
        <div className="border-b px-6 pt-6">
          <h2 className="text-xl">{type === 'timeout' ? 'Your exam has finished' : 'Submit Test?'}</h2>
        </div>
        <div className="px-6 py-4">
          <p className="text-gray-600">
            {type === 'timeout'
              ? 'Your paper will be automatically submitted.'
              : 'Once you submit your test you will no longer have access to the questions.'}
          </p>
        </div>
        <div className="flex justify-end gap-3 border-t px-6 py-4">
          {type === 'timeout' ? (
            <Button
              onClick={onSubmit}
              className="!h-[38px] !rounded-md !border-[#003087] !bg-[#003087] !px-6 !text-sm !text-white hover:!bg-[#002670]"
            >
              OK
            </Button>
          ) : (
            <>
              <Button className="!h-[38px] !rounded-md !px-6 !text-sm">Cancel</Button>
              <Button
                onClick={onSubmit}
                type="primary"
                className="!h-[38px] !rounded-md !border-[#003087] !bg-[#003087] !px-6 !text-sm !text-white hover:!bg-[#002670]"
              >
                Submit test
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default PopupSubmission
