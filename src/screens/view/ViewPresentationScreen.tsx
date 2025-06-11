import { useGameState } from '../../state/gameState'

interface ViewPresentationScreenProps {
  kingName: string
  kingdom: string
  onContinue: () => void
  debugText: string
}

export default function ViewPresentationScreen({ kingName, kingdom, onContinue, debugText }: ViewPresentationScreenProps) {
  const { currentKing } = useGameState()
  const phrase = currentKing?.king_phrase || 'Long live the king.'
  const throneDesc = currentKing?.throne_room_description || 'The throne room awaits.'
  return (
    <div>
      <h2>{kingName} of {kingdom}</h2>
      <p>{phrase}</p>
      <p>{throneDesc}</p>
      <p>You are now the advisor of King {kingName} of {kingdom}.</p>
      <button onClick={onContinue}>Continue</button>
      <details style={{ marginTop: '1rem' }}>
        <summary>Debug</summary>
        <pre style={{
          background: '#333',
          color: '#eee',
          fontSize: '0.75rem',
          overflow: 'auto',
          padding: '0.5rem',
          whiteSpace: 'pre-wrap',
        }}>{debugText}</pre>
      </details>
    </div>
  )
}
