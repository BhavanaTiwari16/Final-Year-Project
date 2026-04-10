export default function Hero() {
  const scrollTo = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero">
      <div className="hero-text">
        <div className="hero-tag">Perinatal Mental Health Companion</div>

        <h1>
          You deserve <em>gentle</em><br />
          support through every<br />
          stage of motherhood
        </h1>

        <p>
          AI-driven companion for perinatal mental health — private, compassionate, always available.
        </p>

        <div className="hero-btns">
          <button className="btn-primary" onClick={() => scrollTo("auth")}>
            Begin Your Journey
          </button>
          <button className="btn-secondary" onClick={() => scrollTo("how")}>
            How it works
          </button>
        </div>
      </div>
    </section>
  );
}