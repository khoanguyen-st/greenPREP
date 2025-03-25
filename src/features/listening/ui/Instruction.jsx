import { useListeningData } from '@shared/context/listening-context'
import { Instruction } from '@shared/ui/instruction'
import { useNavigate } from 'react-router-dom'

const InstructionListening = () => {
  const navigate = useNavigate()
  const data = useListeningData()
  const onStart = () => {
    navigate('/Listening/test')
  }
  return <Instruction data={data} onStart={onStart} />
}
export default InstructionListening
