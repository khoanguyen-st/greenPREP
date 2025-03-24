/**
 * Convert seconds to HH:MM:SS format.
 * @param {number} seconds - The total seconds to format.
 * @returns {string} - Time string in HH:MM:SS.
 */
const formatTime = seconds => {
  const hrs = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  return [hrs.toString().padStart(2, '0'), mins.toString().padStart(2, '0'), secs.toString().padStart(2, '0')].join(':')
}

export default formatTime
