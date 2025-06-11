import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameState } from '../../state/gameState'
import { generateInitialPlot } from '../../lib/narrative'
import ViewPresentationScreen from '../view/ViewPresentationScreen'

export default function PresentationScreen() {
  const {
    kingName,
    kingdom,
    setKingName,
    setKingdom,
    setMainPlot,
  } = useGameState()
  const navigate = useNavigate()

  useEffect(() => {
    const init = async () => {
      try {
        const plot = await generateInitialPlot()
        console.log('Generated plot:', plot)
        if (plot) {
          setMainPlot(plot)
          setKingName(plot.id || 'Aldric')
          const firstTag = plot.tags && plot.tags.length > 0 ? plot.tags[0] : ''
          setKingdom(firstTag || 'Eldoria')
        } else {
          setKingName('Aldric')
          setKingdom('Eldoria')
        }
      } catch (error) {
        console.error('Error initializing plot', error)
        setKingName('Aldric')
        setKingdom('Eldoria')
      }
    }
    init()
  }, [setKingName, setKingdom, setMainPlot])

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
