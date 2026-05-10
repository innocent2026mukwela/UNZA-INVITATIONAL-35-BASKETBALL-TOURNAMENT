import { useState, useEffect } from 'react';

// ── Change this password to whatever you want ──────────────────────────
const ADMIN_PASSWORD = 'UNZA2025';

interface Player { name: string; }
interface Registration {
  division:    'male' | 'female';
  teamName:    string;
  teamAbbr:    string;
  captainName: string;
  coachName:   string;
  coachPhone:  string;
  playerCount: string;
  players:     string[];
  registeredAt: string;
}

function getRegs(): Registration[] {
  try { return JSON.parse(localStorage.getItem('unzaRegistrations') || '[]'); }
  catch { return []; }
}

function saveRegs(regs: Registration[]) {
  localStorage.setItem('unzaRegistrations', JSON.stringify(regs));
  window.dispatchEvent(new Event('unzaRegUpdated'));
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  } catch { return iso; }
}

function exportCSV(regs: Registration[]) {
  const headers = ['Division','Team Name','Abbr','Captain','Coach','Phone','Players','Registered At'];
  const rows = regs.map(r => [
    r.division === 'male' ? "Men's" : "Women's",
    r.teamName, r.teamAbbr, r.captainName,
    r.coachName, r.coachPhone,
    (r.players || []).join(' | '),
    formatDate(r.registeredAt),
  ]);
  const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = 'unza-registrations.csv';
  a.click(); URL.revokeObjectURL(url);
}

export default function Admin() {
  const [authed,      setAuthed]      = useState(false);
  const [password,    setPassword]    = useState('');
  const [loginError,  setLoginError]  = useState('');
  const [regs,        setRegs]        = useState<Registration[]>(getRegs());
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);
  const [filter,      setFilter]      = useState<'all' | 'male' | 'female'>('all');
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [search,      setSearch]      = useState('');

  useEffect(() => {
    const load = () => setRegs(getRegs());
    window.addEventListener('unzaRegUpdated', load);
    return () => window.removeEventListener('unzaRegUpdated', load);
  }, []);

  function login(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) { setAuthed(true); setLoginError(''); }
    else { setLoginError('Incorrect password. Try again.'); }
  }

  function deleteTeam(index: number) {
    const updated = regs.filter((_, i) => i !== index);
    saveRegs(updated);
    setRegs(updated);
    setDeleteTarget(null);
    setExpandedRow(null);
  }

  const filtered = regs
    .filter(r => filter === 'all' || r.division === filter)
    .filter(r =>
      search === '' ||
      r.teamName.toLowerCase().includes(search.toLowerCase()) ||
      r.captainName.toLowerCase().includes(search.toLowerCase())
    );

  const maleCount   = regs.filter(r => r.division === 'male').length;
  const femaleCount = regs.filter(r => r.division === 'female').length;

  // ── Login screen ──────────────────────────────────────────────────────
  if (!authed) return (
    <div className="min-h-screen flex items-center justify-center px-6"
      style={{ background: '#080808' }}>
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative mb-5">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#e8000d]"
              style={{ boxShadow: '0 0 0 6px rgba(232,0,13,0.08), 0 0 40px rgba(232,0,13,0.45)' }}>
              <img src="/gallery/logo.jpeg" alt="UNZA Invitational" className="w-full h-full object-cover" />
            </div>
            <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#e8000d] rounded-full flex items-center justify-center"
              style={{ boxShadow: '0 0 10px rgba(232,0,13,0.6)' }}>
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
              </svg>
            </span>
          </div>
          <h1 className="font-['Bebas_Neue'] text-3xl tracking-[3px]">
            <span className="text-white">UNZA </span>
            <span className="text-[#e8000d]">INVITATIONAL</span>
          </h1>
          <p className="font-['Barlow_Condensed'] text-xs uppercase tracking-[4px] text-white/35 mt-1">35+ Basketball Tournament</p>
          <div className="flex items-center gap-2 mt-3 px-3 py-1 rounded-full" style={{ background: 'rgba(232,0,13,0.08)', border: '1px solid rgba(232,0,13,0.2)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#e8000d]" style={{ boxShadow: '0 0 6px #e8000d' }} />
            <span className="font-['Barlow_Condensed'] text-[10px] uppercase tracking-[3px] text-[#e8000d] font-bold">Admin Access</span>
          </div>
        </div>

        <form onSubmit={login} className="rounded-2xl p-8"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(232,0,13,0.18)', borderTop: '3px solid #e8000d', backdropFilter: 'blur(20px)' }}>
          <label className="font-['Barlow_Condensed'] uppercase tracking-[2px] text-xs text-white/50 mb-2 block">
            Admin Password
          </label>
          <div className="relative mb-4">
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter password"
              autoFocus
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white font-['Inter'] text-sm outline-none
                focus:border-[#e8000d]/60 focus:ring-2 focus:ring-[#e8000d]/15 placeholder:text-white/20 transition-all pr-10"
            />
            <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
          </div>
          {loginError && (
            <div className="flex items-center gap-2 mb-4 px-3 py-2.5 rounded-lg" style={{ background: 'rgba(232,0,13,0.08)', border: '1px solid rgba(232,0,13,0.25)' }}>
              <svg className="w-3.5 h-3.5 text-[#e8000d] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
              </svg>
              <p className="font-['Inter'] text-red-400 text-xs">{loginError}</p>
            </div>
          )}
          <button type="submit"
            className="w-full py-3.5 text-white font-['Bebas_Neue'] tracking-[3px] text-lg rounded-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            style={{ background: 'linear-gradient(135deg,#c2000b 0%,#e8000d 100%)', boxShadow: '0 4px 24px rgba(232,0,13,0.4)' }}>
            ENTER DASHBOARD
          </button>
        </form>

        <p className="text-center mt-6">
          <a href="/" className="font-['Inter'] text-xs text-white/25 hover:text-white/55 transition-colors">
            ← Back to website
          </a>
        </p>
      </div>
    </div>
  );

  // ── Dashboard ─────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen" style={{ background: '#080808', fontFamily: 'Inter, sans-serif' }}>

      {/* Top bar */}
      <header className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between"
        style={{ background: 'rgba(8,8,8,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(232,0,13,0.18)' }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-[#e8000d]">
            <img src="/gallery/logo.jpeg" alt="" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="font-['Bebas_Neue'] text-lg text-white tracking-wider">UNZA LEGACY</span>
            <span className="font-['Barlow_Condensed'] text-xs text-[#e8000d] uppercase tracking-wider ml-3">Admin</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => exportCSV(regs)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-['Barlow_Condensed'] uppercase tracking-wider text-xs text-white/60 hover:text-white transition-colors"
            style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)' }}>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export CSV
          </button>
          <a href="/" className="flex items-center gap-2 px-4 py-2 rounded-lg font-['Barlow_Condensed'] uppercase tracking-wider text-xs text-white/60 hover:text-white transition-colors"
            style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)' }}>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Website
          </a>
          <button onClick={() => setAuthed(false)}
            className="px-4 py-2 rounded-lg font-['Barlow_Condensed'] uppercase tracking-wider text-xs text-[#e8000d] hover:bg-[#e8000d]/10 transition-colors"
            style={{ border: '1px solid rgba(232,0,13,0.3)' }}>
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Teams',      value: regs.length,        sub: 'registered' },
            { label: "Men's Division",   value: `${maleCount}/12`,  sub: `${12 - maleCount} slots left`, red: maleCount >= 12 },
            { label: "Women's Division", value: `${femaleCount}/8`, sub: `${8 - femaleCount} slots left`, red: femaleCount >= 8 },
            { label: 'Total Players',    value: regs.reduce((s, r) => s + parseInt(r.playerCount || '0', 10), 0), sub: 'across all teams' },
          ].map(c => (
            <div key={c.label} className="rounded-xl p-5"
              style={{ background: '#111', border: '1px solid rgba(232,0,13,0.15)', borderTop: '2px solid #e8000d' }}>
              <p className="font-['Barlow_Condensed'] uppercase tracking-[2px] text-xs text-white/40 mb-2">{c.label}</p>
              <p className={`font-['Bebas_Neue'] text-4xl mb-1 ${c.red ? 'text-red-400' : 'text-[#e8000d]'}`}>{c.value}</p>
              <p className="font-['Inter'] text-xs text-white/30">{c.sub}</p>
            </div>
          ))}
        </div>

        {/* Filter + Search */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex gap-2">
            {(['all','male','female'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className="px-4 py-2 rounded-lg font-['Barlow_Condensed'] uppercase tracking-wider text-xs transition-all"
                style={{
                  background: filter === f ? '#e8000d' : 'rgba(255,255,255,0.04)',
                  color: filter === f ? '#fff' : 'rgba(255,255,255,0.5)',
                  border: filter === f ? 'none' : '1px solid rgba(255,255,255,0.1)',
                }}>
                {f === 'all' ? `All (${regs.length})` : f === 'male' ? `Men's (${maleCount})` : `Women's (${femaleCount})`}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search team or captain..."
            className="flex-1 bg-white/4 border border-white/10 rounded-lg px-4 py-2 text-white text-sm outline-none
              focus:border-[#e8000d]/50 placeholder:text-white/25 transition-all font-['Inter']"
          />
        </div>

        {/* Teams table */}
        {filtered.length === 0 ? (
          <div className="text-center py-24 rounded-2xl" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="font-['Bebas_Neue'] text-3xl text-white/20 tracking-wider mb-2">NO TEAMS FOUND</p>
            <p className="font-['Inter'] text-sm text-white/25">
              {regs.length === 0 ? 'No registrations yet.' : 'Try changing your search or filter.'}
            </p>
          </div>
        ) : (
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(232,0,13,0.15)' }}>
            {/* Table header */}
            <div className="grid grid-cols-12 gap-2 px-5 py-3 text-xs font-['Barlow_Condensed'] uppercase tracking-[2px] text-white/40"
              style={{ background: 'rgba(232,0,13,0.08)', borderBottom: '1px solid rgba(232,0,13,0.15)' }}>
              <div className="col-span-1">#</div>
              <div className="col-span-2">Division</div>
              <div className="col-span-2">Team</div>
              <div className="col-span-2">Captain</div>
              <div className="col-span-2">Coach</div>
              <div className="col-span-1 text-center">Players</div>
              <div className="col-span-1">Registered</div>
              <div className="col-span-1 text-center">Actions</div>
            </div>

            {/* Rows */}
            {filtered.map((reg, displayIdx) => {
              const realIdx = regs.indexOf(reg);
              const isExpanded = expandedRow === realIdx;
              return (
                <div key={realIdx} style={{ borderBottom: displayIdx < filtered.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                  {/* Main row */}
                  <div
                    className="grid grid-cols-12 gap-2 px-5 py-4 items-center cursor-pointer transition-colors hover:bg-white/3"
                    onClick={() => setExpandedRow(isExpanded ? null : realIdx)}>
                    <div className="col-span-1 font-['Bebas_Neue'] text-xl text-[#e8000d]">{displayIdx + 1}</div>
                    <div className="col-span-2">
                      <span className="inline-block px-2 py-0.5 rounded-full font-['Barlow_Condensed'] text-xs uppercase tracking-wider"
                        style={{
                          background: reg.division === 'male' ? 'rgba(59,130,246,0.15)' : 'rgba(236,72,153,0.15)',
                          color: reg.division === 'male' ? '#93c5fd' : '#f9a8d4',
                          border: `1px solid ${reg.division === 'male' ? 'rgba(59,130,246,0.3)' : 'rgba(236,72,153,0.3)'}`,
                        }}>
                        {reg.division === 'male' ? "Men's" : "Women's"}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <p className="font-['Inter'] text-sm text-white font-medium truncate">{reg.teamName}</p>
                      <p className="font-['Barlow_Condensed'] text-xs text-white/35 tracking-wider">{reg.teamAbbr}</p>
                    </div>
                    <div className="col-span-2 font-['Inter'] text-sm text-white/70 truncate">{reg.captainName}</div>
                    <div className="col-span-2">
                      <p className="font-['Inter'] text-sm text-white/70 truncate">{reg.coachName}</p>
                      <p className="font-['Inter'] text-xs text-white/35">{reg.coachPhone}</p>
                    </div>
                    <div className="col-span-1 text-center">
                      <span className="font-['Bebas_Neue'] text-2xl text-[#e8000d]">{reg.playerCount}</span>
                    </div>
                    <div className="col-span-1 font-['Inter'] text-xs text-white/35 leading-tight">
                      {formatDate(reg.registeredAt)}
                    </div>
                    <div className="col-span-1 flex items-center justify-center gap-2">
                      {/* Expand */}
                      <button
                        onClick={e => { e.stopPropagation(); setExpandedRow(isExpanded ? null : realIdx); }}
                        title="View roster"
                        className="w-7 h-7 rounded flex items-center justify-center text-white/40 hover:text-white hover:bg-white/8 transition-all">
                        <svg className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {/* Delete */}
                      <button
                        onClick={e => { e.stopPropagation(); setDeleteTarget(realIdx); }}
                        title="Remove team"
                        className="w-7 h-7 rounded flex items-center justify-center text-red-400/50 hover:text-red-400 hover:bg-red-400/10 transition-all">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Expanded roster */}
                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1"
                      style={{ background: 'rgba(232,0,13,0.03)', borderTop: '1px solid rgba(232,0,13,0.1)' }}>
                      <p className="font-['Barlow_Condensed'] uppercase tracking-[2px] text-xs text-white/35 mb-3">
                        Player Roster — {reg.playerCount} Players
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                        {(reg.players || []).map((name, i) => (
                          <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg"
                            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                            <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 font-['Bebas_Neue'] text-xs text-white/50"
                              style={{ background: 'rgba(232,0,13,0.15)' }}>
                              {i + 1}
                            </span>
                            <span className="font-['Inter'] text-xs text-white/75 truncate">{name || '—'}</span>
                          </div>
                        ))}
                        {(!reg.players || reg.players.length === 0) && (
                          <p className="font-['Inter'] text-xs text-white/30 col-span-full">No player names recorded.</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Delete confirmation modal */}
      {deleteTarget !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6"
          style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}>
          <div className="w-full max-w-sm rounded-2xl p-8 text-center"
            style={{ background: '#111', border: '1px solid rgba(232,0,13,0.3)', borderTop: '3px solid #e8000d' }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ background: 'rgba(232,0,13,0.12)', border: '1px solid rgba(232,0,13,0.3)' }}>
              <svg className="w-7 h-7 text-[#e8000d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
            </div>
            <h3 className="font-['Bebas_Neue'] text-2xl text-white tracking-wider mb-2">REMOVE TEAM?</h3>
            <p className="font-['Inter'] text-sm font-light text-white/50 mb-1">
              You are about to remove
            </p>
            <p className="font-['Bebas_Neue'] text-xl text-[#e8000d] tracking-wider mb-6">
              {regs[deleteTarget]?.teamName}
            </p>
            <p className="font-['Inter'] text-xs text-white/35 mb-8 leading-relaxed">
              This will permanently delete the registration and reopen the slot on the public site.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)}
                className="flex-1 py-3 rounded-lg font-['Bebas_Neue'] tracking-[2px] text-white/60 hover:text-white transition-colors"
                style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)' }}>
                CANCEL
              </button>
              <button onClick={() => deleteTeam(deleteTarget)}
                className="flex-1 py-3 rounded-lg font-['Bebas_Neue'] tracking-[2px] text-white bg-red-600 hover:bg-red-500 transition-colors"
                style={{ boxShadow: '0 4px 16px rgba(220,38,38,0.4)' }}>
                YES, REMOVE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
