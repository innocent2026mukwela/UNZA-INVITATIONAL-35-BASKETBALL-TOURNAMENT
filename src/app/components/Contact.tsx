import { useState } from 'react';
import emailjs from '@emailjs/browser';

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  const set = (k: keyof typeof form, v: string) => setForm(f => ({ ...f, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');
    try {
      await emailjs.send(
        'service_ir7xqxn',
        'template_4wc4ks9',
        {
          from_name:    form.name,
          from_email:   form.email,
          subject:      form.subject || 'General Enquiry',
          message:      form.message,
          team_name:    form.name,
          division:     'Enquiry',
          team_abbr:    '',
          captain_name: form.name,
          coach_name:   '',
          coach_phone:  '',
          team_email:   form.email,
          player_count: '',
          players:      '',
          registered_at: new Date().toLocaleString('en-GB'),
        },
        'DWnEfFJ8wuI30d48Q'
      );
      setStatus('done');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  }

  const inputCls = 'w-full rounded-xl px-4 py-3.5 text-white font-[\'Inter\'] text-sm outline-none transition-all duration-200 placeholder:text-white/25 border border-white/10 bg-white/5 hover:bg-white/7 focus:border-[#e8000d]/50 focus:bg-white/8 focus:ring-2 focus:ring-[#e8000d]/15';
  const labelCls = "font-['Barlow_Condensed'] uppercase tracking-[2px] text-xs text-white/55 mb-2 block font-semibold";

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
            Have a question about the tournament? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 reveal">

          {/* Contact details */}
          <div className="lg:col-span-2 flex flex-col gap-5">
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
            <a href="https://www.facebook.com/profile.php?id=61589247851887" target="_blank" rel="noreferrer"
              className="flex items-center gap-4 p-5 rounded-2xl group transition-all duration-200 hover:border-[#e8000d]/30"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(232,0,13,0.12)' }}>
              <div className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-[#e8000d]"
                style={{ background: 'rgba(232,0,13,0.1)', border: '1px solid rgba(232,0,13,0.2)' }}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </div>
              <div>
                <p className="font-['Barlow_Condensed'] text-[10px] uppercase tracking-[3px] text-white/35 mb-1">Facebook</p>
                <p className="font-['Inter'] text-sm text-white/75 group-hover:text-white transition-colors">UNZA Alumni Basketball</p>
              </div>
            </a>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3">
            {status === 'done' ? (
              <div className="h-full flex flex-col items-center justify-center text-center rounded-2xl p-12"
                style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(232,0,13,0.2)', borderTop: '3px solid #e8000d' }}>
                <div className="w-16 h-16 rounded-full bg-[#e8000d] flex items-center justify-center mb-5"
                  style={{ boxShadow: '0 0 40px rgba(232,0,13,0.5)' }}>
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <h3 className="font-['Bebas_Neue'] text-3xl text-white tracking-wider mb-2">Message Sent!</h3>
                <p className="font-['Inter'] text-white/55 text-sm mb-6">We'll get back to you as soon as possible.</p>
                <button onClick={() => setStatus('idle')}
                  className="btn-ghost px-8 py-2.5 text-sm">Send Another</button>
              </div>
            ) : (
              <form onSubmit={submit} className="rounded-2xl p-8"
                style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.06)', borderTop: '3px solid #e8000d' }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className={labelCls}>Your Name *</label>
                    <input type="text" className={inputCls} placeholder="Full name"
                      value={form.name} onChange={e => set('name', e.target.value)} required />
                  </div>
                  <div>
                    <label className={labelCls}>Email Address *</label>
                    <input type="email" className={inputCls} placeholder="you@example.com"
                      value={form.email} onChange={e => set('email', e.target.value)} required />
                  </div>
                </div>
                <div className="mb-5">
                  <label className={labelCls}>Subject</label>
                  <input type="text" className={inputCls} placeholder="What is this about?"
                    value={form.subject} onChange={e => set('subject', e.target.value)} />
                </div>
                <div className="mb-6">
                  <label className={labelCls}>Message *</label>
                  <textarea rows={5} className={`${inputCls} resize-none`} placeholder="Your message..."
                    value={form.message} onChange={e => set('message', e.target.value)} required />
                </div>
                {status === 'error' && (
                  <p className="font-['Inter'] text-red-400 text-xs mb-4">Something went wrong. Please try emailing us directly.</p>
                )}
                <button type="submit" disabled={status === 'sending'}
                  className="btn-primary w-full py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed">
                  {status === 'sending' ? 'SENDING...' : 'SEND MESSAGE'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
