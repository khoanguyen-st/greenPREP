import { Button, message } from 'antd'
import { useState } from 'react'
import { AiFillLike } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

const NextScreen = ({ nextPath, skillName, imageSrc }) => {
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const handleNavigation = async () => {
    try {
      navigate(nextPath)
    } catch (err) {
      setError(err.message)
      message.error('Navigation failed. Please try again.')
    }
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-white">
      <AiFillLike className="mb-4 text-9xl text-blue-900" />
      <h2 className="p-5 text-2xl font-semibold tracking-widest text-blue-900">Exam Submitted</h2>
      <p className="mt-2 p-5 text-lg tracking-wide text-blue-900">
        Thank you for submitting &apos;<span className="font-semibold">{skillName}</span>&apos;
      </p>

      <Button
        type="primary"
        className="mt-6 flex h-14 items-center gap-2 bg-blue-900 px-6 py-2 text-sm text-white hover:bg-blue-800 md:text-base"
        onClick={handleNavigation}
      >
        Next <span>&rarr;</span>
      </Button>
      {error && (
        <p className="mt-4 text-sm text-red-600">
          {error} <br />
          <Button type="link" onClick={handleNavigation}>
            Retry
          </Button>
        </p>
      )}

      {imageSrc && <img src={imageSrc} alt="nextquestion" className="absolute bottom-0 left-6 w-24 md:w-64 lg:w-64" />}
    </div>
  )
}

export default NextScreen
