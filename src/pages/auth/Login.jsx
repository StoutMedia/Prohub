import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const flows = [
  { id: 'player', label: 'Player', path: '/app/player', headline: 'Build your player profile, training plan, and recruiting track.' },
  { id: 'parent', label: 'Parent', path: '/app/parent', headline: 'Follow progress, billing, reports, and next family actions.' },
  { id: 'coach', label: 'Coach', path: '/app/coach', headline: 'Manage rosters, notes, development plans, and team reports.' },
  { id: 'invited-coach', label: 'Invited coach', path: '/app/coach', headline: 'Join an existing organization from your invitation.' },
];

const playerParentPlans = [
  { id: 'starter', name: 'Starter', price: '$19', cadence: '/mo', description: 'Profile, training workspace, and reports.' },
  { id: 'pro', name: 'Pro', price: '$49', cadence: '/mo', description: 'Adds IDP tools and recruiting CRM.' },
  { id: 'elite', name: 'Elite', price: '$99', cadence: '/mo', description: 'Coach-supported pathway and parent reports.' },
];

function VerificationBoxes() {
  return <div className="verification-boxes" aria-label="Email verification code">
    {Array.from({ length: 6 }).map((_, index) => <input key={index} inputMode="numeric" maxLength="1" aria-label={`Digit ${index + 1}`} />)}
  </div>;
}

export default function Login({ initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode);
  const [flow, setFlow] = useState('player');
  const [showVerify, setShowVerify] = useState(false);
  const navigate = useNavigate();
  const selected = useMemo(() => flows.find((item) => item.id === flow) || flows[0], [flow]);
  const isSignup = mode === 'signup';
  const showPricing = isSignup && (flow === 'player' || flow === 'parent');
  const isInvitedCoach = flow === 'invited-coach';

  function handleSubmit(event) {
    event.preventDefault();
    if (isSignup) {
      setShowVerify(true);
      return;
    }
    navigate(selected.path);
  }

  return <main className="auth-page prohub-auth">
    <section className="auth-brand prohub-left-panel" aria-label="ProHub onboarding introduction">
      <div className="prohub-wordmark"><span className="brand-mark">P</span><span>PROHUB</span></div>
      <div className="prohub-hero-copy">
        <p className="eyebrow">Soccer development platform</p>
        <h1>PROHUB</h1>
        <h2>Auth and onboarding built for players, parents, and coaches.</h2>
        <p>Choose the right flow, verify your email, and continue into the role-specific ProHub workspace.</p>
      </div>
      <div className="auth-feature-list">
        <span>Player pathways</span>
        <span>Parent reporting</span>
        <span>Coach invites</span>
      </div>
      <div className="secure-login-badge">🔒 Secure login</div>
    </section>

    <section className="auth-form prohub-auth-card" aria-label="Authentication form">
      <div className="auth-card-header">
        <p className="eyebrow">{isSignup ? 'Create your account' : 'Welcome back'}</p>
        <h2>{isSignup ? 'Start onboarding.' : 'Log in to ProHub.'}</h2>
        <p>{selected.headline}</p>
      </div>

      <div className="auth-mode-toggle" role="tablist" aria-label="Authentication mode">
        <button className={mode === 'login' ? 'active' : ''} type="button" onClick={() => setMode('login')}>Login</button>
        <button className={mode === 'signup' ? 'active' : ''} type="button" onClick={() => setMode('signup')}>Sign up</button>
      </div>

      <div className="segmented prohub-flow-selector" aria-label="Select onboarding flow">
        {flows.map((item) => <button key={item.id} className={flow === item.id ? 'active' : ''} type="button" onClick={() => setFlow(item.id)}>{item.label}</button>)}
      </div>

      <form className="prohub-auth-fields" onSubmit={handleSubmit}>
        {isSignup && <label>Full name<input type="text" placeholder="Jordan Rivera" required /></label>}
        <label>Email address<input type="email" placeholder="you@prohub.com" required /></label>
        <label>Password<input type="password" placeholder="••••••••" required /></label>
        {isInvitedCoach && <label>Organization invite code<input type="text" placeholder="PROHUB-COACH-INVITE" required /></label>}
        <div className="form-row auth-options-row">
          <label className="check"><input type="checkbox" /> Remember me</label>
          <Link to="/forgot-password">Forgot password?</Link>
        </div>
        <button className="btn btn-primary full" type="submit">{isSignup ? 'Continue onboarding' : `Log in as ${selected.label}`}</button>
        {!isSignup && <button className="btn btn-secondary full" type="button" onClick={() => setMode('signup')}>Create account</button>}
      </form>

      {showPricing && <div className="billing-card-grid" aria-label="Parent and player pricing">
        {playerParentPlans.map((plan) => <article className="billing-card" key={plan.id}>
          <h3>{plan.name}</h3>
          <p><strong>{plan.price}</strong><span>{plan.cadence}</span></p>
          <small>{plan.description}</small>
        </article>)}
      </div>}

      {isSignup && isInvitedCoach && <div className="invite-note">Pricing tiers are skipped for invited coaches joining an existing organization.</div>}
    </section>

    <a className="support-link" href="mailto:support@prohub.com">Support</a>

    {showVerify && <div className="auth-modal" role="dialog" aria-modal="true" aria-label="Verify email">
      <div className="auth-modal-card">
        <button className="modal-close" type="button" aria-label="Close modal" onClick={() => setShowVerify(false)}>×</button>
        <p className="eyebrow">Email verification</p>
        <h2>Enter your code</h2>
        <p>We sent a six-digit code to your email. This keeps onboarding secure before billing or invite setup.</p>
        <VerificationBoxes />
        <button className="btn btn-primary full" type="button" onClick={() => navigate(selected.path)}>Verify and continue</button>
      </div>
    </div>}
  </main>;
}
