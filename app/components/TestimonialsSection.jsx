'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Hari Maverick',
    role: 'Architect',
    rating: 5,
    text: 'As an architect, I appreciate their design and quality of construction. The project management skills are excellent and their workmanship speaks for itself. Among the few highly skilled construction firms in India I know, I recommend Hera Construction to build your dream projects with excellent design and high durability.',
    initial: 'H',
    color: '#c8a96e',
  },
  {
    id: 2,
    name: 'Tamilmani S',
    role: 'Home Owner',
    rating: 5,
    text: 'They are not only professional at what they do but also reliable and dependable. I\'ve had my house remodeled and they offered me a very reasonable quote. The end result exceeded my expectations. Hera construction has done a wonderful job.',
    initial: 'T',
    color: '#b8935a',
  },
  {
    id: 3,
    name: 'Nivetha',
    role: 'Home Owner',
    rating: 5,
    text: 'It was glad to say, now I own my dream house in an affordable budget. It was beyond my dream too — such brilliant work by Hera. I have seen a professional touch in all their aspects. Ever grateful to your team. Guys just go for it, they are most trustworthy.',
    initial: 'N',
    color: '#d4b878',
  },
  {
    id: 4,
    name: 'Gaayathri Devi Baalakrishnan',
    role: 'Home Owner',
    rating: 5,
    text: 'Hera construction shows their professionalism and quality in each and every step. We are very much pleased by the customer service, management and the whole team. Thanks for bringing our dream come true.',
    initial: 'G',
    color: '#c8a96e',
  },
  {
    id: 5,
    name: 'Pavithra P',
    role: 'Client',
    rating: 5,
    text: 'It was a pleasure to work with professionals that treated the project and jobsite as if it were their own property and building. Absolutely outstanding experience from start to finish.',
    initial: 'P',
    color: '#b8935a',
  },
  {
    id: 6,
    name: 'Anand Kumar',
    role: 'Business Owner',
    rating: 5,
    text: 'Hera Construction performed very professionally with great communication and excellent onsite project management. I would highly recommend them for any construction project without hesitation.',
    initial: 'A',
    color: '#d4b878',
  },
  {
    id: 7,
    name: 'Rajendran Mariyappan',
    role: 'Client',
    rating: 5,
    text: 'I strongly recommend Hera — the entire team tactfully delivered the project with exceptional quality, staying on schedule and under budget. Thank you Hera and team for this wonderful experience.',
    initial: 'R',
    color: '#c8a96e',
  },
];

function StarRating({ count = 5 }) {
  return (
    <div className="stars">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" width="14" fill="#c8a96e">
          <path d="M10 1l2.39 7.26H19l-5.44 3.95 2.08 7.26L10 15.27l-5.64 4.2 2.08-7.26L1 7.26h6.61z"/>
        </svg>
      ))}
      <style jsx>{`
        .stars { display:flex; gap:3px; align-items:center; }
      `}</style>
    </div>
  );
}

function useInView(ref, threshold = 0.1) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return inView;
}

export default function TestimonialsSection() {
  const sectionRef  = useRef(null);
  const trackRef    = useRef(null);
  const inView      = useInView(sectionRef);
  const [active, setActive]         = useState(0);
  const [prev, setPrev]             = useState(null);
  const [dir, setDir]               = useState(1);
  const [animating, setAnimating]   = useState(false);
  const [paused, setPaused]         = useState(false);
  const timerRef = useRef(null);

  const goTo = useCallback((next, direction = 1) => {
    if (animating || next === active) return;
    setAnimating(true);
    setDir(direction);
    setPrev(active);
    setActive(next);
    setTimeout(() => { setAnimating(false); setPrev(null); }, 600);
  }, [active, animating]);

  const next = useCallback(() => goTo((active + 1) % testimonials.length, 1),  [active, goTo]);
  const prev2 = useCallback(() => goTo((active - 1 + testimonials.length) % testimonials.length, -1), [active, goTo]);

  // Auto-play
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, 5000);
    return () => clearInterval(timerRef.current);
  }, [next, paused]);

  const t = testimonials[active];

  return (
    <section
      className="ts"
      ref={sectionRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* bg */}
      <div className="ts-bg-img" />
      <div className="ts-bg-overlay" />
      <div className="ts-noise" />

      <div className="ts-wrap">

        {/* ── HEADER ── */}
        <div className={`ts-head ${inView ? 'th-in' : ''}`}>
          <div className="ts-tag">
            <span className="ts-tl" /><span>Testimonials</span><span className="ts-tl" />
          </div>
          <h2 className="ts-h2">
            What Our <em className="ts-glow">Clients</em> Say
          </h2>
          <p className="ts-sub">
            Real stories from real homeowners — hear what our clients say about
            building their dream homes with Hera Construction.
          </p>
        </div>

        {/* ── MAIN TESTIMONIAL CARD ── */}
        <div className="ts-stage">

          {/* large decorative quote */}
          <div className={`ts-big-quote ${inView ? 'bq-in' : ''}`}>"</div>

          {/* card */}
          <div className="ts-card-wrap" ref={trackRef}>
            <div
              className={`ts-card ${animating ? (dir === 1 ? 'card-exit-l' : 'card-exit-r') : 'card-enter'}`}
              key={active}
            >
              {/* rainbow top glow line */}
              <div className="card-rainbow-top" />

              {/* stars */}
              <div className="card-stars">
                <StarRating count={t.rating} />
                <span className="stars-label">Verified Client</span>
              </div>

              {/* quote text */}
              <blockquote className="card-text">
                "{t.text}"
              </blockquote>

              {/* author */}
              <div className="card-author">
                <div
                  className="author-avatar"
                  style={{ background: `linear-gradient(135deg, ${t.color}, #2a1f0a)` }}
                >
                  <span className="avatar-initial">{t.initial}</span>
                  {/* rotating ring */}
                  <div className="avatar-ring" />
                </div>
                <div className="author-info">
                  <span className="author-name">{t.name}</span>
                  <span className="author-role">{t.role}</span>
                </div>
                {/* verified badge */}
                <div className="author-badge">
                  <svg viewBox="0 0 24 24" width="14" fill="#c8a96e">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="#c8a96e" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── NAV ARROWS ── */}
          <button className="ts-arr ts-arr-prev" onClick={prev2} aria-label="Previous">
            <svg viewBox="0 0 24 24" width="18" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="ts-arr ts-arr-next" onClick={next} aria-label="Next">
            <svg viewBox="0 0 24 24" width="18" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* ── PROGRESS DOTS ── */}
        <div className={`ts-dots ${inView ? 'td-in' : ''}`}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`ts-dot ${i === active ? 'dot-active' : ''}`}
              onClick={() => goTo(i, i > active ? 1 : -1)}
              aria-label={`Go to testimonial ${i + 1}`}
            >
              <span className="dot-fill" style={{ width: i === active ? '100%' : '0%' }} />
            </button>
          ))}
        </div>

        {/* ── MINI CARDS STRIP ── */}
        <div className={`ts-strip ${inView ? 'strip-in' : ''}`}>
          {testimonials.map((item, i) => (
            <button
              key={item.id}
              className={`strip-card ${i === active ? 'strip-active' : ''}`}
              onClick={() => goTo(i, i > active ? 1 : -1)}
            >
              <div
                className="strip-avatar"
                style={{ background: `linear-gradient(135deg, ${item.color}, #1a1108)` }}
              >
                {item.initial}
              </div>
              <div className="strip-info">
                <span className="strip-name">{item.name.split(' ')[0]}</span>
                <span className="strip-role">{item.role}</span>
              </div>
              {i === active && <span className="strip-active-dot" />}
            </button>
          ))}
        </div>

        {/* ── STATS ROW ── */}
        <div className={`ts-stats ${inView ? 'tstats-in' : ''}`}>
          {[
            { value: '160+', label: 'Happy Clients' },
            { value: '5★',   label: 'Average Rating' },
            { value: '8+',   label: 'Years Trust' },
            { value: '100%', label: 'Satisfaction' },
          ].map((s, i) => (
            <div key={i} className="ts-stat" style={{ transitionDelay: `${0.1 * i}s` }}>
              <span className="ts-stat-val">{s.value}</span>
              <span className="ts-stat-lbl">{s.label}</span>
            </div>
          ))}
        </div>

      </div>

      <style jsx>{`
        /* ══ SECTION ══ */
        .ts {
          position: relative;
          background: #080808;
          padding: clamp(70px,10vw,130px) 0;
          overflow: hidden;
        }

        /* bg texture */
        .ts-bg-img {
          position: absolute; inset: 0;
          background:
            linear-gradient(135deg, rgba(200,169,110,0.04) 0%, transparent 50%),
            linear-gradient(225deg, rgba(200,169,110,0.03) 0%, transparent 50%);
        }
        .ts-bg-overlay {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(200,169,110,0.07) 0%, transparent 70%);
        }
        .ts-noise {
          position: absolute; inset: 0; opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 160px; pointer-events: none;
        }

        .ts-wrap {
          position: relative; z-index: 1;
          max-width: 1100px; margin: 0 auto;
          padding: 0 clamp(20px,5vw,70px);
        }

        /* ══ HEADER ══ */
        .ts-head {
          text-align: center; margin-bottom: clamp(40px,6vw,72px);
          opacity: 0; transform: translateY(28px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .th-in { opacity:1; transform:translateY(0); }
        .ts-tag {
          display: inline-flex; align-items: center; gap: 14px;
          font-size: 0.67rem; font-weight: 700;
          letter-spacing: 0.3em; text-transform: uppercase;
          color: #c8a96e; margin-bottom: 14px;
        }
        .ts-tl { display:block; width:36px; height:1px; background:#c8a96e; }
        .ts-h2 {
          font-family: 'Georgia', serif;
          font-size: clamp(2rem,5vw,3.8rem);
          font-weight: 700; color: #fff;
          line-height: 1.1; margin: 0 0 14px;
        }
        .ts-glow {
          font-style: italic; color: #c8a96e;
          text-shadow:
            0 0 12px rgba(200,169,110,0.9),
            0 0 28px rgba(200,169,110,0.5),
            0 0 56px rgba(200,169,110,0.25);
          animation: gPulse 3s ease-in-out infinite;
        }
        @keyframes gPulse {
          0%,100% { text-shadow:0 0 12px rgba(200,169,110,0.9),0 0 28px rgba(200,169,110,0.5),0 0 56px rgba(200,169,110,0.25); }
          50%      { text-shadow:0 0 20px rgba(200,169,110,1),  0 0 44px rgba(200,169,110,0.7),0 0 85px rgba(200,169,110,0.38); }
        }
        .ts-sub {
          font-size: clamp(0.84rem,1.2vw,0.96rem);
          color: rgba(255,255,255,0.42); line-height: 1.8;
          max-width: 520px; margin: 0 auto;
        }

        /* ══ STAGE ══ */
        .ts-stage {
          position: relative;
          margin-bottom: 36px;
        }

        /* big quote mark */
        .ts-big-quote {
          position: absolute;
          top: -40px; left: -10px;
          font-family: 'Georgia', serif;
          font-size: clamp(8rem,14vw,14rem);
          font-weight: 900;
          color: rgba(200,169,110,0.07);
          line-height: 1;
          pointer-events: none;
          user-select: none;
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.8s 0.2s ease, transform 0.8s 0.2s ease;
          z-index: 0;
        }
        .bq-in { opacity:1; transform:translateY(0); }

        /* card wrap */
        .ts-card-wrap {
          position: relative; z-index: 1;
          perspective: 1200px;
        }

        /* ── card ── */
        .ts-card {
          background: rgba(16,14,10,0.92);
          border: 1px solid rgba(200,169,110,0.15);
          padding: clamp(28px,4vw,52px);
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(20px);
          box-shadow:
            0 32px 80px rgba(0,0,0,0.6),
            0 0 0 1px rgba(200,169,110,0.08),
            inset 0 1px 0 rgba(200,169,110,0.1);
        }
        /* animated gradient corner */
        .ts-card::before {
          content:'';
          position:absolute; top:0; right:0;
          width:240px; height:240px;
          background: radial-gradient(circle, rgba(200,169,110,0.08) 0%, transparent 70%);
          pointer-events:none;
        }
        .ts-card::after {
          content:'';
          position:absolute; bottom:0; left:0;
          width:180px; height:180px;
          background: radial-gradient(circle, rgba(200,169,110,0.05) 0%, transparent 70%);
          pointer-events:none;
        }

        /* rainbow top line */
        .card-rainbow-top {
          position: absolute; top:0; left:0; right:0; height:2px;
          background: linear-gradient(90deg,
            #ff0080, #ff8c00, #ffe000, #00ff80, #00bfff, #8000ff, #ff0080
          );
          background-size: 300% 100%;
          animation: rainbowSlide 4s linear infinite;
        }
        @keyframes rainbowSlide {
          0%   { background-position: 0% 0%; }
          100% { background-position: 300% 0%; }
        }

        /* card enter / exit */
        .card-enter {
          animation: cardIn 0.6s cubic-bezier(0.23,1,0.32,1) both;
        }
        .card-exit-l {
          animation: cardOutL 0.4s cubic-bezier(0.23,1,0.32,1) both;
        }
        .card-exit-r {
          animation: cardOutR 0.4s cubic-bezier(0.23,1,0.32,1) both;
        }
        @keyframes cardIn  { from{opacity:0;transform:translateX(40px) scale(0.97)} to{opacity:1;transform:translateX(0) scale(1)} }
        @keyframes cardOutL{ from{opacity:1;transform:translateX(0)}  to{opacity:0;transform:translateX(-40px)} }
        @keyframes cardOutR{ from{opacity:1;transform:translateX(0)}  to{opacity:0;transform:translateX(40px)} }

        /* stars */
        .card-stars {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 22px; position: relative; z-index:1;
        }
        .stars-label {
          font-size: 0.62rem; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(200,169,110,0.6);
          border-left: 1px solid rgba(200,169,110,0.3);
          padding-left: 10px;
        }

        /* quote text */
        .card-text {
          font-family: 'Georgia', serif;
          font-size: clamp(0.95rem,1.6vw,1.18rem);
          color: rgba(255,255,255,0.82);
          line-height: 1.85;
          margin: 0 0 32px;
          font-style: italic;
          position: relative; z-index:1;
        }

        /* author */
        .card-author {
          display: flex; align-items: center; gap: 16px;
          position: relative; z-index:1;
        }
        .author-avatar {
          position: relative;
          width: 54px; height: 54px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .avatar-initial {
          font-family: 'Georgia', serif;
          font-size: 1.3rem; font-weight: 700;
          color: #fff; position: relative; z-index:1;
        }
        .avatar-ring {
          position: absolute; inset: -3px; border-radius: 50%;
          border: 1.5px solid rgba(200,169,110,0.4);
          animation: ringRotate 8s linear infinite;
          border-top-color: #c8a96e;
        }
        @keyframes ringRotate { to { transform: rotate(360deg); } }

        .author-info { display: flex; flex-direction: column; gap: 2px; flex:1; }
        .author-name {
          font-size: 0.92rem; font-weight: 700;
          color: #fff; letter-spacing: 0.04em;
        }
        .author-role {
          font-size: 0.68rem; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(200,169,110,0.6);
        }

        .author-badge {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 5px 12px;
          border: 1px solid rgba(200,169,110,0.2);
          background: rgba(200,169,110,0.06);
          color: rgba(200,169,110,0.7);
          font-size: 0.62rem; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
        }

        /* ── nav arrows ── */
        .ts-arr {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 48px; height: 48px;
          background: rgba(10,10,10,0.8);
          border: 1px solid rgba(200,169,110,0.25);
          color: #c8a96e; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          z-index: 5;
          transition: all 0.3s;
        }
        .ts-arr:hover {
          background: #c8a96e; color: #0a0a0a;
          border-color: #c8a96e;
          box-shadow: 0 0 20px rgba(200,169,110,0.4);
        }
        .ts-arr-prev { left: -24px; }
        .ts-arr-next { right: -24px; }

        /* ══ DOTS ══ */
        .ts-dots {
          display: flex; justify-content: center; gap: 8px;
          margin-bottom: 40px;
          opacity:0; transform:translateY(12px);
          transition:opacity 0.6s 0.3s ease, transform 0.6s 0.3s ease;
        }
        .td-in { opacity:1; transform:translateY(0); }
        .ts-dot {
          width: 36px; height: 3px;
          background: rgba(255,255,255,0.12);
          border: none; cursor: pointer; padding: 0;
          position: relative; overflow: hidden;
          transition: background 0.3s;
        }
        .dot-active { background: rgba(200,169,110,0.25); }
        .dot-fill {
          position: absolute; left:0; top:0; bottom:0;
          background: #c8a96e;
          transition: width 5s linear;
        }

        /* ══ MINI STRIP ══ */
        .ts-strip {
          display: flex; gap: 10px; flex-wrap: wrap; justify-content: center;
          margin-bottom: 56px;
          opacity:0; transform:translateY(14px);
          transition:opacity 0.6s 0.35s ease, transform 0.6s 0.35s ease;
        }
        .strip-in { opacity:1; transform:translateY(0); }
        .strip-card {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 14px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          cursor: pointer; position: relative;
          transition: all 0.25s;
        }
        .strip-card:hover { border-color: rgba(200,169,110,0.3); }
        .strip-active {
          border-color: rgba(200,169,110,0.4) !important;
          background: rgba(200,169,110,0.06) !important;
        }
        .strip-avatar {
          width: 32px; height: 32px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Georgia', serif; font-size: 0.82rem;
          font-weight: 700; color: #fff; flex-shrink: 0;
        }
        .strip-info { display: flex; flex-direction: column; gap: 1px; }
        .strip-name {
          font-size: 0.74rem; font-weight: 700;
          color: rgba(255,255,255,0.75); letter-spacing: 0.04em;
        }
        .strip-role {
          font-size: 0.6rem; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: rgba(200,169,110,0.5);
        }
        .strip-active-dot {
          position: absolute; top: 6px; right: 6px;
          width: 6px; height: 6px; border-radius: 50%;
          background: #c8a96e;
          box-shadow: 0 0 8px rgba(200,169,110,0.8);
        }

        /* ══ STATS ══ */
        .ts-stats {
          display: grid; grid-template-columns: repeat(4,1fr);
          border: 1px solid rgba(200,169,110,0.12);
          opacity:0; transform:translateY(16px);
          transition:opacity 0.6s 0.4s ease, transform 0.6s 0.4s ease;
        }
        .tstats-in { opacity:1; transform:translateY(0); }
        .ts-stat {
          display: flex; flex-direction: column; align-items: center;
          padding: clamp(20px,3vw,32px) 16px;
          border-right: 1px solid rgba(200,169,110,0.12);
          gap: 4px; transition: background 0.3s;
        }
        .ts-stat:last-child { border-right: none; }
        .ts-stat:hover { background: rgba(200,169,110,0.04); }
        .ts-stat-val {
          font-family: 'Georgia', serif;
          font-size: clamp(1.4rem,2.8vw,2.2rem);
          font-weight: 700; color: #c8a96e; line-height: 1;
        }
        .ts-stat-lbl {
          font-size: 0.65rem; font-weight: 700;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: rgba(255,255,255,0.35); text-align: center;
        }

        /* ══ RESPONSIVE ══ */
        @media (max-width: 768px) {
          .ts-arr-prev { left: -12px; }
          .ts-arr-next { right: -12px; }
          .ts-arr { width: 40px; height: 40px; }
          .ts-stats { grid-template-columns: repeat(2,1fr); }
          .ts-stat:nth-child(2) { border-right: none; }
          .ts-stat:nth-child(3) { border-top: 1px solid rgba(200,169,110,0.12); }
          .ts-stat:nth-child(4) { border-right: none; border-top: 1px solid rgba(200,169,110,0.12); }
          .ts-strip { gap: 8px; }
          .strip-card { padding: 8px 10px; }
          .ts-big-quote { display: none; }
        }
        @media (max-width: 500px) {
          .ts-arr-prev { left: -4px; }
          .ts-arr-next { right: -4px; }
          .author-badge { display: none; }
          .ts-wrap { padding: 0 clamp(20px,5vw,70px); }
          .strip-info { display: none; }
          .strip-card { padding: 8px; }
 }
      `}</style>
    </section>
  );
}