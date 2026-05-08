import TrainingCalendar from '../../components/dashboard/TrainingCalendar.jsx';
import Card from '../../components/ui/Card.jsx';
import { trainingSessions } from '../../data/mockTraining.js';
export default function TrainingPlan(){return <div className="page-stack"><div className="dashboard-title"><p className="eyebrow">Training Calendar</p><h1>Calendar/list hybrid</h1></div><TrainingCalendar/><div className="card-grid four-grid">{trainingSessions.map(s=><Card key={s.id}><h3>{s.date}</h3><p>{s.type} • {s.location}</p><strong>{s.status}</strong></Card>)}</div></div>}
