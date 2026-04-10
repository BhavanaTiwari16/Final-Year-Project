import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Auth from "./components/Auth";
import Footer from "./components/Footer";
import PrivacyBanner from "./components/PrivacyBanner"

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Auth />
      <PrivacyBanner />
      <Footer />
    </>
  );
}