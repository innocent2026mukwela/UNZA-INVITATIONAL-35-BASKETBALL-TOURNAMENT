import { useEffect } from 'react';
import { Navbar }             from './components/Navbar';
import { Hero }               from './components/Hero';
import { CountdownTimer }     from './components/CountdownTimer';
import { StatsBar }           from './components/StatsBar';
import { AboutSection }       from './components/AboutSection';
import { PhotoSlideshow }     from './components/PhotoSlideshow';
import { ParticipatingTeams } from './components/ParticipatingTeams';
import { TeamSlots }          from './components/TeamSlots';
import { Schedule }           from './components/Schedule';
import { Registration }       from './components/Registration';
import { Sponsors }           from './components/Sponsors';
import { Footer }             from './components/Footer';

const gallery1 = [
  { src:'/gallery/stephen-baker-QAX5Ylx-lKo-unsplash.jpg', quote:"Hard work beats talent when talent doesn't work hard.", author:'Tim Notke' },
  { src:'/gallery/tom-briskey-AddAnDkkovM-unsplash.jpg',          quote:"The strength of the team is each individual member.",  author:'Phil Jackson' },
  { src:'/gallery/stephen-baker-QAX5Ylx-lKo-unsplash.jpg',        quote:"Excellence is not a singular act, but a habit.",       author:"Shaquille O'Neal" },
  { src:'/gallery/kylie-osullivan-BfaBLVCBTI8-unsplash.jpg',      quote:"Age is just a number. Greatness has no expiry date.", author:'UNZA Legacy' },
];

const gallery2 = [
  { src:'/gallery/jason-leung2.jpg', quote:"Champions aren't made in gyms — they're made from something deep inside.", author:'Muhammad Ali' },
  { src:'/gallery/markus-spiske-BfphcCvhl6E-unsplash.jpg',             quote:"The older I get, the better I was.",                                       author:'Classic Saying' },
  { src:'/gallery/jason-leung-nM2WEy42Npg-unsplash.jpg',               quote:"Passion for the game doesn't age.",                                        author:'UNZA Legacy' },
  { src:'/gallery/side-view-man-playing-basketball.jpg',                quote:"The best years are still being played.",                                   author:'UNZA Legacy' },
];

// ── Shared background wrapper ───────────────────────────────────────────
function SharedBg({ src, overlay, children }: { src: string; overlay?: string; children: React.ReactNode }) {
  return (
    <div className="relative">
      <img src={src} alt="" aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
        style={{ zIndex: 0 }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1, background: overlay ?? 'rgba(0,0,0,0.82)' }} />
      <div style={{ position: 'relative', zIndex: 2 }}>
        {children}
      </div>
    </div>
  );
}

export default function App() {
  // Scroll-reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 80);
          obs.unobserve(e.target);
        }
      }),
      { threshold: 0.08 }
    );
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen text-white">
      <Navbar />
      <Hero />

      {/* Countdown + Stats — one shared background */}
      <SharedBg src="/gallery/stephen-baker-QAX5Ylx-lKo-unsplash.jpg" overlay="rgba(0,0,0,0.80)">
        <CountdownTimer />
        <StatsBar />
      </SharedBg>

      {/* Section divider */}
      <div className="h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(232,0,13,0.5),transparent)' }} />

      <AboutSection />

      {/* Section divider */}
      <div className="h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(232,0,13,0.4),transparent)' }} />

      <PhotoSlideshow photos={gallery1} title="Basketball Spirit"  subtitle="The court is where legends are made."     variant="fade"  />

      {/* Section divider */}
      <div className="h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(232,0,13,0.4),transparent)' }} />

      <TeamSlots />

      {/* Section divider */}
      <div className="h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(232,0,13,0.4),transparent)' }} />

      <ParticipatingTeams />

      {/* Section divider */}
      <div className="h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(232,0,13,0.4),transparent)' }} />

      <Schedule />

      {/* Section divider */}
      <div className="h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(232,0,13,0.4),transparent)' }} />

      <PhotoSlideshow photos={gallery2} title="Built Different. Aged Better." subtitle="The fire doesn't go out — it just burns deeper." variant="slide" />

      {/* Section divider */}
      <div className="h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(232,0,13,0.4),transparent)' }} />

      <Registration />

      {/* Sponsors + Footer — one shared background */}
      <div className="h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(232,0,13,0.5),transparent)' }} />
      <SharedBg src="/gallery/jason-leung-nM2WEy42Npg-unsplash.jpg" overlay="rgba(0,0,0,0.86)">
        <Sponsors />
        <Footer />
      </SharedBg>
    </div>
  );
}
