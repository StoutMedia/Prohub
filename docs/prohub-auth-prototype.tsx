import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import stadiumImage from '../src/assets/prohub-stadium.svg';

const flows = [
  { id: 'player', label: 'Player', path: '/app/player', headline: 'Train smarter, track development, and keep every next step clear.' },
  { id: 'parent', label: 'Parent', path: '/app/parent', headline: 'Follow your player, manage billing, and stay connected to the plan.' },
  { id: 'coach', label: 'Coach', path: '/app/coach', headline: 'Create a coach workspace for rosters, reports, and player plans.' },
  { id: 'invited-coach', label: 'Coach invite', path: '/app/coach', headline: 'Accept your organization invite and skip individual plan selection.' },
];

const playerParentPlans = [
  { id: 'starter', name: 'Starter', audience: 'Parent / Player', price: '$19', cadence: '/mo', description: 'Profile, training workspace, and monthly progress reporting.' },
  { id: 'pro', name: 'Pro', audience: 'Parent / Player', price: '$49', cadence: '/mo', description: 'Adds development plan tools, film notes, and recruiting CRM.' },
  { id: 'elite', name: 'Elite', audience: 'Parent / Player', price: '$99', cadence: '/mo', description: 'Coach-supported pathway with expanded parent reporting.' },
];

const organizationPlans = [
  { id: 'team', name: 'Team', audience: 'Organization', price: '$299', cadence: '/mo', description: 'One team workspace with player plans and coach reporting.' },
  { id: 'club', name: 'Club', audience: 'Organization', price: '$799', cadence: '/mo', description: 'Multi-team oversight, staff seats, and pathway dashboards.' },
  { id: 'academy', name: 'Academy', audience: 'Organization', price: 'Custom', cadence: '', description: 'Advanced license support for academies and larger programs.' },
];

function AuthInput({ icon, id, label, ...props }) {
  return <label className="prohub-field" htmlFor={id}>
    <span>{label}</span>
    <span className="prohub-input-wrap">
      <input className="h-[51px] w-full rounded-md border border-neutral-700 bg-transparent px-4 pr-14 text-[16px]" id={id} {...props} />
      <span className="prohub-field-icon" aria-hidden="true">{icon}</span>
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

  return <div>
    <div className="verification-boxes" aria-label="Email verification code">
      {digits.map((digit, index) => <input
        key={index}
        ref={(node) => { refs.current[index] = node; }}
        aria-label={`Digit ${index + 1}`}
        className={`h-[80px] w-[60px] rounded-md border bg-transparent text-center text-[30px] font-black ${invalid || expired ? 'code-error' : ''}`}
        inputMode="numeric"
        maxLength="1"
        value={digit}
        onChange={(event) => updateDigit(index, event.target.value)}
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
        <button className="h-[40px] w-full rounded-md bg-[#ff5a00] text-[16px] font-semibold text-white primary-prohub-button" type="button" onClick={onContinue}>Verify and continue</button>
        <button className="h-[40px] w-full rounded-md border border-[#ff5a00] text-[16px] font-medium text-[#ff5a00] outline-prohub-button" type="button" disabled={cooldown > 0} onClick={() => setCooldown(30)}>{cooldown > 0 ? `Resend code in ${cooldown}s` : 'Resend code'}</button>
      </div>
      <div className="verify-state-actions">
        <button type="button" onClick={() => setStatus('invalid')}>Show invalid state</button>
        <button type="button" onClick={() => setStatus('expired')}>Show expired state</button>
      </div>
    </div>
  </div>;
}

function SubscriptionModal({ flow, onClose, onContinue }) {
  const plans = flow === 'coach' ? organizationPlans : playerParentPlans;
  return <div className="relative flex min-h-screen items-center justify-center bg-black auth-modal" role="dialog" aria-modal="true" aria-label="Subscription and license">
    <div className="auth-modal-card billing-modal-card">
      <button className="modal-close" type="button" aria-label="Close modal" onClick={onClose}>×</button>
      <div className="modal-dashed-section billing-header"><p className="modal-kicker">Subscription / license</p><h2>{flow === 'coach' ? 'Choose an organization license' : 'Choose a parent or player plan'}</h2><p>Organization tiers stay separate from parent and player tiers.</p></div>
      <div className="billing-card-grid">{plans.map((plan) => <article className="billing-card" key={plan.id}><p className="billing-audience">{plan.audience}</p><h3>{plan.name}</h3><p className="billing-price"><strong>{plan.price}</strong>{plan.cadence && <span>{plan.cadence}</span>}</p><small>{plan.description}</small><button className="outline-prohub-button" type="button">Select</button></article>)}</div>
      <button className="primary-prohub-button billing-continue" type="button" onClick={onContinue}>Continue to workspace</button>
    </div>
  </div>;
}

export default function ProHubAuthPrototype({ initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode);
  const [flow, setFlow] = useState('player');
  const [showVerify, setShowVerify] = useState(false);
  const [showBilling, setShowBilling] = useState(false);
  const navigate = useNavigate();
  const selected = useMemo(() => flows.find((item) => item.id === flow) || flows[0], [flow]);
  const isSignup = mode === 'signup';
  const isInvitedCoach = flow === 'invited-coach';

  function handleSubmit(event) {
    event.preventDefault();
    if (isSignup) setShowVerify(true);
    else navigate(selected.path);
  }

  function finishVerification() {
    setShowVerify(false);
    if (isInvitedCoach) navigate(selected.path);
    else setShowBilling(true);
  }

  return <main className="min-h-screen bg-white font-['Poppins',system-ui,sans-serif text-neutral-950 prohub-auth-shell">
    <div className="flex min-h-screen prohub-auth-split">
      <AuthBrandPanel />
      <section className="relative flex min-h-screen flex-1 items-center justify-center overflow-hidden px-8 prohub-right-panel" aria-label="Authentication form">
        <img className="right-stadium-watermark" src={stadiumImage} alt="" aria-hidden="true" />
        <div className="relative z-10 w-full max-w-[490px] prohub-form-wrapper">
          <div className="auth-card-header"><p className="modal-kicker">{isSignup ? 'Create your account' : 'Welcome back'}</p><h2>{isSignup ? 'Start with ProHub.' : 'Log in to ProHub.'}</h2><p>{selected.headline}</p></div>
          <div className="auth-mode-toggle" role="tablist" aria-label="Authentication mode"><button className={mode === 'login' ? 'active' : ''} type="button" onClick={() => setMode('login')}>Login</button><button className={mode === 'signup' ? 'active' : ''} type="button" onClick={() => setMode('signup')}>Sign up</button></div>
          <div className="prohub-flow-selector" aria-label="Select onboarding flow">{flows.map((item) => <button key={item.id} className={flow === item.id ? 'active' : ''} type="button" onClick={() => setFlow(item.id)}>{item.label}</button>)}</div>
          <form className="prohub-auth-fields" onSubmit={handleSubmit}>{isSignup && <AuthInput id="full-name" icon="◎" label="Full name" type="text" placeholder="Jordan Rivera" required />}<AuthInput id="email" icon="✉" label="Email address" type="email" placeholder="you@prohub.com" required /><AuthInput id="password" icon="◐" label="Password" type="password" placeholder="••••••••" required />{isInvitedCoach && <AuthInput id="invite" icon="⌁" label="Organization invite code" type="text" placeholder="PROHUB-COACH-INVITE" required />}<div className="auth-options-row"><label className="check"><input type="checkbox" /> <span>Remember me</span></label><Link to="/forgot-password">Forgot password?</Link></div><button className="h-[40px] w-full rounded-md bg-[#ff5a00] text-[16px] font-semibold text-white primary-prohub-button" type="submit">{isSignup ? 'Continue' : `Log in as ${selected.label}`}</button>{!isSignup && <button className="h-[40px] w-full rounded-md border border-[#ff5a00] text-[16px] font-medium text-[#ff5a00] outline-prohub-button" type="button" onClick={() => setMode('signup')}>Create account</button>}</form>
          {isSignup && isInvitedCoach && <div className="invite-note">Coach invited by an organization will not see pricing tiers.</div>}
        </div>
      </section>
    </div>
    <div className="secure-login-badge">Secure encrypted login</div><a className="support-link" href="mailto:support@prohub.com">Contact Support</a>
    {showVerify && <EmailVerificationModal onClose={() => setShowVerify(false)} onContinue={finishVerification} />}
    {showBilling && <SubscriptionModal flow={flow} onClose={() => setShowBilling(false)} onContinue={() => navigate(selected.path)} />}
  </main>;
}
