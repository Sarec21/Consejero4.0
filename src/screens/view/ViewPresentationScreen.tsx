interface ViewPresentationScreenProps {
  kingName: string
  kingdom: string
  onContinue: () => void
}

export default function ViewPresentationScreen({ kingName, kingdom, onContinue }: ViewPresentationScreenProps) {
  return (
    <div>
      <h2>{kingName} of {kingdom}</h2>
      <p>You are now the advisor of King {kingName} of {kingdom}.</p>
      <button onClick={onContinue}>Continue</button>
    </div>
  )
}
