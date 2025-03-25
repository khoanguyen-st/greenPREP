import { Form, Input, Typography, Image, Spin, Button } from 'antd'
import { useState, useEffect } from 'react'
import NavigationButtons from '@shared/ui/NavigationButtons/NavigationButtons'
import { MenuOutlined } from "@ant-design/icons";
import { useQuery } from '@tanstack/react-query'
import { fetchWritingTestDetails } from '../api/writingAPI'
import TimeRemaining from "@shared/ui/TimeRemaining/TimeRemaining";
import QuestionNavigator from "@shared/ui/QuestionNavigatior/QuestionNavigatior";

const { Title, Text } = Typography
const DEFAULT_MAX_WORDS = {
  2: 45,
  3: 60,
  4: 225
}

const WritingTest = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['writingQuestions'],
    queryFn: async () => {
      const response = await fetchWritingTestDetails()
      const sortedParts = response.Parts.sort((a, b) => {
        const partNumberA = parseInt(a.Content.match(/Part (\d+)/)?.[1]) || 0
        const partNumberB = parseInt(b.Content.match(/Part (\d+)/)?.[1]) || 0
        return partNumberA - partNumberB
      })

      return { ...response, Parts: sortedParts }
    }
  })

  const [form] = Form.useForm()
  const [currentPartIndex, setCurrentPartIndex] = useState(0)
  const [wordCounts, setWordCounts] = useState({})
  const [answers, setAnswers] = useState(() => {
    return JSON.parse(localStorage.getItem('writingAnswers')) || {}
  })
  const [isNavigatorOpen, setIsNavigatorOpen] = useState(false);

  useEffect(() => {
    if (data) {
      const storedAnswers = JSON.parse(localStorage.getItem('writingAnswers')) || {}
      setAnswers(storedAnswers)
      form.setFieldsValue(storedAnswers)
      updateWordCounts(storedAnswers)
    }
  }, [data, currentPartIndex])

  const countWords = text => text.trim().split(/\s+/).filter(Boolean).length

  const updateWordCounts = updatedAnswers => {
    const newWordCounts = {}
    if (data?.Parts) {
      data.Parts.forEach(part => {
        part.Questions.forEach((question, index) => {
          const fieldName = `answer-${part.ID}-${index}`
          newWordCounts[fieldName] = countWords(updatedAnswers[fieldName] || '')
        })
      })
    }
    setWordCounts(newWordCounts)
  }

  const handleTextChange = (field, text) => {
    const newAnswers = { ...answers, [field]: text }
    setAnswers(newAnswers)
    localStorage.setItem('writingAnswers', JSON.stringify(newAnswers))
    setWordCounts(prev => ({
      ...prev,
      [field]: countWords(text)
    }))
  }

  const handleSubmit = () => {
    console.table(answers)
  }

  if (isLoading) return <Spin className="flex h-screen items-center justify-center" />
  if (isError) return <div className="text-center text-red-500">Error fetching data</div>

  if (!data || !data.Parts || data.Parts.length === 0) {
    return <div className="text-center text-gray-500">No test data available</div>
  }

  const currentPart = data.Parts[currentPartIndex]
  const partNumber = parseInt(currentPart.Content.match(/Part (\d+)/)?.[1]) || 0

  return (
    <div className="relative mx-auto min-h-screen max-w-3xl pb-24">
      <Title level={1} className="mt-12 text-left text-3xl font-bold xs:mx-2 md:mx-0 md:text-5xl">
        Writing Test
      </Title>
      <Text className="text-l mb-5 font-semibold xs:mx-2 md:mx-0 md:text-2xl">
        Question {currentPartIndex + 1} of {data.Parts.length}
      </Text>
      <Text className="mb-3 block text-lg xs:mx-2 md:mx-0 md:text-xl">{currentPart.Content}</Text>
      <Form form={form} layout="vertical">
        {currentPart.Questions.map((question, index) => {
          const fieldName = `answer-${currentPart.ID}-${index}`
          const maxWords = partNumber === 1 ? null : question.maxWords || DEFAULT_MAX_WORDS[partNumber]
          return (
            <Form.Item
              key={fieldName}
              label={<Text className="xs:mx-2 md:mx-0">{question.Content}</Text>}
              name={fieldName}
              initialValue={answers[fieldName] || ''}
              rules={[
                { required: false },
                ...(maxWords
                  ? [
                      {
                        validator: (_, value) =>
                          countWords(value || '') > maxWords
                            ? Promise.reject(`Maximum ${maxWords} words!`)
                            : Promise.resolve()
                      }
                    ]
                  : [])
              ]}
            >
              <>
                <Input.TextArea
                  rows={5}
                  autoSize={{ minRows: 5, maxRows: 10 }}
                  className="w-full xs:mx-2 md:mx-0"
                  placeholder="Enter your answer here"
                  value={answers[fieldName] || ''}
                  onChange={e => handleTextChange(fieldName, e.target.value)}
                />

                {maxWords && (
                  <Text
                    className={`mt-1 block text-sm ${wordCounts[fieldName] > maxWords ? 'text-red-500' : 'text-gray-500'}`}
                  >
                    {`Word count: ${wordCounts[fieldName] || 0} / ${maxWords}`}
                  </Text>
                )}
              </>
            </Form.Item>
          )
        })}
      </Form>

      <Button
        className="md:hidden fixed bottom-[50%] right-5 bg-blue-500 text-white rounded-full p-2 shadow-lg"
        onClick={() => setIsNavigatorOpen(!isNavigatorOpen)}
      >
        <MenuOutlined />
      </Button>
      <div className={`fixed right-2 z-50 w-60 h-auto border border-gray-300 rounded-lg shadow-lg bg-white p-2
                 ${isNavigatorOpen ? 'block' : 'hidden'} md:block
                 bottom-[65%] mdL:bottom-[75%]`}>
        <TimeRemaining duration={10 * 60} onAutoSubmit={handleSubmit} />
        <QuestionNavigator
          values={data.Parts.map((part) => ({
            type: Object.keys(answers).some(
              (key) => key.startsWith(`answer-${part.ID}`) && answers[key]?.trim() !== ""
            )
              ? "answered"
              : "unanswered",
          }))}
          action={setCurrentPartIndex}
          position={currentPartIndex}
        />
      </div>
      <div className="fixed bottom-8 left-4 z-50 w-fit hidden mdL:block ">
        <Image
          src="src/assets/Images/navigate-logo.png"
          alt="Logo"
          preview={false}
          className="h-[100px] w-auto"
        />
      </div>
      <div className="bottom-0 shadow-md">
        <NavigationButtons
          totalQuestions={data.Parts.length}
          currentQuestion={currentPartIndex}
          setCurrentQuestion={setCurrentPartIndex}
          fetchQuestion={() => Promise.resolve()}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}

export default WritingTest
