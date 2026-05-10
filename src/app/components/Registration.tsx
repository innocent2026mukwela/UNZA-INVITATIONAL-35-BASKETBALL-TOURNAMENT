import { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';

const BG = '/gallery/christian-rebero-twahirwa-ggtFONGaWTo-unsplash.jpg';
const REGISTRATION_DEADLINE = new Date('2026-06-15T23:59:59');
const MALE_MAX   = 10;
const FEMALE_MAX = 8;

interface FormState {
  division:    string;
  teamName:    string;
  teamAbbr:    string;
  captainName: string;
  coachName:   string;
  coachPhone:  string;
  playerCount: string;
  players:     string[];
  terms:       boolean;
}
type Errors = Partial<Record<keyof FormState | 'logo' | `player_${number}`, string>>;

function getRegs() {
  try { return JSON.parse(localStorage.getItem('unzaRegistrations') || '[]'); }
  catch { return []; }
}
function isDeadlinePassed() { return Date.now() > REGISTRATION_DEADLINE.getTime(); }

export function Registration() {
  const blank: FormState = {
    division:'', teamName:'', teamAbbr:'', captainName:'',
    coachName:'', coachPhone:'', playerCount:'', players:[], terms:false,
  };

  const [form,           setForm]           = useState<FormState>(blank);
  const [errors,         setErrors]         = useState<Errors>({});
  const [drag,           setDrag]           = useState(false);
  const [preview,        setPreview]        = useState('');
  const [file,           setFile]           = useState<File | null>(null);
  const [done,           setDone]           = useState(false);
  const [regs,           setRegs]           = useState(getRegs());
  const [deadlinePassed, setDeadlinePassed] = useState(isDeadlinePassed());
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const id = setInterval(() => setDeadlinePassed(isDeadlinePassed()), 60000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const load = () => setRegs(getRegs());
    window.addEventListener('unzaRegUpdated', load);
    return () => window.removeEventListener('unzaRegUpdated', load);
  }, []);

  const maleCount   = regs.filter((r: { division: string }) => r.division === 'male').length;
  const femaleCount = regs.filter((r: { division: string }) => r.division === 'female').length;
  const maleFull    = maleCount   >= MALE_MAX;
  const femaleFull  = femaleCount >= FEMALE_MAX;
  const formLocked  = deadlinePassed || (maleFull && femaleFull);

  const set = (k: keyof FormState, v: string | boolean | string[]) =>
    setForm(f => ({ ...f, [k]: v }));

  function handlePlayerCountChange(val: string) {
    const n = parseInt(val, 10);
    set('playerCount', val);
    if (!isNaN(n) && n >= 5 && n <= 15) {
      set('players', Array.from({ length: n }, (_, i) => form.players[i] ?? ''));
    } else {
      set('players', []);
    }
  }

  function setPlayer(i: number, val: string) {
    const next = [...form.players];
    next[i] = val;
    set('players', next);
  }

  function handleFile(f: File) {
    if (!f.type.startsWith('image/')) { alert('Image files only.'); return; }
    if (f.size > 5 * 1024 * 1024) { alert('Max 5 MB.'); return; }
    setFile(f);
    const r = new FileReader();
    r.onloadend = () => setPreview(r.result as string);
    r.readAsDataURL(f);
  }

  function validate() {
    const e: Errors = {};
    if (!form.division)            e.division    = 'Please select a division.';
    else if (form.division === 'male'   && maleFull)   e.division = "Men's Division is full.";
    else if (form.division === 'female' && femaleFull) e.division = "Women's Division is full.";
    if (!form.teamName.trim())    e.teamName    = 'Team name is required.';
    if (!form.teamAbbr.trim())    e.teamAbbr    = 'Abbreviation is required.';
    if (!form.captainName.trim()) e.captainName = 'Captain name is required.';
    if (!form.coachName.trim())   e.coachName   = 'Coach name is required.';
    if (!form.coachPhone.trim())  e.coachPhone  = 'Phone number is required.';
    const pc = parseInt(form.playerCount, 10);
    if (!form.playerCount.trim()) e.playerCount = 'Required.';
    else if (pc < 5 || pc > 15)  e.playerCount = 'Must be between 5 and 15.';
    else form.players.forEach((name, i) => {
      if (!name.trim()) e[`player_${i}` as `player_${number}`] = 'Required.';
    });
    if (!file)       e.logo  = 'Please upload your team logo.';
    if (!form.terms) e.terms = 'You must agree to the rules to continue.';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (formLocked || !validate()) return;

    const regsNow = getRegs();
    regsNow.push({
      division: form.division, teamName: form.teamName.trim(),
      teamAbbr: form.teamAbbr.trim(), captainName: form.captainName.trim(),
      coachName: form.coachName.trim(), coachPhone: form.coachPhone.trim(),
      playerCount: form.playerCount, players: form.players.map(p => p.trim()),
      registeredAt: new Date().toISOString(),
    });
    localStorage.setItem('unzaRegistrations', JSON.stringify(regsNow));
    window.dispatchEvent(new Event('unzaRegUpdated'));

    // Send email via EmailJS
    emailjs.send(
      'service_ir7xqxn',
      'template_4wc4ks9',
      {
        division:       form.division === 'male' ? "Men's Division" : "Women's Division",
        team_name:      form.teamName.trim(),
        team_abbr:      form.teamAbbr.trim(),
        captain_name:   form.captainName.trim(),
        coach_name:     form.coachName.trim(),
        coach_phone:    form.coachPhone.trim(),
        player_count:   form.playerCount,
        players:        form.players.map((p, i) => `${i + 1}. ${p.trim()}`).join('\n'),
        registered_at:  new Date().toLocaleString('en-GB', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' }),
      },
      'DWnEfFJ8wuI30d48Q'
    ).catch(() => {
      // Silent fail — registration is still saved locally
    });

    setDone(true);
    window.scrollTo({ top: (document.getElementById('register')?.offsetTop ?? 0) - 80, behavior: 'smooth' });
  }

  const inputCls = (hasErr: boolean) =>
    `w-full rounded-xl px-4 py-3.5 text-white font-['Inter'] text-sm outline-none transition-all duration-200 placeholder:text-white/25 ${
      hasErr
        ? 'border border-red-500/50 bg-red-500/5 focus:ring-2 focus:ring-red-500/20'
        : 'border border-white/10 bg-white/5 hover:bg-white/7 focus:border-[#e8000d]/50 focus:bg-white/8 focus:ring-2 focus:ring-[#e8000d]/15'
    }`;
  const labelCls = "font-['Barlow_Condensed'] uppercase tracking-[2px] text-xs text-white/55 mb-2 block font-semibold";
  const errMsg   = (msg?: string) => msg
    ? <p className="flex items-center gap-1.5 font-['Inter'] text-red-400 text-xs mt-1.5">
        <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
        </svg>
        {msg}
      </p>
    : null;

  const Overlay = () => (
    <>
      <img src={BG} alt="" aria-hidden="true" className="section-bg-img" />
      <div className="section-bg-overlay" style={{ background:'rgba(0,0,0,0.86)' }} />
    </>
  );

  const SectionHeader = () => (
    <div className="text-center mb-12">
      <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full reveal"
        style={{ background:'rgba(232,0,13,0.08)', border:'1px solid rgba(232,0,13,0.2)' }}>
        <span className="w-1.5 h-1.5 rounded-full bg-[#e8000d]" />
        <span className="font-['Barlow_Condensed'] text-[#e8000d] text-sm font-bold tracking-[4px] uppercase">Join The Tournament</span>
      </div>
      <h2 className="font-['Bebas_Neue'] text-5xl md:text-7xl tracking-wider uppercase mb-4 reveal"
        style={{ background:'linear-gradient(135deg,#ffffff 0%,rgba(255,255,255,0.75) 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
        Team Registration
      </h2>
      <div className="flex items-center justify-center gap-3 mb-5 reveal">
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#e8000d]" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#e8000d]" />
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#e8000d]" />
      </div>
    </div>
  );

  // ── Success screen ──────────────────────────────────────────
  if (done) return (
    <section id="register" className="section-bg py-28 px-6">
      <Overlay />
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <div className="rounded-2xl p-14"
          style={{ background:'rgba(0,0,0,0.65)', backdropFilter:'blur(24px)', border:'1px solid rgba(232,0,13,0.2)', borderTop:'3px solid #e8000d' }}>
          <div className="w-20 h-20 rounded-full bg-[#e8000d] flex items-center justify-center mx-auto mb-6"
            style={{ boxShadow:'0 0 50px rgba(232,0,13,0.6)' }}>
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-['Bebas_Neue'] text-5xl text-[#e8000d] tracking-wider mb-3">Registration Submitted!</h2>
          <p className="font-['Inter'] text-white/70 mb-8 leading-relaxed">
            Welcome, <span className="text-white font-semibold">{form.teamName}</span>!
            Your squad of <span className="text-white font-semibold">{form.playerCount} players</span> has been received.
            We will confirm your spot shortly.
          </p>
          <button type="button"
            onClick={() => { setDone(false); setForm(blank); setPreview(''); setFile(null); setErrors({}); }}
            className="btn-ghost px-8 py-3">
            REGISTER ANOTHER TEAM
          </button>
        </div>
      </div>
    </section>
  );

  // ── Locked screen ──────────────────────────────────────────
  if (formLocked) return (
    <section id="register" className="section-bg py-28 px-6">
      <Overlay />
      <div className="relative z-10 max-w-2xl mx-auto">
        <SectionHeader />
        <div className="rounded-2xl p-14 text-center"
          style={{ background:'rgba(0,0,0,0.65)', backdropFilter:'blur(24px)', border:'1px solid rgba(232,0,13,0.2)', borderTop:'3px solid #e8000d' }}>
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background:'rgba(232,0,13,0.1)', border:'2px solid rgba(232,0,13,0.4)' }}>
            <svg className="w-9 h-9 text-[#e8000d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="font-['Bebas_Neue'] text-4xl text-[#e8000d] tracking-wider mb-3">
            {deadlinePassed ? 'Registration Closed' : 'All Slots Filled'}
          </h3>
          <p className="font-['Inter'] text-white/60 leading-relaxed">
            {deadlinePassed
              ? 'The registration deadline of 15 June 2026 has passed. No further registrations are being accepted.'
              : 'Both divisions are now full. All 18 team slots have been filled. See you on the court!'}
          </p>
        </div>
      </div>
    </section>
  );

  // ── Active form ──────────────────────────────────────────
  const pc = parseInt(form.playerCount, 10);
  const rosterCount = (!isNaN(pc) && pc >= 5 && pc <= 15) ? pc : 0;

  return (
    <section id="register" className="section-bg py-28 px-6">
      <Overlay />

      <div className="relative z-10 max-w-3xl mx-auto">
        <SectionHeader />

        <p className="font-['Inter'] text-white/60 text-center mb-10 -mt-6 reveal">
          Open to players aged <strong className="text-white font-semibold">35 and above</strong>.
          {' '}Registration closes <strong className="text-[#e8000d] font-semibold">15 June 2026</strong>.
          {' '}Entry fee: <strong className="text-white font-semibold">K5,000 per team</strong>.
        </p>

        <form onSubmit={submit} noValidate className="reveal"
          style={{ background:'rgba(0,0,0,0.55)', backdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,0.07)', borderTop:'3px solid #e8000d', borderRadius:'16px' }}>

          {/* ── Division ── */}
          <div className="p-8 pb-0">
            <div className="mb-7">
              <p className={labelCls}>Division *</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {([
                  ['male',   `Men's Division`,   `${MALE_MAX - maleCount} slots remaining`],
                  ['female', `Women's Division`, `${FEMALE_MAX - femaleCount} slots remaining`],
                ] as [string, string, string][]).map(([val, label, sub]) => {
                  const locked = (val === 'male' && maleFull) || (val === 'female' && femaleFull);
                  const active = form.division === val;
                  return (
                    <button key={val} type="button"
                      disabled={locked}
                      onClick={() => !locked && set('division', val)}
                      className="flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-200"
                      style={{
                        background: active ? 'rgba(232,0,13,0.12)' : 'rgba(255,255,255,0.04)',
                        border: active ? '1.5px solid rgba(232,0,13,0.5)' : '1.5px solid rgba(255,255,255,0.08)',
                        opacity: locked ? 0.4 : 1,
                        cursor: locked ? 'not-allowed' : 'pointer',
                        boxShadow: active ? '0 0 20px rgba(232,0,13,0.15)' : 'none',
                      }}>
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${active ? 'border-[#e8000d]' : 'border-white/25'}`}>
                        {active && <div className="w-2.5 h-2.5 rounded-full bg-[#e8000d]" style={{ boxShadow:'0 0 6px #e8000d' }} />}
                      </div>
                      <div>
                        <div className="font-['Barlow_Condensed'] uppercase tracking-wide text-sm font-bold text-white">{label}</div>
                        <div className="font-['Inter'] text-xs text-white/45 mt-0.5">{locked ? 'Division Full' : sub}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
              {errMsg(errors.division)}
            </div>

            {/* ── Team info ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className={labelCls} htmlFor="teamName">Team Name *</label>
                <input id="teamName" type="text" className={inputCls(!!errors.teamName)}
                  placeholder="e.g. UNZA Veterans"
                  value={form.teamName} onChange={e => set('teamName', e.target.value)} />
                {errMsg(errors.teamName)}
              </div>
              <div>
                <label className={labelCls} htmlFor="teamAbbr">
                  Abbreviation * <span className="normal-case text-white/30 tracking-normal">(max 5 chars)</span>
                </label>
                <input id="teamAbbr" type="text" className={inputCls(!!errors.teamAbbr)}
                  placeholder="e.g. UVT" maxLength={5}
                  value={form.teamAbbr} onChange={e => set('teamAbbr', e.target.value)} />
                {errMsg(errors.teamAbbr)}
              </div>
            </div>

            {/* ── Officials ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className={labelCls} htmlFor="captainName">Team Captain *</label>
                <input id="captainName" type="text" className={inputCls(!!errors.captainName)}
                  placeholder="Full name"
                  value={form.captainName} onChange={e => set('captainName', e.target.value)} />
                {errMsg(errors.captainName)}
              </div>
              <div>
                <label className={labelCls} htmlFor="coachName">Coach / Manager *</label>
                <input id="coachName" type="text" className={inputCls(!!errors.coachName)}
                  placeholder="Full name"
                  value={form.coachName} onChange={e => set('coachName', e.target.value)} />
                {errMsg(errors.coachName)}
              </div>
            </div>

            {/* ── Contact + Count ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className={labelCls} htmlFor="coachPhone">Coach Phone *</label>
                <input id="coachPhone" type="tel" className={inputCls(!!errors.coachPhone)}
                  placeholder="+260 97X XXX XXX"
                  value={form.coachPhone} onChange={e => set('coachPhone', e.target.value)} />
                {errMsg(errors.coachPhone)}
              </div>
              <div>
                <label className={labelCls} htmlFor="playerCount">
                  Number of Players * <span className="normal-case text-white/30 tracking-normal">(5–15, all aged 35+)</span>
                </label>
                <input id="playerCount" type="number" className={inputCls(!!errors.playerCount)}
                  placeholder="5 – 15" min={5} max={15}
                  value={form.playerCount} onChange={e => handlePlayerCountChange(e.target.value)} />
                {errMsg(errors.playerCount)}
              </div>
            </div>
          </div>

          {/* ── Player Roster ── */}
          {rosterCount > 0 && (
            <div className="px-8 pb-0 mb-5">
              <div className="flex items-center justify-between mb-3">
                <p className={labelCls}>Player Roster *</p>
                <span className="font-['Barlow_Condensed'] text-xs text-[#e8000d] uppercase tracking-[2px] font-bold">
                  {rosterCount} Players
                </span>
              </div>
              <div className="rounded-xl overflow-hidden"
                style={{ border:'1px solid rgba(232,0,13,0.15)', background:'rgba(0,0,0,0.3)' }}>
                {form.players.map((name, i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-white/3"
                    style={{ borderBottom: i < rosterCount - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                    <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-['Bebas_Neue'] text-xs"
                      style={{ background:'rgba(232,0,13,0.15)', border:'1px solid rgba(232,0,13,0.25)', color:'#e8000d' }}>
                      {i + 1}
                    </span>
                    <input type="text"
                      className={`flex-1 bg-transparent outline-none font-['Inter'] text-sm text-white placeholder:text-white/25 ${errors[`player_${i}` as `player_${number}`] ? 'placeholder:text-red-400/50' : ''}`}
                      placeholder={`Player ${i + 1} — full name`}
                      value={name} onChange={e => setPlayer(i, e.target.value)} />
                    {errors[`player_${i}` as `player_${number}`] && (
                      <span className="text-red-400 text-xs flex-shrink-0 font-medium">Required</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Logo upload ── */}
          <div className="px-8 pb-0 mb-5">
            <p className={labelCls}>Team Logo *</p>
            <div
              onClick={() => fileRef.current?.click()}
              onDragEnter={e => { e.preventDefault(); setDrag(true); }}
              onDragLeave={() => setDrag(false)}
              onDragOver={e => e.preventDefault()}
              onDrop={e => { e.preventDefault(); setDrag(false); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
              className="rounded-xl p-8 text-center cursor-pointer transition-all duration-300"
              style={{
                border: drag ? '2px dashed #e8000d' : '2px dashed rgba(255,255,255,0.12)',
                background: drag ? 'rgba(232,0,13,0.08)' : 'rgba(255,255,255,0.02)',
              }}
              onMouseEnter={e => { if (!drag) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(232,0,13,0.4)'; }}
              onMouseLeave={e => { if (!drag) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)'; }}
            >
              <input ref={fileRef} type="file" accept="image/*" className="sr-only"
                aria-label="Upload team logo" title="Upload team logo"
                onChange={e => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }} />
              {preview ? (
                <div className="flex flex-col items-center gap-3">
                  <img src={preview} alt="Logo preview" className="w-24 h-24 object-contain rounded-xl ring-2 ring-[#e8000d]/30" />
                  <p className="font-['Inter'] text-[#e8000d] text-sm font-medium">{file?.name}</p>
                  <p className="font-['Inter'] text-xs text-white/40">Click or drag to replace</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-1"
                    style={{ background:'rgba(232,0,13,0.1)', border:'1px solid rgba(232,0,13,0.2)' }}>
                    <svg className="w-6 h-6 text-[#e8000d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <p className="font-['Barlow_Condensed'] uppercase text-white/70 tracking-[2px] text-sm font-semibold">Drag & drop your logo</p>
                  <p className="font-['Inter'] text-xs text-white/35">or click to browse &mdash; PNG, JPG, SVG &middot; max 5 MB</p>
                </div>
              )}
            </div>
            {errMsg(errors.logo)}
          </div>

          {/* ── Terms ── */}
          <div className="px-8 pb-0 mb-6">
            <button type="button" onClick={() => set('terms', !form.terms)}
              className="flex items-start gap-3 w-full text-left group">
              <div className={`flex-shrink-0 w-5 h-5 mt-0.5 rounded-md flex items-center justify-center transition-all duration-200 ${
                form.terms ? 'bg-[#e8000d]' : 'border-2 border-white/20 group-hover:border-[#e8000d]/50 bg-transparent'
              }`}
                style={form.terms ? { boxShadow:'0 0 12px rgba(232,0,13,0.4)' } : {}}>
                {form.terms && (
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <p className="font-['Inter'] text-sm text-white/65 group-hover:text-white/85 transition-colors leading-relaxed">
                I confirm all listed players are aged <strong className="text-white font-semibold">35 and above</strong> and
                agree to the tournament rules, regulations, and the registration fee of{' '}
                <strong className="text-white font-semibold">K5,000</strong>.
              </p>
            </button>
            {errMsg(errors.terms)}
          </div>

          {/* ── Submit ── */}
          <div className="p-8 pt-0">
            <button type="submit"
              className="btn-shimmer w-full py-4 rounded-xl font-['Bebas_Neue'] tracking-[3px] text-lg text-white transition-all duration-300"
              style={{ background:'linear-gradient(135deg,#c2000b 0%,#e8000d 50%,#c2000b 100%)', boxShadow:'0 4px 32px rgba(232,0,13,0.45)', backgroundSize:'200% 100%' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 40px rgba(232,0,13,0.65)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 32px rgba(232,0,13,0.45)'}
            >
              SUBMIT REGISTRATION
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
