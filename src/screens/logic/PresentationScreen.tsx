import { useNavigate } from 'react-router-dom'
import { useGameState } from '../../state/gameState'
import useInitialPlot from '../../hooks/useInitialPlot'
import ViewPresentationScreen from '../view/ViewPresentationScreen'
import Loader from '../../components/Loader'

export default function PresentationScreen() {
  const { kingName, kingdom } = useGameState()
  const navigate = useNavigate()
  const { loading, debugText, selectedKingdom } = useInitialPlot()

  const handleContinue = () => {
    navigate('/turn')
  }

  return loading ? (
    <Loader />
  ) : (
    <ViewPresentationScreen
      kingName={kingName}
      kingdom={selectedKingdom ? selectedKingdom.name : kingdom}
      kingdomDescription={selectedKingdom?.description}
      onContinue={handleContinue}
      debugText={debugText}
    />
  )
}
