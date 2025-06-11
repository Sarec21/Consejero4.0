interface ViewStartScreenProps {
  onStart: () => void
}

export default function ViewStartScreen({ onStart }: ViewStartScreenProps) {
  return (
    <div>
      <h1>The Advisor</h1>
      <button onClick={onStart}>Start Game</button>
    </div>
  )
}
