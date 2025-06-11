import type { Event } from '../lib/eventSelector'

interface EventCardProps {
  event: Event
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <div style={{ border: '1px solid #555', padding: '0.5rem', marginTop: '1rem' }}>
      <h4>{event.title}</h4>
      <p>{event.description}</p>
    </div>
  )
}
