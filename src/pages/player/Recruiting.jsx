import Card from '../../components/ui/Card.jsx';
import RecruitingTracker from '../../components/dashboard/RecruitingTracker.jsx';
import { recruitingChecklist } from '../../data/mockRecruiting.js';
export default function Recruiting(){return <div className="page-stack"><div className="dashboard-title"><p className="eyebrow">Recruiting (College)</p><h1>A simpler roadmap to stay consistent and get seen.</h1></div><div className="dashboard-grid"><RecruitingTracker/>{recruitingChecklist.map(group=><Card key={group.group}><h2>{group.group}</h2>{group.items.map(item=><div className="list-row" key={item}><span>{item}</span><button className="btn btn-primary" type="button">Complete</button></div>)}</Card>)}</div></div>}
