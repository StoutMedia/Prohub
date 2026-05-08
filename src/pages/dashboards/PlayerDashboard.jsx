import PlayerSnapshot from '../../components/dashboard/PlayerSnapshot.jsx';
import TrainingCalendar from '../../components/dashboard/TrainingCalendar.jsx';
import IDPCard from '../../components/dashboard/IDPCard.jsx';
import RecruitingTracker from '../../components/dashboard/RecruitingTracker.jsx';
import JournalPreview from '../../components/dashboard/JournalPreview.jsx';
import PerformanceReview from '../../components/dashboard/PerformanceReview.jsx';
import StatCard from '../../components/ui/StatCard.jsx';
import { players } from '../../data/mockPlayers.js';
export default function PlayerDashboard(){const player=players[0];return <div className="page-stack"><div className="dashboard-title"><p className="eyebrow">Player Dashboard</p><h1>Welcome back, {player.name.split(' ')[0]}.</h1><p>Today’s focus: Possession with Purpose to Attack — scan, receive, break lines.</p></div><div className="card-grid four-grid"><StatCard label="IDP Progress" value={`${player.idpProgress}%`} detail="On track"/><StatCard label="Attendance" value={`${player.attendance}%`} detail="Last 30 days" tone="green"/><StatCard label="Wellness" value={player.wellness} detail="Avg score" tone="blue"/><StatCard label="Action Items" value="5" detail="2 recruiting" tone="purple"/></div><div className="dashboard-grid"><PlayerSnapshot player={player}/><TrainingCalendar/><IDPCard/><JournalPreview/><RecruitingTracker/><PerformanceReview/></div></div>}
