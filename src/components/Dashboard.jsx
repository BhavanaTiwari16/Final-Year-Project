import DoctorPanel from "./DoctorPanel";

const STAGE_META = {
  trying: { label: "Trying to Conceive",       emoji: "🌱", color: "green",  tip: "Take care of your wellbeing — rest, nourish, and be kind to yourself during this hopeful time." },
  t1:     { label: "First Trimester",           emoji: "🌸", color: "pink",   tip: "The first trimester can feel overwhelming. You're not alone — we're here for every step." },
  t2:     { label: "Second Trimester",          emoji: "🌺", color: "blush",  tip: "Many women feel more energised now. A great time to focus on your mental and physical health." },
  t3:     { label: "Third Trimester",           emoji: "🌻", color: "earth",  tip: "You're almost there! Rest when you can and lean on your support system." },
  post1:  { label: "Postpartum (0–6 months)",   emoji: "👶", color: "sage",   tip: "The fourth trimester is real. Your feelings are valid — please reach out if you need support." },
  post2:  { label: "Postpartum (6–12 months)",  emoji: "💚", color: "green",  tip: "You've come so far. Keep nurturing yourself as you continue this incredible journey." },
};

export default function Dashboard({ user, onLogout }) {
  const stage = STAGE_META[user?.stage] || null;
  const firstName = user?.firstName || user?.email?.split("@")[0] || "there";

  return (
    <section className="dashboard-section" id="dashboard">
      <div className="dashboard-inner">

        {/* Welcome header */}
        <div className="dashboard-header">
          <div className="dashboard-avatar">
            {firstName.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="dashboard-welcome-label">Welcome back</p>
            <h2 className="dashboard-welcome-name">
              {user?.firstName && user?.lastName
                ? `${user.firstName} ${user.lastName}`
                : firstName}
            </h2>
          </div>
          <button className="btn-signout" onClick={onLogout}>Sign out</button>
        </div>

        {/* Cards row */}
        <div className="dashboard-cards">

          {/* Stage card */}
          {stage && (
            <div className={`dash-card dash-card--stage dash-card--${stage.color}`}>
              <div className="dash-card-emoji">{stage.emoji}</div>
              <p className="dash-card-label">Your stage</p>
              <h3 className="dash-card-value">{stage.label}</h3>
              <p className="dash-card-tip">{stage.tip}</p>
            </div>
          )}

          {/* Profile details card */}
          <div className="dash-card dash-card--profile">
            <p className="dash-card-label">Profile details</p>
            <ul className="dash-detail-list">
              <li>
                <span className="dash-detail-key">Email</span>
                <span className="dash-detail-val">{user?.email || "—"}</span>
              </li>
              {user?.firstName && (
                <li>
                  <span className="dash-detail-key">Name</span>
                  <span className="dash-detail-val">{user.firstName} {user.lastName}</span>
                </li>
              )}
              {user?.ph_no && (
                <li>
                  <span className="dash-detail-key">Phone</span>
                  <span className="dash-detail-val">{user.ph_no}</span>
                </li>
              )}
              <li>
                <span className="dash-detail-key">Role</span>
                <span className="dash-detail-val dash-role-badge">{user?.role || "USER"}</span>
              </li>
            </ul>
          </div>

          {/* Self-help AI card */}
          <div className="dash-card dash-card--coming">
            <div className="dash-card-emoji">🤝</div>
            <p className="dash-card-label">Self-help</p>
            <h3 className="dash-card-value">AI Companion</h3>
            <p className="dash-card-tip">Talk to your personalised perinatal mental health companion whenever you need support.</p>
            <a
              href="https://chatbot-app-ttcl.onrender.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="dash-companion-btn"
            >
              Open Self-help →
            </a>
          </div>

        </div>

        {/* Doctor blog management — only visible to AUTHOR / DOCTOR role */}
        {(user?.role === "AUTHOR" || user?.role === "DOCTOR") && (
          <DoctorPanel user={user} />
        )}

      </div>
    </section>
  );
}
