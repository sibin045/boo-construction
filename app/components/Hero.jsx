'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const slides = [
  {
    id: 1,
    label: 'Builders of Excellence',
    highlight: 'Excellence',
    subtitle: 'Award-winning construction firm with 8 years of transforming visions into architectural masterpieces across Tamil Nadu.',
    letter: 'E',
    bg: '/img1.jpg',
  },
  {
    id: 2,
    label: 'We Value Your Dream',
    highlight: 'Dream',
    subtitle: 'Every project is a promise — we bring innovation, aesthetics, and reliability to craft spaces you will cherish forever.',
    letter: 'D',
    bg: '/img2.jpg',
  },
  {
    id: 3,
    label: 'Make True Your Dream',
    highlight: 'True',
    subtitle: 'From foundation to finish, our passionate team delivers your dream home with precision, beauty, and lasting quality.',
    letter: 'T',
    bg: '/img3.jpg',
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  const progressRef = useRef(null);

  const goTo = (index) => {
    if (animating || index === current) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setProgress(0);
      setAnimating(false);
    }, 700);
  };

  const next = () => goTo((current + 1) % slides.length);

  // Auto-play
  useEffect(() => {
    intervalRef.current = setInterval(next, 5500);
    return () => clearInterval(intervalRef.current);
  }, [current, animating]);

  // Progress bar
  useEffect(() => {
    setProgress(0);
    const start = Date.now();
    const duration = 5500;
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
      if (pct < 100) progressRef.current = requestAnimationFrame(tick);
    };
    progressRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(progressRef.current);
  }, [current]);

  const slide = slides[current];

  return (
    <section className="hero">
      {/* Background images */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`hero-bg ${i === current ? 'hero-bg-active' : ''} ${animating && i === current ? 'hero-bg-out' : ''}`}
          style={{ backgroundImage: `url(${s.bg})` }}
        />
      ))}

      {/* Dark overlay */}
      <div className="hero-overlay" />

      {/* Animated grain texture */}
      <div className="hero-grain" />

      {/* Floating big letter */}
      <div className={`hero-giant-letter ${animating ? 'letter-exit' : 'letter-enter'}`}>
        {slide.letter}
      </div>

      {/* Vertical line decoration */}
      <div className="hero-vline" />

      {/* Content */}
      <div className="hero-content">
        <div className={`hero-tag ${animating ? 'tag-exit' : 'tag-enter'}`}>
          <span className="tag-line" />
          <span className="tag-text">Premium Construction • Tamil Nadu</span>
        </div>

        <h1 className={`hero-title ${animating ? 'title-exit' : 'title-enter'}`}>
          {slide.label.split(slide.highlight).map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && (
                <em className="hero-highlight">{slide.highlight}</em>
              )}
            </span>
          ))}
        </h1>

        <p className={`hero-subtitle ${animating ? 'sub-exit' : 'sub-enter'}`}>
          {slide.subtitle}
        </p>

        <div className={`hero-actions ${animating ? 'actions-exit' : 'actions-enter'}`}>
          <a
            href="https://wa.me/9944624724?text=I%20want%20to%20get%20a%20Quote%20for%20my%20house"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <span>Get Free Quote</span>
            <svg viewBox="0 0 24 24" width="16" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <Link href="/projects/completed" className="btn-secondary">
            View Projects
          </Link>
        </div>

        {/* Stats row */}
        <div className={`hero-stats ${animating ? 'stats-exit' : 'stats-enter'}`}>
          {[
            { value: '8+', label: 'Years Experience' },
            { value: '220+', label: 'Projects Done' },
            { value: '160+', label: 'Happy Clients' },
            { value: '15+', label: 'Running Now' },
          ].map((stat, i) => (
            <div key={i} className="hero-stat">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Slide controls */}
      <div className="hero-controls">
        {slides.map((s, i) => (
          <button
            key={i}
            className={`slide-dot ${i === current ? 'slide-dot-active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          >
            <span
              className="dot-progress"
              style={{ width: i === current ? `${progress}%` : i < current ? '100%' : '0%' }}
            />
          </button>
        ))}
      </div>

      {/* Slide number */}
      <div className="hero-counter">
        <span className="counter-current">0{current + 1}</span>
        <span className="counter-sep" />
        <span className="counter-total">0{slides.length}</span>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll">
        <div className="scroll-line">
          <div className="scroll-dot" />
        </div>
        <span className="scroll-label">Scroll Down</span>
      </div>

      {/* ── Styles ── */}
      <style jsx>{`
        .hero {
          position: relative;
          width: 100%;
          height: 100svh;
          min-height: 600px;
          overflow: hidden;
          display: flex;
          align-items: center;
        }

        /* Backgrounds */
        .hero-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          opacity: 0;
          transform: scale(1.08);
          transition: opacity 0.9s cubic-bezier(0.23, 1, 0.32, 1),
                      transform 6s cubic-bezier(0.23, 1, 0.32, 1);
          will-change: transform, opacity;
        }
        .hero-bg-active {
          opacity: 1;
          transform: scale(1);
        }
        .hero-bg-out {
          opacity: 0;
          transform: scale(0.96);
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            rgba(5, 5, 5, 0.82) 0%,
            rgba(5, 5, 5, 0.55) 55%,
            rgba(5, 5, 5, 0.3) 100%
          );
          z-index: 1;
        }

        /* Grain */
        .hero-grain {
          position: absolute;
          inset: 0;
          z-index: 2;
          opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 180px;
          pointer-events: none;
        }

        /* Giant letter */
        .hero-giant-letter {
          position: absolute;
          right: 6vw;
          top: 50%;
          transform: translateY(-50%);
          font-family: 'Georgia', serif;
          font-size: clamp(18rem, 28vw, 32rem);
          font-weight: 900;
          color: transparent;
          -webkit-text-stroke: 1px rgba(200, 169, 110, 0.12);
          line-height: 1;
          z-index: 2;
          user-select: none;
          pointer-events: none;
        }
        .letter-enter {
          animation: letterIn 0.9s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }
        .letter-exit {
          animation: letterOut 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }
        @keyframes letterIn {
          from { opacity: 0; transform: translateY(-45%) translateX(40px); }
          to   { opacity: 1; transform: translateY(-50%) translateX(0); }
        }
        @keyframes letterOut {
          from { opacity: 1; transform: translateY(-50%) translateX(0); }
          to   { opacity: 0; transform: translateY(-55%) translateX(-20px); }
        }

        /* Vertical line */
        .hero-vline {
          position: absolute;
          left: clamp(20px, 6vw, 80px);
          top: 0; bottom: 0;
          width: 1px;
          background: linear-gradient(to bottom, transparent 0%, rgba(200,169,110,0.3) 30%, rgba(200,169,110,0.3) 70%, transparent 100%);
          z-index: 3;
        }

        /* Content */
        .hero-content {
          position: relative;
          z-index: 4;
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 clamp(32px, 8vw, 120px);
          padding-top: 80px;
          width: 100%;
        }

        /* Tag */
        .hero-tag {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 24px;
        }
        .tag-line {
          display: block;
          width: 40px;
          height: 1px;
          background: #c8a96e;
        }
        .tag-text {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #c8a96e;
        }
        .tag-enter { animation: fadeUp 0.7s 0.1s cubic-bezier(0.23,1,0.32,1) both; }
        .tag-exit  { animation: fadeDown 0.5s cubic-bezier(0.23,1,0.32,1) both; }

        /* Title */
        .hero-title {
          font-family: 'Georgia', serif;
          font-size: clamp(2.4rem, 6.5vw, 6rem);
          font-weight: 700;
          color: #fff;
          line-height: 1.08;
          letter-spacing: -0.01em;
          max-width: 680px;
          margin: 0 0 24px;
        }
        .hero-highlight {
          font-style: italic;
          color: #c8a96e;
          position: relative;
        }
        .hero-highlight::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 0; right: 0;
          height: 2px;
          background: #c8a96e;
          opacity: 0.4;
        }
        .title-enter { animation: fadeUp 0.8s 0.25s cubic-bezier(0.23,1,0.32,1) both; }
        .title-exit  { animation: fadeDown 0.5s 0.05s cubic-bezier(0.23,1,0.32,1) both; }

        /* Subtitle */
        .hero-subtitle {
          font-size: clamp(0.88rem, 1.4vw, 1.05rem);
          color: rgba(255,255,255,0.65);
          line-height: 1.75;
          max-width: 500px;
          margin: 0 0 36px;
        }
        .sub-enter { animation: fadeUp 0.8s 0.38s cubic-bezier(0.23,1,0.32,1) both; }
        .sub-exit  { animation: fadeDown 0.5s 0.08s cubic-bezier(0.23,1,0.32,1) both; }

        /* Actions */
        .hero-actions {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 56px;
        }
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 30px;
          background: #c8a96e;
          color: #0a0a0a;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          transition: color 0.35s;
        }
        .btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #fff;
          transform: translateX(-100%);
          transition: transform 0.35s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .btn-primary:hover::before { transform: translateX(0); }
        .btn-primary:hover { color: #0a0a0a; }
        .btn-primary span, .btn-primary svg { position: relative; z-index: 1; }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 28px;
          border: 1px solid rgba(255,255,255,0.3);
          color: rgba(255,255,255,0.85);
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          text-decoration: none;
          transition: all 0.3s;
        }
        .btn-secondary:hover {
          border-color: #c8a96e;
          color: #c8a96e;
          background: rgba(200,169,110,0.06);
        }

        .actions-enter { animation: fadeUp 0.8s 0.48s cubic-bezier(0.23,1,0.32,1) both; }
        .actions-exit  { animation: fadeDown 0.5s 0.1s cubic-bezier(0.23,1,0.32,1) both; }

        /* Stats */
        .hero-stats {
          display: flex;
          gap: clamp(20px, 4vw, 56px);
          flex-wrap: wrap;
        }
        .hero-stat {
          display: flex;
          flex-direction: column;
          gap: 2px;
          position: relative;
          padding-left: 14px;
        }
        .hero-stat::before {
          content: '';
          position: absolute;
          left: 0; top: 4px; bottom: 4px;
          width: 2px;
          background: #c8a96e;
        }
        .stat-value {
          font-family: 'Georgia', serif;
          font-size: clamp(1.5rem, 3vw, 2.2rem);
          font-weight: 700;
          color: #fff;
          line-height: 1;
        }
        .stat-label {
          font-size: 0.68rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
        }
        .stats-enter { animation: fadeUp 0.8s 0.6s cubic-bezier(0.23,1,0.32,1) both; }
        .stats-exit  { animation: fadeDown 0.5s 0.12s cubic-bezier(0.23,1,0.32,1) both; }

        /* Slide dots */
        .hero-controls {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 5;
          display: flex;
          gap: 10px;
        }
        .slide-dot {
          width: 48px;
          height: 2px;
          background: rgba(255,255,255,0.2);
          border: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          padding: 0;
          transition: background 0.3s;
        }
        .slide-dot-active { background: rgba(255,255,255,0.3); }
        .dot-progress {
          position: absolute;
          left: 0; top: 0; bottom: 0;
          background: #c8a96e;
          transition: width 0.1s linear;
        }

        /* Counter */
        .hero-counter {
          position: absolute;
          right: clamp(20px, 4vw, 56px);
          bottom: 40px;
          z-index: 5;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .counter-current {
          font-family: 'Georgia', serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #c8a96e;
        }
        .counter-sep {
          display: block;
          width: 24px;
          height: 1px;
          background: rgba(255,255,255,0.3);
        }
        .counter-total {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.4);
          letter-spacing: 0.1em;
        }

        /* Scroll indicator */
        .hero-scroll {
          position: absolute;
          left: clamp(20px, 4vw, 56px);
          bottom: 36px;
          z-index: 5;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .scroll-line {
          width: 1px;
          height: 44px;
          background: rgba(255,255,255,0.15);
          position: relative;
          overflow: hidden;
        }
        .scroll-dot {
          position: absolute;
          top: -6px;
          left: -2px;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #c8a96e;
          animation: scrollDrop 1.8s ease-in-out infinite;
        }
        @keyframes scrollDrop {
          0%   { top: -6px; opacity: 1; }
          80%  { top: 44px; opacity: 1; }
          100% { top: 44px; opacity: 0; }
        }
        .scroll-label {
          font-size: 0.62rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          writing-mode: vertical-rl;
          transform: rotate(180deg);
        }

        /* Keyframes */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeDown {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(-20px); }
        }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .hero-content { padding: 0 24px; padding-top: 80px; }
          .hero-giant-letter { font-size: 40vw; right: -5vw; opacity: 0.6; }
          .hero-title { font-size: clamp(2rem, 9vw, 3rem); }
          .hero-stats { gap: 20px; }
          .hero-counter { display: none; }
          .hero-scroll { display: none; }
          .hero-controls { bottom: 24px; }
        }
        @media (max-width: 480px) {
          .hero-actions { gap: 12px; }
          .btn-primary, .btn-secondary { padding: 12px 20px; font-size: 0.72rem; }
          .hero-stats { gap: 16px; }
          .stat-value { font-size: 1.4rem; }
        }
      `}</style>
    </section>
  );
}