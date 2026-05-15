import Header from '../../components/layout/Header.jsx';
import Footer from '../../components/layout/Footer.jsx';
import Card from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';
import { pricingPlans } from '../../data/pisaData.js';
import { createCheckoutSessionPlaceholder } from '../../services/payments.js';

export default function Pricing(){return <><Header/><main><section className="page-hero section-pad"><p className="eyebrow">Pricing + Stripe checkout placeholders</p><h1>Simple plans for every stage of the soccer pathway.</h1><p>Monthly subscriptions and the one-time Accelerator package are prepared for a backend Stripe Checkout Session endpoint.</p></section><section className="section-pad card-grid four-grid">{pricingPlans.map((plan)=>{const checkout = createCheckoutSessionPlaceholder(plan);return <Card className="pricing-card" key={plan.id}><p className="eyebrow">{plan.audience}</p><h2>{plan.name}</h2><strong className="price">{plan.price}<span>{plan.cadence}</span></strong><ul>{plan.features.map(item=><li key={item}>{item}</li>)}</ul><Button to="/login">Select {plan.name}</Button><small className="checkout-note">Stripe mode: {checkout.mode} • {checkout.stripePriceId}</small></Card>})}</section></main><Footer/></>}
