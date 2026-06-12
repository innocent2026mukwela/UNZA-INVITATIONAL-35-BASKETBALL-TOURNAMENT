import { useState, useEffect } from 'react';
import { Link } from 'react-router';

const LINKS = ['Home','About','Gallery','Schedule','Register','Contact','Sponsors'];

export function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [activeSection, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = LINKS.map(l => document.getElementById(l.toLowerCase())).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }); },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-black/90 shadow-[0_1px_0_rgba(232,0,13,0.2)]' : 'bg-transparent'
    }`} style={{ backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none' }}>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-[70px]">

        {/* Brand */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden border-2 border-[#e8000d] transition-all duration-300 group-hover:scale-110"
            style={{ boxShadow:'0 0 16px rgba(232,0,13,0.4)' }}>
            <img src="/gallery/logo.jpeg" alt="UNZA Invitational" className="w-full h-full object-cover" />
          </div>
          <div className="leading-none">
            <div className="font-['Bebas_Neue'] text-xl tracking-[3px] text-white">UNZA <span className="text-[#e8000d]">INVITATIONAL</span></div>
            <div className="font-['Barlow_Condensed'] text-xs tracking-[3px] text-white/80 font-bold uppercase">35+ Basketball Tournament 2026</div>
          </div>
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-1">
          {LINKS.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              className={`nav-link-red px-4 py-2 font-['Barlow_Condensed'] uppercase tracking-[2px] text-sm transition-colors duration-200 rounded-md hover:bg-white/5 ${
                activeSection === l.toLowerCase() ? 'active text-white' : 'text-white/65 hover:text-white'
              }`}>
              {l}
            </a>
          ))}
          <Link to="/teams"
            className="nav-link-red px-4 py-2 font-['Barlow_Condensed'] uppercase tracking-[2px] text-sm transition-colors duration-200 rounded-md hover:bg-white/5 text-white/65 hover:text-white">
            Teams
          </Link>
          <Link to="/captain"
            className="nav-link-red px-4 py-2 font-['Barlow_Condensed'] uppercase tracking-[2px] text-sm transition-colors duration-200 rounded-md hover:bg-white/5 text-white/65 hover:text-white">
            Captain Login
          </Link>
        </div>

        {/* Desktop CTA */}
        <a href="#register" className="hidden lg:block btn-primary text-sm px-6 py-2.5">
          REGISTER NOW
        </a>

        {/* Hamburger */}
        <button type="button" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu"
          className="lg:hidden relative w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-lg border border-white/10 hover:border-[#e8000d]/40 transition-all duration-200">
          <span className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`lg:hidden overflow-hidden transition-all duration-400 ${menuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
        style={{ background:'rgba(4,4,4,0.97)', backdropFilter:'blur(20px)', borderTop:'1px solid rgba(232,0,13,0.12)' }}>
        <div className="px-6 pt-4 pb-6 space-y-1">
          {LINKS.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}
              className={`flex items-center justify-between py-3 px-4 rounded-lg font-['Barlow_Condensed'] uppercase tracking-[2px] text-sm transition-all duration-200 ${
                activeSection === l.toLowerCase()
                  ? 'bg-[#e8000d]/10 text-white border-l-2 border-[#e8000d]'
                  : 'text-white/65 hover:bg-white/5 hover:text-white'
              }`}>
              {l}
              <svg className="w-3.5 h-3.5 text-[#e8000d]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          ))}
          <Link to="/teams" onClick={() => setMenuOpen(false)}
            className="flex items-center justify-between py-3 px-4 rounded-lg font-['Barlow_Condensed'] uppercase tracking-[2px] text-sm transition-all duration-200 text-white/65 hover:bg-white/5 hover:text-white">
            Teams
            <svg className="w-3.5 h-3.5 text-[#e8000d]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <Link to="/captain" onClick={() => setMenuOpen(false)}
            className="flex items-center justify-between py-3 px-4 rounded-lg font-['Barlow_Condensed'] uppercase tracking-[2px] text-sm transition-all duration-200 text-white/65 hover:bg-white/5 hover:text-white">
            Captain Login
            <svg className="w-3.5 h-3.5 text-[#e8000d]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <div className="pt-3">
            <a href="#register" onClick={() => setMenuOpen(false)} className="btn-primary w-full text-center block">
              REGISTER NOW
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
