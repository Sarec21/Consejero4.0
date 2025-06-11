interface ViewReactionScreenProps {
  kingName: string
  playerAdvice: string
  kingReaction: string
  onEnd: () => void
}

export default function ViewReactionScreen({ kingName, playerAdvice, kingReaction, onEnd }: ViewReactionScreenProps) {
  return (
    <div>
      <p>Your advice to King {kingName}: {playerAdvice}</p>
      <p>{kingReaction}</p>
      <button onClick={onEnd}>End Game</button>
    </div>
  )
}
