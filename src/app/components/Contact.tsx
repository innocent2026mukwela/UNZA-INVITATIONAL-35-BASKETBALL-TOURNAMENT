const CONTACT_PHOTO = '/contact/organiser.jpg';

const details = [
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>
    ),
    label: 'Email',
    value: 'events@unzabasketballalumini.org',
    href: 'mailto:events@unzabasketballalumini.org',
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
      </svg>
    ),
    label: 'Phone',
    value: '0975 491 210',
    href: 'tel:+260975491210',
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
    ),
    label: 'Venue',
    value: 'UNZA Sports Hall & NASDEC, Lusaka, Zambia',
    href: null,
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
      </svg>
    ),
    label: 'Tournament Dates',
    value: '4 – 5 July 2026',
    href: null,
  },
];

export function Contact() {
  return (
    <section id="contact" className="py-28 px-6 bg-[#080808]">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full reveal"
            style={{ background: 'rgba(232,0,13,0.08)', border: '1px solid rgba(232,0,13,0.2)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#e8000d]" />
            <span className="font-['Barlow_Condensed'] text-[#e8000d] text-sm font-bold tracking-[4px] uppercase">Get In Touch</span>
          </div>
          <h2 className="font-['Bebas_Neue'] text-5xl md:text-7xl tracking-wider uppercase mb-4 reveal"
            style={{ background: 'linear-gradient(135deg,#ffffff 0%,rgba(255,255,255,0.75) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Contact Us
          </h2>
          <div className="flex items-center justify-center gap-3 mb-5 reveal">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#e8000d]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#e8000d]" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#e8000d]" />
          </div>
          <p className="font-['Inter'] font-light text-white/60 max-w-md mx-auto text-base reveal">
            Have a question about the tournament? Reach out to us directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 reveal">

          {/* Contact details */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {details.map(d => (
              <div key={d.label} className="flex items-start gap-4 p-5 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(232,0,13,0.12)' }}>
                <div className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-[#e8000d]"
                  style={{ background: 'rgba(232,0,13,0.1)', border: '1px solid rgba(232,0,13,0.2)' }}>
                  {d.icon}
                </div>
                <div>
                  <p className="font-['Barlow_Condensed'] text-[10px] uppercase tracking-[3px] text-white/35 mb-1">{d.label}</p>
                  {d.href
                    ? <a href={d.href} className="font-['Inter'] text-sm text-[#e8000d] hover:text-[#ff4444] transition-colors">{d.value}</a>
                    : <p className="font-['Inter'] text-sm text-white/75">{d.value}</p>}
                </div>
              </div>
            ))}

            {/* Facebook */}
            <a href="https://www.facebook.com/profile.php?id=61589247851887" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-2xl group transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(232,0,13,0.12)' }}>
              <div className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-[#e8000d]"
                style={{ background: 'rgba(232,0,13,0.1)', border: '1px solid rgba(232,0,13,0.2)' }}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </div>
              <div>
                <p className="font-['Barlow_Condensed'] text-[10px] uppercase tracking-[3px] text-white/35 mb-1">Facebook</p>
                <p className="font-['Inter'] text-sm text-white/75 group-hover:text-white transition-colors">UNZA Invitational 35+ Basketball Tournament</p>
              </div>
            </a>
          </div>

          {/* Photo frame — replace /contact/organiser.jpg to show the photo */}
          <div className="lg:col-span-3">
            <div className="w-full h-full min-h-[400px] rounded-2xl overflow-hidden relative"
              style={{ border: '1px solid rgba(232,0,13,0.2)', background: 'rgba(255,255,255,0.02)' }}>
              <img
                src={CONTACT_PHOTO}
                alt="Tournament Organiser"
                className="w-full h-full object-cover object-center"
                onError={e => (e.currentTarget.style.display = 'none')}
              />
              {/* Placeholder shown until photo is uploaded */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                style={{ background: 'rgba(0,0,0,0.5)' }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{ background: 'rgba(232,0,13,0.1)', border: '1px solid rgba(232,0,13,0.3)' }}>
                  <svg className="w-8 h-8 text-[#e8000d]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                <p className="font-['Barlow_Condensed'] uppercase tracking-[3px] text-white/25 text-xs">Photo Coming Soon</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
