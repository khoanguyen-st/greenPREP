export const fetchTopic = async () => {
  const response = await fetch(
    'https://greenprep-api.onrender.com/api/topics/ef6b69aa-2ec2-4c65-bf48-294fd12e13fc?questionType=dropdown-list&skillName=READING'
  )
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}
