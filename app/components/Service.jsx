'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const services = [
  {
    number: '01',
    title: 'Residential Construction',
    short: 'Dream Homes Built',
    description: 'Build your dream home with our expert team, delivering top-notch residential construction services in Coimbatore, offering personalized and thoughtful designs that transform your vision into a captivating reality.',
    features: ['Custom Floor Plans', 'Premium Materials', 'Interior Finishing', 'Vastu Compliance'],
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="34" height="34">
        <path d="M8 28L32 8L56 28V58H40V42H24V58H8V28Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/>
        <rect x="27" y="42" width="10" height="16" stroke="currentColor" strokeWidth="2"/>
        <path d="M20 36h6M38 36h6M20 28h6M38 28h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Architectural Design',
    short: 'Creative Blueprints',
    description: 'Unlock the full potential of your project with our expert architects in Coimbatore. From concept to reality, we create exceptional spaces that blend creativity and functionality seamlessly.',
    features: ['3D Visualisation', 'Concept Design', 'Structural Planning', 'Permit Drawings'],
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="34" height="34">
        <path d="M12 52L32 12L52 52H12Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/>
        <path d="M20 38h24M24 30h16M28 22h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="32" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Commercial Construction',
    short: 'Business Spaces',
    description: 'Elevate your business with functional and impressive commercial spaces, crafted by our experienced construction specialists, delivering innovative designs that leave a lasting impression.',
    features: ['Office Buildings', 'Retail Spaces', 'Industrial Units', 'Turnkey Projects'],
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="34" height="34">
        <rect x="8" y="20" width="48" height="36" rx="1" stroke="currentColor" strokeWidth="2.2"/>
        <path d="M20 20V12H44V20" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M8 32h48" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="16" y="38" width="8" height="10" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="28" y="38" width="8" height="10" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="40" y="38" width="8" height="10" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="24" y="24" width="16" height="8" rx="0.5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
];

function useInView(ref, threshold = 0.12) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return inView;
}

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef);
  const [hovered, setHovered] = useState(null);

  return (
    <section className="services-section" ref={sectionRef}>
      <div className="bg-grid" />
      <div className="services-container">

        {/* LEFT IMAGE PANEL */}
        <div className={`services-image-panel ${inView ? 'img-visible' : ''}`}>
          <div className="img-wrapper">
            <Image
              src="/img1.jpg"
              alt="Hera Construction project"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              sizes="(max-width:900px) 100vw, 40vw"
            />
            <div className="img-overlay" />
          </div>
          <div className="img-badge">
            <span className="badge-number">8+</span>
            <span className="badge-label">Years of{'\n'}Excellence</span>
          </div>
          <div className="img-label"><span>OUR SERVICES</span></div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="services-right">
          <div className={`services-header ${inView ? 'header-visible' : ''}`}>
            <div className="section-tag">
              <span className="tag-line" />
              <span>What We Offer</span>
            </div>
            <h2 className="section-title">
              Building Your{' '}
              <em className="glow-text">Vision</em>
              <br />With Precision
            </h2>
            <p className="section-subtitle">
              From concept to completion — end-to-end construction solutions
              tailored to your dream and budget.
            </p>
          </div>

          <div className="services-list">
            {services.map((service, i) => (
              <div
                key={i}
                className={`service-card ${inView ? 'card-visible' : ''} ${hovered === i ? 'card-hovered' : ''}`}
                style={{ transitionDelay: `${0.2 + i * 0.14}s` }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="card-bar" />
                <div className="card-icon">{service.icon}</div>
                <div className="card-content">
                  <p className="card-short">{service.short}</p>
                  <h3 className="card-title">{service.title}</h3>
                  <p className="card-desc">{service.description}</p>
                  <div className="card-bottom">
                    <ul className="card-features">
                      {service.features.map((f, j) => (
                        <li key={j}>
                          <span className="check-icon">
                            <svg viewBox="0 0 10 8" width="9" fill="none">
                              <path d="M1 4l2.8 3L9 1" stroke="#c8a96e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link href="/services" className="card-cta">
                      Learn More
                      <svg viewBox="0 0 20 20" width="13" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 10h12M10 4l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
                  </div>
                </div>
                <span className="card-num-bg">{service.number}</span>
              </div>
            ))}
          </div>

          <div className={`services-cta-row ${inView ? 'cta-visible' : ''}`}>
            <a
              href="https://wa.me/9944624724?text=I%20want%20to%20get%20a%20Quote%20for%20my%20house"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn"
            >
              <span>Get Free Quote</span>
              <svg viewBox="0 0 24 24" width="16" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <Link href="/projects/completed" className="cta-link">View All Projects →</Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .services-section {
          position: relative;
          background: #0d0d0d;
          padding: clamp(60px,9vw,120px) 0;
          overflow: hidden;
        }
        .bg-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(200,169,110,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,169,110,0.03) 1px, transparent 1px);
          background-size: 56px 56px;
          pointer-events: none;
        }
        .services-container {
          position: relative; z-index: 1;
          max-width: 1300px; margin: 0 auto;
          padding: 0 clamp(20px,5vw,70px);
          display: grid;
          grid-template-columns: 38% 1fr;
          gap: clamp(32px,5vw,72px);
          align-items: start;
        }
        /* Image */
        .services-image-panel {
          position: sticky; top: 100px;
          opacity: 0; transform: translateX(-30px);
          transition: opacity 0.9s cubic-bezier(0.23,1,0.32,1), transform 0.9s cubic-bezier(0.23,1,0.32,1);
        }
        .img-visible { opacity: 1; transform: translateX(0); }
        .img-wrapper {
          position: relative; width: 100%; aspect-ratio: 3/4; overflow: hidden;
        }
        .img-wrapper::after {
          content: ''; position: absolute; inset: 0;
          border: 1px solid rgba(200,169,110,0.25); z-index: 2; pointer-events: none;
          box-shadow: inset 0 0 40px rgba(200,169,110,0.05);
        }
        .img-overlay {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(180deg, rgba(13,13,13,0.1) 0%, rgba(13,13,13,0.55) 100%);
        }
        .img-badge {
          position: absolute; bottom: 28px; right: -18px; z-index: 3;
          background: #c8a96e; padding: 16px 20px;
          display: flex; flex-direction: column; align-items: center; gap: 2px;
          box-shadow: 0 8px 32px rgba(200,169,110,0.4);
        }
        .badge-number {
          font-family: 'Georgia', serif; font-size: 2rem;
          font-weight: 700; color: #0a0a0a; line-height: 1;
        }
        .badge-label {
          font-size: 0.58rem; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: rgba(10,10,10,0.65);
          text-align: center; line-height: 1.4; white-space: pre-line;
        }
        .img-label {
          position: absolute; top: 0; left: -32px; bottom: 0;
          display: flex; align-items: center; justify-content: center; z-index: 3;
        }
        .img-label span {
          font-size: 0.58rem; font-weight: 700; letter-spacing: 0.3em;
          text-transform: uppercase; color: rgba(200,169,110,0.55);
          writing-mode: vertical-rl; transform: rotate(180deg);
        }
        /* Right */
        .services-right { display: flex; flex-direction: column; gap: 0; }
        .services-header {
          margin-bottom: 28px; opacity: 0; transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .header-visible { opacity: 1; transform: translateY(0); }
        .section-tag {
          display: inline-flex; align-items: center; gap: 12px; margin-bottom: 12px;
          font-size: 0.68rem; font-weight: 700; letter-spacing: 0.28em;
          text-transform: uppercase; color: #c8a96e;
        }
        .tag-line { display: block; width: 28px; height: 1px; background: #c8a96e; }
        .section-title {
          font-family: 'Georgia', serif;
          font-size: clamp(1.8rem,3.5vw,3rem); font-weight: 700;
          color: #fff; line-height: 1.12; margin: 0 0 14px; letter-spacing: -0.01em;
        }
        .glow-text {
          font-style: italic; color: #c8a96e;
          text-shadow: 0 0 10px rgba(200,169,110,0.85), 0 0 25px rgba(200,169,110,0.45), 0 0 50px rgba(200,169,110,0.22);
          animation: glowPulse 3s ease-in-out infinite;
        }
        @keyframes glowPulse {
          0%,100% { text-shadow: 0 0 10px rgba(200,169,110,0.85), 0 0 25px rgba(200,169,110,0.45), 0 0 50px rgba(200,169,110,0.22); }
          50%      { text-shadow: 0 0 16px rgba(200,169,110,1),    0 0 38px rgba(200,169,110,0.65), 0 0 75px rgba(200,169,110,0.35); }
        }
        .section-subtitle {
          font-size: 0.88rem; color: rgba(255,255,255,0.45); line-height: 1.75; max-width: 440px; margin: 0;
        }
        /* Cards */
        .services-list { display: flex; flex-direction: column; gap: 14px; margin-bottom: 30px; }
        .service-card {
          position: relative; display: flex; align-items: flex-start; gap: 18px;
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
          padding: 22px 22px 22px 26px; overflow: hidden;
          opacity: 0; transform: translateX(24px);
          transition: opacity 0.6s cubic-bezier(0.23,1,0.32,1), transform 0.6s cubic-bezier(0.23,1,0.32,1),
                      border-color 0.3s, background 0.3s, box-shadow 0.3s;
        }
        .card-visible { opacity: 1; transform: translateX(0); }
        .card-hovered {
          border-color: rgba(200,169,110,0.3);
          background: rgba(200,169,110,0.04);
          box-shadow: 0 8px 36px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(200,169,110,0.08);
        }
        .card-bar {
          position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
          background: #c8a96e; transform: scaleY(0); transform-origin: bottom;
          transition: transform 0.4s cubic-bezier(0.23,1,0.32,1);
        }
        .card-hovered .card-bar { transform: scaleY(1); }
        .card-icon {
          flex-shrink: 0; width: 50px; height: 50px;
          border: 1px solid rgba(200,169,110,0.2); border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: #c8a96e; background: rgba(200,169,110,0.05);
          transition: all 0.35s cubic-bezier(0.23,1,0.32,1);
        }
        .card-hovered .card-icon {
          background: rgba(200,169,110,0.12); border-color: rgba(200,169,110,0.5);
          box-shadow: 0 0 18px rgba(200,169,110,0.25); transform: scale(1.08);
        }
        .card-content { flex: 1; min-width: 0; }
        .card-short {
          font-size: 0.64rem; font-weight: 700; letter-spacing: 0.22em;
          text-transform: uppercase; color: #c8a96e; margin: 0 0 4px;
        }
        .card-title {
          font-family: 'Georgia', serif; font-size: clamp(0.98rem,1.5vw,1.18rem);
          font-weight: 700; color: #fff; margin: 0 0 8px;
          transition: color 0.3s, text-shadow 0.3s;
        }
        .card-hovered .card-title {
          color: #f5e6c8;
          text-shadow: 0 0 16px rgba(200,169,110,0.28);
        }
        .card-desc { font-size: 0.81rem; color: rgba(255,255,255,0.45); line-height: 1.7; margin: 0 0 12px; }
        .card-bottom { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
        .card-features { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 5px 14px; }
        .card-features li { display: flex; align-items: center; gap: 6px; font-size: 0.73rem; color: rgba(255,255,255,0.48); }
        .check-icon {
          width: 15px; height: 15px; background: rgba(200,169,110,0.1);
          border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .card-cta {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 0.71rem; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: rgba(200,169,110,0.55);
          text-decoration: none; white-space: nowrap; transition: color 0.3s;
        }
        .card-hovered .card-cta { color: #c8a96e; }
        .card-cta svg { transition: transform 0.3s; }
        .card-hovered .card-cta svg { transform: translateX(4px); }
        .card-num-bg {
          position: absolute; right: 14px; bottom: -4px;
          font-family: 'Georgia', serif; font-size: 4rem; font-weight: 900;
          color: rgba(200,169,110,0.05); line-height: 1;
          pointer-events: none; user-select: none; transition: color 0.3s;
        }
        .card-hovered .card-num-bg { color: rgba(200,169,110,0.09); }
        /* CTA row */
        .services-cta-row {
          display: flex; align-items: center; gap: 24px;
          opacity: 0; transform: translateY(16px);
          transition: opacity 0.6s 0.6s ease, transform 0.6s 0.6s ease;
        }
        .cta-visible { opacity: 1; transform: translateY(0); }
        .cta-btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 13px 26px; background: #c8a96e; color: #0a0a0a;
          font-size: 0.75rem; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; text-decoration: none;
          position: relative; overflow: hidden; transition: color 0.35s;
        }
        .cta-btn::before {
          content: ''; position: absolute; inset: 0; background: #0a0a0a;
          transform: translateX(-100%); transition: transform 0.35s cubic-bezier(0.23,1,0.32,1);
        }
        .cta-btn:hover::before { transform: translateX(0); }
        .cta-btn:hover { color: #c8a96e; }
        .cta-btn span, .cta-btn svg { position: relative; z-index: 1; }
        .cta-link {
          font-size: 0.75rem; font-weight: 600; letter-spacing: 0.1em;
          color: rgba(255,255,255,0.38); text-decoration: none;
          text-transform: uppercase; transition: color 0.25s;
        }
        .cta-link:hover { color: #c8a96e; }
        /* Responsive */
        @media (max-width: 900px) {
          .services-container { grid-template-columns: 1fr; }
          .services-image-panel { position: relative; top: auto; max-width: 500px; margin: 0 auto; }
          .img-wrapper { aspect-ratio: 4/3; }
          .img-label { display: none; }
          .img-badge { right: 12px; bottom: 12px; }
        }
        @media (max-width: 560px) {
          .service-card { flex-direction: column; gap: 12px; padding: 18px; }
          .card-bottom { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </section>
  );
}