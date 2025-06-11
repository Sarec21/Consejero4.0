interface ViewFinalScreenProps {
  onReset: () => void
}

export default function ViewFinalScreen({ onReset }: ViewFinalScreenProps) {
  return (
    <div>
      <p>Your service has ended. The future of Eldoria is uncertain.</p>
      <button onClick={onReset}>Play Again</button>
    </div>
  )
}
