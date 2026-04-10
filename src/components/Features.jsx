export default function Features() {
  return (
    <section className="section" id="features">
      <div className="section-label">What we offer</div>

      <h2 className="section-title">
        Designed with <em>your wellbeing</em><br />
        at the center
      </h2>

      <p className="section-sub">
        Serenova combines clinical insight with compassionate AI to offer continuous, private support through pregnancy and postpartum life.
      </p>

      <div className="features-grid">

        <div className="feat-card">
          <div className="feat-icon green">🧠</div>
          <h4>AI-Powered Screening</h4>
          <p>
            Ongoing, conversational assessment using validated tools like Edinburgh Postnatal Depression Scale — without clinical forms that feel cold or transactional.
          </p>
        </div>

        <div className="feat-card">
          <div className="feat-icon pink">💬</div>
          <h4>24/7 Emotional Support</h4>
          <p>
            A compassionate AI companion available at 3am or 3pm — whenever you need to talk, reflect, or just feel heard during vulnerable moments.
          </p>
        </div>

        <div className="feat-card">
          <div className="feat-icon cream">🔐</div>
          <h4>Decentralized Privacy</h4>
          <p>
            Your health data stays yours. Built on a decentralized architecture ensuring no single entity holds your sensitive maternal health records.
          </p>
        </div>

        <div className="feat-card">
          <div className="feat-icon pink">📊</div>
          <h4>Mood & Symptom Tracking</h4>
          <p>
            Gentle daily check-ins that build a picture of your emotional journey over time — shareable with your OB, midwife, or therapist when you choose.
          </p>
        </div>

        <div className="feat-card">
          <div className="feat-icon green">🌿</div>
          <h4>Guided CBT Exercises</h4>
          <p>
            Evidence-based cognitive-behavioural therapy exercises adapted for perinatal mothers — breathing, grounding, sleep hygiene, and more.
          </p>
        </div>

        <div className="feat-card">
          <div className="feat-icon cream">👩‍⚕️</div>
          <h4>Care Team Bridge</h4>
          <p>
            Seamlessly connect your insights with your healthcare provider. Share summaries with a single tap and escalate concerns safely when needed.
          </p>
        </div>

      </div>
    </section>
  );
}