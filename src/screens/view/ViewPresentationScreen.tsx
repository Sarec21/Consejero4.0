interface ViewPresentationScreenProps {
  kingName: string
  kingdom: string
  onContinue: () => void
  debugText: string
}

export default function ViewPresentationScreen({ kingName, kingdom, onContinue, debugText }: ViewPresentationScreenProps) {
  return (
    <div>
      <h2>{kingName} of {kingdom}</h2>
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
