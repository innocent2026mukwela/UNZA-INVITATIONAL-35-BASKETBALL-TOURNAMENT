import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

interface Team {
  teamName: string;
  division: 'male' | 'female';
  logo: string;
}


function TeamCard({ team }: { team: Team }) {
  const [imgOk, setImgOk] = useState(true);
  return (
    <div className="flex flex-col items-center gap-3 group">
      <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden flex items-center justify-center transition-all duration-300 group-hover:scale-105"
        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(232,0,13,0.2)', boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }}>
        {team.logo && imgOk ? (
          <img src={team.logo} alt={team.teamName} className="w-full h-full object-contain p-1"
            onError={() => setImgOk(false)} />
        ) : (
          <svg className="w-8 h-8 text-[#e8000d]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
          </svg>
        )}
      </div>
      <span className="font-['Barlow_Condensed'] text-xs uppercase tracking-[2px] text-white/70 text-center font-bold">
        {team.teamName}
      </span>
    </div>
  );
}

function DivisionRow({ label, teams }: { label: string; teams: Team[] }) {
  if (teams.length === 0) return null;
  return (
    <div className="mb-12">
      <div className="flex items-center gap-4 mb-6">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#e8000d]/30" />
        <span className="font-['Barlow_Condensed'] text-[#e8000d] text-sm font-bold tracking-[4px] uppercase">{label}</span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#e8000d]/30" />
      </div>
      <div className="flex flex-wrap justify-center gap-6 md:gap-8">
        {teams.map((t, i) => <TeamCard key={`${t.teamName}-${i}`} team={t} />)}
      </div>
    </div>
  );
}

export function ParticipatingTeams() {
  const [regs, setRegs] = useState<Team[]>([]);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('registrations').select('team_name, division, logo');
      if (data) setRegs(data.map(r => ({ teamName: r.team_name, division: r.division, logo: r.logo || '' })));
    }
    load();
    const handler = () => load();
    window.addEventListener('unzaRegUpdated', handler);
    return () => window.removeEventListener('unzaRegUpdated', handler);
  }, []);

  const registered = regs.map(r => ({
    teamName: r.teamName,
    division: r.division,
    logo: r.logo || '',
  }));

  const allTeams = registered;
  const males   = allTeams.filter(t => t.division === 'male');
  const females = allTeams.filter(t => t.division === 'female');

  return (
    <section id="teams-participating" className="py-28 px-6 bg-[#080808]">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full reveal"
            style={{ background: 'rgba(232,0,13,0.08)', border: '1px solid rgba(232,0,13,0.2)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#e8000d]" />
            <span className="font-['Barlow_Condensed'] text-[#e8000d] text-sm font-bold tracking-[4px] uppercase">In The Arena</span>
          </div>
          <h2 className="font-['Bebas_Neue'] text-5xl md:text-7xl tracking-wider uppercase mb-4 reveal"
            style={{ background: 'linear-gradient(135deg,#ffffff 0%,rgba(255,255,255,0.75) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Participating Teams
          </h2>
          <div className="flex items-center justify-center gap-3 mb-5 reveal">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#e8000d]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#e8000d]" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#e8000d]" />
          </div>
          <p className="font-['Inter'] font-light text-white/60 max-w-md mx-auto text-base reveal">
            Teams confirmed for the UNZA Invitational 35+ Basketball Tournament 2026.
          </p>
        </div>

        {/* Teams by division */}
        <div className="reveal">
          <DivisionRow label="Men's Division" teams={males} />
          <DivisionRow label="Women's Division" teams={females} />
        </div>

        {/* Empty state */}
        {allTeams.length === 0 && (
          <div className="text-center py-16 reveal">
            <p className="font-['Bebas_Neue'] text-3xl text-white/20 tracking-wider">REGISTRATIONS OPENING SOON</p>
          </div>
        )}

        {/* Total count */}
        <div className="text-center mt-4 reveal">
          <span className="font-['Barlow_Condensed'] text-white/30 text-sm tracking-[3px] uppercase">
            {allTeams.length} team{allTeams.length !== 1 ? 's' : ''} confirmed &nbsp;·&nbsp; {20 - allTeams.length} slot{20 - allTeams.length !== 1 ? 's' : ''} remaining
          </span>
        </div>
      </div>
    </section>
  );
}
