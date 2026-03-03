'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/* ── animated  ook ── */
function useCounter(target, inView, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);
  return count;
}

function useInView(ref, threshold = 0.15) {
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

const stats = [
  { icon: '✦', value: 3000, suffix: '+', label: 'Design Drawings' },
  { icon: '✦', value: 220,  suffix: '+', label: 'Projects Completed' },
  { icon: '✦', value: 160,  suffix: '+', label: 'Happy Clients' },
  { icon: '✦', value: 15,   suffix: '+', label: 'Projects Running' },
];

const capabilities = [
  { label: 'Residential Building',   icon: '🏠' },
  { label: 'Renovation Works',       icon: '🔨' },
  { label: '3D Designing',           icon: '📐' },
  { label: 'Commercial Space',       icon: '🏢' },
];

function StatCard({ stat, inView, delay }) {
  const count = useCounter(stat.value, inView, 2200);
  return (
    <div
      className={`stat-card ${inView ? 'stat-visible' : ''}`}
      style={{ transitionDelay: delay }}
    >
      <div className="stat-icon-wrap">
        <div className="stat-ring" />
        <span className="stat-icon">{stat.icon}</span>
      </div>
      <div className="stat-body">
        <span className="stat-value">
          {count.toLocaleString()}
          <span className="stat-suffix">{stat.suffix}</span>
        </span>
        <span className="stat-label">{stat.label}</span>
      </div>
    </div>
  );
}

export default function AboutSection() {
  const sectionRef  = useRef(null);
  const inView      = useInView(sectionRef, 0.1);

  return (
    <section className="about-section" ref={sectionRef}>
      {/* subtle bg */}
      <div className="about-bg-glow" />
      <div className="about-bg-grid" />

      <div className="about-container">

       {/* LEFT — Images */}
        <div className={`about-images ${inView ? 'imgs-visible' : ''}`}>
          {/* main image */}
          <div className="main-img-wrap">
            <Image
              src="/img4.jpg"
              alt="BOO Construction building"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              sizes="(max-width:900px) 100vw, 45vw"
            />
            <div className="main-img-overlay" />
          </div>

          {/* accent small image */}
          <div className="accent-img-wrap">
            <Image
              src="/img2.jpg"
              alt="BOO Construction interior"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              sizes="200px"
            />
            <div className="accent-img-overlay" />
          </div>

          {/* experience badge */}
          <div className="exp-badge">
            <span className="exp-num">8</span>
            <span className="exp-years">Years</span>
            <span className="exp-sub">Experience</span>
          </div>

          {/* decorative corner frames */}
          <div className="corner-frame corner-tl" />
          <div className="corner-frame corner-br" />
        </div>

        {/* ═══ RIGHT — Content ═══ */}
        <div className="about-content">

          {/* tag */}
          <div className={`about-tag ${inView ? 'tag-visible' : ''}`}>
            <span className="tag-line" />
            <span>About Us</span>
          </div>

          {/* heading */}
          <h2 className={`about-title ${inView ? 'title-visible' : ''}`}>
            About{' '}
            <em className="glow-gold">BOO</em>
            {' '}Construction
          </h2>

          {/* body text */}
          <p className={`about-body ${inView ? 'body-visible' : ''}`}>
            BOO Construction Company is a prominent construction firm with{' '}
            <strong className="highlight-gold">8 years of experience</strong> in the
            building industry, serving clients across Tamil Nadu. Our dynamic team
            comprises young and talented minds, dedicated to delivering cutting-edge
            solutions with a focus on innovation and aesthetic designs.
          </p>
          <p className={`about-body about-body-2 ${inView ? 'body-visible' : ''}`}>
            We take pride in transforming your dreams into architectural marvels that
            stand the test of time. Trust Hera Construction for your construction
            needs, as we redefine excellence in the field of building and design
            throughout Tamil Nadu.
          </p>

          {/* capabilities grid */}
          <div className={`capabilities-grid ${inView ? 'caps-visible' : ''}`}>
            {capabilities.map((cap, i) => (
              <div
                key={i}
                className="cap-item"
                style={{ transitionDelay: `${0.4 + i * 0.08}s` }}
              >
                <span className="cap-dot" />
                <span className="cap-label">{cap.label}</span>
              </div>
            ))}
          </div>

          {/* read more */}
          <div className={`about-actions ${inView ? 'actions-visible' : ''}`}>
            <Link href="/about" className="read-more-btn">
              <span>Read More</span>
              <svg viewBox="0 0 24 24" width="15" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <a
              href="tel:9944624724"
              className="call-btn"
            >
              <svg viewBox="0 0 24 24" width="16" fill="currentColor">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
              </svg>
              99446 24724
            </a>
          </div>
        </div>
      </div>

      {/* STATS STRIP  */}
      <div className="stats-strip">
        <div className="stats-inner">
          {stats.map((stat, i) => (
            <StatCard
              key={i}
              stat={stat}
              inView={inView}
              delay={`${0.5 + i * 0.12}s`}
            />
          ))}
        </div>
      </div>

      {/* ── Styles ── */}
      <style jsx>{`
        .about-section {
          position: relative;
          background: #0a0a0a;
          padding: clamp(70px, 10vw, 130px) 0 0;
          overflow: hidden;
        }
        .about-bg-glow {
          position: absolute;
          width: 700px; height: 700px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(200,169,110,0.07) 0%, transparent 70%);
          top: -200px; right: -200px;
          pointer-events: none;
        }
        .about-bg-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(200,169,110,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,169,110,0.025) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        /* Container */
        .about-container {
          position: relative; z-index: 1;
          max-width: 1300px; margin: 0 auto;
          padding: 0 clamp(20px,5vw,70px) clamp(60px,8vw,100px);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(40px, 6vw, 90px);
          align-items: center;
        }

        /* ── Images ── */
        .about-images {
          position: relative;
          opacity: 0; transform: translateX(-36px);
          transition: opacity 0.9s cubic-bezier(0.23,1,0.32,1),
                      transform 0.9s cubic-bezier(0.23,1,0.32,1);
        }
        .imgs-visible { opacity: 1; transform: translateX(0); }

        .main-img-wrap {
          position: relative;
          width: 100%; aspect-ratio: 4/5;
          overflow: hidden;
        }
        .main-img-overlay {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(180deg, rgba(10,10,10,0.05) 0%, rgba(10,10,10,0.4) 100%);
        }

        /* accent small image — overlapping bottom right */
        .accent-img-wrap {
          position: absolute;
          bottom: -36px; right: -32px;
          width: 44%; aspect-ratio: 1/1;
          overflow: hidden;
          border: 3px solid #0a0a0a;
          z-index: 2;
        }
        .accent-img-overlay {
          position: absolute; inset: 0; z-index: 1;
          background: rgba(10,10,10,0.15);
        }

        /* exp badge */
        .exp-badge {
          position: absolute;
          top: 28px; left: -22px;
          z-index: 3;
          background: #c8a96e;
          padding: 18px 16px;
          display: flex; flex-direction: column;
          align-items: center; gap: 1px;
          box-shadow: 0 10px 40px rgba(200,169,110,0.45),
                      0 0 0 1px rgba(200,169,110,0.3);
        }
        .exp-num {
          font-family: 'Georgia', serif;
          font-size: 2.4rem; font-weight: 700;
          color: #0a0a0a; line-height: 1;
        }
        .exp-years {
          font-size: 0.72rem; font-weight: 800;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: rgba(10,10,10,0.75);
        }
        .exp-sub {
          font-size: 0.56rem; font-weight: 600;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(10,10,10,0.55);
        }

        /* corner frames */
        .corner-frame {
          position: absolute; width: 50px; height: 50px;
          pointer-events: none; z-index: 4;
        }
        .corner-tl {
          top: -8px; left: -8px;
          border-top: 2px solid rgba(200,169,110,0.5);
          border-left: 2px solid rgba(200,169,110,0.5);
        }
        .corner-br {
          bottom: -44px; right: -38px;
          border-bottom: 2px solid rgba(200,169,110,0.5);
          border-right: 2px solid rgba(200,169,110,0.5);
        }

        /* ── Content ── */
        .about-content { display: flex; flex-direction: column; gap: 0; }

        .about-tag {
          display: inline-flex; align-items: center; gap: 12px;
          font-size: 0.68rem; font-weight: 700;
          letter-spacing: 0.28em; text-transform: uppercase;
          color: #c8a96e; margin-bottom: 14px;
          opacity: 0; transform: translateY(16px);
          transition: opacity 0.6s 0.1s ease, transform 0.6s 0.1s ease;
        }
        .tag-visible { opacity: 1; transform: translateY(0); }
        .tag-line { display: block; width: 28px; height: 1px; background: #c8a96e; }

        .about-title {
          font-family: 'Georgia', serif;
          font-size: clamp(1.9rem, 4vw, 3.2rem);
          font-weight: 700; color: #fff; line-height: 1.1;
          margin: 0 0 22px; letter-spacing: -0.01em;
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.7s 0.18s ease, transform 0.7s 0.18s ease;
        }
        .title-visible { opacity: 1; transform: translateY(0); }

        /* glow gold — matches services section */
        .glow-gold {
          font-style: italic; color: #c8a96e;
          text-shadow:
            0 0 10px rgba(200,169,110,0.85),
            0 0 25px rgba(200,169,110,0.45),
            0 0 50px rgba(200,169,110,0.22);
          animation: glowPulse 3s ease-in-out infinite;
        }
        @keyframes glowPulse {
          0%,100% {
            text-shadow: 0 0 10px rgba(200,169,110,0.85), 0 0 25px rgba(200,169,110,0.45), 0 0 50px rgba(200,169,110,0.22);
          }
          50% {
            text-shadow: 0 0 16px rgba(200,169,110,1), 0 0 38px rgba(200,169,110,0.65), 0 0 75px rgba(200,169,110,0.35);
          }
        }

        .highlight-gold { color: #c8a96e; font-weight: 700; font-style: normal; }

        .about-body {
          font-size: clamp(0.84rem, 1.2vw, 0.95rem);
          color: rgba(255,255,255,0.5); line-height: 1.82;
          margin: 0 0 14px;
          opacity: 0; transform: translateY(16px);
          transition: opacity 0.7s 0.28s ease, transform 0.7s 0.28s ease;
        }
        .about-body-2 { transition-delay: 0.36s !important; }
        .body-visible { opacity: 1; transform: translateY(0); }

        /* capabilities */
        .capabilities-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px 16px;
          margin: 20px 0 28px;
          opacity: 0; transform: translateY(14px);
          transition: opacity 0.6s 0.4s ease, transform 0.6s 0.4s ease;
        }
        .caps-visible { opacity: 1; transform: translateY(0); }
        .cap-item {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 14px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          transition: border-color 0.3s, background 0.3s;
        }
        .cap-item:hover {
          border-color: rgba(200,169,110,0.3);
          background: rgba(200,169,110,0.05);
        }
        .cap-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #c8a96e; flex-shrink: 0;
          box-shadow: 0 0 8px rgba(200,169,110,0.6);
        }
        .cap-label {
          font-size: 0.78rem; font-weight: 600;
          letter-spacing: 0.06em; color: rgba(255,255,255,0.7);
        }

        /* actions */
        .about-actions {
          display: flex; align-items: center; gap: 20px; flex-wrap: wrap;
          opacity: 0; transform: translateY(14px);
          transition: opacity 0.6s 0.55s ease, transform 0.6s 0.55s ease;
        }
        .actions-visible { opacity: 1; transform: translateY(0); }

        .read-more-btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 13px 28px;
          background: #c8a96e; color: #0a0a0a;
          font-size: 0.76rem; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          text-decoration: none;
          position: relative; overflow: hidden; transition: color 0.35s;
        }
        .read-more-btn::before {
          content: ''; position: absolute; inset: 0;
          background: #0a0a0a;
          transform: translateX(-100%);
          transition: transform 0.35s cubic-bezier(0.23,1,0.32,1);
        }
        .read-more-btn:hover::before { transform: translateX(0); }
        .read-more-btn:hover { color: #c8a96e; }
        .read-more-btn span, .read-more-btn svg { position: relative; z-index: 1; }

        .call-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 22px;
          border: 1px solid rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.7);
          font-size: 0.82rem; font-weight: 600;
          letter-spacing: 0.06em; text-decoration: none;
          transition: all 0.3s;
        }
        .call-btn:hover {
          border-color: #c8a96e;
          color: #c8a96e;
          background: rgba(200,169,110,0.06);
        }

        /* ── Stats Strip ── */
        .stats-strip {
          position: relative; z-index: 1;
          background: #111;
          border-top: 1px solid rgba(200,169,110,0.15);
        }
        .stats-inner {
          max-width: 1300px; margin: 0 auto;
          padding: 0 clamp(20px,5vw,70px);
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }

        .stat-card {
          display: flex; align-items: center; gap: 16px;
          padding: clamp(24px,3vw,40px) clamp(16px,2vw,32px);
          border-right: 1px solid rgba(255,255,255,0.06);
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.6s cubic-bezier(0.23,1,0.32,1),
                      transform 0.6s cubic-bezier(0.23,1,0.32,1);
          cursor: default;
        }
        .stat-card:last-child { border-right: none; }
        .stat-visible { opacity: 1; transform: translateY(0); }
        .stat-card:hover .stat-ring { transform: scale(1.2); opacity: 0.6; }

        .stat-icon-wrap {
          position: relative; width: 44px; height: 44px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .stat-ring {
          position: absolute; inset: 0;
          border: 1px solid rgba(200,169,110,0.25);
          border-radius: 50%;
          transition: transform 0.4s, opacity 0.4s;
        }
        .stat-icon { font-size: 1rem; color: #c8a96e; position: relative; z-index: 1; }

        .stat-body { display: flex; flex-direction: column; gap: 2px; }
        .stat-value {
          font-family: 'Georgia', serif;
          font-size: clamp(1.6rem, 2.5vw, 2.4rem);
          font-weight: 700; color: #fff; line-height: 1;
        }
        .stat-suffix { color: #c8a96e; margin-left: 2px; }
        .stat-label {
          font-size: 0.68rem; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(255,255,255,0.4);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .about-container { grid-template-columns: 1fr; gap: 48px; }
          .about-images { max-width: 520px; margin: 0 auto; }
          .stats-inner { grid-template-columns: repeat(2, 1fr); }
          .stat-card:nth-child(2) { border-right: none; }
          .stat-card:nth-child(3) { border-top: 1px solid rgba(255,255,255,0.06); }
          .stat-card:nth-child(4) { border-right: none; border-top: 1px solid rgba(255,255,255,0.06); }
        }
        @media (max-width: 560px) {
          .capabilities-grid { grid-template-columns: 1fr; }
          .about-images { max-width: 100%; }
          .accent-img-wrap { width: 40%; bottom: -24px; right: -12px; }
          .exp-badge { left: -8px; }
          .stats-inner { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </section>
  );
}