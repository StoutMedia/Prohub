import PlayerSnapshot from '../../components/dashboard/PlayerSnapshot.jsx';
import Card from '../../components/ui/Card.jsx';
import { players } from '../../data/mockPlayers.js';
export default function Profile(){return <div className="page-stack"><PlayerSnapshot player={players[0]}/><Card><h2>Settings</h2><p>Profile fields, notifications, family connections, and privacy controls are ready for backend integration.</p></Card></div>}
