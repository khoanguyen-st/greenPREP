import { ArrowRightOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const Intropart = ({ part, data }) => {
  const navigate = useNavigate()

  return (
    <div className="box-border h-screen w-full rounded-xl bg-white px-28 pt-28">
      <h1 className="m-0 mb-6 text-4xl font-bold text-[#003087]">Speaking Test</h1>
      <div className="mb-8">
        <h2 className="mb-9 text-2xl font-bold">Prompt</h2>
        <p className="mb-20 text-2xl">
          <span className="text-2xl font-bold">{data?.Content || `Part ${part}`}</span> -{' '}
          {data?.description || 'Loading...'}
        </p>
        <p className="text-2xl">Click next to begin the speaking test.</p>
      </div>

      <div className="mt-20 flex justify-center">
        <Button
          type="primary"
          onClick={() => navigate(`/speaking/test/${part}`)} // Navigate dynamically
          className="h-[60px] w-[150px] bg-[#003087] text-[20px] hover:bg-blue-700"
        >
          Next
          <ArrowRightOutlined />
        </Button>
      </div>
    </div>
  )
}

export default Intropart
