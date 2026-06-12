import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { supabase } from '../../lib/supabase';
import type { TeamPlayer } from '../../lib/supabase';

interface TeamRow {
  id: string;
  team_name: string;
  team_abbr: string;
  logo: string;
  captain_name: string;
  coach_name: string;
  division: 'male' | 'female';
  team_group: 'A' | 'B' | 'C' | null;
}

function PlayerCard({ player }: { player: TeamPlayer }) {
  const [imgOk, setImgOk] = useState(true);
  return (
    <div className="rounded-xl p-4 flex flex-col items-center text-center"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="w-16 h-16 mb-3 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0"
        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(232,0,13,0.2)' }}>
        {player.photo && imgOk ? (
          <img src={player.photo} alt={player.name} className="w-full h-full object-cover"
            onError={() => setImgOk(false)} />
        ) : (
          <svg className="w-7 h-7 text-[#e8000d]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        )}
      </div>
      <p className="font-['Barlow_Condensed'] uppercase tracking-[2px] text-sm font-bold text-white">{player.name}</p>
      {player.profession && (
        <p className="font-['Inter'] text-xs text-[#e8000d] mt-0.5">{player.profession}</p>
      )}
      {player.bio && (
        <p className="font-['Inter'] text-xs text-white/45 mt-2 leading-relaxed">{player.bio}</p>
      )}
    </div>
  );
}

export default function TeamProfile() {
  const { teamId } = useParams<{ teamId: string }>();
  const [team,    setTeam]    = useState<TeamRow | null>(null);
  const [players, setPlayers] = useState<TeamPlayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [imgOk,   setImgOk]   = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('registrations')
        .select('*')
        .eq('id', teamId)
        .maybeSingle();
      setTeam(data as TeamRow | null);

      if (data) {
        const { data: playerRows } = await supabase
          .from('team_players')
          .select('*')
          .eq('registration_id', teamId)
          .order('sort_order');
        setPlayers((playerRows as TeamPlayer[]) || []);
      }

      setLoading(false);
    }
    load();
  }, [teamId]);

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
        <Link to="/teams" className="flex items-center gap-2 px-4 py-2 rounded-lg font-['Barlow_Condensed'] uppercase tracking-wider text-xs text-white/60 hover:text-white transition-colors"
          style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)' }}>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          All Teams
        </Link>
      </header>

      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto">

          {loading ? (
            <p className="text-center font-['Inter'] text-sm text-white/30 py-16">Loading team…</p>
          ) : !team ? (
            <div className="text-center py-16">
              <p className="font-['Bebas_Neue'] text-3xl text-white/20 tracking-wider mb-4">TEAM NOT FOUND</p>
              <Link to="/teams" className="font-['Inter'] text-sm text-[#e8000d] hover:text-[#ff4444] transition-colors">
                ← Back to all teams
              </Link>
            </div>
          ) : (
            <div className="rounded-2xl p-10 text-center"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(232,0,13,0.15)', borderTop: '3px solid #e8000d' }}>

              {/* Logo */}
              <div className="w-28 h-28 mx-auto mb-6 rounded-2xl overflow-hidden flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(232,0,13,0.2)' }}>
                {team.logo && imgOk ? (
                  <img src={team.logo} alt={team.team_name} className="w-full h-full object-contain p-2"
                    onError={() => setImgOk(false)} />
                ) : (
                  <svg className="w-12 h-12 text-[#e8000d]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
                  </svg>
                )}
              </div>

              {/* Group badge */}
              {team.team_group && (
                <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full"
                  style={{ background: 'rgba(232,0,13,0.08)', border: '1px solid rgba(232,0,13,0.2)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e8000d]" />
                  <span className="font-['Barlow_Condensed'] text-[#e8000d] text-sm font-bold tracking-[4px] uppercase">Group {team.team_group}</span>
                </div>
              )}

              {/* Team name */}
              <h1 className="font-['Bebas_Neue'] text-5xl tracking-wider uppercase mb-2 text-white">
                {team.team_name}
              </h1>
              <p className="font-['Barlow_Condensed'] text-sm text-white/40 tracking-[3px] uppercase mb-8">{team.team_abbr}</p>

              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#e8000d]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#e8000d]" />
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#e8000d]" />
              </div>

              {/* Officials */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
                <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <p className="font-['Barlow_Condensed'] text-[10px] uppercase tracking-[3px] text-white/35 mb-1">Captain</p>
                  <p className="font-['Inter'] text-sm text-white/85">{team.captain_name}</p>
                </div>
                <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <p className="font-['Barlow_Condensed'] text-[10px] uppercase tracking-[3px] text-white/35 mb-1">Coach / Manager</p>
                  <p className="font-['Inter'] text-sm text-white/85">{team.coach_name}</p>
                </div>
              </div>

              {/* Roster */}
              <div className="mt-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#e8000d]/30" />
                  <span className="font-['Barlow_Condensed'] text-[#e8000d] text-sm font-bold tracking-[4px] uppercase">Roster</span>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#e8000d]/30" />
                </div>
                {players.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {players.map(p => <PlayerCard key={p.id} player={p} />)}
                  </div>
                ) : (
                  <p className="font-['Inter'] text-xs text-white/30">
                    Player roster coming soon.
                  </p>
                )}
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
