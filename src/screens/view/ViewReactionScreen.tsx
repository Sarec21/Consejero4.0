interface ViewReactionScreenProps {
  kingName: string
  playerAdvice: string
  kingReaction: string
  onContinue: () => void
}

export default function ViewReactionScreen({
  kingName,
  playerAdvice,
  kingReaction,
  onContinue,
}: ViewReactionScreenProps) {
  return (
    <div>
      <p>
        Your advice to King {kingName}: {playerAdvice}
      </p>
      <p>{kingReaction}</p>
      <button onClick={onContinue}>Continue to next turn</button>
    </div>
  )
}
