import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import Blogs from "./components/Blogs";
import Footer from "./components/Footer";
import PrivacyBanner from "./components/PrivacyBanner";

function parseToken(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 > Date.now() ? payload : null;
  } catch {
    return null;
  }
}

export default function App() {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return null;
    const payload = parseToken(token);
    if (!payload) { localStorage.removeItem("access_token"); localStorage.removeItem("refresh_token"); return null; }
    // Merge stored user profile if available
    try {
      const stored = JSON.parse(localStorage.getItem("user_profile") || "{}");
      return { ...payload, ...stored };
    } catch { return payload; }
  });

  const handleLogin = (userData) => {
    const profile = userData || {};
    localStorage.setItem("user_profile", JSON.stringify(profile));
    setUser(profile);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_profile");
    setUser(null);
  };

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />
      <Hero />
      <Features />
      <HowItWorks />
      <Blogs />
      {user !== null
        ? <Dashboard user={user} onLogout={handleLogout} />
        : <Auth onLogin={handleLogin} />
      }
      <PrivacyBanner />
      <Footer />
    </>
  );
}
