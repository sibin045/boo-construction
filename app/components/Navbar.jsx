"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "ABOUT US", href: "/about" },
  { label: "SERVICES", href: "/service" },
  {
    label: "PROJECTS",
    href: "#",
    dropdown: [
      { label: "Completed Projects", href: "/project-completed" },
      { label: "Ongoing Projects", href: "/project-ongoing" },
    ],
  },
  { label: "CONTACT US", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("HOME");
  const [mounted, setMounted] = useState(false);
  const [ripple, setRipple] = useState(null); // { id, x, y, linkLabel }
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setProjectsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNavClick = (label, e) => {
    // Ripple effect
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipple({ id, x, y, label });
    setTimeout(() => setRipple(null), 600);
    setActiveLink(label);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }

        /* ══════════════════════════════════════
           NAVBAR BASE
        ══════════════════════════════════════ */
        .hera-navbar {
          position: fixed; top: 0; left: 0;
          width: 100%; z-index: 9999;
          font-family: 'Montserrat', sans-serif;
          background: rgba(13, 13, 13, 0.96);
          transition: background 0.5s ease, box-shadow 0.5s ease, backdrop-filter 0.5s ease;
          backdrop-filter: blur(0px);
        }
        .hera-navbar.scrolled {
          background: rgba(8, 8, 8, 0.98);
          box-shadow: 0 8px 40px rgba(0,0,0,0.7);
          backdrop-filter: blur(12px);
        }

        /* Animated gold shimmer bar at top */
        .navbar-shimmer-bar {
          height: 2px; width: 100%; position: relative; overflow: hidden;
          background: rgba(201,169,110,0.08);
        }
        .navbar-shimmer-bar::after {
          content: '';
          position: absolute; top: 0; left: -100%;
          width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, #c9a96e, #f0d898, #c9a96e, transparent);
          animation: shimmerSlide 3.5s ease-in-out infinite;
        }
        @keyframes shimmerSlide {
          0%   { left: -60%; opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }

        /* Progress bar on scroll */
        .scroll-progress {
          position: absolute; bottom: 0; left: 0;
          height: 1px;
          background: linear-gradient(90deg, #c9a96e, #f0d898);
          transition: width 0.1s linear;
          box-shadow: 0 0 6px rgba(201,169,110,0.5);
        }

        .navbar-inner {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 48px; height: 78px;
          max-width: 1440px; margin: 0 auto; position: relative;
        }

       
        .logo-link {
          display: flex; align-items: center; gap: 13px;
          text-decoration: none; flex-shrink: 0;
          animation: logoEnter 0.9s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes logoEnter {
          from { opacity: 0; transform: translateX(-28px) scale(0.95); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }

        .logo-icon-box {
          width: 46px; height: 46px;
          border: 1.5px solid rgba(255,255,255,0.45);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; position: relative; overflow: hidden;
          transition: border-color 0.35s, transform 0.35s, box-shadow 0.35s;
        }
        /* Sheen sweep on logo box hover */
        .logo-icon-box::before {
          content: '';
          position: absolute; top: -50%; left: -75%;
          width: 50%; height: 200%;
          background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%);
          transform: skewX(-20deg);
          transition: left 0s;
        }
        .logo-link:hover .logo-icon-box {
          border-color: #c9a96e;
          transform: scale(1.08) rotate(2deg);
          box-shadow: 0 0 18px rgba(201,169,110,0.35);
        }
        .logo-link:hover .logo-icon-box::before {
          left: 175%;
          transition: left 0.5s ease;
        }

        /* SVG house path draw */
        .logo-svg-path {
          stroke-dasharray: 120;
          stroke-dashoffset: 120;
          animation: drawPath 1.2s cubic-bezier(0.4,0,0.2,1) 0.3s forwards;
        }
        @keyframes drawPath {
          to { stroke-dashoffset: 0; }
        }

        .logo-text-group { display: flex; flex-direction: column; line-height: 1.1; }

        .logo-hera {
          font-size: 20px; font-weight: 700; color: #fff; letter-spacing: 5px;
          animation: letterSpread 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s both;
        }
        @keyframes letterSpread {
          from { letter-spacing: 0px; opacity: 0; }
          to   { letter-spacing: 5px; opacity: 1; }
        }
        .logo-construction {
          font-size: 10.5px; font-weight: 400;
          color: rgba(255,255,255,0.68); letter-spacing: 4px; margin-top: 2px;
          animation: fadeSlideUp 0.7s ease 0.55s both;
        }
        .logo-tagline {
          font-size: 7.5px; font-weight: 300; font-style: italic;
          color: rgba(255,255,255,0.3); letter-spacing: 1.2px; margin-top: 3px;
          animation: fadeSlideUp 0.7s ease 0.7s both;
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Animated gold dot (decorative) */
        .gold-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #c9a96e;
          position: absolute; top: 8px; left: 50%;
          transform: translateX(-50%);
          animation: dotPulse 2.5s ease-in-out infinite;
          box-shadow: 0 0 8px rgba(201,169,110,0.6);
        }
        @keyframes dotPulse {
          0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.8; }
          50%       { transform: translateX(-50%) scale(1.6); opacity: 0.3; }
        }

     
        .nav-list {
          display: flex; align-items: center; gap: 4px;
          list-style: none; padding: 0; margin: 0;
        }

        /* Each nav item staggers in */
        .nav-item { position: relative; }
        .nav-item:nth-child(1) { animation: navItemEnter 0.6s cubic-bezier(0.16,1,0.3,1) 0.35s both; }
        .nav-item:nth-child(2) { animation: navItemEnter 0.6s cubic-bezier(0.16,1,0.3,1) 0.45s both; }
        .nav-item:nth-child(3) { animation: navItemEnter 0.6s cubic-bezier(0.16,1,0.3,1) 0.55s both; }
        .nav-item:nth-child(4) { animation: navItemEnter 0.6s cubic-bezier(0.16,1,0.3,1) 0.65s both; }
        .nav-item:nth-child(5) { animation: navItemEnter 0.6s cubic-bezier(0.16,1,0.3,1) 0.75s both; }
        @keyframes navItemEnter {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .nav-link, .nav-btn {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 8px 15px;
          font-size: 11px; font-weight: 600; letter-spacing: 1.8px;
          color: rgba(255,255,255,0.65);
          text-decoration: none; cursor: pointer;
          transition: color 0.25s ease, transform 0.2s ease;
          white-space: nowrap; background: none; border: none;
          font-family: 'Montserrat', sans-serif;
          position: relative; overflow: hidden;
        }
        .nav-link:hover, .nav-btn:hover,
        .nav-link.active, .nav-btn.active {
          color: #fff; transform: translateY(-1px);
        }

        /* Gold underline that slides from center */
        .nav-link::after, .nav-btn::after {
          content: '';
          position: absolute; bottom: 2px; left: 50%;
          transform: translateX(-50%);
          width: 0; height: 1.5px;
          background: linear-gradient(90deg, transparent, #c9a96e, transparent);
          transition: width 0.35s cubic-bezier(0.4,0,0.2,1);
        }
        .nav-link:hover::after, .nav-btn:hover::after,
        .nav-link.active::after, .nav-btn.active::after { width: 70%; }

        /* Click ripple */
        .nav-ripple {
          position: absolute; border-radius: 50%;
          background: rgba(201,169,110,0.25);
          transform: scale(0);
          animation: rippleGrow 0.6s ease-out forwards;
          pointer-events: none;
        }
        @keyframes rippleGrow {
          to { transform: scale(4); opacity: 0; }
        }

        /* Glow on active */
        .nav-link.active, .nav-btn.active {
          text-shadow: 0 0 20px rgba(201,169,110,0.3);
        }

      
        .chev {
          width: 10px; height: 10px;
          transition: transform 0.35s cubic-bezier(0.4,0,0.2,1); opacity: 0.6;
          flex-shrink: 0;
        }
        .chev.open { transform: rotate(180deg); opacity: 1; color: #c9a96e; }

       
        .dropdown {
          position: absolute; top: calc(100% + 16px); left: 50%;
          transform: translateX(-50%) translateY(-8px) scale(0.97);
          background: #111; min-width: 215px;
          border: 1px solid rgba(201,169,110,0.18);
          padding: 10px 0;
          opacity: 0; visibility: hidden;
          transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
          box-shadow: 0 24px 60px rgba(0,0,0,0.6);
          transform-origin: top center;
        }
        .dropdown::before {
          content: '';
          position: absolute; top: -5px; left: 50%;
          width: 8px; height: 8px; background: #111;
          border-left: 1px solid rgba(201,169,110,0.18);
          border-top: 1px solid rgba(201,169,110,0.18);
          transform: translateX(-50%) rotate(45deg);
        }
        .dropdown.open {
          opacity: 1; visibility: visible;
          transform: translateX(-50%) translateY(0) scale(1);
        }

        .dropdown-item {
          display: flex; align-items: center; gap: 10px;
          padding: 13px 22px;
          font-size: 10.5px; font-weight: 500; letter-spacing: 1.2px;
          color: rgba(255,255,255,0.55);
          text-decoration: none;
          transition: color 0.22s, padding-left 0.22s, background 0.22s;
          position: relative; overflow: hidden;
        }
        .dropdown-item::before {
          content: '';
          position: absolute; left: 0; top: 0;
          height: 100%; width: 2px;
          background: #c9a96e;
          transform: scaleY(0); transform-origin: bottom;
          transition: transform 0.25s ease;
        }
        .dropdown-item:hover {
          color: #c9a96e; padding-left: 30px;
          background: rgba(201,169,110,0.05);
        }
        .dropdown-item:hover::before { transform: scaleY(1); }

        /* Staggered dropdown items */
        .dropdown.open .dropdown-item:nth-child(1) { animation: dropItemIn 0.25s ease 0.05s both; }
        .dropdown.open .dropdown-item:nth-child(2) { animation: dropItemIn 0.25s ease 0.12s both; }
        @keyframes dropItemIn {
          from { opacity: 0; transform: translateX(-8px); }
          to   { opacity: 1; transform: translateX(0); }
        }


        .side-icon {
          display: flex; flex-direction: column; gap: 5px;
          cursor: pointer; padding: 6px; margin-left: 6px;
          opacity: 0.5; transition: opacity 0.25s;
          animation: navItemEnter 0.6s ease 0.85s both;
        }
        .side-icon:hover { opacity: 1; }
        .side-icon span { display: block; height: 1.5px; background: #fff; border-radius: 2px; transition: width 0.3s ease; }
        .side-icon span:nth-child(1) { width: 22px; }
        .side-icon span:nth-child(2) { width: 14px; }
        .side-icon span:nth-child(3) { width: 18px; }
        .side-icon:hover span:nth-child(1) { width: 22px; }
        .side-icon:hover span:nth-child(2) { width: 22px; }
        .side-icon:hover span:nth-child(3) { width: 22px; }

        .ham-btn {
          display: none; flex-direction: column; gap: 5px;
          background: none; border: none; cursor: pointer;
          padding: 4px; width: 36px; height: 36px;
          justify-content: center; align-items: flex-end;
        }
        .ham-line {
          height: 1.5px; background: #fff; border-radius: 2px;
          transition: all 0.38s cubic-bezier(0.4,0,0.2,1);
        }
        .ham-line-1 { width: 26px; }
        .ham-line-2 { width: 18px; }
        .ham-line-3 { width: 22px; }
        .ham-btn.open .ham-line-1 { transform: translateY(6.5px) rotate(45deg); width: 24px; background: #c9a96e; }
        .ham-btn.open .ham-line-2 { opacity: 0; transform: scaleX(0); }
        .ham-btn.open .ham-line-3 { transform: translateY(-6.5px) rotate(-45deg); width: 24px; background: #c9a96e; }

       
        .mob-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.6);
          z-index: 9997; opacity: 0; visibility: hidden;
          transition: all 0.38s ease;
          backdrop-filter: blur(3px);
        }
        .mob-overlay.open { opacity: 1; visibility: visible; }

       
        .mob-menu {
          position: fixed; top: 0; right: -110%;
          width: min(320px, 88vw); height: 100vh;
          background: #0c0c0c;
          z-index: 9998;
          display: flex; flex-direction: column;
          transition: right 0.44s cubic-bezier(0.4,0,0.2,1);
          border-left: 1px solid rgba(201,169,110,0.12);
          overflow-y: auto;
        }
        .mob-menu.open { right: 0; }

        /* Gold line that animates down when menu opens */
        .mob-menu::before {
          content: '';
          position: absolute; top: 0; left: 0;
          width: 2px; height: 0%;
          background: linear-gradient(180deg, #c9a96e, transparent);
          transition: height 0.6s ease 0.2s;
        }
        .mob-menu.open::before { height: 100%; }

        .mob-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 22px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          flex-shrink: 0;
        }

        .mob-close {
          width: 33px; height: 33px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #fff; font-size: 15px;
          transition: all 0.25s; font-family: sans-serif;
        }
        .mob-close:hover { background: rgba(201,169,110,0.12); border-color: rgba(201,169,110,0.4); color: #c9a96e; transform: rotate(90deg); }

        .mob-nav { list-style: none; padding: 18px 0; flex: 1; }

        /* Stagger mobile nav items on open */
        .mob-menu.open .mob-nav li:nth-child(1) { animation: mobItemIn 0.4s ease 0.15s both; }
        .mob-menu.open .mob-nav li:nth-child(2) { animation: mobItemIn 0.4s ease 0.22s both; }
        .mob-menu.open .mob-nav li:nth-child(3) { animation: mobItemIn 0.4s ease 0.29s both; }
        .mob-menu.open .mob-nav li:nth-child(4) { animation: mobItemIn 0.4s ease 0.36s both; }
        .mob-menu.open .mob-nav li:nth-child(5) { animation: mobItemIn 0.4s ease 0.43s both; }
        @keyframes mobItemIn {
          from { opacity: 0; transform: translateX(22px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .mob-nav-link, .mob-nav-btn {
          display: flex; align-items: center; justify-content: space-between;
          width: 100%; padding: 15px 26px;
          font-size: 11.5px; font-weight: 600; letter-spacing: 2px;
          color: rgba(255,255,255,0.6);
          text-decoration: none; cursor: pointer;
          border: none; border-left: 2px solid transparent;
          background: none; font-family: 'Montserrat', sans-serif;
          transition: color 0.22s, border-color 0.22s, background 0.22s, padding-left 0.22s;
        }
        .mob-nav-link:hover, .mob-nav-btn:hover,
        .mob-nav-link.active, .mob-nav-btn.active {
          color: #fff; border-left-color: #c9a96e;
          background: rgba(201,169,110,0.04); padding-left: 30px;
        }

        .mob-dropdown {
          max-height: 0; overflow: hidden;
          transition: max-height 0.38s cubic-bezier(0.4,0,0.2,1);
          background: rgba(0,0,0,0.2);
        }
        .mob-dropdown.open { max-height: 180px; }

        .mob-drop-link {
          display: block; padding: 12px 26px 12px 46px;
          font-size: 10.5px; font-weight: 500; letter-spacing: 1.4px;
          color: rgba(255,255,255,0.4); text-decoration: none;
          transition: color 0.2s, padding-left 0.2s;
          position: relative;
        }
        .mob-drop-link::before {
          content: '—'; position: absolute; left: 26px;
          color: rgba(201,169,110,0.4); font-size: 9px;
          top: 50%; transform: translateY(-50%);
        }
        .mob-drop-link:hover { color: #c9a96e; padding-left: 52px; }

        .mob-footer {
          padding: 22px; flex-shrink: 0;
          border-top: 1px solid rgba(255,255,255,0.05);
          animation: fadeSlideUp 0.5s ease 0.5s both;
        }
        .mob-contact-label {
          font-size: 8.5px; letter-spacing: 2.5px;
          color: rgba(201,169,110,0.5); margin-bottom: 10px; display: block;
        }
        .mob-contact-info { font-size: 10px; letter-spacing: 0.8px; line-height: 2.2; }
        .mob-contact-info a { color: rgba(255,255,255,0.4); text-decoration: none; display: block; transition: color 0.2s; }
        .mob-contact-info a:hover { color: #c9a96e; }
        .mob-contact-info span { display: block; color: rgba(255,255,255,0.28); }

     
        @media (max-width: 1024px) {
          .navbar-inner { padding: 0 28px; }
          .nav-link, .nav-btn { padding: 8px 10px; font-size: 10.5px; letter-spacing: 1.4px; }
          .side-icon { display: none; }
        }
        @media (max-width: 768px) {
          .nav-list { display: none; }
          .side-icon { display: none; }
          .ham-btn { display: flex; }
          .navbar-inner { height: 66px; padding: 0 18px; }
          .logo-hera { font-size: 17px; letter-spacing: 4px; }
          .logo-construction { font-size: 9.5px; }
          .gold-dot { display: none; }
        }
      `}</style>

      {/* ── SCROLL PROGRESS STATE ── */}
      <ScrollProgress />

      {/* ── NAVBAR ── */}
      <nav className={`Boo-navbar${scrolled ? " scrolled" : ""}`}>
        <div className="navbar-shimmer-bar" />

        <div className="navbar-inner">
          {/* Animated gold dot */}
          <div className="gold-dot" />

          {/* ── LOGO ── */}
          <Link href="/" className="logo-link" onClick={(e) => handleNavClick("HOME", e)}>
            <div className="logo-icon-box">
              <svg viewBox="0 0 30 30" width="24" height="24" fill="none"
                stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline className="logo-svg-path" points="3,14 15,3 27,14" />
                <rect className="logo-svg-path" x="7" y="14" width="16" height="13"
                  style={{ animationDelay: "0.4s" }} />
                <rect className="logo-svg-path" x="12" y="19" width="6" height="8"
                  style={{ animationDelay: "0.7s" }} />
              </svg>
            </div>
            <div className="logo-text-group">
              <span className="logo-hera">BOO</span>
              <span className="logo-construction">CONSTRUCTION</span>
              <span className="logo-tagline">Trusted place to find your home</span>
            </div>
          </Link>

          {/* ── DESKTOP LINKS ── */}
          <ul className="nav-list">
            {navLinks.map((link) =>
              link.dropdown ? (
                <li key={link.label} className="nav-item" ref={dropdownRef}>
                  <button
                    className={`nav-btn${activeLink === link.label ? " active" : ""}`}
                    onClick={(e) => { setProjectsOpen((p) => !p); handleNavClick(link.label, e); }}
                  >
                    {link.label}
                    {ripple && ripple.label === link.label && (
                      <span className="nav-ripple" style={{
                        width: 30, height: 30,
                        left: ripple.x - 15, top: ripple.y - 15,
                      }} />
                    )}
                    <svg className={`chev${projectsOpen ? " open" : ""}`}
                      viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <polyline points="2,3 5,7 8,3" />
                    </svg>
                  </button>
                  <div className={`dropdown${projectsOpen ? " open" : ""}`}>
                    {link.dropdown.map((d) => (
                      <Link key={d.label} href={d.href} className="dropdown-item"
                        onClick={() => { setProjectsOpen(false); setActiveLink(link.label); }}>
                        {d.label}
                      </Link>
                    ))}
                  </div>
                </li>
              ) : (
                <li key={link.label} className="nav-item">
                  <Link href={link.href}
                    className={`nav-link${activeLink === link.label ? " active" : ""}`}
                    onClick={(e) => handleNavClick(link.label, e)}>
                    {link.label}
                    {ripple && ripple.label === link.label && (
                      <span className="nav-ripple" style={{
                        width: 30, height: 30,
                        left: ripple.x - 15, top: ripple.y - 15,
                      }} />
                    )}
                  </Link>
                </li>
              )
            )}
          </ul>

          {/* ── RIGHT SIDE ── */}
          <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
            <div className="side-icon" aria-label="Menu">
              <span /><span /><span />
            </div>
            <button
              className={`ham-btn${mobileOpen ? " open" : ""}`}
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              <span className="ham-line ham-line-1" />
              <span className="ham-line ham-line-2" />
              <span className="ham-line ham-line-3" />
            </button>
          </div>
        </div>
      </nav>

      {/* ── MOBILE OVERLAY ── */}
      <div className={`mob-overlay${mobileOpen ? " open" : ""}`}
        onClick={() => setMobileOpen(false)} />

      {/* ── MOBILE MENU ── */}
      <div className={`mob-menu${mobileOpen ? " open" : ""}`}>
        <div className="mob-header">
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}
            onClick={() => { setMobileOpen(false); setActiveLink("HOME"); }}>
            <div className="logo-icon-box" style={{ width: 36, height: 36 }}>
              <svg viewBox="0 0 30 30" width="18" height="18" fill="none"
                stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3,14 15,3 27,14" />
                <rect x="7" y="14" width="16" height="13" />
                <rect x="12" y="19" width="6" height="8" />
              </svg>
            </div>
            <div className="logo-text-group">
              <span className="logo-hera" style={{ fontSize: 15, letterSpacing: 4 }}>HERA</span>
              <span className="logo-construction" style={{ fontSize: 9 }}>CONSTRUCTION</span>
            </div>
          </Link>
          <button className="mob-close" onClick={() => setMobileOpen(false)}>✕</button>
        </div>

        <ul className="mob-nav">
          {navLinks.map((link) =>
            link.dropdown ? (
              <li key={link.label}>
                <button
                  className={`mob-nav-btn${activeLink === link.label ? " active" : ""}`}
                  onClick={() => setMobileProjectsOpen((p) => !p)}
                >
                  {link.label}
                  <svg style={{ width: 12, height: 12, transition: "transform 0.35s",
                    transform: mobileProjectsOpen ? "rotate(180deg)" : "rotate(0)" }}
                    viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <polyline points="2,3 5,7 8,3" />
                  </svg>
                </button>
                <div className={`mob-dropdown${mobileProjectsOpen ? " open" : ""}`}>
                  {link.dropdown.map((d) => (
                    <Link key={d.label} href={d.href} className="mob-drop-link"
                      onClick={() => { setMobileOpen(false); setActiveLink(link.label); }}>
                      {d.label}
                    </Link>
                  ))}
                </div>
              </li>
            ) : (
              <li key={link.label}>
                <Link href={link.href}
                  className={`mob-nav-link${activeLink === link.label ? " active" : ""}`}
                  onClick={() => { setActiveLink(link.label); setMobileOpen(false); }}>
                  {link.label}
                </Link>
              </li>
            )
          )}
        </ul>

        <div className="mob-footer">
          <span className="mob-contact-label">CONTACT US</span>
          <div className="mob-contact-info">
            <a href="tel:9944624724">📞 99446 24724</a>
            <a href="mailto:hera.cbe@gmail.com">✉ hera.cbe@gmail.com</a>
            <span>📍 R.S. Puram, Coimbatore</span>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Scroll progress bar as separate component ── */
function ScrollProgress() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setWidth(isNaN(pct) ? 0 : pct);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div style={{
      position: "fixed", top: 78, left: 0, width: "100%",
      height: "2px", zIndex: 9998, pointerEvents: "none",
    }}>
      <div style={{
        height: "100%", width: `${width}%`,
        background: "linear-gradient(90deg, #c9a96e, #f0d898)",
        transition: "width 0.1s linear",
        boxShadow: "0 0 8px rgba(201,169,110,0.55)",
      }} />
    </div>
  );
}