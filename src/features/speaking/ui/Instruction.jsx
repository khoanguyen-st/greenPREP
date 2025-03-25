import { useSpeakingData } from '@shared/context/speaking-context'
import { Instruction } from '@shared/ui/instruction'
import { useNavigate } from 'react-router-dom'

export const InstructionSpeaking = () => {
  const navigate = useNavigate()
  const data = useSpeakingData()
  const onStart = () => {
    navigate('/speaking/test')
  }
  return <Instruction data={data} onStart={onStart} />
}
