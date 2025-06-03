// @ts-ignore: PNG import for Vite
import headshot from './assets/headshot2.png'
// @ts-ignore: PNG import for Vite
import partners from './assets/partners.png'
import React, { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Link, Routes, Route, useLocation } from 'react-router-dom'
// import ChatbaseWidget from './ChatbaseWidget'
import FinalExpensePage from './pages/FinalExpensePage'

// Page components
function CenteredNotification({ show, message, onClose }: { show: boolean, message: string, onClose: () => void }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-2xl px-8 py-6 text-center">
        <div className="text-2xl font-bold text-blue-700 mb-2">{message}</div>
        <button
          className="mt-2 px-6 py-2 bg-blue-700 text-white rounded-full font-semibold hover:bg-blue-800 transition"
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
}

function HomePage() {
  // Render the FinalExpensePage directly as the homepage
  return <FinalExpensePage />;
}

function SchedulePage() {
  useEffect(() => {
    // Load Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on component unmount
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="py-8 min-h-[60vh] flex flex-col justify-start bg-gradient-to-l from-blue-100/70 via-white/80 to-blue-200/60" data-aos="fade-up">
      <div className="w-full px-0 text-center">
        <h2 className="text-3xl font-extrabold mb-0 text-blue-700">Schedule a Call</h2>
        <p className="text-lg text-gray-700 mb-0">Schedule a call or video meeting to discuss your needs.</p>
        <div 
          className="calendly-inline-widget mx-auto" 
          data-url="https://calendly.com/mikealfieri/30min"
          style={{ width: '100vw', minWidth: '320px', height: '700px' }}
        />
      </div>
    </section>
  );
}

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/schedule', label: 'Schedule a Call' },
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const activePath = location.pathname;

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <>
      {/* <ChatbaseWidget /> */}
      <div className="min-h-screen bg-gray-50 font-sans">
        {/* Mobile Phone Number Banner */}
        <a
          href="tel:5037645097"
          className="flex md:hidden justify-center items-center font-semibold text-blue-700 bg-blue-50 py-2 w-full shadow-sm text-lg tracking-wide border-b border-blue-100"
          style={{ textDecoration: 'none' }}
        >
          <svg className="w-5 h-5 mr-2 text-blue-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 01-2.18 2A19.72 19.72 0 013 5.18 2 2 0 015 3h3a2 2 0 012 1.72c.13 1.05.37 2.06.72 3a2 2 0 01-.45 2.11l-1.27 1.27a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45c.94.35 1.95.59 3 .72A2 2 0 0122 16.92z" />
          </svg>
          (503) 764-5097
        </a>
        {/* Navigation */}
        <nav className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col w-full">
              {/* Main Nav Row */}
              <div className="flex justify-between h-20 items-center w-full">
                <Link to="/" className="text-2xl font-extrabold text-blue-700 tracking-tight hover:text-blue-900 transition flex items-center gap-2" style={{ textDecoration: 'none' }}>
                  FEX Pro
                  {/* Sleek insurance logo: shield with checkmark */}
                  <span className="ml-2">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="shieldGradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#2563eb" />
                          <stop offset="1" stopColor="#60a5fa" />
                        </linearGradient>
                      </defs>
                      <path d="M16 4L27 8V15C27 23 16 28 16 28C16 28 5 23 5 15V8L16 4Z" fill="url(#shieldGradient)" stroke="#1e40af" strokeWidth="2"/>
                      <path d="M12 16.5L15 19.5L20 13.5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </Link>
                {/* Desktop Nav */}
                <div className="hidden md:flex items-center">
                  {NAV_LINKS.map((link, idx) => (
                    <React.Fragment key={link.to}>
                      {idx !== 0 && (
                        <span className="mx-3 text-gray-300 text-lg select-none">|</span>
                      )}
                      <Link
                        to={link.to}
                        className={`font-medium transition px-2 py-1 rounded relative
                          ${activePath === link.to ? 'text-blue-700 bg-blue-100 shadow-md' : 'text-gray-700 hover:text-blue-700 hover:bg-blue-100 hover:shadow-md'}
                          duration-200 ease-in-out
                        `}
                        style={{ display: 'inline-block' }}
                      >
                        {link.label}
                      </Link>
                    </React.Fragment>
                  ))}
                  <a
                    href="tel:5037645097"
                    className="hidden md:inline-block font-semibold text-blue-700 bg-blue-50 px-5 py-2 rounded-full shadow hover:bg-blue-100 transition ml-6 text-lg tracking-wide"
                    style={{ textDecoration: 'none' }}
                  >
                    (503) 764-5097
                  </a>
                </div>
                {/* Mobile Hamburger */}
                <button
                  className="md:hidden flex items-center justify-center w-10 h-10 rounded hover:bg-gray-100 focus:outline-none"
                  onClick={() => setIsMenuOpen(v => !v)}
                  aria-label="Open menu"
                >
                  <svg className="w-7 h-7 text-blue-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white shadow-lg px-6 py-4 flex flex-col space-y-4">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block font-medium transition px-2 py-2 rounded relative
                    ${activePath === link.to ? 'text-blue-700 bg-blue-100 shadow-md' : 'text-gray-700 hover:text-blue-700 hover:bg-blue-100 hover:shadow-md'}
                    duration-200 ease-in-out
                  `}
                  onClick={() => setIsMenuOpen(false)}
                  style={{ display: 'inline-block' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </nav>
        {/* Page Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/final-expense" element={<FinalExpensePage />} />
        </Routes>
        {/* Professional Footer */}
        <footer className="bg-black text-gray-200 border-t border-gray-800 pt-12 pb-8 mt-0">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center md:items-start gap-12 md:gap-0">
            {/* Brand & Tagline */}
            <div className="flex-1 text-center md:text-left mb-8 md:mb-0">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <span className="text-3xl font-extrabold text-blue-400 tracking-tight">FEX Pro</span>
                <span className="inline-block bg-blue-700 text-white text-xs px-3 py-1 rounded-full font-semibold ml-2">Licensed & Insured</span>
              </div>
              <div className="text-lg text-gray-400 font-medium">Your trusted insurance partner</div>
            </div>
            {/* Contact Info */}
            <div className="flex-1 text-center md:text-left mb-8 md:mb-0">
              <h4 className="text-xl font-bold text-white mb-2">Contact Info</h4>
              <div className="text-gray-300 text-base font-medium">Email: <a href="mailto:michaelalfieri.ffl@gmail.com" className="hover:text-blue-400 transition">michaelalfieri.ffl@gmail.com</a></div>
              <div className="text-gray-300 text-base font-medium">Phone: <a href="tel:5037645097" className="hover:text-blue-400 transition">(503) 764-5097</a></div>
            </div>
            {/* Small Headshot & Name at Bottom */}
            <div className="flex-1 text-center md:text-right flex flex-col items-center md:items-end">
              <div className="flex items-center gap-3 mb-2">
                <img src={headshot} alt="Michael V. Alfieri" className="w-16 h-16 rounded-full border-2 border-white shadow object-cover object-center" style={{ objectPosition: 'center 30%' }} />
                <div className="flex flex-col items-start">
                  <div className="text-sm text-gray-300 font-semibold">Michael V. Alfieri</div>
                  <div className="text-xs text-gray-400">Licensed Insurance Agent</div>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <h4 className="text-xl font-bold text-white mb-0">Connect</h4>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition ml-2" aria-label="LinkedIn">
                  <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z"/></svg>
                </a>
              </div>
              <div className="text-xs text-gray-500 mb-2">&copy; {new Date().getFullYear()} FEX Pro. All rights reserved.</div>
              <div className="text-xs text-gray-500">Powered by FEX Pro Technologies</div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App 