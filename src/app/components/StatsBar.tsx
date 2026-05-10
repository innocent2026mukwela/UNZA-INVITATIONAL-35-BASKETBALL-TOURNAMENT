const stats = [
  { number: '20',   label: 'Competing Teams',  icon: '🏀', sub: '12 Male · 8 Female' },
  { number: '2',    label: 'Tournament Days',   icon: '📅', sub: '4 – 5 July 2026' },
  { number: '35+',  label: 'Age Category',      icon: '⚡', sub: 'Alumni Veterans' },
  { number: 'K5K',  label: 'Registration Fee',  icon: '🏆', sub: 'Per Team Entry' },
];

export function StatsBar() {
  return (
    <section className="pb-24 px-6">
      <div className="max-w-6xl mx-auto reveal">
        <div className="grid grid-cols-2 md:grid-cols-4 rounded-2xl overflow-hidden"
          style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(232,0,13,0.12)', backdropFilter:'blur(16px)' }}>
          {stats.map((s, i) => (
            <div key={s.label}
              className="group relative flex flex-col items-center text-center px-6 py-10 cursor-default transition-all duration-300 hover:bg-[#e8000d]/5"
              style={{ borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>

              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background:'radial-gradient(ellipse at center, rgba(232,0,13,0.07) 0%, transparent 70%)' }} />

              {/* Number */}
              <div className="font-['Bebas_Neue'] leading-none text-[#e8000d] mb-1 transition-all duration-300 group-hover:scale-110"
                style={{ fontSize:'clamp(2.6rem,5vw,3.8rem)', textShadow:'0 0 30px rgba(232,0,13,0.35)' }}>
                {s.number}
              </div>

              {/* Label */}
              <div className="font-['Barlow_Condensed'] font-bold uppercase tracking-[3px] text-white text-sm mb-1">
                {s.label}
              </div>

              {/* Sub */}
              <div className="font-['Inter'] text-xs text-white/45 font-light">
                {s.sub}
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 inset-x-0 h-0.5 origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-400"
                style={{ background:'linear-gradient(90deg,transparent,#e8000d,transparent)' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
