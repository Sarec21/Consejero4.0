import type { Event } from '../../lib/eventSelector'
import EventCard from '../../components/EventCard'

interface ViewReactionScreenProps {
  kingName: string
  playerAdvice: string
  kingReaction: string
  activeEvent?: Event
  onEnd: () => void
}

export default function ViewReactionScreen({ kingName, playerAdvice, kingReaction, activeEvent, onEnd }: ViewReactionScreenProps) {
  return (
    <div>
      <p>Your advice to King {kingName}: {playerAdvice}</p>
      <p>{kingReaction}</p>
      {activeEvent && <EventCard event={activeEvent} />}
      <button onClick={onEnd}>End Game</button>
    </div>
  )
}
