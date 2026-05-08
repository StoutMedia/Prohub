import Card from '../../components/ui/Card.jsx';
import { reports } from '../../data/mockReports.js';
export default function Reports(){return <div className="page-stack"><div className="dashboard-title"><p className="eyebrow">Reports</p><h1>Development evidence and trends.</h1></div><div className="card-grid four-grid">{reports.map(report=><Card key={report.title}><h2>{report.title}</h2><strong className="price">{report.metric}</strong><p>{report.summary}</p></Card>)}</div></div>}
