import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const BG = '/gallery/markus-spiske-BfphcCvhl6E-unsplash.jpg';

interface Reg { division: 'male' | 'female'; team_name: string; }

export function TeamSlots() {
  const [regs, setRegs] = useState<Reg[]>([]);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('registrations').select('division, team_name');
      if (data) setRegs(data as Reg[]);
    }
    load();
    const handler = () => load();
    window.addEventListener('unzaRegUpdated', handler);
    return () => window.removeEventListener('unzaRegUpdated', handler);
  }, []);

  const MALE_MAX = 12, FEMALE_MAX = 8;
  const maleTeams   = regs.filter(r => r.division === 'male');
  const femaleTeams = regs.filter(r => r.division === 'female');

  const divisions = [
    { name: "Men's Division",   teams: maleTeams,  max: MALE_MAX },
    { name: "Women's Division", teams: femaleTeams, max: FEMALE_MAX },
  ];

  return (
    <section id="teams" className="section-bg py-28 px-6">
      <img src={BG} alt="" aria-hidden="true" className="section-bg-img" />
      <div className="section-bg-overlay" style={{ background:'rgba(0,0,0,0.84)' }} />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full reveal"
            style={{ background:'rgba(232,0,13,0.08)', border:'1px solid rgba(232,0,13,0.2)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#e8000d]" />
            <span className="font-['Barlow_Condensed'] text-[#e8000d] text-sm font-bold tracking-[4px] uppercase">Registration Status</span>
          </div>
          <h2 className="font-['Bebas_Neue'] text-5xl md:text-7xl tracking-wider uppercase mb-4 reveal"
            style={{ background:'linear-gradient(135deg,#ffffff 0%,rgba(255,255,255,0.75) 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
            Team Slots
          </h2>
          <div className="flex items-center justify-center gap-3 mb-5 reveal">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#e8000d]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#e8000d]" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#e8000d]" />
          </div>
          <p className="font-['Inter'] text-white font-semibold text-lg text-center leading-relaxed reveal">
            Limited slots for players aged <strong className="text-[#e8000d] font-bold">35 and above</strong>. Secure your spot today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {divisions.map(div => {
            const pct   = Math.min((div.teams.length / div.max) * 100, 100);
            const rem   = Math.max(div.max - div.teams.length, 0);
            const slots = Array.from({ length: div.max }, (_, i) => div.teams[i] ?? null);
            const full  = rem === 0;

            return (
              <div key={div.name} className="rounded-2xl overflow-hidden reveal"
                style={{ background:'rgba(0,0,0,0.5)', backdropFilter:'blur(20px)', border:'1px solid rgba(255,255,255,0.06)' }}>

                {/* Division header */}
                <div className="flex items-center justify-between px-7 py-5"
                  style={{ background:'rgba(232,0,13,0.08)', borderBottom:'1px solid rgba(232,0,13,0.15)' }}>
                  <div className="flex items-center gap-3">
                    <h3 className="font-['Bebas_Neue'] text-2xl text-white tracking-wide">{div.name}</h3>
                  </div>
                  <span className={`font-['Barlow_Condensed'] font-bold text-xs uppercase tracking-[2px] px-3 py-1.5 rounded-full ${
                    full
                      ? 'text-red-400 bg-red-500/10 border border-red-500/25'
                      : 'text-[#e8000d] bg-[#e8000d]/10 border border-[#e8000d]/25'
                  }`}>
                    {full ? 'FULL' : `${rem} Slots Left`}
                  </span>
                </div>

                {/* Progress */}
                <div className="px-7 py-5" style={{ borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-['Inter'] text-sm font-semibold text-white/80">
                      {div.teams.length} <span className="text-white/40 font-normal">/ {div.max} teams registered</span>
                    </span>
                    <span className="font-['Barlow_Condensed'] font-bold text-sm text-[#e8000d]">
                      {Math.round(pct)}%
                    </span>
                  </div>
                  <div className="w-full bg-white/8 rounded-full h-2 overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                      style={{ width:`${pct}%`, background:'linear-gradient(90deg,#9b0007,#e8000d,#ff6666)' }}>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Slot list */}
                <div className="p-4 space-y-1.5">
                  {slots.map((team, i) => (
                    <div key={i}
                      className="group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200"
                      style={{
                        background: team ? 'rgba(232,0,13,0.08)' : 'rgba(255,255,255,0.025)',
                        border: team ? '1px solid rgba(232,0,13,0.2)' : '1px solid rgba(255,255,255,0.05)',
                      }}>
                      <div className="flex items-center gap-3">
                        {/* Slot number */}
                        <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-['Bebas_Neue'] text-xs"
                          style={{
                            background: team ? 'rgba(232,0,13,0.2)' : 'rgba(255,255,255,0.06)',
                            color: team ? '#e8000d' : 'rgba(255,255,255,0.3)',
                          }}>
                          {i + 1}
                        </span>
                        <span className={`font-['Barlow_Condensed'] uppercase tracking-wide text-sm font-bold ${team ? 'text-white' : 'text-white/75'}`}>
                          {team ? team.team_name : `Open Slot ${i + 1}`}
                        </span>
                      </div>
                      <span className={`font-['Barlow_Condensed'] text-xs uppercase tracking-wider font-bold px-2.5 py-1 rounded-full ${
                        team
                          ? 'text-[#e8000d] bg-[#e8000d]/10'
                          : 'text-white/80 bg-white/8'
                      }`}>
                        {team ? '✓ Registered' : 'Available'}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                {!full && (
                  <div className="px-5 pb-5 flex justify-center">
                    <a href="#register" className="btn-primary text-xs px-6 py-2 rounded-full">
                      REGISTER FOR THIS DIVISION
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
