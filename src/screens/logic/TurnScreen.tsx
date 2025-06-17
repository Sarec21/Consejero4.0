import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameState } from '../../state/gameState'
import { checkAndTriggerMutations } from '../../lib/mutationLogic'
import { getAvailableEvents, type Event } from '../../lib/eventSelector'
import ViewTurnScreen from '../view/ViewTurnScreen'
import { getRumorForCurrentState } from '../../lib/rumorSelector'
import { getAvailableCharacters, type CharacterEntry } from '../../lib/characterUtils'

export default function TurnScreen() {
  const gameState = useGameState()
  const {
    setPlayerAdvice,
    setKingReaction,
    setTrust,
    mainPlot,
    currentTurn,
    trust,
    addRumors,
    rumorsQueue,
    level,
    currentEmotion,
    currentKing,
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
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (mainPlot) {
      const chars = getAvailableCharacters(mainPlot, currentEmotion, level)
      setAvailableChars(chars)
    }
  }, [mainPlot, currentEmotion, level])

  useEffect(() => {
    if (mainPlot) {
      const events = getAvailableEvents(mainPlot, currentTurn)
      setCurrentEvent(events.length > 0 ? events[0] : null)
    }
  }, [mainPlot, currentTurn])

  const handleSend = () => {
    setPlayerAdvice(advice)
    setKingReaction('The King nods at your words and ponders.')
    setTrust(trust + 5)
    if (mainPlot) {
      checkAndTriggerMutations(currentTurn, mainPlot, useGameState.getState())
    }
    navigate('/reaction')
  }

  return (
    <ViewTurnScreen
      rumor={currentRumorText}
      event={currentEvent}
      visualTag={currentEvent?.visual?.tag_ia || currentKing?.visual?.tag_ia || null}
      advice={advice}
      onAdviceChange={setAdvice}
      onSend={handleSend}
      debugInfo={
        import.meta.env.DEV
          ? `turn:${currentTurn} trust:${trust} prestige:${gameState.prestige} war:${gameState.war}\nplot:${mainPlot?.id} king:${currentKing?.id}`
          : undefined
      }
      debugCharacters={import.meta.env.DEV ? availableChars : undefined}
    />
  )
}
