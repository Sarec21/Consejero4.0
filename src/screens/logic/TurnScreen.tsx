import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameState } from '../../state/gameState'
import { checkAndTriggerMutations } from '../../lib/mutationLogic'
import ViewTurnScreen from '../view/ViewTurnScreen'

export default function TurnScreen() {
  const {
    setPlayerAdvice,
    mainPlot,
    currentTurn,
    setCurrentTurn,
  } = useGameState()
  const [advice, setAdvice] = useState('')
  const navigate = useNavigate()

  const handleSend = () => {
    setPlayerAdvice(advice)
    const newTurn = currentTurn + 1
    setCurrentTurn(newTurn)
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
