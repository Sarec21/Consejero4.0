import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameState } from '../../state/gameState'
import { checkAndTriggerMutations } from '../../lib/mutationLogic'
import { getAvailableEvents } from '../../lib/eventSelector'
import ViewTurnScreen from '../view/ViewTurnScreen'
import { getRumorForCurrentState } from '../../lib/rumorSelector'
import { getAvailableCharacters, CharacterEntry } from '../../lib/characterUtils'

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
    level,
    currentEmotion,
  } = gameState

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const rumor = getRumorForCurrentState()
    if (rumor && !rumorsQueue.includes(rumor)) {
      addRumors([rumor])
    }
  }, [])
  /* eslint-enable react-hooks/exhaustive-deps */

  const currentRumorText =
    rumorsQueue.length > 0 ? rumorsQueue[rumorsQueue.length - 1] : null
  const [advice, setAdvice] = useState('')
  const [availableChars, setAvailableChars] = useState<CharacterEntry[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    if (mainPlot) {
      const chars = getAvailableCharacters(mainPlot, currentEmotion, level)
      setAvailableChars(chars)
    }
  }, [mainPlot, currentEmotion, level])

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
      debugCharacters={availableChars}
    />
  )
}
