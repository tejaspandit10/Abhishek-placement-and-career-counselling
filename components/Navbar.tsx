
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/#services' },
    { name: 'Partner with Us', path: '/agent-register' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path.includes('#')) {
      const [basePath, hash] = path.split('#');
      return location.pathname === basePath && location.hash === `#${hash}`;
    }
    return location.pathname === path;
  };

  return (
    <nav className="glass-nav sticky top-0 z-50 border-b border-slate-200 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Logo className="h-12 md:h-14" />
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`${
                  isActive(link.path)
                    ? 'text-blue-900 font-semibold underline decoration-cyan-500 decoration-2 underline-offset-4'
                    : 'text-slate-600 hover:text-cyan-600'
                } transition-colors duration-200 text-sm font-medium`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/apply"
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-full font-medium transition-all shadow-md hover:shadow-lg"
            >
              Apply Now
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-slate-900"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-slate-600 hover:text-blue-900 font-medium"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/apply"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-cyan-600 font-bold"
            >
              Apply Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
