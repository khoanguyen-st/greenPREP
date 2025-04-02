export const mockProfileData = {
  firstName: 'Phung H',
  lastName: 'M Hehe',
  email: 'QWER@gmail.com',
  phoneNumber: '0123456789',
  role: 'Student',
  password: 'Password123!'
}

export const mockChangePassword = async ({ currentPassword, newPassword }) => {
  await new Promise(resolve => setTimeout(resolve, 1000))

  if (mockProfileData.password !== currentPassword) {
    throw new Error('Incorrect current password')
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  if (!passwordRegex.test(newPassword)) {
    throw new Error(
      'Password policy: Password must be at least 8 characters long with one uppercase letter, one lowercase letter, one number, and one special character'
    )
  }

  mockProfileData.password = newPassword

  return {
    success: true,
    message: 'Password changed successfully'
  }
}

export const mockHistoryData = [
  {
    key: '1',
    date: '12/02/2025',
    sessionName: 'Feb_2025',
    grammarVocab: '40',
    grammarLevel: 'B1',
    listening: '70',
    listeningLevel: 'B2',
    reading: '80',
    readingLevel: 'C1',
    speaking: '60',
    speakingLevel: 'B2',
    writing: '40',
    writingLevel: 'B1',
    total: '40',
    level: 'B2'
  },
  {
    key: '2',
    date: '12/02/2025',
    sessionName: 'Feb_2025',
    grammarVocab: '40',
    grammarLevel: 'B1',
    listening: '40',
    listeningLevel: 'B1',
    reading: '40',
    readingLevel: 'B1',
    speaking: '40',
    speakingLevel: 'B1',
    writing: '40',
    writingLevel: 'B1',
    total: '40',
    level: 'C'
  },
  {
    key: '3',
    date: '12/02/2025',
    sessionName: 'Feb_2025',
    grammarVocab: '40',
    grammarLevel: 'B1',
    listening: '40',
    listeningLevel: 'B1',
    reading: '40',
    readingLevel: 'B1',
    speaking: '40',
    speakingLevel: 'B1',
    writing: '40',
    writingLevel: 'B1',
    total: '40',
    level: 'B1'
  },
  {
    key: '4',
    date: '15/02/2025',
    sessionName: 'Mid_Feb_2025',
    grammarVocab: '75',
    grammarLevel: 'B2',
    listening: '65',
    listeningLevel: 'B2',
    reading: '70',
    readingLevel: 'B2',
    speaking: '80',
    speakingLevel: 'C1',
    writing: '70',
    writingLevel: 'B2',
    total: '72',
    level: 'B2'
  },
  {
    key: '5',
    date: '28/02/2025',
    sessionName: 'Late_Feb_2025',
    grammarVocab: '85',
    grammarLevel: 'C1',
    listening: '80',
    listeningLevel: 'C1',
    reading: '85',
    readingLevel: 'C1',
    speaking: '90',
    speakingLevel: 'C2',
    writing: '85',
    writingLevel: 'C1',
    total: '85',
    level: 'C1'
  }
]
