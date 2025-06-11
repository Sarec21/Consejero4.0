import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameState } from '../../state/gameState'
import { generateInitialPlot, initialPlotPrompt } from '../../lib/narrative'
import { findMatchingKing } from '../../lib/kingSelector'
import ViewPresentationScreen from '../view/ViewPresentationScreen'

export default function PresentationScreen() {
  const {
    kingName,
    kingdom,
    mainPlot,
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
        if (mainPlot) {
          const king = findMatchingKing(mainPlot)
          console.log('Using existing plot:', mainPlot)
          console.log('Selected king:', king)
          setCurrentKing(king)
          setKingName(`${king?.name} ${king?.epithet}`)
          setKingdom(mainPlot.tags[0] || 'Eldoria')
        } else {
          setDebugText(`Prompt:\n${initialPlotPrompt}\n\n`)
          const plot = await generateInitialPlot()
          setDebugText((prev) => prev + `Raw result:\n${JSON.stringify(plot, null, 2)}\n`)
          console.log('Generated plot:', plot)
          if (plot) {
            setMainPlot(plot)
            const king = findMatchingKing(plot)
            console.log('Selected king:', king)
            setCurrentKing(king)
            setKingName(`${king?.name} ${king?.epithet}`)
            setKingdom(plot.tags[0] || 'Eldoria')
          } else {
            setDebugText((prev) => prev + 'Fallback: plot was null\n')
          }
        }
      } catch (error) {
        console.error('Error initializing plot', error)
        setDebugText((prev) => prev + `Error: ${(error as Error).message}\n`)
      }
    }
    init()
  }, [mainPlot, setKingName, setKingdom, setMainPlot, setCurrentKing])

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
