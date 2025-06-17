import { useEffect, useState } from 'react'
import { useGameState } from '../state/gameState'
import { generateInitialPlot, initialPlotPrompt } from '../lib/narrative'
import { findMatchingKing } from '../lib/kingSelector'
import { findMatchingKingdom } from '../lib/kingdomSelector'
import type { Kingdom } from '../types'

let initialized = false

export default function useInitialPlot() {
  const {
    mainPlot,
    setMainPlot,
    setKingdom,
    setKingName,
    setCurrentKing,
  } = useGameState()

  const [debugText, setDebugText] = useState('')
  const [selectedKingdom, setSelectedKingdom] = useState<Kingdom | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (initialized || mainPlot) return
    initialized = true

    const init = async () => {
      setLoading(true)
      try {
        setDebugText(`Prompt:\n${initialPlotPrompt}\n\n`)
        const plot = await generateInitialPlot()
        setDebugText((prev) => prev + `Raw result:\n${JSON.stringify(plot, null, 2)}\n`)
        if (plot) {
          setMainPlot(plot)
          const kingdomMatch = findMatchingKingdom(plot)
          if (kingdomMatch) {
            setSelectedKingdom(kingdomMatch)
            setKingdom(kingdomMatch.name)
          } else {
            setKingdom(plot.tags[0] || 'Eldoria')
          }
          const king = findMatchingKing(plot)
          if (king) {
            setCurrentKing(king)
            setKingName(`${king.name} ${king.epithet}`)
          }
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
    void init()
  }, [mainPlot, setMainPlot, setKingdom, setKingName, setCurrentKing])

  return { loading, debugText, selectedKingdom }
}
