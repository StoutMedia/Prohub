import Card from './Card.jsx';
export default function StatCard({ label, value, detail, tone = 'orange' }) {
  return <Card className={`stat-card accent-${tone}`}><span>{label}</span><strong>{value}</strong>{detail && <p>{detail}</p>}</Card>;
}
