import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import stadiumImage from '../../assets/prohub-stadium.svg';

const flows = [
  { id: 'coach', label: 'Coach', path: '/app/dashboard', headline: 'Create a coach workspace for rosters, reports, teams, IDPs, and session plans.' },
  { id: 'player', label: 'Player', path: '/app/dashboard', headline: 'Train smarter, track development, and keep every next step clear.' },
  { id: 'parent', label: 'Parent', path: '/app/dashboard', headline: 'Follow your player, manage billing, and stay connected to the plan.' },
  { id: 'director', label: 'Director', path: '/app/dashboard', headline: 'Oversee teams, staff, reports, and academy-wide development systems.' },
  { id: 'staff', label: 'Staff', path: '/app/dashboard', headline: 'Join the club workspace and support every player pathway.' },
  { id: 'invited-coach', label: 'Organization invite', path: '/app/dashboard', headline: 'Accept your organization invite and skip pricing selection.' },
];

const playerParentPlans = [
  { id: 'starter', name: 'Starter', audience: 'Parent / Player', price: '$9', cadence: '/mo', description: 'Profile, parent visibility, and shared calendar access.' },
  { id: 'player', name: 'Player', audience: 'Parent / Player', price: '$29', cadence: '/mo', description: 'KPI tracking, session notes, reports, and IDP access.' },
  { id: 'family', name: 'Family', audience: 'Parent / Player', price: '$59', cadence: '/mo', description: 'Multi-player household, parent controls, and messaging.' },
  { id: 'family-plus', name: 'Family Plus', audience: 'Parent / Player', price: '$89', cadence: '/mo', description: 'Expanded family support and priority player review workflow.' },
];

const organizationPlans = [
  { id: 'starter', name: 'Starter', audience: 'Coach / Organization', price: '$29', cadence: '/mo', description: 'Individual coach workspace with rosters and session planning.' },
  { id: 'team', name: 'Team', audience: 'Coach / Organization', price: '$79', cadence: '/mo', description: 'One team, staff invites, reports, and parent/player portals.' },
  { id: 'academy', name: 'Academy', audience: 'Coach / Organization', price: '$199', cadence: '/mo', description: 'Multi-team pathway, director oversight, and shared templates.' },
  { id: 'organization', name: 'Organization', audience: 'Coach / Organization', price: '$499', cadence: '/mo', description: 'Club-wide operations, analytics, invites, and support.' },
];

function FieldIcon({ children }) {
  return <span className="prohub-field-icon" aria-hidden="true">{children}</span>;
}

function AuthInput({ icon, id, label, ...props }) {
  return <label className="prohub-field" htmlFor={id}>
    <span>{label}</span>
    <span className="prohub-input-wrap">
      <input id={id} {...props} />
      <FieldIcon>{icon}</FieldIcon>
    </span>
  </label>;
}

function VerificationBoxes({ status, setStatus }) {
  const [digits, setDigits] = useState(Array(6).fill(''));
  const refs = useRef([]);
  const invalid = status === 'invalid';
  const expired = status === 'expired';

  function updateDigit(index, value) {
    const nextValue = value.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[index] = nextValue;
    setDigits(next);
    if (status) setStatus('');
    if (nextValue && index < refs.current.length - 1) refs.current[index + 1]?.focus();
  }

  function handleKeyDown(index, event) {
    if (event.key === 'Backspace' && !digits[index] && index > 0) refs.current[index - 1]?.focus();
  }

  return <div>
    <div className="verification-boxes" aria-label="Email verification code">
      {digits.map((digit, index) => <input
        key={index}
        ref={(node) => { refs.current[index] = node; }}
        aria-label={`Digit ${index + 1}`}
        className={invalid || expired ? 'code-error' : ''}
        inputMode="numeric"
        maxLength="1"
        value={digit}
        onChange={(event) => updateDigit(index, event.target.value)}
        onKeyDown={(event) => handleKeyDown(index, event)}
      />)}
    </div>
    {invalid && <p className="verify-error">Invalid code. Check the six digits and try again.</p>}
    {expired && <p className="verify-error">This code expired. Resend a new code to continue.</p>}
  </div>;
}

function AuthBrandPanel() {
  return <section className="relative hidden min-h-screen w-[49.4%] overflow-hidden lg:block prohub-left-panel" aria-label="ProHub onboarding introduction">
    <img className="prohub-stadium-image" src={stadiumImage} alt="Soccer stadium lights" />
    <div className="prohub-stadium-overlay" />
    <div className="prohub-wordmark"><span>PROHUB</span></div>
    <div className="prohub-hero-copy">
      <h1>PROHUB</h1>
      <h2>Build. Train. Perform</h2>
      <p>One connected platform for soccer players, parents, coaches, and organizations to manage development from first session to next opportunity.</p>
    </div>
  </section>;
}

function BottomChrome() {
  return <>
    <div className="secure-login-badge">Secure encrypted login</div>
    <a className="support-link" href="mailto:support@prohub.com">Contact Support</a>
  </>;
}

function EmailVerificationModal({ onClose, onContinue }) {
  const [status, setStatus] = useState('');
  const [cooldown, setCooldown] = useState(30);

  useEffect(() => {
    if (cooldown <= 0) return undefined;
    const timer = window.setTimeout(() => setCooldown((current) => current - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [cooldown]);

  return <div className="relative flex min-h-screen items-center justify-center bg-black auth-modal" role="dialog" aria-modal="true" aria-label="Verify email">
    <div className="auth-modal-card auth-modal-card-small">
      <button className="modal-close" type="button" aria-label="Close modal" onClick={onClose}>×</button>
      <div className="modal-dashed-section">
        <p className="modal-kicker">Email verification</p>
        <h2>Enter your code</h2>
        <p>We sent a six-digit code to your inbox. Enter it below to secure your ProHub account.</p>
      </div>
      <VerificationBoxes status={status} setStatus={setStatus} />
      <div className="verify-actions">
        <button className="primary-prohub-button" type="button" onClick={onContinue}>Verify and continue</button>
        <button className="outline-prohub-button" type="button" disabled={cooldown > 0} onClick={() => setCooldown(30)}>{cooldown > 0 ? `Resend code in ${cooldown}s` : 'Resend code'}</button>
      </div>
      <div className="verify-state-actions">
        <button type="button" onClick={() => setStatus('invalid')}>Show invalid state</button>
        <button type="button" onClick={() => setStatus('expired')}>Show expired state</button>
      </div>
    </div>
  </div>;
}

function BillingCard({ plan }) {
  return <article className="billing-card">
    <p className="billing-audience">{plan.audience}</p>
    <h3>{plan.name}</h3>
    <p className="billing-price"><strong>{plan.price}</strong>{plan.cadence && <span>{plan.cadence}</span>}</p>
    <small>{plan.description}</small>
    <button className="outline-prohub-button" type="button">Select</button>
  </article>;
}

function SubscriptionModal({ flow, onClose, onContinue }) {
  const isCoach = ['coach', 'director', 'staff'].includes(flow);
  const plans = isCoach ? organizationPlans : playerParentPlans;

  return <div className="relative flex min-h-screen items-center justify-center bg-black auth-modal" role="dialog" aria-modal="true" aria-label="Subscription and license">
    <div className="auth-modal-card billing-modal-card">
      <button className="modal-close" type="button" aria-label="Close modal" onClick={onClose}>×</button>
      <div className="modal-dashed-section billing-header">
        <p className="modal-kicker">Subscription / license</p>
        <h2>{isCoach ? 'Choose an organization license' : 'Choose a parent or player plan'}</h2>
        <p>{isCoach ? 'Organization tiers are separate from individual parent and player memberships.' : 'Parent and player tiers stay separate from organization licenses.'}</p>
      </div>
      <div className="billing-card-grid">
        {plans.map((plan) => <BillingCard key={plan.id} plan={plan} />)}
      </div>
      <button className="primary-prohub-button billing-continue" type="button" onClick={onContinue}>Continue to workspace</button>
    </div>
  </div>;
}

export default function Login({ initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode);
  const [flow, setFlow] = useState('coach');
  const [showVerify, setShowVerify] = useState(false);
  const [showBilling, setShowBilling] = useState(false);
  const navigate = useNavigate();
  const selected = useMemo(() => flows.find((item) => item.id === flow) || flows[0], [flow]);
  const isSignup = mode === 'signup';
  const isInvitedCoach = flow === 'invited-coach';

  function handleSubmit(event) {
    event.preventDefault();
    if (isSignup) {
      setShowVerify(true);
      return;
    }
    navigate(selected.path);
  }

  function finishVerification() {
    setShowVerify(false);
    if (isInvitedCoach) {
      navigate(selected.path);
      return;
    }
    setShowBilling(true);
  }

  return <main className="min-h-screen bg-white font-['Poppins',system-ui,sans-serif text-neutral-950 prohub-auth-shell">
    <div className="flex min-h-screen prohub-auth-split">
      <AuthBrandPanel />

      <section className="relative flex min-h-screen flex-1 items-center justify-center overflow-hidden px-8 prohub-right-panel" aria-label="Authentication form">
        <img className="right-stadium-watermark" src={stadiumImage} alt="" aria-hidden="true" />
        <div className="relative z-10 w-full max-w-[490px] prohub-form-wrapper">
          <div className="auth-card-header">
            <p className="modal-kicker">{isSignup ? 'Create your account' : 'Welcome back'}</p>
            <h2>{isSignup ? 'Start with ProHub.' : 'Log in to ProHub.'}</h2>
            <p>{selected.headline}</p>
          </div>

          <div className="auth-mode-toggle" role="tablist" aria-label="Authentication mode">
            <button className={mode === 'login' ? 'active' : ''} type="button" onClick={() => setMode('login')}>Login</button>
            <button className={mode === 'signup' ? 'active' : ''} type="button" onClick={() => setMode('signup')}>Sign up</button>
          </div>

          <div className="prohub-flow-selector" aria-label="Select onboarding flow">
            {flows.map((item) => <button key={item.id} className={flow === item.id ? 'active' : ''} type="button" onClick={() => setFlow(item.id)}>{item.label}</button>)}
          </div>

          <form className="prohub-auth-fields" onSubmit={handleSubmit}>
            {isSignup && <AuthInput id="full-name" icon="◎" label="Full name" type="text" placeholder="Jordan Rivera" required />}
            <AuthInput id="email" icon="✉" label="Email address" type="email" placeholder="you@prohub.com" required />
            <AuthInput id="password" icon="◐" label="Password" type="password" placeholder="••••••••" required />
            {isSignup && <div className="two-grid"><label className="prohub-field"><span>Workspace type</span><select><option>Organization</option><option>Individual</option></select></label><label className="prohub-field"><span>Player age check</span><select><option>18 or older / not a player</option><option>Under 18 — parent control required</option></select></label></div>}
            <div className="social-auth-row"><button type="button" className="outline-prohub-button">Continue with Google</button><button type="button" className="outline-prohub-button">Continue with Apple</button></div>
            {isInvitedCoach && <AuthInput id="invite" icon="⌁" label="Organization invite code" type="text" placeholder="PROHUB-COACH-INVITE" required />}
            <div className="auth-options-row">
              <label className="check"><input type="checkbox" /> <span>Remember me</span></label>
              <Link to="/forgot-password">Forgot password?</Link>
            </div>
            <button className="primary-prohub-button" type="submit">{isSignup ? 'Continue' : `Log in as ${selected.label}`}</button>
            {!isSignup && <button className="outline-prohub-button" type="button" onClick={() => setMode('signup')}>Create account</button>}
          </form>

          {isSignup && isInvitedCoach && <div className="invite-note">Users invited by an organization skip pricing and go straight to the ProHub workspace.</div>}
        </div>
      </section>
    </div>

    <BottomChrome />

    {showVerify && <EmailVerificationModal onClose={() => setShowVerify(false)} onContinue={finishVerification} />}
    {showBilling && <SubscriptionModal flow={flow} onClose={() => setShowBilling(false)} onContinue={() => navigate(selected.path)} />}
  </main>;
}
