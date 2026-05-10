const NAV_LINKS = ['Home','About','Gallery','Schedule','Register','Sponsors'];

const SOCIAL = [
  {
    name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61589247851887',
    icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>,
  },
  {
    name: 'Instagram', href: '#',
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
  },
  {
    name: 'Twitter / X', href: '#',
    icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  },
];

export function Footer() {
  return (
    <footer style={{ borderTop:'1px solid rgba(232,0,13,0.15)' }}>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

          {/* Brand — wider column */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-shrink-0 w-14 h-14 rounded-full overflow-hidden border-2 border-[#e8000d]"
                style={{ boxShadow:'0 0 20px rgba(232,0,13,0.35)' }}>
                <img src="/gallery/logo.jpeg" alt="UNZA Alumni" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="font-['Bebas_Neue'] text-2xl tracking-[3px]">
                  <span className="text-white">UNZA </span>
                  <span className="text-[#e8000d]">ALUMNI</span>
                </div>
                <div className="font-['Barlow_Condensed'] text-[10px] tracking-[3px] text-white/40 uppercase">+35 Fundraiser Basketball Tournament</div>
              </div>
            </div>
            <p className="font-['Inter'] text-sm text-white/60 leading-relaxed mb-6 max-w-sm">
              {"The premier 35-and-above alumni basketball championship — raising funds for the UNZA Basketball programme while celebrating legacy and community."}
            </p>

            {/* Event details */}
            <div className="space-y-2">
              {[
                { icon:'📅', text:'5 – 6 July 2026' },
                { icon:'📍', text:'UNZA Sports Hall, Lusaka, Zambia' },
                { icon:'🎯', text:'+35 Age Category · 18 Teams' },
              ].map(d => (
                <div key={d.text} className="flex items-center gap-2.5">
                  <span className="text-sm">{d.icon}</span>
                  <span className="font-['Barlow_Condensed'] text-sm text-white/70 tracking-wide">{d.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h4 className="font-['Barlow_Condensed'] font-bold uppercase tracking-[4px] text-sm text-[#e8000d] mb-6 flex items-center gap-2">
              <span className="w-4 h-px bg-[#e8000d]" /> Quick Links
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map(l => (
                <li key={l}>
                  <a href={`#${l.toLowerCase()}`}
                    className="group flex items-center gap-2 font-['Inter'] text-sm text-white/55 hover:text-white transition-colors duration-200">
                    <svg className="w-3 h-3 text-[#e8000d]/0 group-hover:text-[#e8000d] transition-all duration-200 -translate-x-1 group-hover:translate-x-0"
                      fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h4 className="font-['Barlow_Condensed'] font-bold uppercase tracking-[4px] text-sm text-[#e8000d] mb-6 flex items-center gap-2">
              <span className="w-4 h-px bg-[#e8000d]" /> Get In Touch
            </h4>
            <address className="not-italic space-y-4 mb-8">
              <a href="mailto:events@unzabasketballalumini.org"
                className="flex items-start gap-3 group">
                <span className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5 transition-all duration-200 group-hover:bg-[#e8000d]"
                  style={{ background:'rgba(232,0,13,0.12)', border:'1px solid rgba(232,0,13,0.25)' }}>
                  <svg className="w-3.5 h-3.5 text-[#e8000d] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <div>
                  <div className="font-['Barlow_Condensed'] text-[10px] tracking-[3px] text-white/35 uppercase mb-0.5">Email</div>
                  <div className="font-['Inter'] text-sm text-[#e8000d] group-hover:text-[#ff4444] transition-colors duration-200">
                    events@unzabasketballalumini.org
                  </div>
                </div>
              </a>
            </address>

            {/* Social */}
            <div>
              <div className="font-['Barlow_Condensed'] text-[10px] tracking-[3px] text-white/35 uppercase mb-3">Follow Us</div>
              <div className="flex gap-2">
                {SOCIAL.map(s => (
                  <a key={s.name} href={s.href} aria-label={s.name}
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-white/50 transition-all duration-200 hover:text-white hover:-translate-y-1"
                    style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.08)' }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.background = '#e8000d';
                      (e.currentTarget as HTMLElement).style.borderColor = '#e8000d';
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(232,0,13,0.4)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                      (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                    }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop:'1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="font-['Inter'] text-xs text-white/35">
            &copy; {new Date().getFullYear()} UNZA Alumni Basketball Tournament. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            {['Privacy Policy','Terms of Service','Tournament Rules'].map((t, i, arr) => (
              <span key={t} className="flex items-center">
                <a href="#" className="font-['Inter'] text-xs text-white/35 hover:text-[#e8000d] transition-colors duration-200 px-3">{t}</a>
                {i < arr.length - 1 && <span className="text-white/15">·</span>}
              </span>
            ))}
            <span className="text-white/15">·</span>
            <a href="/admin" className="font-['Inter'] text-xs text-white/20 hover:text-white/50 transition-colors duration-200 px-3">
              Admin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
