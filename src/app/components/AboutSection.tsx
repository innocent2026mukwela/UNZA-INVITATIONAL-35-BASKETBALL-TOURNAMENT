const cards = [
  {
    num: '01', tag: "Men's Division", title: '12 Teams',
    desc: "The finest men's 35+ alumni teams compete in a pool-stage and knockout format for championship glory.",
    bg: '/gallery/markus-spiske-BfphcCvhl6E-unsplash.jpg',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
      </svg>
    ),
  },
  {
    num: '02', tag: "Women's Division", title: '8 Teams',
    desc: "Elite women's 35+ squads showcase exceptional talent and competitive spirit in pursuit of the title.",
    bg: '/gallery/kylie-osullivan-BfaBLVCBTI8-unsplash.jpg',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    num: '03', tag: 'Venue', title: 'UNZA Sports Hall',
    desc: "All matches held at the UNZA Sports Hall and NASDEC in Lusaka — premier basketball facilities in Zambia's capital.",
    bg: '/gallery/tom-briskey-AddAnDkkovM-unsplash.jpg',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    num: '04', tag: 'Fundraising', title: 'For a Cause',
    desc: 'All proceeds go directly to the UNZA Basketball programme. K5,000 per team. Compete and make a difference.',
    bg: '/gallery/stephen-baker-QAX5Ylx-lKo-unsplash.jpg',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-28 px-6 bg-[#080808]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full reveal"
            style={{ background:'rgba(232,0,13,0.08)', border:'1px solid rgba(232,0,13,0.2)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#e8000d]" />
            <span className="font-['Barlow_Condensed'] text-[#e8000d] text-sm font-bold tracking-[4px] uppercase">The Tournament</span>
          </div>
          <h2 className="font-['Bebas_Neue'] text-5xl md:text-7xl tracking-wider uppercase mb-4 reveal"
            style={{ background:'linear-gradient(135deg,#ffffff 0%,rgba(255,255,255,0.75) 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
            About The Event
          </h2>
          <div className="flex items-center justify-center gap-3 mb-6 reveal">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#e8000d]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#e8000d]" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#e8000d]" />
          </div>
          <p className="font-['Inter'] font-light text-white/70 text-center max-w-[600px] mx-auto leading-relaxed text-lg reveal">
            The UNZA Invitational 35+ Tournament brings together{' '}
            <strong className="text-white font-semibold">20 teams</strong> over two days of competitive basketball,
            uniting alumni, corporate, and visiting teams in support of the UNZA basketball programme.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((c, i) => (
            <div key={i} className="group relative rounded-2xl overflow-hidden cursor-default card-lift reveal"
              style={{ minHeight:340, animationDelay:`${i * 80}ms` }}>

              {/* Photo */}
              <img src={c.bg} alt="" aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108" />

              {/* Gradient overlay */}
              <div className="absolute inset-0 transition-opacity duration-500"
                style={{ background:'linear-gradient(180deg,rgba(0,0,0,0.15) 0%,rgba(0,0,0,0.65) 45%,rgba(0,0,0,0.95) 100%)' }} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background:'linear-gradient(180deg,rgba(232,0,13,0.05) 0%,rgba(0,0,0,0.7) 100%)' }} />

              {/* Number watermark */}
              <div className="absolute top-4 right-5 font-['Bebas_Neue'] text-6xl leading-none pointer-events-none select-none opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                style={{ color:'#e8000d' }}>{c.num}</div>

              {/* Red bottom line */}
              <div className="absolute bottom-0 inset-x-0 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                style={{ background:'linear-gradient(90deg,#e8000d,transparent)' }} />

              {/* Border glow on hover */}
              <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-1 ring-[#e8000d]/30 transition-all duration-300 pointer-events-none" />

              {/* Content */}
              <div className="relative z-10 p-7 h-full flex flex-col justify-end">
                <div className="flex items-center gap-2 mb-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg text-[#e8000d]"
                    style={{ background:'rgba(232,0,13,0.15)', border:'1px solid rgba(232,0,13,0.3)' }}>
                    {c.icon}
                  </span>
                  <span className="font-['Barlow_Condensed'] text-xs uppercase tracking-[3px] text-[#e8000d]">{c.tag}</span>
                </div>
                <h3 className="font-['Bebas_Neue'] text-3xl text-white mb-3 tracking-wide group-hover:text-[#ff6666] transition-colors duration-300">
                  {c.title}
                </h3>
                <p className="font-['Inter'] text-base font-semibold text-white leading-relaxed">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
