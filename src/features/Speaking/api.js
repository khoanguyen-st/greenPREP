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

const uploadToCloudinary = async (blob, topicId, partContent, questionIndex) => {
  try {
    const formData = new FormData()
    formData.append('file', blob)
    formData.append('upload_preset', process.env.VITE_CLOUDINARY_UPLOAD_PRESET)
    formData.append('filename_override', `speaking_${topicId}_${partContent}_${questionIndex + 1}`)

    const response = await fetch(
      `${process.env.VITE_CLOUDINARY_API_URL}/${process.env.VITE_CLOUDINARY_CLOUD_NAME}/auto/upload`,
      {
        method: 'POST',
        body: formData
      }
    )

    const data = await response.json()
    console.warn('Uploaded successfully:', data)
    return data
  } catch (error) {
    console.error('Upload error:', error)
    throw error
  }
}

export { fetchTopicData, uploadToCloudinary }
