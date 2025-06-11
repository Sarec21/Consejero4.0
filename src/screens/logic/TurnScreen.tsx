import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameState } from '../../state/gameState'
import ViewTurnScreen from '../view/ViewTurnScreen'

export default function TurnScreen() {
  const { setPlayerAdvice } = useGameState()
  const [advice, setAdvice] = useState('')
  const navigate = useNavigate()

  const handleSend = () => {
    setPlayerAdvice(advice)
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
