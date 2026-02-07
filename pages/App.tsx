import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

import { Navbar } from "../components/Navbar";
import { Logo } from "../components/Logo";

import { Home } from "./Home";
import { ApplyForm } from "./ApplyForm";
import { Payment } from "./Payment";
import { Confirmation } from "./Confirmation";
import { Contact } from "./Contact";
import { AdminDashboard } from "./AdminDashboard";
import { TermsPage } from "./Terms";
import { PrivacyPage } from "./Privacy";

import { BUSINESS_DETAILS } from "../constants";

/* ---------------- Scroll + Route Debug ---------------- */
const ScrollToTopAndDebug = () => {
  const location = useLocation();

  useEffect(() => {
    console.log("🔁 ROUTE CHANGED TO:", location.pathname);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
};

/* ---------------- About ---------------- */
const AboutPage = () => (
  <div className="pt-32 max-w-5xl mx-auto py-20 px-4">
    <h1 className="text-4xl font-bold text-center">About APCC</h1>
  </div>
);

/* ---------------- Services ---------------- */
const ServicesPage = () => (
  <div className="pt-32 max-w-5xl mx-auto py-20 px-4">
    <h1 className="text-4xl font-bold text-center">Services</h1>
  </div>
);

/* ---------------- Footer ---------------- */
const Footer = () => (
  <footer className="bg-blue-950 text-blue-100 py-20">
    <div className="max-w-7xl mx-auto px-4">
      <Logo light className="h-14 mb-8" hideText={false} />
      <p className="text-sm">{BUSINESS_DETAILS.address}</p>
    </div>
  </footer>
);

/* ---------------- App ---------------- */
const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTopAndDebug />

      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/apply" element={<ApplyForm />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
