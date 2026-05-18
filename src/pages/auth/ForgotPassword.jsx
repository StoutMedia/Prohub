import { Link } from 'react-router-dom';
import stadiumImage from '../../assets/prohub-stadium.svg';

export default function ForgotPassword() {
  return <main className="min-h-screen bg-white font-['Poppins',system-ui,sans-serif text-neutral-950 prohub-auth-shell">
    <div className="flex min-h-screen prohub-auth-split">
      <section className="relative hidden min-h-screen w-[49.4%] overflow-hidden lg:block prohub-left-panel" aria-label="ProHub password reset introduction">
        <img className="prohub-stadium-image" src={stadiumImage} alt="Soccer stadium lights" />
        <div className="prohub-stadium-overlay" />
        <div className="prohub-wordmark"><span>PROHUB</span></div>
        <div className="prohub-hero-copy">
          <h1>PROHUB</h1>
          <h2>Build. Train. Perform</h2>
          <p>Reset your password and return to the same player, parent, coach, or organization workspace.</p>
        </div>
      </section>
      <section className="relative flex min-h-screen flex-1 items-center justify-center overflow-hidden px-8 prohub-right-panel" aria-label="Password reset form">
        <img className="right-stadium-watermark" src={stadiumImage} alt="" aria-hidden="true" />
        <div className="relative z-10 w-full max-w-[490px] prohub-form-wrapper">
          <div className="auth-card-header">
            <p className="modal-kicker">Account recovery</p>
            <h2>Reset password.</h2>
            <p>Enter your email and we will prepare a secure reset flow when backend auth is connected.</p>
          </div>
          <form className="prohub-auth-fields">
            <label className="prohub-field" htmlFor="reset-email">
              <span>Email address</span>
              <span className="prohub-input-wrap"><input id="reset-email" type="email" placeholder="you@prohub.com" /><span className="prohub-field-icon" aria-hidden="true">✉</span></span>
            </label>
            <Link className="primary-prohub-button" to="/login">Back to login</Link>
          </form>
        </div>
      </section>
    </div>
    <div className="secure-login-badge">Secure encrypted login</div>
    <a className="support-link" href="mailto:support@prohub.com">Contact Support</a>
  </main>;
}
