export default function Navbar({ user, onLogout }) {
  const firstName = user?.firstName || user?.email?.split("@")[0] || null;

  return (
    <nav>
      <div className="logo">Sere<span>nova</span></div>

      <div className="nav-links">
        <a href="#features">Features</a>
        <a href="#how">How it works</a>
        <a href="#blogs">Blogs</a>

        {firstName ? (
          <>
            <span className="nav-user-name">Hi, {firstName}</span>
            <button className="nav-signout-btn" onClick={onLogout}>Sign out</button>
          </>
        ) : (
          <a href="#auth" className="nav-cta">Get Started</a>
        )}
      </div>
    </nav>
  );
}
