import Card from '../ui/Card.jsx';
import ProgressBar from '../ui/ProgressBar.jsx';
import { developmentGoals } from '../../data/mockPlayers.js';
export default function IDPCard() {
  return <Card><h2>Individual Development Plan</h2><p>Technical, tactical, physical, and mental goals tied to the PISA Game Model.</p>{developmentGoals.map((goal) => <ProgressBar key={goal.area} label={`${goal.area}: ${goal.goal}`} value={goal.progress} />)}</Card>;
}
