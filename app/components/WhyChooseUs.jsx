'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const reasons = [
  {
    number: '01',
    image: '/img1.jpg',
    tag: 'Expert Team',
    title: 'Expert Team',
    desc: 'Our team of architects, engineers, designers, and skilled laborers possesses extensive experience in the construction industry. They are well-versed in the latest construction techniques and trends, ensuring the best possible outcomes for your projects.',
  },
  {
    number: '02',
    image: '/img3.jpg',
    tag: 'Best Quality',
    title: 'Best Quality',
    desc: 'We source materials from trusted suppliers, ensuring that your building stands the test of time. Our commitment to using premium materials reflects in the durability and excellence of our constructions.',
  },
  {
    number: '03',
    image: '/img8.jpg',
    tag: 'Delivery Timing',
    title: 'Delivery Timing',
    desc: 'At BOO Construction, we understand the value of time. Our streamlined processes and efficient project management enable us to deliver projects on schedule, without compromising on quality.',
  },
];

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

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef);
  const [hovered, setHovered] = useState(null);

  return (
    <section className="wcu" ref={sectionRef}>
      <div className="wcu-bg-glow" />
      <div className="wcu-bg-grid" />

      <div className="wcu-container">

        {/* ── LEFT: Sticky Header + Image ── */}
        <div className={`wcu-left ${inView ? 'left-in' : ''}`}>
          <div className="wcu-left-inner">
            <div className="section-tag">
              <span className="tag-line" />
              <span>Why Choose Us</span>
            </div>
            <h2 className="wcu-title">
              Latest<br />
              <em className="wcu-glow">Why</em>{' '}
              Choose Us
            </h2>
            <p className="wcu-subtitle">
              Eight years of excellence, innovation, and trust — delivering
              dream homes across Tamil Nadu with unmatched quality and care.
            </p>

            {/* small image block */}
            <div className="wcu-left-img">
              <Image
                src="/img4.jpg"
                alt="Hera Construction"
                fill
                style={{ objectFit: 'cover' }}
                sizes="480px"
              />
              <div className="wli-overlay" />
              {/* experience badge */}
              <div className="wli-badge">
                <span className="badge-num">8</span>
                <span className="badge-yr">Years</span>
                <span className="badge-sub">Excellence</span>
              </div>
            </div>

            <a
              href="https://wa.me/9944624724?text=I%20want%20to%20get%20a%20Quote%20for%20my%20house"
              target="_blank"
              rel="noopener noreferrer"
              className="wcu-quote-btn"
            >
              <span>Get Free Quote</span>
              <svg viewBox="0 0 24 24" width="15" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>

        {/* ── RIGHT: Blog-style cards ── */}
        <div className="wcu-right">
          {reasons.map((item, i) => (
            <div
              key={i}
              className={`wcu-card ${inView ? 'card-in' : ''} ${hovered === i ? 'card-hov' : ''}`}
              style={{ transitionDelay: `${0.15 + i * 0.13}s` }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* left image column */}
              <div className="wcc-img-col">
                <div className="wcc-img-wrap">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    style={{
                      objectFit: 'cover',
                      transform: hovered === i ? 'scale(1.07)' : 'scale(1)',
                      transition: 'transform 0.8s cubic-bezier(0.23,1,0.32,1)',
                    }}
                    sizes="200px"
                  />
                  <div className="wcc-img-overlay" />
                  {/* shimmer */}
                  <div className={`wcc-shimmer ${hovered === i ? 'sh-on' : ''}`} />
                </div>
                {/* number over image */}
                <div className="wcc-num">{item.number}</div>
              </div>

              {/* right content */}
              <div className="wcc-content">
                {/* top bar */}
                <div className={`wcc-bar ${hovered === i ? 'bar-expand' : ''}`} />

                <p className="wcc-tag">{item.tag}</p>
                <h3 className={`wcc-title ${hovered === i ? 'title-lit' : ''}`}>{item.title}</h3>
                <p className="wcc-desc">{item.desc}</p>

                <Link href="/about" className="wcc-more">
                  More Details
                  <span className={`more-arrow ${hovered === i ? 'arrow-slide' : ''}`}>
                    <svg viewBox="0 0 20 20" width="13" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M4 10h12M10 4l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </Link>
              </div>

              {/* hover glow edge */}
              <div className={`wcc-glow-edge ${hovered === i ? 'edge-on' : ''}`} />
            </div>
          ))}

          {/* ── mini stats strip inside right col ── */}
          <div className={`wcu-mini-stats ${inView ? 'ms-in' : ''}`}>
            {[
              { v: '3000+', l: 'Design Drawings' },
              { v: '220+',  l: 'Projects Done' },
              { v: '160+',  l: 'Happy Clients' },
            ].map((s, i) => (
              <div key={i} className="mini-stat">
                <span className="ms-val">{s.v}</span>
                <span className="ms-lbl">{s.l}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style jsx>{`
        /* ═══ SECTION ═══ */
        .wcu {
          position: relative;
          background: #0a0a0a;
          padding: clamp(70px, 10vw, 130px) 0;
          overflow: hidden;
        }
        .wcu-bg-glow {
          position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse 70% 50% at 50% 0%, rgba(200,169,110,0.07) 0%, transparent 65%);
        }
        .wcu-bg-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(200,169,110,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,169,110,0.025) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        /* ═══ LAYOUT ═══ */
        .wcu-container {
          position: relative; z-index: 1;
          max-width: 1300px; margin: 0 auto;
          padding: 0 clamp(20px, 5vw, 70px);
          display: grid;
          grid-template-columns: 380px 1fr;
          gap: clamp(40px, 5vw, 80px);
          align-items: start;
        }

        /* ═══ LEFT ═══ */
        .wcu-left {
          position: sticky; top: 100px;
          opacity: 0; transform: translateX(-28px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .left-in { opacity: 1; transform: translateX(0); }
        .wcu-left-inner { display: flex; flex-direction: column; gap: 0; }

        .section-tag {
          display: inline-flex; align-items: center; gap: 12px;
          font-size: 0.67rem; font-weight: 700;
          letter-spacing: 0.28em; text-transform: uppercase;
          color: #c8a96e; margin-bottom: 14px;
        }
        .tag-line { display: block; width: 28px; height: 1px; background: #c8a96e; }

        .wcu-title {
          font-family: 'Georgia', serif;
          font-size: clamp(1.8rem, 3.2vw, 2.8rem);
          font-weight: 700; color: #fff;
          line-height: 1.12; margin: 0 0 16px;
        }
        .wcu-glow {
          font-style: italic; color: #c8a96e;
          text-shadow:
            0 0 12px rgba(200,169,110,0.9),
            0 0 28px rgba(200,169,110,0.5),
            0 0 55px rgba(200,169,110,0.25);
          animation: gPulse 3s ease-in-out infinite;
        }
        @keyframes gPulse {
          0%,100% { text-shadow: 0 0 12px rgba(200,169,110,0.9), 0 0 28px rgba(200,169,110,0.5), 0 0 55px rgba(200,169,110,0.25); }
          50%      { text-shadow: 0 0 20px rgba(200,169,110,1),   0 0 44px rgba(200,169,110,0.7), 0 0 85px rgba(200,169,110,0.38); }
        }

        .wcu-subtitle {
          font-size: 0.86rem; color: rgba(255,255,255,0.44);
          line-height: 1.78; margin: 0 0 24px;
        }

        /* left image */
        .wcu-left-img {
          position: relative; width: 100%; aspect-ratio: 4/3;
          overflow: hidden; margin-bottom: 24px;
        }
        .wcu-left-img::after {
          content: ''; position: absolute; inset: 0;
          border: 1px solid rgba(200,169,110,0.2); z-index: 2; pointer-events: none;
        }
        .wli-overlay {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(180deg, rgba(10,10,10,0.1) 0%, rgba(10,10,10,0.45) 100%);
        }
        /* experience badge */
        .wli-badge {
          position: absolute; bottom: 16px; right: -16px; z-index: 3;
          background: #c8a96e; padding: 14px 16px;
          display: flex; flex-direction: column; align-items: center; gap: 1px;
          box-shadow: 0 8px 28px rgba(200,169,110,0.4);
        }
        .badge-num {
          font-family: 'Georgia', serif; font-size: 1.8rem;
          font-weight: 700; color: #0a0a0a; line-height: 1;
        }
        .badge-yr {
          font-size: 0.6rem; font-weight: 800; letter-spacing: 0.12em;
          text-transform: uppercase; color: rgba(10,10,10,0.7);
        }
        .badge-sub {
          font-size: 0.52rem; font-weight: 600; letter-spacing: 0.14em;
          text-transform: uppercase; color: rgba(10,10,10,0.55);
        }

        /* quote btn */
        .wcu-quote-btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 13px 28px; background: #c8a96e; color: #0a0a0a;
          font-size: 0.75rem; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; text-decoration: none;
          position: relative; overflow: hidden; transition: color 0.35s;
          align-self: flex-start;
        }
        .wcu-quote-btn::before {
          content: ''; position: absolute; inset: 0; background: #0a0a0a;
          transform: translateX(-100%);
          transition: transform 0.35s cubic-bezier(0.23,1,0.32,1);
        }
        .wcu-quote-btn:hover::before { transform: translateX(0); }
        .wcu-quote-btn:hover { color: #c8a96e; }
        .wcu-quote-btn span, .wcu-quote-btn svg { position: relative; z-index: 1; }

        /* ═══ RIGHT CARDS ═══ */
        .wcu-right {
          display: flex; flex-direction: column; gap: 20px;
        }

        /* card */
        .wcu-card {
          position: relative;
          display: grid;
          grid-template-columns: 180px 1fr;
          gap: 0;
          background: rgba(14,12,8,0.9);
          border: 1px solid rgba(255,255,255,0.07);
          overflow: hidden;
          opacity: 0; transform: translateX(28px);
          transition:
            opacity 0.7s cubic-bezier(0.23,1,0.32,1),
            transform 0.7s cubic-bezier(0.23,1,0.32,1),
            border-color 0.35s, box-shadow 0.35s;
        }
        .card-in { opacity: 1; transform: translateX(0); }
        .card-hov {
          border-color: rgba(200,169,110,0.3);
          box-shadow: 0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(200,169,110,0.1);
        }

        /* image column */
        .wcc-img-col {
          position: relative; overflow: hidden; flex-shrink: 0;
        }
        .wcc-img-wrap {
          position: absolute; inset: 0;
        }
        .wcc-img-overlay {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(90deg, transparent 50%, rgba(14,12,8,0.6) 100%);
        }
        .wcc-shimmer {
          position: absolute; inset: 0; z-index: 2; pointer-events: none;
          background: linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.07) 50%, transparent 75%);
          transform: translateX(-140%);
          transition: transform 0.85s cubic-bezier(0.23,1,0.32,1);
        }
        .sh-on { transform: translateX(140%); }

        /* number on image */
        .wcc-num {
          position: absolute; bottom: 10px; left: 12px; z-index: 3;
          font-family: 'Georgia', serif;
          font-size: 2.2rem; font-weight: 900;
          color: rgba(255,255,255,0.12); line-height: 1;
          user-select: none;
          transition: color 0.3s;
        }
        .card-hov .wcc-num { color: rgba(200,169,110,0.22); }

        /* content */
        .wcc-content {
          padding: 24px 24px 22px;
          display: flex; flex-direction: column;
          position: relative; z-index: 1;
        }

        /* animated top bar */
        .wcc-bar {
          height: 2px; width: 32px; margin-bottom: 12px;
          background: linear-gradient(90deg, #c8a96e, rgba(200,169,110,0.2));
          transition: width 0.45s cubic-bezier(0.23,1,0.32,1);
        }
        .bar-expand { width: 64px; }

        .wcc-tag {
          font-size: 0.62rem; font-weight: 700;
          letter-spacing: 0.24em; text-transform: uppercase;
          color: #c8a96e; margin: 0 0 6px;
        }
        .wcc-title {
          font-family: 'Georgia', serif;
          font-size: clamp(1.05rem, 1.8vw, 1.3rem);
          font-weight: 700; color: #fff; line-height: 1.2;
          margin: 0 0 10px;
          transition: color 0.3s, text-shadow 0.3s;
        }
        .title-lit {
          color: #f5e8d0;
          text-shadow: 0 0 18px rgba(200,169,110,0.2);
        }
        .wcc-desc {
          font-size: 0.82rem; color: rgba(255,255,255,0.45);
          line-height: 1.75; margin: 0 0 16px; flex: 1;
        }

        .wcc-more {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(200,169,110,0.6); text-decoration: none;
          align-self: flex-start;
          transition: color 0.3s, gap 0.3s;
        }
        .wcc-more:hover { color: #c8a96e; gap: 14px; }
        .more-arrow { display: flex; transition: transform 0.3s; }
        .arrow-slide { transform: translateX(4px); }

        /* right glow edge */
        .wcc-glow-edge {
          position: absolute; top: 0; right: 0; bottom: 0; width: 3px;
          background: linear-gradient(to bottom, transparent, #c8a96e, transparent);
          opacity: 0; transition: opacity 0.35s;
        }
        .edge-on { opacity: 1; }

        /* ── mini stats ── */
        .wcu-mini-stats {
          display: grid; grid-template-columns: repeat(3,1fr);
          border: 1px solid rgba(200,169,110,0.12);
          opacity: 0; transform: translateY(14px);
          transition: opacity 0.6s 0.5s ease, transform 0.6s 0.5s ease;
        }
        .ms-in { opacity: 1; transform: translateY(0); }
        .mini-stat {
          display: flex; flex-direction: column; align-items: center;
          padding: 20px 12px;
          border-right: 1px solid rgba(200,169,110,0.12);
          gap: 3px;
          transition: background 0.3s;
        }
        .mini-stat:last-child { border-right: none; }
        .mini-stat:hover { background: rgba(200,169,110,0.04); }
        .ms-val {
          font-family: 'Georgia', serif;
          font-size: clamp(1.3rem, 2.2vw, 1.8rem);
          font-weight: 700; color: #c8a96e; line-height: 1;
        }
        .ms-lbl {
          font-size: 0.62rem; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(255,255,255,0.35); text-align: center;
        }

        /* ═══ RESPONSIVE ═══ */
        @media (max-width: 1024px) {
          .wcu-container { grid-template-columns: 1fr; }
          .wcu-left { position: relative; top: auto; max-width: 520px; }
          .wli-badge { right: 12px; }
        }
        @media (max-width: 640px) {
          .wcu-card { grid-template-columns: 1fr; }
          .wcc-img-col { height: 180px; position: relative; }
          .wcc-img-wrap { position: absolute; }
          .wcu-mini-stats { grid-template-columns: repeat(3,1fr); }
        }
        @media (max-width: 420px) {
          .wcu-mini-stats { grid-template-columns: 1fr; }
          .mini-stat { border-right: none; border-bottom: 1px solid rgba(200,169,110,0.12); }
          .mini-stat:last-child { border-bottom: none; }
        }
      `}</style>
    </section>
  );
}   