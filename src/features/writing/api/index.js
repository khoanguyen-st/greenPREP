import axios from 'axios'
// @ts-ignore
const TEST_BASE_URL = import.meta.env.VITE_TEST_BASE_URL
// @ts-ignore
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL

export const fetchWritingTestDetails = async () => {
  const response = await axios.get(`${TEST_BASE_URL}/topics/ef6b69aa-2ec2-4c65-bf48-294fd12e13fc`, {
    params: {
      questionType: 'writing',
      skillName: 'WRITING'
    }
  })
  return response.data
}

export const submitWritingAnswers = async data => {
  const response = await axios.post(`${VITE_BASE_URL}/student-answers`, data)
  return response.data
}
