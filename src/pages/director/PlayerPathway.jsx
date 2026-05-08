import Card from '../../components/ui/Card.jsx';
export default function PlayerPathway(){return <div className="page-stack"><h1>Player Pathway</h1><div className="card-grid four-grid">{['Foundation','Emerging','Performance','Recruiting Ready'].map(stage=><Card key={stage}><h2>{stage}</h2><p>Age-group expectations and development outcomes.</p></Card>)}</div></div>}
