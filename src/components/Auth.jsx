export default function Auth() {
  return (
    <section className="auth-section" id="auth">
      <div className="auth-info">
        <div className="hero-tag">Safe & Secure</div>

        <h2>
          Your safe space<br />
          starts <em>right here</em>
        </h2>

        <p>
          Join thousands of mothers who are finding relief, connection, and hope through compassionate AI-driven support. Your data is encrypted and always yours.
        </p>

        <ul className="trust-list">
          <li>End-to-end encrypted health data with decentralized storage</li>
          <li>Clinically informed AI trained on perinatal depression research</li>
          <li>Anonymous — no data sold or shared without explicit consent</li>
          <li>Built in partnership with mental health professionals</li>
          <li>Available in multiple Indian regional languages</li>
        </ul>
      </div>

      <div className="auth-form-card">
        <div className="tab-row">
          <button className="tab active" onClick={(e) => window.switchTab('login', e.target)}>
            Sign In
          </button>
          <button className="tab" onClick={(e) => window.switchTab('register', e.target)}>
            Create Account
          </button>
        </div>

        {/* LOGIN */}
        <div className="form-panel active" id="panel-login">
          <div className="form-group">
            <label>EMAIL ADDRESS</label>
            <input id="login-email" type="email" placeholder="you@example.com" />
          </div>

          <div className="form-group">
            <label>PASSWORD</label>
            <input id="login-password" type="password" placeholder="Enter your password" />
          </div>

          <div className="form-note" style={{ marginBottom: "8px" }}>
            <a href="#">Forgot your password?</a> · We'll send a reset link to your email.
          </div>

          <button className="btn-submit" onClick={() => window.handleLogin()}>
            Sign In to Serenova
          </button>

          <div className="divider">or</div>

          <div className="form-note" style={{ textAlign: "center" }}>
            New here?{" "}
            <a href="#" onClick={() => window.switchTabByName('register')}>
              Create your free account →
            </a>
          </div>
        </div>

        {/* REGISTER */}
        <div className="form-panel" id="panel-register">
          <div className="form-row">
            <div className="form-group">
              <label>FIRST NAME</label>
              <input id="reg-firstname" type="text" placeholder="Priya" />
            </div>

            <div className="form-group">
              <label>LAST NAME</label>
              <input id="reg-lastname" type="text" placeholder="Sharma" />
            </div>
          </div>

          <div className="form-group">
            <label>EMAIL ADDRESS</label>
            <input id="reg-email" type="email" placeholder="you@example.com" />
          </div>

          <div className="form-group">
            <label>WHERE ARE YOU IN YOUR JOURNEY?</label>
            <select id="reg-stage">
              <option value="">Select your current stage</option>
              <option>Trying to conceive</option>
              <option>First trimester (1–12 weeks)</option>
              <option>Second trimester (13–26 weeks)</option>
              <option>Third trimester (27–40 weeks)</option>
              <option>Postpartum (0–6 months)</option>
              <option>Postpartum (6–12 months)</option>
              <option>Partner / family member seeking info</option>
            </select>
          </div>

          <div className="form-group">
            <label>CREATE A PASSWORD</label>
            <input id="reg-password" type="password" placeholder="At least 8 characters" />
          </div>

          <div className="form-note" style={{ marginBottom: "12px" }}>
            By creating an account, you agree to our <a href="#">Privacy Policy</a> and{" "}
            <a href="#">Terms of Service</a>. Your health data is protected by our decentralized architecture.
          </div>

          <button className="btn-submit" onClick={() => window.handleRegister()}>
            Begin My Journey 🌸
          </button>
        </div>
      </div>
    </section>
  );
}