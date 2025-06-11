interface ViewLevelSelectionScreenProps {
  levels: string[]
  onSelect: (level: string) => void
}

export default function ViewLevelSelectionScreen({ levels, onSelect }: ViewLevelSelectionScreenProps) {
  return (
    <div>
      <h2>Select your level of influence</h2>
      <ul>
        {levels.map((level) => (
          <li key={level}>
            <button onClick={() => onSelect(level)}>{level}</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
