'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

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

const navLinks = [
  { label: 'Home',       href: '/' },
  { label: 'About Us',   href: '/about' },
  { label: 'Services',   href: '/services' },
  { label: 'Projects',   href: '/projects/completed' },
  { label: 'Contact Us', href: '/contact' },
];

const services = [
  { label: 'Residential Construction', href: '/services' },
  { label: 'Commercial Construction',  href: '/services' },
  { label: 'Architectural Design',     href: '/services' },
  { label: 'Interior Design',          href: '/services' },
  { label: '3D Designing',             href: '/services' },
  { label: 'Renovation Works',         href: '/services' },
];

const socials = [
  {
    name: 'Facebook',
    href: 'https://facebook.com',
    icon: (
      <svg viewBox="0 0 24 24" width="16" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg viewBox="0 0 24 24" width="16" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com',
    icon: (
      <svg viewBox="0 0 24 24" width="16" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/9944624724',
    icon: (
      <svg viewBox="0 0 24 24" width="16" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const year = new Date().getFullYear();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="ft" ref={ref}>
      {/* top gold line */}
      <div className="ft-top-line" />
      <div className="ft-glow" />
      <div className="ft-grid" />

      {/* ── MAIN FOOTER BODY ── */}
      <div className="ft-wrap">
        <div className="ft-body">

          {/* col 1 — brand */}
          <div className={`ft-col ft-brand ${inView ? 'fc-in' : ''}`} style={{ transitionDelay:'0s' }}>
            {/* logo */}
            <div className="ft-logo">
              <div className="ft-logo-hex">
                <svg viewBox="0 0 60 70" width="42" fill="none">
                  <path d="M30 2L56 17v36L30 68 4 53V17z" fill="#c8a96e" opacity="0.15" stroke="#c8a96e" strokeWidth="1.5"/>
                  <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle"
                    fill="#c8a96e" fontSize="22" fontWeight="700" fontFamily="Georgia,serif">H</text>
                </svg>
              </div>
              <div className="ft-logo-text">
                <span className="flt-main">HERA</span>
                <span className="flt-sub">CONSTRUCTION</span>
              </div>
            </div>

            <p className="ft-brand-desc">
              Trusted place to find your home. BOO Construction has been building
              dream homes and commercial spaces across Tamil Nadu since 2015, with
              unmatched quality and care in every project.
            </p>

            {/* socials */}
            <div className="ft-socials">
              {socials.map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="ft-social" aria-label={s.name}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* col 2 — quick links */}
          <div className={`ft-col ${inView ? 'fc-in' : ''}`} style={{ transitionDelay:'0.1s' }}>
            <h4 className="ft-col-title">Quick Links</h4>
            <ul className="ft-links">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="ft-link">
                    <span className="ft-link-dot" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* col 3 — services */}
          <div className={`ft-col ${inView ? 'fc-in' : ''}`} style={{ transitionDelay:'0.18s' }}>
            <h4 className="ft-col-title">Our Services</h4>
            <ul className="ft-links">
              {services.map((s) => (
                <li key={s.label}>
                  <Link href={s.href} className="ft-link">
                    <span className="ft-link-dot" />
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* col 4 — contact + newsletter */}
          <div className={`ft-col ${inView ? 'fc-in' : ''}`} style={{ transitionDelay:'0.26s' }}>
            <h4 className="ft-col-title">Contact Us</h4>
            <div className="ft-contact-items">
              <a href="tel:9944624724" className="ft-contact-row">
                <span className="fcr-icon">
                  <svg viewBox="0 0 24 24" width="13" fill="currentColor">
                    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
                  </svg>
                </span>
                <span>99446 24724</span>
              </a>
              <a href="tel:04224352421" className="ft-contact-row">
                <span className="fcr-icon">
                  <svg viewBox="0 0 24 24" width="13" fill="currentColor">
                    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
                  </svg>
                </span>
                <span>0422 435 2421</span>
              </a>
              <a href="mailto:boo.cbe@gmail.com" className="ft-contact-row">
                <span className="fcr-icon">
                  <svg viewBox="0 0 24 24" width="13" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16v16H4z"/><path d="M4 4l8 9 8-9" strokeLinecap="round"/>
                  </svg>
                </span>
                <span>boo.cbe@gmail.com</span>
              </a>
              <div className="ft-contact-row ft-addr">
                <span className="fcr-icon" style={{marginTop:'3px'}}>
                  <svg viewBox="0 0 24 24" width="13" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </span>
                <span>No 37, Sir Shanmugam Rd,<br/>R.S. Puram, Coimbatore<br/>Tamil Nadu 641002</span>
              </div>
            </div>

            {/* newsletter */}
            <div className="ft-newsletter">
              <p className="ft-nl-label">Get project updates</p>
              {subscribed ? (
                <p className="ft-nl-thanks">✓ Thanks for subscribing!</p>
              ) : (
                <form onSubmit={handleSubscribe} className="ft-nl-form">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="ft-nl-input"
                  />
                  <button type="submit" className="ft-nl-btn">
                    <svg viewBox="0 0 24 24" width="14" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* BOTTOM BAR*/}
        <div className={`ft-bottom ${inView ? 'fb-in' : ''}`}>
          <div className="ft-bottom-divider" />
          <div className="ft-bottom-row">
            <p className="ft-copy">
              © {year} <span className="copy-brand">Hera Construction</span>. All rights reserved.
            </p>
            <div className="ft-bottom-links">
              <Link href="/privacy" className="ft-bl">Privacy Policy</Link>
              <span className="ft-bl-sep">·</span>
              <Link href="/terms" className="ft-bl">Terms of Use</Link>
              <span className="ft-bl-sep">·</span>
              <Link href="/sitemap" className="ft-bl">Sitemap</Link>
            </div>
            <p className="ft-made">
              Crafted with <span className="heart">♥</span> in Coimbatore
            </p>
          </div>
        </div>

      </div>

      {/* ── BACK TO TOP ── */}
      <button
        className="ft-top-btn"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <svg viewBox="0 0 24 24" width="16" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <style jsx>{`
        .ft {
          position: relative;
          background: #050505;
          overflow: hidden;
        }
        .ft-top-line {
          height: 1px; width: 100%;
          background: linear-gradient(90deg, transparent, #c8a96e, rgba(200,169,110,0.4), transparent);
        }
        .ft-glow {
          position: absolute; top: -150px; left: 50%; transform: translateX(-50%);
          width: 800px; height: 400px; border-radius: 50%;
          background: radial-gradient(ellipse, rgba(200,169,110,0.06) 0%, transparent 70%);
          filter: blur(60px); pointer-events: none; z-index: 0;
        }
        .ft-grid {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(200,169,110,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,169,110,0.018) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .ft-wrap {
          position: relative; z-index: 1;
          max-width: 1300px; margin: 0 auto;
          padding: 0 clamp(20px,5vw,70px);
        }
        .ft-body {
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr 1.4fr;
          gap: clamp(28px,4vw,60px);
          padding: clamp(48px,7vw,90px) 0 clamp(40px,5vw,70px);
        }

        /* col fade-in */
        .ft-col {
          opacity: 0; transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .fc-in { opacity: 1; transform: translateY(0); }

        /* ── brand col ── */
        .ft-logo {
          display: flex; align-items: center; gap: 12px; margin-bottom: 18px;
        }
        .ft-logo-hex { flex-shrink: 0; }
        .ft-logo-text { display: flex; flex-direction: column; gap: 1px; }
        .flt-main {
          font-family: 'Georgia', serif; font-size: 1.3rem;
          font-weight: 700; color: #fff; letter-spacing: 0.1em; line-height: 1;
        }
        .flt-sub {
          font-size: 0.52rem; font-weight: 700;
          letter-spacing: 0.26em; color: #c8a96e; text-transform: uppercase;
        }
        .ft-brand-desc {
          font-size: 0.82rem; color: rgba(255,255,255,0.38);
          line-height: 1.78; margin: 0 0 22px;
        }
        .ft-socials { display: flex; gap: 10px; }
        .ft-social {
          width: 36px; height: 36px;
          border: 1px solid rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.45); text-decoration: none;
          transition: all 0.3s;
        }
        .ft-social:hover {
          border-color: #c8a96e; color: #c8a96e;
          background: rgba(200,169,110,0.08);
          box-shadow: 0 0 12px rgba(200,169,110,0.2);
        }

        /* ── link cols ── */
        .ft-col-title {
          font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: #c8a96e; margin: 0 0 18px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(200,169,110,0.15);
        }
        .ft-links {
          list-style: none; margin: 0; padding: 0;
          display: flex; flex-direction: column; gap: 8px;
        }
        .ft-link {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 0.82rem; color: rgba(255,255,255,0.45);
          text-decoration: none;
          transition: color 0.3s, gap 0.3s;
        }
        .ft-link:hover { color: #c8a96e; gap: 12px; }
        .ft-link-dot {
          width: 4px; height: 4px; border-radius: 50%;
          background: rgba(200,169,110,0.4); flex-shrink: 0;
          transition: background 0.3s;
        }
        .ft-link:hover .ft-link-dot { background: #c8a96e; }

        /* ── contact col ── */
        .ft-contact-items {
          display: flex; flex-direction: column; gap: 10px; margin-bottom: 22px;
        }
        .ft-contact-row {
          display: flex; align-items: flex-start; gap: 10px;
          font-size: 0.8rem; color: rgba(255,255,255,0.45);
          text-decoration: none; line-height: 1.5;
          transition: color 0.3s;
        }
        .ft-contact-row:hover { color: #c8a96e; }
        .ft-addr { cursor: default; }
        .ft-addr:hover { color: rgba(255,255,255,0.45); }
        .fcr-icon {
          color: #c8a96e; flex-shrink: 0; margin-top: 2px;
        }

        /* newsletter */
        .ft-newsletter { border-top: 1px solid rgba(255,255,255,0.07); padding-top: 18px; }
        .ft-nl-label {
          font-size: 0.68rem; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(255,255,255,0.35); margin: 0 0 10px;
        }
        .ft-nl-form {
          display: flex; border: 1px solid rgba(255,255,255,0.1);
          overflow: hidden; transition: border-color 0.3s;
        }
        .ft-nl-form:focus-within { border-color: rgba(200,169,110,0.4); }
        .ft-nl-input {
          flex: 1; background: transparent; border: none; outline: none;
          padding: 10px 12px; color: #fff; font-size: 0.8rem;
          font-family: inherit;
        }
        .ft-nl-input::placeholder { color: rgba(255,255,255,0.25); }
        .ft-nl-btn {
          width: 40px; background: #c8a96e; border: none;
          color: #0a0a0a; cursor: pointer; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.3s;
        }
        .ft-nl-btn:hover { background: #fff; }
        .ft-nl-thanks {
          font-size: 0.8rem; color: #c8a96e; margin: 0; padding: 8px 0;
        }

        /* ── bottom bar ── */
        .ft-bottom {
          opacity: 0; transform: translateY(12px);
          transition: opacity 0.6s 0.4s ease, transform 0.6s 0.4s ease;
        }
        .fb-in { opacity: 1; transform: translateY(0); }
        .ft-bottom-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(200,169,110,0.2), transparent);
          margin-bottom: 20px;
        }
        .ft-bottom-row {
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 12px;
          padding-bottom: 28px;
        }
        .ft-copy {
          font-size: 0.78rem; color: rgba(255,255,255,0.28); margin: 0;
        }
        .copy-brand { color: rgba(200,169,110,0.6); font-weight: 600; }
        .ft-bottom-links { display: flex; align-items: center; gap: 10px; }
        .ft-bl {
          font-size: 0.74rem; color: rgba(255,255,255,0.28);
          text-decoration: none; transition: color 0.3s;
        }
        .ft-bl:hover { color: #c8a96e; }
        .ft-bl-sep { color: rgba(255,255,255,0.15); font-size: 0.7rem; }
        .ft-made {
          font-size: 0.74rem; color: rgba(255,255,255,0.22); margin: 0;
        }
        .heart { color: #c8a96e; }

        /* ── back to top ── */
        .ft-top-btn {
          position: absolute; bottom: 28px; right: clamp(20px,5vw,70px);
          width: 40px; height: 40px;
          background: rgba(200,169,110,0.1);
          border: 1px solid rgba(200,169,110,0.3);
          color: #c8a96e; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.3s; z-index: 2;
        }
        .ft-top-btn:hover {
          background: #c8a96e; color: #0a0a0a;
          box-shadow: 0 0 20px rgba(200,169,110,0.4);
        }

        /* ── responsive ── */
        @media (max-width: 1100px) {
          .ft-body { grid-template-columns: 1fr 1fr; }
          .ft-brand { grid-column: span 2; }
        }
        @media (max-width: 640px) {
          .ft-body { grid-template-columns: 1fr; }
          .ft-brand { grid-column: span 1; }
          .ft-bottom-row { flex-direction: column; text-align: center; }
          .ft-top-btn { bottom: auto; top: -20px; right: 20px; }
        }
      `}</style>
    </footer>
  );
}