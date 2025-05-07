import { Button } from 'antd'

const PartIntro = ({ data, onStartPart }) => {
  const getPartInfo = content => {
    switch (content) {
      case 'PART 1':
        return {
          title: 'Part 1: Personal Information',
          description: 'You will be asked to answer questions about yourself and your experiences.',
          readingTime: '05 seconds',
          answeringTime: '30 seconds',
          totalQuestions: 3,
          instructions: [
            'You will be asked 3 questions about yourself',
            'You have 5 seconds to read each question',
            'You have 30 seconds to answer each question',
            'Speak clearly and naturally',
            'Try to give complete answers'
          ]
        }
      case 'PART 2':
        return {
          title: 'Part 2: Picture Description',
          description: 'You will be shown a picture and asked to describe it in detail.',
          readingTime: '05 seconds',
          answeringTime: '45 seconds',
          totalQuestions: 3,
          instructions: [
            'You will be shown a picture',
            'You have 5 seconds to look at the picture',
            'You have 45 seconds to describe the picture',
            'Describe what you see in detail',
            'Use descriptive language'
          ]
        }
      case 'PART 3':
        return {
          title: 'Part 3: Picture Discussion',
          description: 'You will be shown a picture and asked to answer related questions.',
          readingTime: '05 seconds',
          answeringTime: '45 seconds',
          totalQuestions: 3,
          instructions: [
            'You will be shown a picture',
            'You have 5 seconds to look at the picture',
            'You will be asked 3 questions about the picture',
            'You have 45 seconds to answer each question',
            'Answer the questions based on the picture'
          ]
        }
      case 'PART 4':
        return {
          title: 'Part 4: Topic Discussion',
          description: 'You will be asked to discuss a topic in detail with multiple questions.',
          preparingTime: '60 seconds',
          readingTime: '05 seconds',
          answeringTime: '120 seconds',
          totalQuestions: 3,
          instructions: [
            'You will be shown a topic with multiple questions',
            'You have 5 seconds to read the questions',
            'You have 60 seconds to prepare your answer',
            'You have 120 seconds to answer all questions',
            'Organize your thoughts and speak clearly',
            'Try to cover all aspects of the topic'
          ]
        }
      default:
        return {
          title: 'Part',
          description: 'Description',
          readingTime: '00:00',
          answeringTime: '00:00',
          totalQuestions: 0,
          instructions: []
        }
    }
  }
  const rawPart = data?.Content?.toLowerCase()
    .match(/part \d+/)?.[0]
    .toUpperCase()
  const info = getPartInfo(rawPart)

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50 p-8">
      <div className="w-full max-w-4xl rounded-2xl border border-gray-200 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#003087]">{info.title}</h1>
          <p className="mt-4 text-lg text-gray-600">{info.description}</p>
        </div>

        <div className="mb-8 grid grid-cols-3 gap-6 rounded-xl border border-gray-200 bg-white p-6 shadow-[0_4px_12px_rgb(0,0,0,0.05)]">
          {rawPart === 'PART 4' ? (
            <>
              <div className="text-center">
                <div className="text-sm font-medium text-gray-500">Reading Time</div>
                <div className="mt-2 text-2xl font-bold text-[#003087]">{info.readingTime}</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-gray-500">Preparing Time</div>
                <div className="mt-2 text-2xl font-bold text-[#003087]">{info.preparingTime}</div>
              </div>

              <div className="text-center">
                <div className="text-sm font-medium text-gray-500">Recording Time</div>
                <div className="mt-2 text-2xl font-bold text-[#003087]">{info.answeringTime}</div>
              </div>
            </>
          ) : (
            <>
              <div className="text-center">
                <div className="text-sm font-medium text-gray-500">Reading Time</div>
                <div className="mt-2 text-2xl font-bold text-[#003087]">{info.readingTime}</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-gray-500">Recording Time</div>
                <div className="mt-2 text-2xl font-bold text-[#003087]">{info.answeringTime}</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-gray-500">Total Questions</div>
                <div className="mt-2 text-2xl font-bold text-[#003087]">{info.totalQuestions}</div>
              </div>
            </>
          )}
        </div>

        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-[#003087]">Instructions</h2>
          <ul className="space-y-3">
            {info.instructions.map((instruction, index) => (
              <li key={index} className="flex items-start">
                <div className="mr-3 mt-1 h-2 w-2 rounded-full bg-[#003087]" />
                <span className="text-gray-700">{instruction}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center">
          <Button type="primary" size="large" onClick={onStartPart} className="bg-[#003087] hover:!bg-[#002b6c]">
            Start Part
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PartIntro
