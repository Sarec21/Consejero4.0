import type { Event } from '../../lib/eventSelector'

interface ViewTurnScreenProps {
  rumor?: string | null
  event?: Event | null
  visualTag?: string | null
  advice: string
  onAdviceChange: (value: string) => void
  onSend: () => void
  onGenerate: () => void
  generating: boolean
  dilemma: string | null
  trust: number
  prestige: number
  kingName: string
  plotId?: string
  debugInfo?: string
  debugCharacters?: {
    id: string
    name: string
    archetype: string
    tags: string[]
    visual?: { tag_ia: string }
  }[]
}

export default function ViewTurnScreen({
  rumor,
  event,
  visualTag,
  advice,
  onAdviceChange,
  onSend,
  onGenerate,
  generating,
  dilemma,
  trust,
  prestige,
  kingName,
  plotId,
  debugInfo,
  debugCharacters,
}: ViewTurnScreenProps) {
  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <p>
          <strong>King:</strong> {kingName}
        </p>
        {plotId && (
          <p>
            <strong>Plot:</strong> {plotId}
          </p>
        )}
        <p>
          <strong>Trust:</strong> {trust} | <strong>Prestige:</strong> {prestige}
        </p>
      </div>
      {rumor && (
        <div className="rumor-box">
          <p className="rumor-text">🕵️ Rumor: {rumor}</p>
        </div>
      )}
      {event && (
        <div>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
        </div>
      )}
      {visualTag && <div style={{ opacity: 0.7 }}>Image tag: {visualTag}</div>}
      {dilemma ? (
        <div style={{ marginTop: '1rem' }}>
          <p>{dilemma}</p>
          <textarea
            value={advice}
            onChange={(e) => onAdviceChange(e.target.value)}
            placeholder="Your advice"
          />
          <button onClick={onSend}>Continue</button>
        </div>
      ) : (
        <button onClick={onGenerate} disabled={generating}>
          {generating ? 'Generating...' : 'Generate dilemma'}
        </button>
      )}
      {debugInfo && (
        <pre style={{ fontSize: '0.8rem' }}>{debugInfo}</pre>
      )}
      {debugCharacters && debugCharacters.length > 0 && (
        <details style={{ marginTop: '1rem' }}>
          <summary>Debug Characters</summary>
          <div style={{ fontSize: '0.85rem' }}>
            <h4>🧍 Activated Characters:</h4>
            <ul>
              {debugCharacters.map((c) => (
                <li key={c.id} style={{ marginBottom: '0.5rem' }}>
                  {c.name} [{c.archetype}]: {c.tags.join(', ')}
                  {c.visual?.tag_ia && (
                    <div style={{ opacity: 0.7 }}>{c.visual.tag_ia}</div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </details>
      )}
    </div>
  )
}
