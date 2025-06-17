import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameState } from '../../state/gameState'
import { checkAndTriggerMutations } from '../../lib/mutationLogic'
import { getAvailableEvents } from '../../lib/eventSelector'
import ViewTurnScreen from '../view/ViewTurnScreen'
import { selectRumor, getMatchingRumors } from '../../lib/rumorSelector'
import rumors from '../../data/rumors.json'

function getRumorTextById(id: string): string {
  const found = (rumors as Array<{ id: string; text: string }>).find(
    (r) => r.id === id,
  )
  return found?.text || ''
}

export default function TurnScreen() {
  const gameState = useGameState()
  const {
    setPlayerAdvice,
    mainPlot,
    currentTurn,
    setCurrentTurn,
    setActiveEvents,
    addRumors,
    rumorsQueue,
    setRumorsQueue,
  } = gameState
  const matchingRumors = getMatchingRumors(
    gameState.currentEmotion || [],
    mainPlot?.tags || [],
    gameState.level,
  )
  const rumor = matchingRumors.length > 0 ? selectRumor(gameState) : null
  useEffect(() => {
    if (rumor) addRumors([rumor])
  }, [rumor, addRumors])

  const [currentRumorId, setCurrentRumorId] = useState<string | null>(null)

  // Remove the first rumor after it is shown once
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (rumorsQueue.length > 0) {
      setCurrentRumorId(rumorsQueue[0])
      setRumorsQueue(rumorsQueue.slice(1))
    }
  }, [])
  /* eslint-enable react-hooks/exhaustive-deps */

  const currentRumorText = currentRumorId ? getRumorTextById(currentRumorId) : ''
  const [advice, setAdvice] = useState('')
  const navigate = useNavigate()

  const handleSend = () => {
    setPlayerAdvice(advice)
    const newTurn = currentTurn + 1
    setCurrentTurn(newTurn)
    if (mainPlot) {
      const newEvents = getAvailableEvents(mainPlot, newTurn)
      setActiveEvents(newEvents)
    }
    checkAndTriggerMutations(newTurn, mainPlot, useGameState.getState())
    navigate('/reaction')
  }

  return (
    <ViewTurnScreen
      rumor={currentRumorText}
      advice={advice}
      onAdviceChange={setAdvice}
      onSend={handleSend}
    />
  )
}
