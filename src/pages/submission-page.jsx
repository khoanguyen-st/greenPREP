import { SubmissionImage } from '@assets/images'
import { Button, message, Typography } from 'antd'
import { useState } from 'react'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

const { Title } = Typography

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
    <div className="flex h-screen w-full flex-col items-center justify-center bg-white">
      <div className="flex flex-col pb-10 text-black sm:flex-row">
        <AiOutlineCheckCircle className="mx-auto text-8xl text-green-500" />
        <div className="items-center justify-center text-center sm:text-left">
          <Title level={2} className="text-3xl font-bold" style={{ marginBottom: 0, marginTop: 12 }}>
            You Finished Your Exam
          </Title>
          <p className="text-xs text-gray-700 sm:text-xl">
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

      {<img src={SubmissionImage} alt="submission" className="mt-6 w-full sm:w-1/2 md:w-2/5" />}
    </div>
  )
}

export default SubmissionPage
