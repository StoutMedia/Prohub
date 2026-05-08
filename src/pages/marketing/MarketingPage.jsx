import Header from '../../components/layout/Header.jsx';
import Footer from '../../components/layout/Footer.jsx';
import Card from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';

const pageCopy = {
  Programs: ['PISA Program Offerings', 'Connect academy training, IDP reviews, session plans, and player milestones across every program.', ['Elite Team Training', 'Individual Development Plans', 'Performance Reviews', 'College Recruiting Pathway']],
  SummerTraining: ['Summer Training', 'High-intensity summer plans for technical repetition, tactical decision-making, and recruiting preparation.', ['Technical masterclasses', 'Position-specific development', 'Video review', 'Recruiting profile build']],
  About: ['About PISA ProHub', 'PISA ProHub exists to make every touch purposeful and every player pathway visible.', ['Protouch methodology', 'Coach-first workflows', 'Family transparency', 'Development evidence']],
  Contact: ['Contact PISA', 'Start a conversation about bringing ProHub to your player, team, or club.', ['Demo request', 'Program questions', 'Recruiting support', 'Club onboarding']],
  PlayerDevelopment: ['Player Development', 'Turn goals into a living Player Development Plan across technical, tactical, physical, and mental pillars.', ['Scanning', 'Body orientation', 'Preparation touch', 'Decision-making under pressure']],
  Coaches: ['For Coaches', 'Plan sessions, manage teams, review journals, and align training with the PISA Game Model.', ['Session planner', 'Roster reports', 'Game Model alignment', 'Coach feedback loops']],
};
export default function MarketingPage({ type }) {
  const [eyebrow, intro, items] = pageCopy[type];
  return <><Header /><main><section className="page-hero section-pad"><p className="eyebrow">{eyebrow}</p><h1>{intro}</h1><p>Premium sports-tech tools with a clean dark interface, PISA orange actions, and responsive cards for every device.</p><Button to="/login">Open ProHub</Button></section><section className="section-pad card-grid four-grid">{items.map((item) => <Card key={item}><h3>{item}</h3><p>Designed around realistic soccer actions and measurable player growth.</p></Card>)}</section></main><Footer /></>;
}
