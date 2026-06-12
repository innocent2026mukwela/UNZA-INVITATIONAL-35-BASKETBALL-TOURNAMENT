import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { supabase } from '../../lib/supabase';
import type { TeamPlayer } from '../../lib/supabase';

const SESSION_KEY = 'unza_captain_team_id';

interface TeamOption {
  id: string;
  team_name: string;
  team_abbr: string;
  division: 'male' | 'female';
}

interface TeamRow {
  id: string;
  division: 'male' | 'female';
  team_name: string;
  team_abbr: string;
  captain_name: string;
  coach_name: string;
  coach_phone: string;
  team_email: string;
  logo: string;
  team_group: 'A' | 'B' | 'C' | null;
}

const emptyPlayerForm = { id: '', name: '', profession: '', bio: '', photo: '' };
const inputClass = "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white font-['Inter'] text-sm outline-none focus:border-[#e8000d]/50 placeholder:text-white/20 transition-all";

export default function Captain() {
  const [teamId, setTeamId] = useState<string | null>(() => localStorage.getItem(SESSION_KEY));

  // Login state
  const [teamOptions, setTeamOptions] = useState<TeamOption[]>([]);
  const [loginTeamId, setLoginTeamId] = useState('');
  const [loginCode, setLoginCode] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  // Dashboard state
  const [team, setTeam] = useState<TeamRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState<TeamPlayer[]>([]);
  const [form, setForm] = useState({ captainName: '', coachName: '', coachPhone: '', teamEmail: '', logo: '' });
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const logoRef = useRef<HTMLInputElement>(null);

  // Player form
  const [playerForm, setPlayerForm] = useState(emptyPlayerForm);
  const [savingPlayer, setSavingPlayer] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const photoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!teamId) {
      supabase.from('registrations').select('id, team_name, team_abbr, division').order('team_name')
        .then(({ data }) => setTeamOptions((data as TeamOption[]) || []));
    }
  }, [teamId]);

  useEffect(() => {
    if (teamId) loadDashboard(teamId);
  }, [teamId]);

  async function loadDashboard(id: string) {
    setLoading(true);
    const { data } = await supabase.from('registrations').select('*').eq('id', id).maybeSingle();
    if (!data) { logout(); return; }
    setTeam(data as TeamRow);
    setForm({
      captainName: data.captain_name || '',
      coachName:   data.coach_name   || '',
      coachPhone:  data.coach_phone  || '',
      teamEmail:   data.team_email   || '',
      logo:        data.logo         || '',
    });
    const { data: playerRows } = await supabase
      .from('team_players').select('*').eq('registration_id', id).order('sort_order');
    setPlayers((playerRows as TeamPlayer[]) || []);
    setLoading(false);
  }

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoginError('');
    if (!loginTeamId)       { setLoginError('Please select your team.'); return; }
    if (!loginCode.trim())  { setLoginError('Please enter your access code.'); return; }

    setLoggingIn(true);
    const { data } = await supabase.from('registrations').select('id, access_code').eq('id', loginTeamId).maybeSingle();
    setLoggingIn(false);

    if (!data?.access_code) {
      setLoginError('Your team does not have an access code yet. Contact the tournament admin.');
      return;
    }
    if (data.access_code.trim().toUpperCase() !== loginCode.trim().toUpperCase()) {
      setLoginError('Incorrect access code.');
      return;
    }
    localStorage.setItem(SESSION_KEY, loginTeamId);
    setTeamId(loginTeamId);
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
    setTeamId(null);
    setTeam(null);
    setPlayers([]);
    setLoading(false);
  }

  function handleLogoFile(f: File) {
    if (!f.type.startsWith('image/')) return;
    const r = new FileReader();
    r.onloadend = () => setForm(s => ({ ...s, logo: r.result as string }));
    r.readAsDataURL(f);
  }

  async function saveTeamInfo() {
    if (!team) return;
    setSaving(true);
    await supabase.from('registrations').update({
      captain_name: form.captainName.trim(),
      coach_name:   form.coachName.trim(),
      coach_phone:  form.coachPhone.trim(),
      team_email:   form.teamEmail.trim(),
      logo:         form.logo,
    }).eq('id', team.id);
    setSaving(false);
    setSaveMsg('Saved!');
    setTimeout(() => setSaveMsg(''), 2500);
  }

  function handlePlayerPhotoFile(f: File) {
    if (!f.type.startsWith('image/')) return;
    const r = new FileReader();
    r.onloadend = () => setPlayerForm(s => ({ ...s, photo: r.result as string }));
    r.readAsDataURL(f);
  }

  function editPlayer(p: TeamPlayer) {
    setPlayerForm({ id: p.id || '', name: p.name, profession: p.profession || '', bio: p.bio || '', photo: p.photo || '' });
  }

  function cancelPlayerForm() {
    setPlayerForm(emptyPlayerForm);
  }

  async function savePlayer() {
    if (!team || !playerForm.name.trim()) return;
    setSavingPlayer(true);
    if (playerForm.id) {
      await supabase.from('team_players').update({
        name:       playerForm.name.trim(),
        profession: playerForm.profession.trim() || null,
        bio:        playerForm.bio.trim() || null,
        photo:      playerForm.photo || null,
      }).eq('id', playerForm.id);
    } else {
      await supabase.from('team_players').insert({
        registration_id: team.id,
        name:       playerForm.name.trim(),
        profession: playerForm.profession.trim() || null,
        bio:        playerForm.bio.trim() || null,
        photo:      playerForm.photo || null,
        sort_order: players.length,
      });
    }
    setSavingPlayer(false);
    cancelPlayerForm();
    loadDashboard(team.id);
  }

  async function deletePlayer(id: string) {
    await supabase.from('team_players').delete().eq('id', id);
    setDeleteTarget(null);
    if (team) loadDashboard(team.id);
  }

  // ── Login screen ─────────────────────────────────────────────────────
  if (!teamId) return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: '#080808' }}>
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-10">
          <div className="relative mb-5">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#e8000d]"
              style={{ boxShadow: '0 0 0 6px rgba(232,0,13,0.08), 0 0 40px rgba(232,0,13,0.45)' }}>
              <img src="/gallery/logo.jpeg" alt="UNZA Invitational" className="w-full h-full object-cover" />
            </div>
          </div>
          <h1 className="font-['Bebas_Neue'] text-3xl tracking-[3px]">
            <span className="text-white">UNZA </span>
            <span className="text-[#e8000d]">INVITATIONAL</span>
          </h1>
          <p className="font-['Barlow_Condensed'] text-xs uppercase tracking-[4px] text-white/35 mt-1">35+ Basketball Tournament</p>
          <div className="flex items-center gap-2 mt-3 px-3 py-1 rounded-full" style={{ background: 'rgba(232,0,13,0.08)', border: '1px solid rgba(232,0,13,0.2)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#e8000d]" style={{ boxShadow: '0 0 6px #e8000d' }} />
            <span className="font-['Barlow_Condensed'] text-[10px] uppercase tracking-[3px] text-[#e8000d] font-bold">Captain Login</span>
          </div>
        </div>

        <form onSubmit={login} className="rounded-2xl p-8"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(232,0,13,0.18)', borderTop: '3px solid #e8000d', backdropFilter: 'blur(20px)' }}>

          <label className="font-['Barlow_Condensed'] uppercase tracking-[2px] text-xs text-white/50 mb-2 block">Your Team</label>
          <select value={loginTeamId} onChange={e => setLoginTeamId(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white font-['Inter'] text-sm outline-none focus:border-[#e8000d]/60 focus:ring-2 focus:ring-[#e8000d]/15 transition-all mb-4">
            <option value="">Select your team…</option>
            {teamOptions.map(t => (
              <option key={t.id} value={t.id}>{t.team_name} ({t.division === 'male' ? "Men's" : "Women's"})</option>
            ))}
          </select>

          <label className="font-['Barlow_Condensed'] uppercase tracking-[2px] text-xs text-white/50 mb-2 block">Access Code</label>
          <input type="text" value={loginCode} onChange={e => setLoginCode(e.target.value)}
            placeholder="Enter your team's access code"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white font-['Inter'] text-sm outline-none focus:border-[#e8000d]/60 focus:ring-2 focus:ring-[#e8000d]/15 placeholder:text-white/20 transition-all mb-4" />

          {loginError && (
            <div className="flex items-center gap-2 mb-4 px-3 py-2.5 rounded-lg" style={{ background: 'rgba(232,0,13,0.08)', border: '1px solid rgba(232,0,13,0.25)' }}>
              <svg className="w-3.5 h-3.5 text-[#e8000d] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
              </svg>
              <p className="font-['Inter'] text-red-400 text-xs">{loginError}</p>
            </div>
          )}

          <button type="submit" disabled={loggingIn}
            className="w-full py-3.5 text-white font-['Bebas_Neue'] tracking-[3px] text-lg rounded-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg,#c2000b 0%,#e8000d 100%)', boxShadow: '0 4px 24px rgba(232,0,13,0.4)' }}>
            {loggingIn ? 'CHECKING…' : 'ACCESS DASHBOARD'}
          </button>

          <p className="font-['Inter'] text-xs text-white/30 mt-4 text-center leading-relaxed">
            Don't have an access code? Contact the tournament admin to get one for your team.
          </p>
        </form>

        <p className="text-center mt-6">
          <Link to="/" className="font-['Inter'] text-xs text-white/25 hover:text-white/55 transition-colors">← Back to website</Link>
        </p>
      </div>
    </div>
  );

  // ── Loading ──────────────────────────────────────────────────────────
  if (loading || !team) return (
    <div className="min-h-screen flex items-center justify-center text-white" style={{ background: '#080808' }}>
      <p className="font-['Inter'] text-sm text-white/30">Loading your team…</p>
    </div>
  );

  // ── Dashboard ────────────────────────────────────────────────────────
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
            <div className="font-['Barlow_Condensed'] text-xs tracking-[3px] text-white/80 font-bold uppercase">Captain Dashboard</div>
          </div>
        </Link>
        <button onClick={logout}
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-['Barlow_Condensed'] uppercase tracking-wider text-xs text-[#e8000d] hover:bg-[#e8000d]/10 transition-colors"
          style={{ border: '1px solid rgba(232,0,13,0.3)' }}>
          Logout
        </button>
      </header>

      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto">

          {/* Team header */}
          <div className="flex items-center gap-4 mb-10">
            <div className="w-16 h-16 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(232,0,13,0.2)' }}>
              {form.logo ? (
                <img src={form.logo} alt={team.team_name} className="w-full h-full object-contain p-1" />
              ) : (
                <svg className="w-7 h-7 text-[#e8000d]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
                </svg>
              )}
            </div>
            <div>
              <h1 className="font-['Bebas_Neue'] text-3xl tracking-wider uppercase text-white">{team.team_name}</h1>
              <p className="font-['Barlow_Condensed'] text-xs text-white/40 tracking-[3px] uppercase">
                {team.team_abbr} &middot; {team.division === 'male' ? "Men's Division" : "Women's Division"}
                {team.team_group ? ` · Group ${team.team_group}` : ''}
              </p>
            </div>
          </div>

          {/* Team info card */}
          <div className="rounded-2xl p-6 mb-10"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(232,0,13,0.15)', borderTop: '2px solid #e8000d' }}>
            <p className="font-['Barlow_Condensed'] uppercase tracking-[3px] text-xs text-[#e8000d] mb-5 font-bold">Team Info</p>

            {/* Logo upload */}
            <div className="flex items-center gap-4 mb-5">
              <div onClick={() => logoRef.current?.click()}
                className="w-20 h-20 rounded-xl flex items-center justify-center cursor-pointer transition-all hover:border-[#e8000d]/60 overflow-hidden flex-shrink-0"
                style={{ border: '2px dashed rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.03)' }}>
                <input ref={logoRef} type="file" accept="image/*" className="sr-only"
                  onChange={e => { if (e.target.files?.[0]) handleLogoFile(e.target.files[0]); }} />
                {form.logo ? (
                  <img src={form.logo} alt="" className="w-full h-full object-contain p-1" />
                ) : (
                  <svg className="w-7 h-7 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                  </svg>
                )}
              </div>
              <div>
                <p className="font-['Barlow_Condensed'] uppercase tracking-[2px] text-xs text-white/40 mb-1">Team Logo</p>
                <p className="font-['Inter'] text-xs text-white/30">Click to upload a new logo.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div>
                <label className="font-['Barlow_Condensed'] uppercase tracking-[2px] text-xs text-white/40 mb-2 block">Captain Name</label>
                <input value={form.captainName} onChange={e => setForm(s => ({ ...s, captainName: e.target.value }))} className={inputClass} />
              </div>
              <div>
                <label className="font-['Barlow_Condensed'] uppercase tracking-[2px] text-xs text-white/40 mb-2 block">Coach / Manager Name</label>
                <input value={form.coachName} onChange={e => setForm(s => ({ ...s, coachName: e.target.value }))} className={inputClass} />
              </div>
              <div>
                <label className="font-['Barlow_Condensed'] uppercase tracking-[2px] text-xs text-white/40 mb-2 block">Coach Phone</label>
                <input value={form.coachPhone} onChange={e => setForm(s => ({ ...s, coachPhone: e.target.value }))} className={inputClass} />
              </div>
              <div>
                <label className="font-['Barlow_Condensed'] uppercase tracking-[2px] text-xs text-white/40 mb-2 block">Team Email</label>
                <input value={form.teamEmail} onChange={e => setForm(s => ({ ...s, teamEmail: e.target.value }))} className={inputClass} />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button onClick={saveTeamInfo} disabled={saving}
                className="px-6 py-3 rounded-lg font-['Bebas_Neue'] tracking-[2px] text-white transition-all disabled:opacity-50"
                style={{ background: '#e8000d', boxShadow: '0 4px 16px rgba(232,0,13,0.3)' }}>
                {saving ? 'SAVING…' : 'SAVE CHANGES'}
              </button>
              {saveMsg && <span className="font-['Inter'] text-xs text-green-400">{saveMsg}</span>}
            </div>
          </div>

          {/* Roster */}
          <div className="rounded-2xl p-6"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(232,0,13,0.15)', borderTop: '2px solid #e8000d' }}>
            <p className="font-['Barlow_Condensed'] uppercase tracking-[3px] text-xs text-[#e8000d] mb-5 font-bold">Player Roster ({players.length})</p>

            {/* Add / edit player form */}
            <div className="rounded-xl p-4 mb-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <p className="font-['Barlow_Condensed'] uppercase tracking-[2px] text-xs text-white/40 mb-4">
                {playerForm.id ? 'Edit Player' : 'Add Player'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <div onClick={() => photoRef.current?.click()}
                  className="w-16 h-16 rounded-full flex items-center justify-center cursor-pointer transition-all hover:border-[#e8000d]/60 overflow-hidden flex-shrink-0"
                  style={{ border: '2px dashed rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.03)' }}>
                  <input ref={photoRef} type="file" accept="image/*" className="sr-only"
                    onChange={e => { if (e.target.files?.[0]) handlePlayerPhotoFile(e.target.files[0]); }} />
                  {playerForm.photo ? (
                    <img src={playerForm.photo} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <svg className="w-6 h-6 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                    </svg>
                  )}
                </div>
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                  <input value={playerForm.name} onChange={e => setPlayerForm(s => ({ ...s, name: e.target.value }))}
                    placeholder="Player name" className={inputClass} />
                  <input value={playerForm.profession} onChange={e => setPlayerForm(s => ({ ...s, profession: e.target.value }))}
                    placeholder="Profession (e.g. Engineer)" className={inputClass} />
                  <textarea value={playerForm.bio} onChange={e => setPlayerForm(s => ({ ...s, bio: e.target.value }))}
                    placeholder="Short bio…" rows={2} className={`${inputClass} sm:col-span-2 resize-none`} />
                </div>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <button onClick={savePlayer} disabled={savingPlayer || !playerForm.name.trim()}
                  className="px-5 py-2.5 rounded-lg font-['Bebas_Neue'] tracking-[2px] text-white transition-all disabled:opacity-40"
                  style={{ background: '#e8000d' }}>
                  {savingPlayer ? 'SAVING…' : playerForm.id ? 'UPDATE PLAYER' : 'ADD PLAYER'}
                </button>
                {playerForm.id && (
                  <button onClick={cancelPlayerForm}
                    className="px-5 py-2.5 rounded-lg font-['Bebas_Neue'] tracking-[2px] text-white/60 hover:text-white transition-colors"
                    style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                    CANCEL
                  </button>
                )}
              </div>
            </div>

            {/* Player list */}
            {players.length === 0 ? (
              <p className="font-['Inter'] text-sm text-white/30 text-center py-6">No players added yet.</p>
            ) : (
              <div className="space-y-2">
                {players.map(p => (
                  <div key={p.id} className="flex items-center gap-3 px-4 py-3 rounded-lg"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      {p.photo ? (
                        <img src={p.photo} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <svg className="w-4 h-4 text-white/25" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-['Inter'] text-sm text-white font-medium truncate">{p.name}</p>
                      {p.profession && <p className="font-['Inter'] text-xs text-white/40 truncate">{p.profession}</p>}
                    </div>
                    <button onClick={() => editPlayer(p)} title="Edit"
                      className="w-8 h-8 rounded flex items-center justify-center text-white/40 hover:text-white hover:bg-white/8 transition-all flex-shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button onClick={() => setDeleteTarget(p.id!)} title="Remove"
                      className="w-8 h-8 rounded flex items-center justify-center text-red-400/50 hover:text-red-400 hover:bg-red-400/10 transition-all flex-shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Delete player modal */}
      {deleteTarget !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6"
          style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}>
          <div className="w-full max-w-sm rounded-2xl p-8 text-center"
            style={{ background: '#111', border: '1px solid rgba(232,0,13,0.3)', borderTop: '3px solid #e8000d' }}>
            <h3 className="font-['Bebas_Neue'] text-2xl text-white tracking-wider mb-2">REMOVE PLAYER?</h3>
            <p className="font-['Bebas_Neue'] text-xl text-[#e8000d] tracking-wider mb-6">
              {players.find(p => p.id === deleteTarget)?.name}
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)}
                className="flex-1 py-3 rounded-lg font-['Bebas_Neue'] tracking-[2px] text-white/60 hover:text-white transition-colors"
                style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)' }}>
                CANCEL
              </button>
              <button onClick={() => deletePlayer(deleteTarget)}
                className="flex-1 py-3 rounded-lg font-['Bebas_Neue'] tracking-[2px] text-white bg-red-600 hover:bg-red-500 transition-colors">
                YES, REMOVE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
