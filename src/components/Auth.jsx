import { useState } from "react";
import { signUp, verify, register, login } from "../api/auth";

export default function Auth({ onLogin }) {
  const [activeTab, setActiveTab] = useState("login");

  // Register flow
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    role: "USER",
    stage: "",
    password: "",
    ph_no: "",
  });

  // Login form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const clearMessages = () => { setError(""); setSuccess(""); };
  const isDoctor = form.role === "AUTHOR" || form.role === "DOCTOR";

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setStep(1);
    setEmail(""); setOtp("");
    setForm({ firstName: "", lastName: "", role: "USER", stage: "", password: "", ph_no: "" });
    setLoginEmail(""); setLoginPassword("");
    clearMessages();
  };

  const setField = (k, v) => setForm(f => ({ ...f, [k]: v }));

  // ── REGISTER STEPS ──

  const sendOtp = async () => {
    if (!email) { setError("Please enter your email address."); return; }
    clearMessages();
    setLoading(true);
    try {
      await signUp({ email });
      setSuccess("OTP sent! Check your inbox.");
      setStep(2);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp) { setError("Please enter the OTP."); return; }
    clearMessages();
    setLoading(true);
    try {
      const res = await verify({ email, otp });
      localStorage.setItem("access_token", res.data.data.access_token);
      setSuccess("Email verified!");
      setStep(3);
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const completeRegistration = async () => {
    const { firstName, lastName, role, stage, password, ph_no } = form;
    if (!firstName || !lastName || !password || !ph_no) {
      setError("Please fill in all required fields.");
      return;
    }
    if (role === "USER" && !stage) {
      setError("Please select your pregnancy stage.");
      return;
    }
    clearMessages();
    setLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      const payload = { email, firstName, lastName, role, password, ph_no };
      if (role === "USER") payload.stage = stage;

      const res = await register(payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess(isDoctor ? "Doctor account created! You can now publish articles." : "Welcome to Serenova!");
      onLogin({ email, ...form, ...res.data.data });
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── LOGIN ──

  const handleLogin = async () => {
    if (!loginEmail || !loginPassword) { setError("Please enter your email and password."); return; }
    clearMessages();
    setLoading(true);
    try {
      const res = await login({ email: loginEmail, password: loginPassword });
      localStorage.setItem("access_token", res.data.data.access_token);
      localStorage.setItem("refresh_token", res.data.data.refresh_token);
      setSuccess("Welcome back!");
      onLogin(res.data.data.user || { email: loginEmail });
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const stepLabels = ["Email", "Verify", "Profile"];

  return (
    <section className="auth-section" id="auth">

      {/* Left info panel */}
      <div className="auth-info">
        <div className="hero-tag">Your safe space</div>
        <h2>Begin your <em>journey</em> with Serenova</h2>
        <p>
          A compassionate companion for every stage of your motherhood journey —
          from trying to conceive through postpartum recovery.
        </p>
        <ul className="trust-list">
          <li>Personalised AI support based on your stage</li>
          <li>Private, secure and judgment-free</li>
          <li>Evidence-based perinatal mental health guidance</li>
          <li>Available whenever you need it, day or night</li>
        </ul>
      </div>

      {/* Right form card */}
      <div className="auth-form-card">

        {/* Tabs */}
        <div className="tab-row">
          <button className={`tab ${activeTab === "login" ? "active" : ""}`} onClick={() => handleTabSwitch("login")}>
            Sign In
          </button>
          <button className={`tab ${activeTab === "register" ? "active" : ""}`} onClick={() => handleTabSwitch("register")}>
            Create Account
          </button>
        </div>

        {/* Feedback */}
        {error   && <div className="auth-alert auth-alert--error">{error}</div>}
        {success && <div className="auth-alert auth-alert--success">{success}</div>}

        {/* ── LOGIN ── */}
        {activeTab === "login" && (
          <div className="form-panel active">
            <div className="form-group">
              <label>Email address</label>
              <input type="email" placeholder="you@example.com" value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleLogin()} />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Your password" value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleLogin()} />
            </div>
            <button className="btn-submit" onClick={handleLogin} disabled={loading}>
              {loading ? <span className="btn-spinner" /> : "Sign In"}
            </button>
            <p className="form-note" style={{ textAlign: "center", marginTop: "16px" }}>
              Don't have an account?{" "}
              <a href="#auth" onClick={() => handleTabSwitch("register")}>Create one</a>
            </p>
          </div>
        )}

        {/* ── REGISTER ── */}
        {activeTab === "register" && (
          <div className="form-panel active">

            {/* Step indicator */}
            <div className="step-indicator">
              {stepLabels.map((label, i) => (
                <div key={i} className={`step-dot-wrap ${step === i + 1 ? "active" : step > i + 1 ? "done" : ""}`}>
                  <div className="step-dot">{step > i + 1 ? "✓" : i + 1}</div>
                  <span className="step-dot-label">{label}</span>
                  {i < 2 && <div className="step-line" />}
                </div>
              ))}
            </div>

            {/* Step 1 — Email */}
            {step === 1 && (
              <>
                <div className="form-group">
                  <label>Email address</label>
                  <input type="email" placeholder="you@example.com" value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && sendOtp()} />
                  <p className="form-note">We'll send a one-time code to verify your email.</p>
                </div>
                <button className="btn-submit" onClick={sendOtp} disabled={loading}>
                  {loading ? <span className="btn-spinner" /> : "Send OTP →"}
                </button>
              </>
            )}

            {/* Step 2 — OTP */}
            {step === 2 && (
              <>
                <p className="auth-step-hint">Enter the 6-digit code sent to <strong>{email}</strong></p>
                <div className="form-group">
                  <label>One-time password</label>
                  <input type="text" placeholder="123456" value={otp} maxLength={6}
                    onChange={e => setOtp(e.target.value.replace(/\D/, ""))}
                    onKeyDown={e => e.key === "Enter" && verifyOtp()} />
                </div>
                <button className="btn-submit" onClick={verifyOtp} disabled={loading}>
                  {loading ? <span className="btn-spinner" /> : "Verify →"}
                </button>
                <p className="form-note" style={{ textAlign: "center", marginTop: "12px" }}>
                  Didn't receive it?{" "}
                  <a href="#auth" onClick={e => { e.preventDefault(); sendOtp(); }}>Resend OTP</a>
                </p>
                <button className="btn-back" onClick={() => { setStep(1); clearMessages(); }}>← Back</button>
              </>
            )}

            {/* Step 3 — Profile */}
            {step === 3 && (
              <>
                {/* Role toggle — first thing user picks */}
                <div className="form-group">
                  <label>I am registering as</label>
                  <div className="role-toggle">
                    <button
                      type="button"
                      className={`role-toggle-btn ${form.role === "USER" ? "active" : ""}`}
                      onClick={() => setField("role", "USER")}
                    >
                      🌸 Patient
                    </button>
                    <button
                      type="button"
                      className={`role-toggle-btn ${isDoctor ? "active" : ""}`}
                      onClick={() => setField("role", "AUTHOR")}
                    >
                      🩺 Doctor / Author
                    </button>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>First name</label>
                    <input placeholder={isDoctor ? "Dr. Sarah" : "Sarah"} value={form.firstName}
                      onChange={e => setField("firstName", e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Last name</label>
                    <input placeholder="Johnson" value={form.lastName}
                      onChange={e => setField("lastName", e.target.value)} />
                  </div>
                </div>

                <div className="form-group">
                  <label>Phone number</label>
                  <input placeholder="10-digit number" value={form.ph_no} maxLength={10}
                    onChange={e => setField("ph_no", e.target.value.replace(/\D/, ""))} />
                </div>

                {/* Stage — only for patients */}
                {!isDoctor && (
                  <div className="form-group">
                    <label>Your current stage</label>
                    <select value={form.stage} onChange={e => setField("stage", e.target.value)}>
                      <option value="">Select your stage</option>
                      <option value="trying">Trying to conceive</option>
                      <option value="t1">First trimester</option>
                      <option value="t2">Second trimester</option>
                      <option value="t3">Third trimester</option>
                      <option value="post1">Postpartum (0–6 months)</option>
                      <option value="post2">Postpartum (6–12 months)</option>
                    </select>
                  </div>
                )}

                <div className="form-group">
                  <label>Password</label>
                  <input type="password" placeholder="At least 6 characters" value={form.password}
                    onChange={e => setField("password", e.target.value)} />
                </div>

                <button className="btn-submit" onClick={completeRegistration} disabled={loading}>
                  {loading
                    ? <span className="btn-spinner" />
                    : isDoctor ? "Create Doctor Account 🩺" : "Complete Registration 🌸"}
                </button>
              </>
            )}

          </div>
        )}
      </div>
    </section>
  );
}
