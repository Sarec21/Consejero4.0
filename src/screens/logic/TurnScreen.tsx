import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameState } from '../../state/gameState'
import { checkAndTriggerMutations } from '../../lib/mutationLogic'
import { getAvailableEvents } from '../../lib/eventSelector'
import ViewTurnScreen from '../view/ViewTurnScreen'
import { selectRumor, getMatchingRumors } from '../../lib/rumorSelector'

export default function TurnScreen() {
  const gameState = useGameState()
  const {
    setPlayerAdvice,
    mainPlot,
    currentTurn,
    setCurrentTurn,
    setActiveEvents,
    addRumors,
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
      rumor={rumor}
      advice={advice}
      onAdviceChange={setAdvice}
      onSend={handleSend}
    />
  )
}
