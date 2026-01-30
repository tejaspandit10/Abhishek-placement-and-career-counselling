
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { ApplyForm } from './pages/ApplyForm';
import { Payment } from './pages/Payment';
import { Confirmation } from './pages/Confirmation';
import { Contact } from './pages/Contact';
import { AdminDashboard } from './pages/AdminDashboard';
import { TermsPage } from './pages/Terms';
import { PrivacyPage } from './pages/Privacy';
import { Logo } from './components/Logo';
import { BUSINESS_DETAILS } from './constants';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AboutPage = () => (
  <div className="pt-32 max-w-5xl mx-auto py-20 px-4">
    <div className="text-center mb-16">
      <h1 className="text-4xl md:text-5xl font-black text-[#003366] mb-4 uppercase">About APCC</h1>
      <div className="w-24 h-1 bg-cyan-500 mx-auto"></div>
    </div>
    
    <div className="space-y-12 text-lg text-slate-700 leading-relaxed">
      <section className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-[#003366] mb-6 border-l-4 border-cyan-500 pl-4 uppercase">Our Background</h2>
        <p className="mb-6">{BUSINESS_DETAILS.description}</p>
        <p>{BUSINESS_DETAILS.howWeHelp}</p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#003366] p-10 rounded-3xl text-white shadow-xl">
          <h2 className="text-2xl font-bold mb-6 text-cyan-400 uppercase">Our Vision</h2>
          <p className="text-blue-50 leading-relaxed">{BUSINESS_DETAILS.vision}</p>
        </div>
        <div className="bg-cyan-50 p-10 rounded-3xl border border-cyan-100 shadow-sm">
          <h2 className="text-2xl font-bold text-[#003366] mb-6 uppercase">Why Choose Us?</h2>
          <ul className="space-y-4 text-sm font-medium">
            <li className="flex items-start gap-3">
              <span className="text-cyan-600 font-bold">✓</span>
              <span>Personalized career mapping for every student.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-600 font-bold">✓</span>
              <span>Direct connections with industry-leading corporations.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-600 font-bold">✓</span>
              <span>Continuous support until successful job placement.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-600 font-bold">✓</span>
              <span>Transparent and result-oriented processes.</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </div>
);

const ServicesPage = () => (
  <div className="pt-32 max-w-7xl mx-auto py-20 px-4">
    <div className="text-center mb-16">
      <h1 className="text-4xl font-black text-[#003366] mb-4 uppercase">Our Comprehensive Services</h1>
      <div className="w-24 h-1 bg-cyan-500 mx-auto"></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        { title: 'Career Guidance & Counselling', desc: 'Expert counselling to find your true professional calling.' },
        { title: 'Job Placement Services', desc: 'Verified job openings in Private and Public sectors.' },
        { title: 'Resume Building', desc: 'Professional resumes that bypass ATS filters and grab attention.' },
        { title: 'Skill Development', desc: 'Practical training modules to make you industry-ready.' },
        { title: 'Campus Drives', desc: 'Organizing placement events for educational institutions.' },
        { title: 'Bulk Recruitment', desc: 'High-volume hiring solutions for growing businesses.' }
      ].map((s, i) => (
        <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:border-cyan-500 transition-all hover:shadow-lg">
          <h3 className="text-xl font-bold text-[#003366] mb-3">{s.title}</h3>
          <p className="text-slate-600 text-sm">{s.desc}</p>
        </div>
      ))}
    </div>
  </div>
);

const Footer = () => (
  <footer className="bg-blue-950 text-blue-100 py-20 no-print">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-16 text-left">
      <div className="col-span-1">
        <Logo light className="h-14 mb-8" hideText={false} />
        <p className="text-sm leading-relaxed mb-8 text-blue-200">Building successful careers and empowering professionals across India since our inception. Your growth is our legacy.</p>
      </div>
      <div>
        <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">Quick Links</h4>
        <ul className="space-y-4 text-sm font-medium">
          <li><Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
          <li><Link to="/#services" className="hover:text-cyan-400 transition-colors">Services</Link></li>
          <li><Link to="/about" className="hover:text-cyan-400 transition-colors">About Us</Link></li>
          <li><Link to="/contact" className="hover:text-cyan-400 transition-colors">Contact Us</Link></li>
          <li><Link to="/terms" className="hover:text-cyan-400 transition-colors">Terms & Conditions</Link></li>
          <li><Link to="/privacy" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">Connect</h4>
        <ul className="space-y-4 text-sm">
          <li className="flex items-start gap-3">
             <span className="text-cyan-400">📍</span>
             <span className="text-blue-200">{BUSINESS_DETAILS.address}</span>
          </li>
          <li className="flex items-center gap-3">
             <span className="text-cyan-400">📞</span>
             <span className="text-blue-200">{BUSINESS_DETAILS.phone1}</span>
          </li>
          <li className="flex items-center gap-3">
             <span className="text-cyan-400">✉️</span>
             <span className="text-blue-200">{BUSINESS_DETAILS.email}</span>
          </li>
          <li className="pt-6">
            <Link to="/apply" className="bg-cyan-500 text-white px-8 py-3 rounded-xl font-bold inline-block hover:bg-cyan-600 transition-all shadow-lg active:scale-95">Apply Now</Link>
          </li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 mt-20 pt-10 border-t border-blue-900 text-center text-[10px] text-blue-500 uppercase tracking-[0.2em]">
      © {new Date().getFullYear()} Abhishek Placement & Career Counselling • All Rights Reserved • GSTIN: {BUSINESS_DETAILS.gstin}
    </div>
  </footer>
);

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/apply" element={<ApplyForm />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/confirmation" element={<Confirmation />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
