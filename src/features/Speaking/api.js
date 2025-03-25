import axios from 'axios'

const fetchTopicData = async partNumber => {
  try {
    const response = await axios.get(
      'https://greenprep-api.onrender.com/api/topics/ef6b69aa-2ec2-4c65-bf48-294fd12e13fc',
      { params: { skillName: 'SPEAKING' } }
    )

    // Extract "Parts" array from response
    const parts = response.data.Parts || []

    // Find the specific part based on partNumber
    const selectedPart = parts.find(part => part.Content === `PART ${partNumber}`)

    return selectedPart || null // Return found part or null if not found
  } catch (error) {
    console.error('Error fetching topic data:', error)
    return null
  }
}

export default fetchTopicData
