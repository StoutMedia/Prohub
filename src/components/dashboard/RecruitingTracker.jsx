import Card from '../ui/Card.jsx';
import Badge from '../ui/Badge.jsx';
import { colleges } from '../../data/mockRecruiting.js';
export default function RecruitingTracker() {
  return <Card><h2>Recruiting tracker</h2><div className="responsive-table"><table><thead><tr><th>School</th><th>Status</th><th>Coach</th><th>Follow-up</th></tr></thead><tbody>{colleges.slice(0, 3).map((college) => <tr key={college.school}><td>{college.school}<small>{college.division} • {college.fit} fit</small></td><td><Badge tone="blue">{college.status}</Badge></td><td>{college.coach}</td><td>{college.followUp}</td></tr>)}</tbody></table></div></Card>;
}
