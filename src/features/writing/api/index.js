import axiosInstance from '@shared/config/axios'

export const fetchWritingTestDetails = async () => {
  const response = await axiosInstance.get(`/topics/ef6b69aa-2ec2-4c65-bf48-294fd12e13fc`, {
    params: {
      questionType: 'writing',
      skillName: 'WRITING'
    }
  })
  return response.data
}

export const submitWritingAnswers = async data => {
  const response = await axiosInstance.post(`/student-answers`, data)
  return response.data
}
