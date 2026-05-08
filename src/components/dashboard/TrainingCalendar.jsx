import Card from '../ui/Card.jsx';
import Badge from '../ui/Badge.jsx';
import { trainingSessions } from '../../data/mockTraining.js';
export default function TrainingCalendar() {
  return <Card><h2>Weekly training plan</h2><div className="stack-list">{trainingSessions.map((session) => <div className="list-row" key={session.id}><div><strong>{session.title}</strong><p>{session.date} • {session.location} • {session.focus}</p></div><Badge tone={session.load === 'High' ? 'red' : session.load === 'Medium' ? 'orange' : 'green'}>{session.load}</Badge></div>)}</div></Card>;
}
