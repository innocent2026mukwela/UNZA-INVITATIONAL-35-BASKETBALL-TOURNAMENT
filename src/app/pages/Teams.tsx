import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { supabase } from '../../lib/supabase';

interface TeamRow {
  id: string;
  team_name: string;
  team_abbr: string;
  logo: string;
  captain_name: string;
  team_group: 'A' | 'B' | 'C' | null;
}

const GROUPS: ('A' | 'B' | 'C')[] = ['A', 'B', 'C'];
const MALE_MAX = 12;

function TeamCard({ team }: { team: TeamRow }) {
  const [imgOk, setImgOk] = useState(true);
  return (
    <Link to={`/teams/${team.id}`}
      className="group flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 hover:-translate-y-0.5"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(232,0,13,0.15)' }}>
      <div className="flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden flex items-center justify-center"
        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(232,0,13,0.2)' }}>
        {team.logo && imgOk ? (
          <img src={team.logo} alt={team.team_name} className="w-full h-full object-contain p-1"
            onError={() => setImgOk(false)} />
        ) : (
          <svg className="w-6 h-6 text-[#e8000d]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
          </svg>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-['Barlow_Condensed'] uppercase tracking-[2px] text-sm font-bold text-white truncate group-hover:text-[#e8000d] transition-colors">
          {team.team_name}
        </p>
        <p className="font-['Inter'] text-xs text-white/40 truncate">{team.team_abbr}</p>
      </div>
      <svg className="w-4 h-4 text-white/20 group-hover:text-[#e8000d] group-hover:translate-x-1 transition-all flex-shrink-0"
        fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
}

function GroupSection({ label, teams }: { label: string; teams: TeamRow[] }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-4 mb-5">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#e8000d]/30" />
        <span className="font-['Barlow_Condensed'] text-[#e8000d] text-sm font-bold tracking-[4px] uppercase">{label}</span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#e8000d]/30" />
      </div>
      {teams.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {teams.map(t => <TeamCard key={t.id} team={t} />)}
        </div>
      ) : (
        <p className="text-center font-['Inter'] text-sm text-white/25 py-6">No teams assigned yet.</p>
      )}
    </div>
  );
}

export default function Teams() {
  const [teams,   setTeams]   = useState<TeamRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('registrations')
        .select('*')
        .eq('division', 'male')
        .order('registered_at');
      setTeams((data as TeamRow[]) || []);
      setLoading(false);
    }
    load();
  }, []);

  const drawDone = teams.some(t => t.team_group);

  // Groups are auto-assigned 4-per-group in registration order until the
  // admin manually sets team_group after the official draw.
  const groupedTeams: Record<'A' | 'B' | 'C', TeamRow[]> = { A: [], B: [], C: [] };
  GROUPS.forEach((g, i) => {
    groupedTeams[g] = drawDone ? teams.filter(t => t.team_group === g) : teams.slice(i * 4, i * 4 + 4);
  });

  return (
    <div className="min-h-screen text-white" style={{ background: '#080808' }}>

      {/* Top bar */}
      <header className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between"
        style={{ background: 'rgba(8,8,8,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(232,0,13,0.15)' }}>
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden border-2 border-[#e8000d] transition-all duration-300 group-hover:scale-110"
            style={{ boxShadow: '0 0 16px rgba(232,0,13,0.4)' }}>
            <img src="/gallery/logo.jpeg" alt="UNZA Invitational" className="w-full h-full object-cover" />
          </div>
          <div className="leading-none">
            <div className="font-['Bebas_Neue'] text-xl tracking-[3px] text-white">UNZA <span className="text-[#e8000d]">INVITATIONAL</span></div>
            <div className="font-['Barlow_Condensed'] text-xs tracking-[3px] text-white/80 font-bold uppercase">35+ Basketball Tournament 2026</div>
          </div>
        </Link>
        <Link to="/" className="flex items-center gap-2 px-4 py-2 rounded-lg font-['Barlow_Condensed'] uppercase tracking-wider text-xs text-white/60 hover:text-white transition-colors"
          style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)' }}>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </header>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full"
              style={{ background: 'rgba(232,0,13,0.08)', border: '1px solid rgba(232,0,13,0.2)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#e8000d]" />
              <span className="font-['Barlow_Condensed'] text-[#e8000d] text-sm font-bold tracking-[4px] uppercase">Men's Division</span>
            </div>
            <h1 className="font-['Bebas_Neue'] text-5xl md:text-7xl tracking-wider uppercase mb-4"
              style={{ background: 'linear-gradient(135deg,#ffffff 0%,rgba(255,255,255,0.75) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Teams
            </h1>
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#e8000d]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#e8000d]" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#e8000d]" />
            </div>
            <p className="font-['Inter'] font-light text-white/60 max-w-md mx-auto text-base">
              {teams.length} of {MALE_MAX} teams registered for the UNZA Invitational 35+ Basketball Tournament 2026.
            </p>
          </div>

          {!drawDone && !loading && teams.length > 0 && (
            <div className="rounded-2xl p-6 text-center mb-12"
              style={{ background: 'rgba(232,0,13,0.04)', border: '1px solid rgba(232,0,13,0.15)' }}>
              <p className="font-['Barlow_Condensed'] uppercase tracking-[3px] text-sm text-[#e8000d] font-bold mb-1">Provisional Groups</p>
              <p className="font-['Inter'] text-sm text-white/55">
                Groups below are provisional and may change after the official draw on <span className="text-white font-semibold">20 June 2026</span>.
              </p>
            </div>
          )}

          {loading ? (
            <p className="text-center font-['Inter'] text-sm text-white/30 py-16">Loading teams…</p>
          ) : teams.length === 0 ? (
            <p className="text-center font-['Bebas_Neue'] text-3xl text-white/20 tracking-wider py-16">NO TEAMS REGISTERED YET</p>
          ) : (
            GROUPS.map(g => (
              <GroupSection key={g} label={`Group ${g}`} teams={groupedTeams[g]} />
            ))
          )}

        </div>
      </section>
    </div>
  );
}
