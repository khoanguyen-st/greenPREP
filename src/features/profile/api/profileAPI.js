import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const API_BASE_URL = 'https://dev-api-greenprep.onrender.com'

// Fake data
const fakeProfileData = {
  id: 1,
  firstName: 'Test',
  lastName: 'Test',
  email: 'test.test@example.com',
  phone: '987654321',
  roleIDs: ['student'],
  classes: ['English', 'History']
}

const fakeHistoryData = [
  {
    id: 1,
    date: '01/03/2024',
    sessionName: 'Grammar Practice',
    grammarVocab: 85,
    grammarLevel: 'B2',
    listening: 78,
    listeningLevel: 'B1',
    reading: 92,
    readingLevel: 'B2',
    speaking: 75,
    speakingLevel: 'B1',
    writing: 88,
    writingLevel: 'B2',
    total: 83.6,
    level: 'B2'
  },
  {
    id: 2,
    date: '15/03/2024',
    sessionName: 'Speaking Workshop',
    grammarVocab: 90,
    grammarLevel: 'B2',
    listening: 85,
    listeningLevel: 'B2',
    reading: 88,
    readingLevel: 'B2',
    speaking: 92,
    speakingLevel: 'B2',
    writing: 85,
    writingLevel: 'B2',
    total: 88,
    level: 'B2'
  },
  {
    id: 3,
    date: '01/04/2024',
    sessionName: 'Reading Comprehension',
    grammarVocab: 95,
    grammarLevel: 'C',
    listening: 88,
    listeningLevel: 'B2',
    reading: 98,
    readingLevel: 'C',
    speaking: 85,
    speakingLevel: 'B2',
    writing: 90,
    writingLevel: 'C',
    total: 91.2,
    level: 'C'
  }
]

const fetchUserProfile = async userId => {
  const { data } = await axios.get(`${API_BASE_URL}/api/users/${userId}`)
  return data
}

export const useUserProfile = userId => {
  return useQuery({
    queryKey: ['userProfile', userId],
    queryFn: async () => {
      if (userId === 1) {
        return fakeProfileData
      } else {
        return await fetchUserProfile(userId)
      }
    },
    select: data => {
      const role = data.roleIDs.includes('teacher') ? 'teacher' : 'student'
      return { ...data, role }
    }
  })
}

// API functions
const fetchProfile = async () => {
  const response = await axios.get(`${API_BASE_URL}/user/profile`)
  return response.data
}

const fetchHistoryList = async () => {
  const response = await axios.get(`${API_BASE_URL}/user/history`)
  return response.data
}

// Custom hooks
export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => fakeProfileData,
    select: data => ({
      ...data,
      role: data.roleIDs?.includes('teacher') ? 'Teacher' : 'Student'
    })
  })
}

export const useHistoryList = () => {
  return useQuery({
    queryKey: ['history'],
    queryFn: () => fakeHistoryData
  })
}

// Direct API calls (if needed)
export const getProfile = () => fetchProfile()
export const getHistoryList = () => fetchHistoryList()
