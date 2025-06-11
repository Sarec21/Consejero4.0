import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameState } from '../../state/gameState'
import { checkAndTriggerMutations } from '../../lib/mutationLogic'
import { generateTurnContent } from '../../lib/narrative'
import ViewTurnScreen from '../view/ViewTurnScreen'

export default function TurnScreen() {
  const {
    setPlayerAdvice,
    mainPlot,
    currentTurn,
    setCurrentTurn,
    setCurrentEvent,
  } = useGameState()
  const [advice, setAdvice] = useState('')
  const navigate = useNavigate()

  const handleSend = () => {
    setPlayerAdvice(advice)
    const newTurn = currentTurn + 1
    setCurrentTurn(newTurn)
    if (mainPlot) {
      const { event } = generateTurnContent(mainPlot, useGameState.getState())
      setCurrentEvent(event)
    }
    checkAndTriggerMutations(newTurn, mainPlot, useGameState.getState())
    navigate('/reaction')
  }

  return (
    <ViewTurnScreen
      advice={advice}
      onAdviceChange={setAdvice}
      onSend={handleSend}
    />
  )
}
