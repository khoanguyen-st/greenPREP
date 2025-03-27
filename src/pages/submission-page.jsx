import { SubmissionImage } from '@assets/images'
import { Button, message } from 'antd'
import { useState } from 'react'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

const SubmissionPage = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const handleNavigation = async () => {
    try {
      navigate('/')
    } catch (err) {
      setError(err.message)
      message.error('Navigation failed. Please try again.')
    }
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="flex flex-row pb-10 text-black">
        <AiOutlineCheckCircle className="mx-auto text-7xl text-green-500" />
        <div className="items-center justify-center">
          <div className="text-3xl font-bold">You Finished Your Exam</div>
          <p className="text-md mt-2 text-gray-700">
            Your teacher will release your results shortly. All the best <span className="text-red-500">❤️</span>!
          </p>
        </div>
      </div>

      <Button
        type="primary"
        className="mt-6 flex h-14 items-center gap-3 bg-blue-900 px-6 py-2 text-sm text-white hover:bg-blue-800 md:text-base"
        onClick={handleNavigation}
      >
        Home <span>&rarr;</span>
      </Button>

      {error && (
        <p className="mt-4 text-sm text-red-600">
          {error} <br />
          <Button type="link" onClick={handleNavigation}>
            Retry
          </Button>
        </p>
      )}

      {<img src={SubmissionImage} alt="submission" className="mt-6 w-24 md:w-64 lg:w-64" />}
    </div>
  )
}

export default SubmissionPage
