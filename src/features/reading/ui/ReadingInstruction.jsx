import { useReadingData } from '@shared/context/reading-context'
import { Instruction } from '@shared/ui/instruction'
import { useNavigate } from 'react-router-dom'

const InstructionReading = () => {
  const navigate = useNavigate()
  const data = useReadingData()
  const onStart = () => {
    navigate('/Reading/test')
  }
  return <Instruction data={data} onStart={onStart} />
}
export default InstructionReading
