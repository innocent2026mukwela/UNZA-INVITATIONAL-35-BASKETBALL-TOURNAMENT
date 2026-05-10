import { useEffect, useRef } from 'react';

const HERO_BG = '/gallery/front-view-basketball-player-holding-ball.jpg';

export function Hero() {
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!logoRef.current) return;
      const dx = (e.clientX / window.innerWidth  - 0.5) * 12;
      const dy = (e.clientY / window.innerHeight - 0.5) * 12;
      logoRef.current.style.transform = `translate(${dx}px,${dy}px)`;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Background */}
      <img src={HERO_BG} alt="" aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center scale-105"
        style={{ zIndex:0 }} />

      {/* Layered overlays for depth */}
      <div className="absolute inset-0" style={{ zIndex:1,
        background:'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 35%, rgba(0,0,0,0.75) 100%)'
      }} />
      <div className="absolute inset-0" style={{ zIndex:2,
        background:'radial-gradient(ellipse 80% 60% at 50% 60%, transparent 40%, rgba(0,0,0,0.6) 100%)'
      }} />

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex:3 }}>
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full"
          style={{ background:'radial-gradient(circle,rgba(232,0,13,0.18) 0%,transparent 65%)', filter:'blur(80px)' }} />
        <div className="absolute bottom-[5%] right-[5%] w-[400px] h-[400px] rounded-full"
          style={{ background:'radial-gradient(circle,rgba(232,0,13,0.12) 0%,transparent 65%)', filter:'blur(80px)' }} />
      </div>

      {/* Content */}
      <div className="relative text-center px-6 max-w-[900px] mx-auto pt-32 pb-24" style={{ zIndex:4 }}>

        {/* Logo */}
        <div className="float w-32 h-32 mx-auto mb-8 rounded-full border-2 border-[#e8000d] overflow-hidden glow-pulse"
          style={{ boxShadow:'0 0 0 8px rgba(232,0,13,0.06), 0 0 60px rgba(232,0,13,0.4), 0 24px 80px rgba(0,0,0,0.7)' }}>
          <img ref={logoRef} src="/gallery/logo.jpeg" alt="UNZA Alumni Logo"
            className="w-full h-full object-cover transition-transform duration-100 ease-out" />
        </div>

        {/* Event type pill */}
        <div className="inline-flex items-center gap-3 mb-6 px-7 py-3 rounded-full"
          style={{ background:'rgba(232,0,13,0.12)', border:'2px solid rgba(232,0,13,0.5)', backdropFilter:'blur(8px)' }}>
          <span className="w-2 h-2 rounded-full bg-[#e8000d] inline-block flex-shrink-0" style={{ boxShadow:'0 0 8px #e8000d' }} />
          <span className="font-['Barlow_Condensed'] tracking-[4px] text-white font-bold text-base uppercase">+35 Fundraiser Tournament</span>
          <span className="w-2 h-2 rounded-full bg-[#e8000d] inline-block flex-shrink-0" style={{ boxShadow:'0 0 8px #e8000d' }} />
        </div>

        {/* Location */}
        <div className="flex items-center justify-center gap-2 mb-4 font-['Barlow_Condensed'] text-sm tracking-[4px] text-white font-bold uppercase">
          <svg className="w-4 h-4 text-[#e8000d] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          UNZA Sports Hall &nbsp;&bull;&nbsp; Lusaka, Zambia
        </div>

        {/* Main title */}
        <h1 className="font-['Bebas_Neue'] leading-[0.9] tracking-wider mb-6"
          style={{ fontSize:'clamp(3.2rem,9vw,6rem)' }}>
          <span className="gradient-text-animated">UNZA ALUMNI</span>
          <br />
          <span className="text-white" style={{ textShadow:'0 4px 40px rgba(0,0,0,0.8)' }}>BASKETBALL</span>
          <br />
          <span className="text-white/90" style={{ textShadow:'0 4px 40px rgba(0,0,0,0.8)' }}>TOURNAMENT</span>
        </h1>

        {/* Divider line */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#e8000d]" />
          <span className="font-['Barlow_Condensed'] text-[#e8000d] tracking-[6px] text-lg font-bold uppercase">5 &ndash; 6 July 2026</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#e8000d]" />
        </div>

        {/* Subtext */}
        <p className="font-['Inter'] font-light text-white/75 max-w-[560px] mx-auto mb-12 text-lg leading-relaxed">
          {"Zambia's premier alumni basketball championship — where seasoned athletes compete with the fire of champions and the wisdom of experience."}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#register" className="btn-primary text-base px-10 py-4 w-full sm:w-auto">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            REGISTER YOUR TEAM
          </a>
          <a href="#about" className="btn-ghost text-base px-10 py-4 w-full sm:w-auto">
            LEARN MORE
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-bounce mt-16 flex flex-col items-center gap-2 text-white/30">
          <span className="font-['Barlow_Condensed'] text-[10px] tracking-[4px] uppercase">Scroll</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
