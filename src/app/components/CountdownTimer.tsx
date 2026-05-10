import { useState, useEffect } from 'react';

export function CountdownTimer() {
  const target = new Date('2026-07-04T10:00:00').getTime();
  const [time,    setTime]    = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) { setExpired(true); return; }
      setTime({
        days:    Math.floor(diff / 864e5),
        hours:   Math.floor((diff / 36e5) % 24),
        minutes: Math.floor((diff / 6e4)  % 60),
        seconds: Math.floor((diff / 1e3)  % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  const units = [
    { label:'Days',    val: time.days },
    { label:'Hours',   val: time.hours },
    { label:'Minutes', val: time.minutes },
    { label:'Seconds', val: time.seconds },
  ];

  return (
    <section className="pt-24 pb-10 px-6">
      <div className="max-w-5xl mx-auto reveal">

        {expired ? (
          <div className="text-center py-16">
            <p className="font-['Bebas_Neue'] text-6xl gradient-text-animated tracking-wider">TOURNAMENT IN PROGRESS!</p>
          </div>
        ) : (
          <div className="rounded-2xl overflow-hidden"
            style={{ background:'rgba(0,0,0,0.55)', backdropFilter:'blur(24px)', border:'1px solid rgba(232,0,13,0.2)', boxShadow:'0 0 0 1px rgba(255,255,255,0.03) inset' }}>

            {/* Top bar */}
            <div className="flex items-center justify-between px-8 py-4"
              style={{ borderBottom:'1px solid rgba(232,0,13,0.15)', background:'rgba(232,0,13,0.06)' }}>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#e8000d]" style={{ boxShadow:'0 0 8px #e8000d' }} />
                <span className="font-['Barlow_Condensed'] uppercase tracking-[4px] text-white font-bold text-sm">Tournament Countdown</span>
              </div>
              <span className="font-['Barlow_Condensed'] text-white font-bold text-sm tracking-[3px] uppercase">4 July 2026 &middot; 10:00 CAT</span>
            </div>

            {/* Units */}
            <div className="grid grid-cols-2 md:grid-cols-4">
              {units.map((u, i) => (
                <div key={u.label}
                  className="relative flex flex-col items-center justify-center py-10 group"
                  style={{ borderRight: i < units.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>

                  {/* Glow behind number */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background:'radial-gradient(ellipse at center, rgba(232,0,13,0.06) 0%, transparent 70%)' }} />

                  <div className="font-['Bebas_Neue'] leading-none text-[#e8000d] tabular-nums"
                    style={{ fontSize:'clamp(3.5rem,7vw,5rem)', textShadow:'0 0 40px rgba(232,0,13,0.4)' }}>
                    {String(u.val).padStart(2, '0')}
                  </div>

                  <div className="mt-2 font-['Barlow_Condensed'] uppercase tracking-[4px] text-white/60 text-xs font-bold">
                    {u.label}
                  </div>

                  {/* Separator dots on md+ */}
                  {i < units.length - 1 && (
                    <div className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 flex-col gap-1.5 z-10">
                      <div className="w-1 h-1 rounded-full bg-[#e8000d]/50" />
                      <div className="w-1 h-1 rounded-full bg-[#e8000d]/50" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom bar */}
            <div className="px-8 py-3 flex items-center justify-center gap-2"
              style={{ borderTop:'1px solid rgba(255,255,255,0.04)', background:'rgba(0,0,0,0.2)' }}>
              <svg className="w-3.5 h-3.5 text-[#e8000d]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="font-['Barlow_Condensed'] text-white font-bold text-sm tracking-[3px] uppercase">UNZA Sports Hall &amp; NASDEC, Lusaka, Zambia</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
