import { useGameState } from '../../state/gameState'

interface ViewPresentationScreenProps {
  kingName: string
  kingdom: string
  kingdomDescription?: string
  onContinue: () => void
  debugText: string
}

export default function ViewPresentationScreen({ kingName, kingdom, kingdomDescription, onContinue, debugText }: ViewPresentationScreenProps) {
  const { currentKing, mainPlot } = useGameState()
  const name = currentKing?.name || kingName
  const epithet = currentKing?.epithet || ''
  const visual = currentKing?.visual?.tag_ia || 'N/A'
  const phrase = currentKing?.king_phrase || 'Long live the king.'
  const throneDesc = currentKing?.throne_room_description || 'The throne room awaits.'
  const kingdomContext = currentKing?.kingdom_context || `The kingdom of ${kingdom}`
  const kingdomDesc = kingdomDescription || ''
  const personality = currentKing?.personality || 'Unknown'
  const tone = currentKing?.general_tone || 'Neutral'

  return (
    <div
      style={{
        background: '#1c1c1c',
        borderRadius: '8px',
        border: '2px solid #444',
        padding: '1rem',
        color: '#eee',
        maxWidth: '900px',
        margin: '0 auto',
      }}
    >
      <h2 style={{ fontSize: '2rem', margin: 0 }}>{name}</h2>
      {epithet && (
        <h3 style={{ marginTop: '0.25rem', color: '#bbb', fontStyle: 'italic' }}>{epithet}</h3>
      )}

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'stretch',
          gap: '1rem',
          marginTop: '1rem',
        }}
      >
        <div style={{ flex: 1, textAlign: 'left' }}>
          <p>{throneDesc}</p>
          <p>{kingdomContext}</p>
          {kingdomDesc && <p>{kingdomDesc}</p>}
        </div>

        <div
          style={{
            flex: '0 0 200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #555',
            borderRadius: '8px',
            background: '#2a2a2a',
            minHeight: '200px',
            padding: '0.5rem',
            color: '#888',
          }}
        >
          Visual: {visual}
        </div>

        <div style={{ flex: 1, textAlign: 'left' }}>
          <p>
            <strong>Personality:</strong> {personality}
          </p>
          <p>
            <strong>Tone:</strong> {tone}
          </p>
          <p>
            <strong>Signature Phrase:</strong> "{phrase}"
          </p>
        </div>
      </div>

      <p style={{ marginTop: '1rem' }}>
        You are now the advisor of King {name} of {kingdom}.
      </p>

      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <button
          onClick={onContinue}
          style={{
            background: '#333',
            border: '1px solid #555',
            borderRadius: '8px',
            padding: '0.6em 1.2em',
            fontSize: '1rem',
            color: '#eee',
          }}
        >
          Continue
        </button>
      </div>

      <details style={{ marginTop: '1rem' }}>
        <summary>Debug</summary>
        <pre
          style={{
            background: '#333',
            color: '#eee',
            fontSize: '0.75rem',
            overflow: 'auto',
            padding: '0.5rem',
            whiteSpace: 'pre-wrap',
          }}
        >
          {debugText}
        </pre>
        {currentKing && mainPlot && (
          <div style={{ marginTop: '1rem' }}>
            <h4>🧪 Test visual de asignación</h4>
            <p>
              <strong>Rey:</strong> {currentKing.name} ({currentKing.epithet})
            </p>
            <p>
              <strong>Tags del Rey:</strong> {currentKing.tags.join(', ')}
            </p>
            <p>
              <strong>Tags de la Trama:</strong> {mainPlot.tags.join(', ')}
            </p>
          </div>
        )}
      </details>
    </div>
  )
}
