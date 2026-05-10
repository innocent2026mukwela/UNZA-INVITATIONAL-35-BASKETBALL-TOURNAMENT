const BG = '/gallery/tom-briskey-AddAnDkkovM-unsplash.jpg';

const rows = [
  {
    phase: 'Team Briefing',
    dates: '27 May 2026',
    details: 'Briefing session with all invited teams — rules, logistics, and tournament overview',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    phase: 'Registration Deadline',
    dates: '15 June 2026',
    details: 'All team registrations and fees must be submitted',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    phase: 'The Draw',
    dates: '20 June 2026',
    details: 'Bracket draw — team fixtures and group assignments confirmed',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
      </svg>
    ),
  },
  {
    phase: 'Day 1 — Group Stage',
    dates: '4 July 2026',
    details: "Pool-stage games across men's and women's divisions — all 18 teams in action",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    phase: 'Day 2 — Finals & Awards',
    dates: '5 July 2026',
    details: 'Semi-finals, championship finals, awards ceremony & fundraising close',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
];

export function Schedule() {
  return (
    <section id="schedule" className="section-bg py-28 px-6">
      <img src={BG} alt="" aria-hidden="true" className="section-bg-img" />
      <div className="section-bg-overlay" style={{ background:'rgba(0,0,0,0.82)' }} />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full reveal"
            style={{ background:'rgba(232,0,13,0.08)', border:'1px solid rgba(232,0,13,0.2)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#e8000d]" />
            <span className="font-['Barlow_Condensed'] text-[#e8000d] text-sm font-bold tracking-[4px] uppercase">Key Dates</span>
          </div>
          <h2 className="font-['Bebas_Neue'] text-5xl md:text-7xl tracking-wider uppercase mb-4 reveal"
            style={{ background:'linear-gradient(135deg,#ffffff 0%,rgba(255,255,255,0.75) 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
            Tournament Schedule
          </h2>
          <div className="flex items-center justify-center gap-3 mb-5 reveal">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#e8000d]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#e8000d]" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#e8000d]" />
          </div>
          <p className="font-['Barlow_Condensed'] font-semibold text-white/70 text-center tracking-[2px] reveal">
            {'4 – 5 JULY 2026  ·  UNZA SPORTS HALL & NASDEC  ·  ALL TIMES IN CAT'}
          </p>
        </div>

        {/* Schedule cards */}
        <div className="space-y-3">
          {rows.map((r, i) => (
            <div key={i}
              className="group flex items-center gap-6 p-6 rounded-xl cursor-default transition-all duration-300 reveal"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.06)',
                backdropFilter: 'blur(12px)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(232,0,13,0.06)';
                (e.currentTarget as HTMLElement).style.border = '1px solid rgba(232,0,13,0.2)';
                (e.currentTarget as HTMLElement).style.transform = 'translateX(6px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                (e.currentTarget as HTMLElement).style.border = '1px solid rgba(255,255,255,0.06)';
                (e.currentTarget as HTMLElement).style.transform = 'translateX(0)';
              }}
            >
              {/* Step number */}
              <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-[#e8000d] transition-all duration-300 group-hover:scale-110"
                style={{ background:'rgba(232,0,13,0.1)', border:'1px solid rgba(232,0,13,0.25)' }}>
                {r.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <h3 className="font-['Bebas_Neue'] text-xl text-white tracking-wide group-hover:text-[#ff6666] transition-colors duration-300">
                    {r.phase}
                  </h3>
                  <span className="font-['Barlow_Condensed'] text-xs font-bold text-[#e8000d] tracking-[2px] uppercase px-2.5 py-0.5 rounded-full"
                    style={{ background:'rgba(232,0,13,0.12)', border:'1px solid rgba(232,0,13,0.25)' }}>
                    {r.dates}
                  </span>
                </div>
                <p className="font-['Inter'] text-sm text-white/65 leading-relaxed group-hover:text-white/85 transition-colors duration-300">
                  {r.details}
                </p>
              </div>

              {/* Arrow */}
              <div className="flex-shrink-0 text-white/20 group-hover:text-[#e8000d] transition-all duration-300 group-hover:translate-x-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 reveal">
          <a href="#register" className="btn-primary px-10 py-4 text-base">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            SECURE YOUR SLOT — REGISTER NOW
          </a>
        </div>
      </div>
    </section>
  );
}
