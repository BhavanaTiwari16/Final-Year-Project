export default function Footer() {
  return (
    <>
      <footer>
        <div className="footer-brand">
          <div className="logo">
            Sere<span>nova</span>
          </div>
          <p>
            A compassionate AI companion for mothers navigating perinatal depression — because every mother deserves to be heard.
          </p>
        </div>

        <div className="footer-links">
          <a href="#">About</a>
          <a href="#">Research</a>
          <a href="#">Privacy</a>
          <a href="#">Crisis Support</a>
          <a href="#">Contact</a>
        </div>
      </footer>

      <div
        className="footer-bottom"
        style={{
          background: "var(--sage-pale)",
          padding: "16px 80px",
          fontSize: ".73rem",
          color: "var(--text-lt)"
        }}
      >
        © 2025 Serenova — Authentication PoC · Built with compassion for maternal mental health research ·{" "}
        <strong>Crisis Helpline: iCall 9152987821</strong>
      </div>
    </>
  );
}