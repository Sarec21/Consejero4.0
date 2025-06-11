import { useNavigate } from 'react-router-dom'
import { useGameState } from '../../state/gameState'
import ViewPresentationScreen from '../view/ViewPresentationScreen'

export default function PresentationScreen() {
  const { kingName, kingdom } = useGameState()
  const navigate = useNavigate()

  const handleContinue = () => {
    navigate('/turn')
  }

  return (
    <ViewPresentationScreen
      kingName={kingName}
      kingdom={kingdom}
      onContinue={handleContinue}
    />
  )
}
