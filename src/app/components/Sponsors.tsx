import { useState, useEffect } from 'react';

export interface Sponsor { id: string; name: string; logo: string; tier: 'Platinum' | 'Gold' | 'Silver'; }

const tiers = [
  { tier: 'Platinum' as const, color: '#e8c97a', glow: 'rgba(232,201,122,0.25)', border: 'rgba(232,201,122,0.3)', bg: 'rgba(232,201,122,0.05)' },
  { tier: 'Gold'     as const, color: '#e8000d', glow: 'rgba(232,0,13,0.25)',     border: 'rgba(232,0,13,0.35)',   bg: 'rgba(232,0,13,0.05)'   },
  { tier: 'Silver'   as const, color: 'rgba(255,255,255,0.8)', glow: 'rgba(255,255,255,0.1)', border: 'rgba(255,255,255,0.2)', bg: 'rgba(255,255,255,0.03)' },
];

export function getSponsors(): Sponsor[] {
  try { return JSON.parse(localStorage.getItem('unzaSponsors') || '[]'); }
  catch { return []; }
}

export function Sponsors() {
  const [sponsors, setSponsors] = useState<Sponsor[]>(getSponsors());

  useEffect(() => {
    const load = () => setSponsors(getSponsors());
    window.addEventListener('unzaSponsorsUpdated', load);
    return () => window.removeEventListener('unzaSponsorsUpdated', load);
  }, []);

  return (
    <section id="sponsors" className="pt-28 pb-16 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full reveal"
            style={{ background:'rgba(232,0,13,0.08)', border:'1px solid rgba(232,0,13,0.2)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#e8000d]" />
            <span className="font-['Barlow_Condensed'] text-[#e8000d] text-sm font-bold tracking-[4px] uppercase">Partners</span>
          </div>
          <h2 className="font-['Bebas_Neue'] text-5xl md:text-7xl tracking-wider uppercase mb-4 reveal"
            style={{ background:'linear-gradient(135deg,#ffffff 0%,rgba(255,255,255,0.75) 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
            Official Sponsors
          </h2>
          <div className="flex items-center justify-center gap-3 mb-5 reveal">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#e8000d]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#e8000d]" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#e8000d]" />
          </div>
          <p className="font-['Inter'] font-light text-white/65 max-w-md mx-auto leading-relaxed reveal">
            Our partners make this tournament possible. Join us in building a lasting legacy for UNZA Basketball.
          </p>
        </div>

        {/* Active sponsors */}
        {sponsors.length > 0 && (
          <div className="mb-16 reveal">
            {tiers.map(t => {
              const group = sponsors.filter(s => s.tier === t.tier);
              if (!group.length) return null;
              return (
                <div key={t.tier} className="mb-10">
                  <div className="flex items-center gap-3 mb-5 justify-center">
                    <div className="h-px w-10" style={{ background: t.color, opacity: 0.4 }} />
                    <span className="font-['Barlow_Condensed'] font-bold text-xs tracking-[4px] uppercase" style={{ color: t.color }}>{t.tier} Sponsors</span>
                    <div className="h-px w-10" style={{ background: t.color, opacity: 0.4 }} />
                  </div>
                  <div className="flex flex-wrap justify-center gap-5">
                    {group.map(sp => (
                      <div key={sp.id} className="group flex flex-col items-center gap-3 p-5 rounded-2xl transition-all duration-300"
                        style={{ background: t.bg, border: `1px solid ${t.border}`, minWidth: 140 }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 30px ${t.glow}`}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = 'none'}>
                        <img src={sp.logo} alt={sp.name}
                          className="w-20 h-20 object-contain rounded-xl transition-transform duration-300 group-hover:scale-105" />
                        <span className="font-['Barlow_Condensed'] text-xs uppercase tracking-[2px] font-bold" style={{ color: t.color }}>{sp.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tier placeholder cards (shown when no sponsors yet) */}
        {sponsors.length === 0 && (
          <div className="flex flex-col md:flex-row gap-5 justify-center items-stretch mb-16 reveal">
            {tiers.map(s => (
              <div key={s.tier} className="card-lift group flex-1 max-w-sm rounded-2xl p-8 flex flex-col items-center text-center cursor-pointer"
                style={{ background: s.bg, border: `1px solid ${s.border}`, backdropFilter:'blur(16px)' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 50px ${s.glow}`}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = 'none'}>
                <div className="mb-5 px-4 py-1.5 rounded-full font-['Barlow_Condensed'] font-bold text-xs tracking-[4px] uppercase"
                  style={{ color: s.color, background: s.glow, border: `1px solid ${s.border}` }}>
                  {s.tier} Sponsor
                </div>
                <div className="w-28 h-28 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-105"
                  style={{ border:`1.5px dashed ${s.border}`, background: s.glow }}>
                  <svg className="w-12 h-12" style={{ color: s.color, opacity: 0.5 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="font-['Inter'] text-sm font-semibold text-white/80 mb-2">Your Brand Here</p>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="reveal rounded-2xl p-10 text-center"
          style={{ background:'rgba(232,0,13,0.04)', border:'1px solid rgba(232,0,13,0.15)', backdropFilter:'blur(12px)' }}>
          <h3 className="font-['Bebas_Neue'] text-3xl text-white tracking-wider mb-2">Become a Sponsor</h3>
          <p className="font-['Inter'] text-sm text-white/60 mb-6 max-w-md mx-auto leading-relaxed">
            Gain visibility with our alumni community and support a great cause. Platinum, Gold &amp; Silver packages available.
          </p>
          <a href="mailto:events@unzabasketballalumini.org" className="btn-primary px-10 py-3.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            GET IN TOUCH
          </a>
        </div>
      </div>
    </section>
  );
}
