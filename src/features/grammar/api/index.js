import axiosInstance from '@shared/config/axios'

export const fetchGrammarTestDetails = async () => {
  try {
    const globalData = JSON.parse(localStorage.getItem('globalData') || '{}')
    const topicId = globalData.topicId
    if (!topicId) {
      throw new Error('Missing topicId in localStorage.globalData')
    }

    const response = await axiosInstance.get(`/topics/${topicId}`, {
      params: {
        skillName: 'GRAMMAR AND VOCABULARY'
      }
    })

    if (!response.data) {
      throw new Error('No data received from server')
    }

    if (!response.data.Parts || !Array.isArray(response.data.Parts) || response.data.Parts.length === 0) {
      throw new Error('No grammar test parts available')
    }

    const hasQuestions = response.data.Parts.every(
      part => part.Questions && Array.isArray(part.Questions) && part.Questions.length > 0
    )

    if (!hasQuestions) {
      throw new Error('Some parts are missing questions')
    }

    if (response.data.Parts) {
      response.data.Parts.forEach(part => {
        if (part.Questions && Array.isArray(part.Questions)) {
          part.Questions.forEach(question => {
            if (question.Content) {
              question.Content = formatDialogueContent(question.Content)
            }
          })
        }
      })
    }

    return response.data
  } catch (error) {
    console.error('Error fetching grammar test details:', error)
    throw error
  }
}

export const formatDialogueContent = content => {
  if (!content) {
    return content
  }

  return content
    .replace(/([A-Za-z]+):\s+(.*?)(?=\s+[A-Za-z]+:|\s*$)/, '$1: $2\n')
    .replace(/([A-Za-z]+):\s+(__+),/, '$1: $2,\n')
}

export const submitGrammarAnswers = async data => {
  try {
    const response = await axiosInstance.post(`/student-answers`, data)
    return response.data
  } catch (error) {
    console.error('Error submitting grammar answers:', error)
    throw error
  }
}
