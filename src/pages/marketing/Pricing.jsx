import Header from '../../components/layout/Header.jsx';
import Footer from '../../components/layout/Footer.jsx';
import Card from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';
import { coachOrgPlans, parentPlayerPlans } from '../../data/prohubData.js';

const groups = [
  ['Parent / Player', parentPlayerPlans],
  ['Coach / Director / Staff', coachOrgPlans],
];

export default function Pricing(){return <><Header/><main><section className="page-hero section-pad"><p className="eyebrow">ProHub pricing</p><h1>Simple plans for players, families, coaches, and organizations.</h1><p>Pricing selection is role-aware during onboarding. Organization invite links skip pricing and connect users directly to the invited workspace.</p></section>{groups.map(([title, plans]) => <section className="section-pad" key={title}><div className="page-hero"><p className="eyebrow">{title}</p><h2>{title} plans</h2></div><div className="card-grid four-grid">{plans.map((plan)=><Card className="pricing-card" key={plan.name}><p className="eyebrow">{title}</p><h2>{plan.name}</h2><strong className="price">{plan.price}<span>/mo</span></strong><p>{plan.note}</p><Button to="/register">Select {plan.name}</Button></Card>)}</div></section>)}</main><Footer/></>}
