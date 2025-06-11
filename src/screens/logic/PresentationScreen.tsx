import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameState } from '../../state/gameState'
import { generateInitialPlot, initialPlotPrompt } from '../../lib/narrative'
import { getRandomKing } from '../../lib/kings'
import ViewPresentationScreen from '../view/ViewPresentationScreen'

export default function PresentationScreen() {
  const {
    kingName,
    kingdom,
    setKingName,
    setKingdom,
    setMainPlot,
    setCurrentKing,
  } = useGameState()
  const navigate = useNavigate()
  const [debugText, setDebugText] = useState('')

  useEffect(() => {
    const init = async () => {
      try {
        const king = getRandomKing()
        setCurrentKing(king)
        setKingName(`${king.name} ${king.epithet}`)
        if (king.tags && king.tags.length > 0) {
          setKingdom(king.tags[0])
        }
        setDebugText(`Prompt:\n${initialPlotPrompt}\n\n`)
        const plot = await generateInitialPlot()
        setDebugText((prev) => prev + `Raw result:\n${JSON.stringify(plot, null, 2)}\n`)
        console.log('Generated plot:', plot)
        if (plot) {
          setMainPlot(plot)
        } else {
          setDebugText((prev) => prev + 'Fallback: plot was null\n')
        }
      } catch (error) {
        console.error('Error initializing plot', error)
        setDebugText((prev) => prev + `Error: ${(error as Error).message}\n`)
      }
    }
    init()
  }, [setKingName, setKingdom, setMainPlot, setCurrentKing])

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
