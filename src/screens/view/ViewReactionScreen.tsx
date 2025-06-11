interface ViewReactionScreenProps {
  kingName: string
  playerAdvice: string
  kingReaction: string
  activeEvent?: { title: string; description: string } | null
  onEnd: () => void
}

export default function ViewReactionScreen({ kingName, playerAdvice, kingReaction, activeEvent, onEnd }: ViewReactionScreenProps) {
  return (
    <div>
      <p>Your advice to King {kingName}: {playerAdvice}</p>
      <p>{kingReaction}</p>
      {activeEvent && (
        <div>
          <h4>{activeEvent.title}</h4>
          <p>{activeEvent.description}</p>
        </div>
      )}
      <button onClick={onEnd}>End Game</button>
    </div>
  )
}
