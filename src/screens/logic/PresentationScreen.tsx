import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameState } from '../../state/gameState'
import { generateInitialPlot, initialPlotPrompt } from '../../lib/narrative'
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
  const [debugText, setDebugText] = useState('')

  useEffect(() => {
    const init = async () => {
      try {
        setDebugText(`Prompt:\n${initialPlotPrompt}\n\n`)
        const plot = await generateInitialPlot()
        setDebugText((prev) => prev + `Raw result:\n${JSON.stringify(plot, null, 2)}\n`)
        console.log('Generated plot:', plot)
        if (plot) {
          setMainPlot(plot)
          setKingName(plot.id || 'Aldric')
          const firstTag = plot.tags && plot.tags.length > 0 ? plot.tags[0] : ''
          setKingdom(firstTag || 'Eldoria')
        } else {
          setKingName('Aldric')
          setKingdom('Eldoria')
          setDebugText((prev) => prev + 'Fallback: plot was null\n')
        }
      } catch (error) {
        console.error('Error initializing plot', error)
        setKingName('Aldric')
        setKingdom('Eldoria')
        setDebugText((prev) => prev + `Error: ${(error as Error).message}\n`)
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
      debugText={debugText}
    />
  )
}
