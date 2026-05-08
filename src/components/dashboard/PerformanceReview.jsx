import Card from '../ui/Card.jsx';
import Badge from '../ui/Badge.jsx';
export default function PerformanceReview() {
  return <Card><h2>Performance review</h2><p>Latest coach note: connect body orientation to the next forward option earlier.</p><div className="tag-list"><Badge>Scanning</Badge><Badge tone="green">Line breaking</Badge><Badge tone="purple">Decision-making</Badge></div><button className="btn btn-secondary" type="button">Open review</button></Card>;
}
