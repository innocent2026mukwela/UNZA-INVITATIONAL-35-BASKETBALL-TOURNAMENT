import { useState, useEffect, useCallback } from 'react';

interface Photo { src: string; quote: string; author: string; }
interface Props  { photos: Photo[]; title: string; subtitle: string; variant?: 'fade' | 'slide'; }

export function PhotoSlideshow({ photos, title, subtitle, variant = 'fade' }: Props) {
  const [cur,      setCur]      = useState(0);
  const [paused,   setPaused]   = useState(false);

  const goTo = useCallback((i: number) => setCur((i + photos.length) % photos.length), [photos.length]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => goTo(cur + 1), 5500);
    return () => clearInterval(id);
  }, [cur, paused, goTo]);

  const SLIDE_H = 'min-h-[600px] h-[88vh] max-h-[960px]';

  return (
    <section
      className={`relative overflow-hidden bg-black ${SLIDE_H}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Title overlay */}
      <div className="absolute top-8 inset-x-0 z-20 text-center pointer-events-none">
        <h2 className="font-['Bebas_Neue'] text-4xl text-white tracking-widest drop-shadow-lg">{title}</h2>
        <p className="font-['Barlow_Condensed'] uppercase text-white/40 tracking-[4px] text-xs mt-1">{subtitle}</p>
      </div>

      {/* ── FADE variant ── */}
      {variant === 'fade' && (
        <>
          {photos.map((p, i) => (
            <div key={i} className="absolute inset-0 transition-opacity duration-1000"
              style={{ opacity: i === cur ? 1 : 0, zIndex: i === cur ? 1 : 0 }}>
              <img
                src={p.src} alt=""
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[8000ms] ease-out"
                style={{ transform: i === cur ? 'scale(1)' : 'scale(1.07)' }}
              />
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(to bottom,rgba(0,0,0,0.05) 0%,transparent 28%,rgba(0,0,0,0.3) 60%,rgba(0,0,0,0.88) 90%,#000 100%)' }} />
              <div className="absolute bottom-0 inset-x-0 z-10 pb-14 px-[8%] text-center pointer-events-none">
                <blockquote className="font-['Inter'] italic font-light text-white/90 text-xl md:text-2xl mb-3 max-w-3xl mx-auto leading-relaxed"
                  style={{ textShadow: '0 2px 16px rgba(0,0,0,0.95)' }}>
                  "{p.quote}"
                </blockquote>
                <p className="font-['Barlow_Condensed'] uppercase text-[#e8000d] tracking-[4px] text-sm font-normal">— {p.author}</p>
              </div>
            </div>
          ))}
        </>
      )}

      {/* ── SLIDE variant — each slide is position:absolute, opacity+translate ── */}
      {variant === 'slide' && (
        <>
          {photos.map((p, i) => {
            const offset = i - cur;
            // wrap-around: keep adjacent slides visible for smooth transitions
            const x = offset * 100;
            return (
              <div key={i} className="absolute inset-0 transition-all duration-700 ease-in-out"
                style={{
                  transform: `translateX(${x}%)`,
                  opacity: Math.abs(offset) > 1 ? 0 : 1,
                  zIndex: i === cur ? 2 : 1,
                }}>
                <img
                  src={p.src} alt=""
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(to bottom,rgba(0,0,0,0.05) 0%,transparent 28%,rgba(0,0,0,0.3) 60%,rgba(0,0,0,0.88) 90%,#000 100%)' }} />
                <div className="absolute bottom-0 inset-x-0 z-10 pb-14 px-[8%] text-center pointer-events-none">
                  <blockquote className="font-['Inter'] italic font-light text-white/90 text-xl md:text-2xl mb-3 max-w-3xl mx-auto leading-relaxed"
                    style={{ textShadow: '0 2px 16px rgba(0,0,0,0.95)' }}>
                    "{p.quote}"
                  </blockquote>
                  <p className="font-['Barlow_Condensed'] uppercase text-[#e8000d] tracking-[4px] text-sm font-normal">— {p.author}</p>
                </div>
              </div>
            );
          })}
        </>
      )}

      {/* Prev */}
      <button type="button" onClick={() => goTo(cur - 1)} aria-label="Previous"
        className="absolute left-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:border-[#e8000d]/60 transition-all duration-200"
        style={{ background:'rgba(0,0,0,0.5)', border:'1px solid rgba(255,255,255,0.15)', backdropFilter:'blur(12px)' }}>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next */}
      <button type="button" onClick={() => goTo(cur + 1)} aria-label="Next"
        className="absolute right-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:border-[#e8000d]/60 transition-all duration-200"
        style={{ background:'rgba(0,0,0,0.5)', border:'1px solid rgba(255,255,255,0.15)', backdropFilter:'blur(12px)' }}>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Pill dots */}
      <div className="absolute bottom-5 inset-x-0 flex justify-center gap-1.5 z-30">
        {photos.map((_, i) => (
          <button key={i} type="button" onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`} title={`Slide ${i + 1}`}
            className="h-1 rounded-full transition-all duration-300"
            style={{ width: i === cur ? 28 : 7, background: i === cur ? '#e8000d' : 'rgba(255,255,255,0.3)' }} />
        ))}
      </div>
    </section>
  );
}
