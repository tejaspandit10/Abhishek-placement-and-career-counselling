
import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import Home from './pages/Home';
import ApplyForm from './pages/ApplyForm';
import Payment from './pages/Payment';
import Confirmation from './pages/Confirmation';
import Contact from './pages/Contact';
import AgentRegister from './pages/AgentRegister';
import AdminDashboard from './pages/AdminDashboard';
import { Logo } from './components/Logo';
import { BUSINESS_DETAILS } from './constants';


const AboutPage = () => (
  <div className="max-w-4xl mx-auto py-20 px-4">
    <h1 className="text-4xl font-bold text-[#003366] mb-8">About Us</h1>
    <div className="space-y-6 text-lg text-slate-600 leading-relaxed uppercase">
      <p>
        ABHISHEK PLACEMENT AND CAREER COUNSELLING (APCC) IS A TRUSTWORTHY AND RAPIDLY GROWING
        PLACEMENT AGENCY THAT PROVIDES EXCELLENT EMPLOYMENT OPPORTUNITIES ACROSS ALL SECTORS.
      </p>
      <p>
        OUR GOAL IS TO CONNECT TALENTED INDIVIDUALS WITH THE RIGHT JOBS AND SUPPLY COMPANIES WITH
        SUITABLE AND SKILLED CANDIDATES.
      </p>
      <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100 my-10 lowercase first-letter:uppercase">
        <h2 className="text-2xl font-bold text-[#003366] mb-4 uppercase">Our Vision</h2>
        <p>To be the most reliable career partner for every student and professional in India, empowering them with the right guidance and placement support.</p>
      </div>
    </div>
  </div>
);

const ServicesPage = () => (
  <div className="max-w-7xl mx-auto py-20 px-4">
    <h1 className="text-4xl font-bold text-[#003366] mb-12 text-center">Our Services</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {[
        { title: 'Career Guidance & Counselling', desc: 'Personalized sessions to map your future.' },
        { title: 'Job Placement Services', desc: 'Direct access to verified job openings.' },
        { title: 'Resume Building', desc: 'Crafting powerful narratives for your profile.' },
        { title: 'Skill Development', desc: 'Training programs aligned with industry needs.' },
        { title: 'Campus Drives', desc: 'Connecting colleges with top recruiters.' },
        { title: 'Bulk Recruitment', desc: 'Scalable hiring solutions for corporates.' }
      ].map((s, i) => (
        <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:border-cyan-500 transition-colors">
          <h3 className="text-2xl font-bold text-[#003366] mb-3">{s.title}</h3>
          <p className="text-slate-600">{s.desc}</p>
        </div>
      ))}
    </div>
  </div>
);

const Footer = () => (
  <footer className="bg-blue-950 text-blue-100 py-16 no-print">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
      <div className="col-span-1 md:col-span-1">
        <Logo light className="h-14 mb-6" hideText={false} />
        <p className="text-sm leading-relaxed mb-6">Dedicated to building successful careers and empowering professionals across India. Trusted by thousands of candidates.</p>
      </div>
      <div>
        <h4 className="text-white font-bold mb-6">Quick Links</h4>
        <ul className="space-y-3 text-sm">
          <li><Link to="/" className="hover:text-cyan-400">Home</Link></li>
          <li><Link to="/about" className="hover:text-cyan-400">About Us</Link></li>
          <li><Link to="/agent-register" className="hover:text-cyan-400 text-cyan-400 font-bold">Partner with Us (Agent)</Link></li>
          <li><Link to="/contact" className="hover:text-cyan-400">Contact</Link></li>
          <li><Link to="/admin" className="opacity-20 hover:opacity-100">Admin</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold mb-6">Services</h4>
        <ul className="space-y-3 text-sm">
          <li>Job Placement</li>
          <li>Career Counselling</li>
          <li>Resume Writing</li>
          <li>Skill Training</li>
          <li>Internships</li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold mb-6">Contact</h4>
        <ul className="space-y-3 text-sm">
          <li>📍 {BUSINESS_DETAILS.address}</li>
          <li>📞 {BUSINESS_DETAILS.phone1} / {BUSINESS_DETAILS.phone2}</li>
          <li>✉️ {BUSINESS_DETAILS.email}</li>
          <li className="pt-4">
            <Link to="/apply" className="bg-cyan-500 text-white px-6 py-2 rounded-full font-bold inline-block hover:bg-cyan-600 transition-colors">Apply Now</Link>
          </li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-blue-900 text-center text-xs text-blue-400">
      © {new Date().getFullYear()} Abhishek Placement & Career Counselling. All Rights Reserved. | GSTIN: {BUSINESS_DETAILS.gstin}
    </div>
  </footer>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/apply" element={<ApplyForm />} />
            <Route path="/agent-register" element={<AgentRegister />} />
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
