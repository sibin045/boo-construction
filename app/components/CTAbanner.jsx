'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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

export default function CTABanner() {
  const ref = useRef(null);
  const inView = useInView(ref);

  return (
    <section className="cta-section" ref={ref}>
      {/* bg image */}
      <div className="cta-bg">
        <Image src="/img2.jpg" alt="CTA Background" fill style={{ objectFit:'cover', objectPosition:'center' }} sizes="100vw"/>
      </div>
      <div className="cta-overlay" />
      <div className="cta-noise" />

      {/* animated gold lines */}
      <div className="cta-line cta-line-top" />
      <div className="cta-line cta-line-bot" />

      <div className="cta-wrap">
        <div className={`cta-content ${inView ? 'cc-in' : ''}`}>
          <div className="cta-tag">
            <span className="ct-line" /><span>Let's Build Together</span><span className="ct-line" />
          </div>

          <h2 className="cta-h2">
            LET'S DISCUSS<br />
            <em className="cta-glow">NEXT PROJECTS</em>
          </h2>

          <p className="cta-p">
            At BOO Construction, we value collaboration and believe in turning your dreams
            into reality. Whether it's your dream home, an inspiring commercial space, or a
            captivating renovation — our expert team is eager to bring your vision to life.
            With 8 years of experience, let the magic of construction begin!
          </p>

          <div className="cta-actions">
            <a
              href="https://wa.me/9944624724?text=I%20want%20to%20get%20a%20Quote%20for%20my%20house"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn-gold"
            >
              <span>Get a Free Quote</span>
              <svg viewBox="0 0 24 24" width="15" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <Link href="/contact" className="cta-btn-outline">
              Contact Us
            </Link>
          </div>

          {/* floating contact chips */}
          <div className="cta-chips">
            <a href="tel:9944624724" className="cta-chip">
              <svg viewBox="0 0 24 24" width="14" fill="currentColor">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
              </svg>
              99446 24724
            </a>
            <a href="mailto:boocbe@gmail.com" className="cta-chip">
              <svg viewBox="0 0 24 24" width="14" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16v16H4z" strokeLinejoin="round"/>
                <path d="M4 4l8 9 8-9" strokeLinecap="round"/>
              </svg>
              hera.boo@gmail.com
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .cta-section {
          position: relative; overflow: hidden;
          padding: clamp(80px,12vw,150px) 0;
        }
        .cta-bg { position:absolute; inset:0; z-index:0; }
        .cta-overlay {
          position:absolute; inset:0; z-index:1;
          background:linear-gradient(135deg, rgba(5,5,5,0.93) 0%, rgba(5,5,5,0.82) 60%, rgba(5,5,5,0.92) 100%);
        }
        .cta-noise {
          position:absolute; inset:0; z-index:2; opacity:0.03; pointer-events:none;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size:160px;
        }
        .cta-line {
          position:absolute; left:0; right:0; height:1px; z-index:3;
          background:linear-gradient(90deg, transparent, rgba(200,169,110,0.4), transparent);
        }
        .cta-line-top { top:0; }
        .cta-line-bot { bottom:0; }

        .cta-wrap {
          position:relative; z-index:4;
          max-width:900px; margin:0 auto;
          padding:0 clamp(20px,5vw,70px);
          text-align:center;
        }
        .cta-content {
          opacity:0; transform:translateY(32px);
          transition:opacity 0.9s ease, transform 0.9s ease;
        }
        .cc-in { opacity:1; transform:translateY(0); }

        .cta-tag {
          display:inline-flex; align-items:center; gap:14px;
          font-size:0.67rem; font-weight:700; letter-spacing:0.3em;
          text-transform:uppercase; color:#c8a96e; margin-bottom:18px;
        }
        .ct-line { display:block; width:36px; height:1px; background:#c8a96e; }

        .cta-h2 {
          font-family:'Georgia',serif;
          font-size:clamp(2.2rem,6vw,5rem);
          font-weight:700; color:#fff; line-height:1.08;
          letter-spacing:0.02em; margin:0 0 22px;
        }
        .cta-glow {
          font-style:italic; color:#c8a96e;
          text-shadow:
            0 0 14px rgba(200,169,110,0.95),
            0 0 34px rgba(200,169,110,0.55),
            0 0 70px rgba(200,169,110,0.28);
          animation:gPulse 3s ease-in-out infinite;
        }
        @keyframes gPulse {
          0%,100%{text-shadow:0 0 14px rgba(200,169,110,0.95),0 0 34px rgba(200,169,110,0.55),0 0 70px rgba(200,169,110,0.28);}
          50%{text-shadow:0 0 22px rgba(200,169,110,1),0 0 52px rgba(200,169,110,0.75),0 0 100px rgba(200,169,110,0.42);}
        }
        .cta-p {
          font-size:clamp(0.88rem,1.3vw,1.02rem);
          color:rgba(255,255,255,0.5); line-height:1.82;
          max-width:660px; margin:0 auto 36px;
        }
        .cta-actions {
          display:flex; align-items:center; justify-content:center;
          gap:16px; flex-wrap:wrap; margin-bottom:28px;
        }
        .cta-btn-gold {
          display:inline-flex; align-items:center; gap:10px;
          padding:15px 38px; background:#c8a96e; color:#0a0a0a;
          font-size:0.78rem; font-weight:700; letter-spacing:0.14em;
          text-transform:uppercase; text-decoration:none;
          position:relative; overflow:hidden; transition:color 0.35s;
        }
        .cta-btn-gold::before {
          content:''; position:absolute; inset:0; background:#fff;
          transform:translateX(-100%);
          transition:transform 0.35s cubic-bezier(0.23,1,0.32,1);
        }
        .cta-btn-gold:hover::before { transform:translateX(0); }
        .cta-btn-gold:hover { color:#0a0a0a; }
        .cta-btn-gold span,.cta-btn-gold svg { position:relative; z-index:1; }

        .cta-btn-outline {
          display:inline-flex; align-items:center; gap:8px;
          padding:14px 34px;
          border:1px solid rgba(255,255,255,0.25); color:rgba(255,255,255,0.7);
          font-size:0.78rem; font-weight:700; letter-spacing:0.14em;
          text-transform:uppercase; text-decoration:none; transition:all 0.3s;
        }
        .cta-btn-outline:hover { border-color:#c8a96e; color:#c8a96e; background:rgba(200,169,110,0.06); }

        .cta-chips {
          display:flex; align-items:center; justify-content:center; gap:16px; flex-wrap:wrap;
        }
        .cta-chip {
          display:inline-flex; align-items:center; gap:8px;
          padding:8px 18px;
          border:1px solid rgba(255,255,255,0.1);
          background:rgba(255,255,255,0.04);
          color:rgba(255,255,255,0.55);
          font-size:0.78rem; font-weight:600; letter-spacing:0.06em;
          text-decoration:none; transition:all 0.3s;
        }
        .cta-chip:hover { border-color:rgba(200,169,110,0.4); color:#c8a96e; background:rgba(200,169,110,0.06); }

        @media (max-width:560px) {
          .cta-actions { flex-direction:column; align-items:stretch; }
          .cta-btn-gold,.cta-btn-outline { justify-content:center; }
        }
      `}</style>
    </section>
  );
}