import { useWritingData } from '@shared/context/writing-context'
import { Instruction } from '@shared/ui/instruction'
import { useNavigate } from 'react-router-dom'

export const InstructionWriting = () => {
  const navigate = useNavigate()
  const data = useWritingData()
  const onStart = () => {
    navigate('/writing/test')
  }
  return <Instruction data={data} onStart={onStart} />
}
