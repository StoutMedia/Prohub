import Header from '../../components/layout/Header.jsx';
import Footer from '../../components/layout/Footer.jsx';
import Card from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';
const plans = [ ['Player Plan', '$19/month', ['Player profile', 'Journal', 'Development plan', 'Recruiting checklist']], ['Pro Player Plan', '$49/month', ['Everything in Player', 'Coach feedback', 'Video review', 'Recruiting tracker']], ['Coach Plan', '$99/month', ['Session planner', 'Player reports', 'Team dashboard', 'Development tracking']], ['Club Plan', 'Custom', ['Director dashboard', 'Multiple teams', 'Staff tools', 'Club-wide reporting']] ];
export default function Pricing(){return <><Header/><main><section className="page-hero section-pad"><p className="eyebrow">SaaS Pricing</p><h1>Choose the ProHub plan for your pathway.</h1></section><section className="section-pad card-grid four-grid">{plans.map(([name, price, items])=><Card className="pricing-card" key={name}><h2>{name}</h2><strong className="price">{price}</strong><ul>{items.map(item=><li key={item}>{item}</li>)}</ul><Button to="/login">Start</Button></Card>)}</section></main><Footer/></>}
