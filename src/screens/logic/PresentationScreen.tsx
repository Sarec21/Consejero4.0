import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameState } from '../../state/gameState'
import { generateInitialPlot, initialPlotPrompt } from '../../lib/narrative'
import { findMatchingKing } from '../../lib/kingSelector'
import { findMatchingKingdom } from '../../lib/kingdomSelector'
import type { Kingdom } from '../../types'
import ViewPresentationScreen from '../view/ViewPresentationScreen'
import Loader from '../../components/Loader'

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
  const [selectedKingdom, setSelectedKingdom] = useState<Kingdom | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (mainPlot) return

    const init = async () => {
      setLoading(true)
      try {
        const plot = await generateInitialPlot()
        if (plot) {
          setMainPlot(plot)
          const kingdomMatch = findMatchingKingdom(plot)
          if (kingdomMatch) {
            setSelectedKingdom(kingdomMatch)
            setKingdom(kingdomMatch.name)
          }
          const king = findMatchingKing(plot)
          if (king) {
            setCurrentKing(king)
            setKingName(`${king.name} ${king.epithet}`)
          }
          if (!kingdomMatch) setKingdom(plot.tags[0] || 'Eldoria')
        } else {
          setDebugText((prev) => prev + 'Fallback: plot was null\n')
        }
      } catch (error) {
        console.error('Error initializing plot', error)
        setDebugText((prev) => prev + `Error: ${(error as Error).message}\n`)
      } finally {
        setLoading(false)
      }
    }
    setDebugText(`Prompt:\n${initialPlotPrompt}\n\n`)
    init()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
