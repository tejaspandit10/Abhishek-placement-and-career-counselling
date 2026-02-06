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

/* ---------------- Scroll Fix ---------------- */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

/* ---------------- About ---------------- */
const AboutPage = () => (
  <div className="pt-32 max-w-5xl mx-auto py-20 px-4">
    <div className="text-center mb-16">
      <h1 className="text-4xl md:text-5xl font-black text-[#003366] mb-4 uppercase">
        About APCC
      </h1>
      <div className="w-24 h-1 bg-cyan-500 mx-auto" />
    </div>

    <div className="space-y-12 text-lg text-slate-700 leading-relaxed">
      <section className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-[#003366] mb-6 border-l-4 border-cyan-500 pl-4 uppercase">
          Our Background
        </h2>
        <p className="mb-6">{BUSINESS_DETAILS.description}</p>
        <p>{BUSINESS_DETAILS.howWeHelp}</p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#003366] p-10 rounded-3xl text-white shadow-xl">
          <h2 className="text-2xl font-bold mb-6 text-cyan-400 uppercase">
            Our Vision
          </h2>
          <p className="text-blue-50 leading-relaxed">
            {BUSINESS_DETAILS.vision}
          </p>
        </div>

        <div className="bg-cyan-50 p-10 rounded-3xl border border-cyan-100 shadow-sm">
          <h2 className="text-2xl font-bold text-[#003366] mb-6 uppercase">
            Why Choose Us?
          </h2>
          <ul className="space-y-4 text-sm font-medium">
            {[
              "Personalized career mapping for every student.",
              "Direct connections with industry-leading corporations.",
              "Continuous support until successful job placement.",
              "Transparent and result-oriented processes.",
            ].map((text, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-cyan-600 font-bold">✓</span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  </div>
);

/* ---------------- Services ---------------- */
const ServicesPage = () => (
  <div id="services" className="pt-32 max-w-7xl mx-auto py-20 px-4">
    <div className="text-center mb-16">
      <h1 className="text-4xl font-black text-[#003366] mb-4 uppercase">
        Our Comprehensive Services
      </h1>
      <div className="w-24 h-1 bg-cyan-500 mx-auto" />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        [
          "Career Guidance & Counselling",
          "Expert counselling to find your true professional calling.",
        ],
        [
          "Job Placement Services",
          "Verified job openings in Private and Public sectors.",
        ],
        [
          "Resume Building",
          "Professional resumes that bypass ATS filters and grab attention.",
        ],
        [
          "Skill Development",
          "Practical training modules to make you industry-ready.",
        ],
        [
          "Campus Drives",
          "Organizing placement events for educational institutions.",
        ],
        [
          "Bulk Recruitment",
          "High-volume hiring solutions for growing businesses.",
        ],
      ].map(([title, desc], i) => (
        <div
          key={i}
          className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:border-cyan-500 transition-all hover:shadow-lg"
        >
          <h3 className="text-xl font-bold text-[#003366] mb-3">{title}</h3>
          <p className="text-slate-600 text-sm">{desc}</p>
        </div>
      ))}
    </div>
  </div>
);

/* ---------------- Footer ---------------- */
const Footer = () => (
  <footer className="bg-blue-950 text-blue-100 py-20 no-print">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-16">
      <div>
        <Logo light className="h-14 mb-8" hideText={false} />
        <p className="text-sm text-blue-200">
          Building successful careers and empowering professionals across India
          since our inception. Your growth is our legacy.
        </p>
      </div>

      <div>
        <h4 className="text-white font-bold mb-8 uppercase text-sm tracking-widest">
          Quick Links
        </h4>
        <ul className="space-y-4 text-sm font-medium">
          <li>
            <Link to="/" className="hover:text-cyan-400">
              Home
            </Link>
          </li>
          <li>
            <Link to="/services" className="hover:text-cyan-400">
              Services
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-cyan-400">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-cyan-400">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/terms" className="hover:text-cyan-400">
              Terms
            </Link>
          </li>
          <li>
            <Link to="/privacy" className="hover:text-cyan-400">
              Privacy
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <h4 className="text-white font-bold mb-8 uppercase text-sm tracking-widest">
          Connect
        </h4>
        <ul className="space-y-4 text-sm">
          <li>{BUSINESS_DETAILS.address}</li>
          <li>{BUSINESS_DETAILS.phone1}</li>
          <li>{BUSINESS_DETAILS.email}</li>
          <li className="pt-4">
            <Link
              to="/apply"
              className="bg-cyan-500 px-6 py-3 rounded-xl font-bold"
            >
              Apply Now
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </footer>
);

/* ---------------- App ---------------- */
const App: React.FC = () => (
  <Router>
    <ScrollToTop />
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

export default App;
