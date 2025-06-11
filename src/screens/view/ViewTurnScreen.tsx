interface ViewTurnScreenProps {
  advice: string
  onAdviceChange: (value: string) => void
  onSend: () => void
}

export default function ViewTurnScreen({ advice, onAdviceChange, onSend }: ViewTurnScreenProps) {
  return (
    <div>
      <p>The villagers have gathered in the square with torches.</p>
      <p>Should we intervene or let them speak freely?</p>
      <textarea
        value={advice}
        onChange={(e) => onAdviceChange(e.target.value)}
        placeholder="Your advice"
      />
      <button onClick={onSend}>Send Advice</button>
    </div>
  )
}
