export default function Navbar() {
  return (
    <nav>
      <div className="logo">Sere<span>nova</span></div>

      <div className="nav-links">
        <a href="#features">Features</a>
        <a href="#how">How it works</a>
        <a href="#about">About</a>
        <a href="#auth" className="nav-cta">Get Started</a>
      </div>
    </nav>
  );
}