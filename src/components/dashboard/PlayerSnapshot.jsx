import Card from '../ui/Card.jsx';
import ProgressBar from '../ui/ProgressBar.jsx';
export default function PlayerSnapshot({ player }) {
  return <Card className="snapshot"><div className="snapshot-head"><span className="avatar large">{player.avatar}</span><div><h2>{player.name}</h2><p>{player.position} • {player.team} • Class of {player.graduation}</p></div></div><p><strong>Current development focus:</strong> {player.focus}</p><ProgressBar label="Individual Development Plan" value={player.idpProgress} /><ProgressBar label="College Recruiting Pathway" value={player.recruitingProgress} /></Card>;
}
