interface ViewTurnScreenProps {
  rumor?: string | null
  advice: string
  onAdviceChange: (value: string) => void
  onSend: () => void
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
  advice,
  onAdviceChange,
  onSend,
  debugCharacters,
}: ViewTurnScreenProps) {
  return (
    <div>
      {rumor && (
        <div className="rumor-box">
          <p className="rumor-text">🕵️ Rumor: {rumor}</p>
        </div>
      )}
      <p>The villagers have gathered in the square with torches.</p>
      <p>Should we intervene or let them speak freely?</p>
      <textarea
        value={advice}
        onChange={(e) => onAdviceChange(e.target.value)}
        placeholder="Your advice"
      />
      <button onClick={onSend}>Send Advice</button>
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
