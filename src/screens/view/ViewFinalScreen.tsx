import type { Final } from '../../lib/finalSelector'

interface ViewFinalScreenProps {
  final: Final | null
  onReset: () => void
}

export default function ViewFinalScreen({ final, onReset }: ViewFinalScreenProps) {
  return (
    <div>
      {final ? (
        <div>
          <h2>
            {final.visual.icon} {final.title}
          </h2>
          <p>{final.description}</p>
          <p>Image tag: {final.visual.tag_ia}</p>
          {final.achievement_id && (
            <p>Achievement unlocked: {final.achievement_id}</p>
          )}
          {final.card_id && <p>Card unlocked: {final.card_id}</p>}
        </div>
      ) : (
        <p>Loading ending...</p>
      )}
      <button onClick={onReset}>Play Again</button>
    </div>
  )
}
