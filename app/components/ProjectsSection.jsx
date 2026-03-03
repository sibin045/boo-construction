"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

/* ─── PROJECT DATA ─── */
const projects = [
  {
    id: 1, img: "/img1.jpg", client: "Sivanesh", category: "Villa",
    title: "Luxury Villa in Goundampalayam",
    tag: "completed", year: "2023", area: "3,200 sq.ft",
    desc: "A sprawling luxury villa blending contemporary design with traditional Coimbatore sensibilities. Floor-to-ceiling windows flood every room with natural light.",
  },
  {
    id: 2, img: "/img2.jpg", client: "Hera Residence", category: "Residential",
    title: "Ready-to-Buy Luxury Villa",
    tag: "completed", year: "2023", area: "2,800 sq.ft",
    desc: "Move-in ready villa featuring premium finishes, landscaped gardens, and a private pool — a benchmark in modern residential living.",
  },
  {
    id: 3, img: "/img3.jpg", client: "Manish", category: "Villa",
    title: "Luxury Villa in Erode",
    tag: "completed", year: "2022", area: "4,100 sq.ft",
    desc: "An expansive double-storey villa in Erode with a dramatic entry foyer, home theatre, and rooftop terrace overlooking the city.",
  },
  {
    id: 4, img: "/img4.jpg", client: "Hera Residence", category: "Interior",
    title: "Interior for Hera Residence — Living",
    tag: "completed", year: "2023", area: "1,500 sq.ft",
    desc: "A sophisticated interior transformation featuring warm walnut tones, bespoke furniture, and curated art that elevates everyday living.",
  },
  {
    id: 5, img: "/img5.jpg", client: "Hera Residence", category: "Interior",
    title: "Staircase Design — Hera Residence",
    tag: "completed", year: "2023", area: "480 sq.ft",
    desc: "A sculptural floating staircase in steel and glass — the centrepiece of the residence, drawing the eye upward through three floors.",
  },
  {
    id: 6, img: "/img6.jpg", client: "Manoj", category: "Villa",
    title: "Luxury Villa for Comfortable Living",
    tag: "ongoing", year: "2024", area: "3,600 sq.ft",
    desc: "Currently under construction — a villa designed around the family's lifestyle, featuring an open courtyard and seamless indoor-outdoor flow.",
  },
  {
    id: 7, img: "/img7.jpg", client: "Imthiaz", category: "Residential",
    title: "Builders of Your Dream Home",
    tag: "completed", year: "2022", area: "2,400 sq.ft",
    desc: "A warm and welcoming family home with arched doorways, earthy palettes, and a stunning kitchen that became the heart of the house.",
  },
  {
    id: 8, img: "/img8.jpg", client: "Hera Residence", category: "Interior",
    title: "Top Kitchen Interior — Coimbatore",
    tag: "completed", year: "2023", area: "320 sq.ft",
    desc: "Award-worthy modular kitchen design with hidden storage, island breakfast counter, and premium appliance integration.",
  },
  {
    id: 9, img: "/img9.jpg", client: "Commercial", category: "Commercial",
    title: "Modern Commercial Space",
    tag: "ongoing", year: "2024", area: "6,200 sq.ft",
    desc: "A flagship commercial project redefining workspace design — open-plan floors, breakout pods, and a rooftop lounge for creative collaboration.",
  },
];

const FILTERS = ["All", "Villa", "Residential", "Interior", "Commercial"];

/* ─── useInView hook ─── */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ─── Counter ─── */
function Counter({ target, suffix = "+" }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView(0.3);
  useEffect(() => {
    if (!inView) return;
    let v = 0;
    const step = Math.ceil(target / 55);
    const t = setInterval(() => {
      v += step;
      if (v >= target) { setCount(target); clearInterval(t); }
      else setCount(v);
    }, 22);
    return () => clearInterval(t);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ══════════════════════════════════════════════
   PROJECT CARD with full image transition stack
══════════════════════════════════════════════ */
function ProjectCard({ project, index, onClick }) {
  const [cardRef, cardInView] = useInView(0.08);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);

  /* Each card gets a slightly different entrance style */
  const entranceVariants = [
    { from: "translateY(60px) scale(0.94)", clip: "inset(100% 0 0 0)" },   // slide up + clip
    { from: "translateX(-50px) scale(0.96)", clip: "inset(0 100% 0 0)" },  // slide right + clip
    { from: "translateX(50px) scale(0.96)", clip: "inset(0 0 0 100%)" },   // slide left + clip
    { from: "translateY(60px) scale(0.94)", clip: "inset(0 0 100% 0)" },   // slide down + clip
    { from: "scale(0.88) rotate(-1deg)", clip: "inset(50% 50% 50% 50%)" }, // scale from center
    { from: "translateY(60px) scale(0.94)", clip: "inset(100% 0 0 0)" },
    { from: "translateX(-50px) scale(0.96)", clip: "inset(0 100% 0 0)" },
    { from: "translateX(50px) scale(0.96)", clip: "inset(0 0 0 100%)" },
    { from: "scale(0.88) rotate(1deg)", clip: "inset(50% 50% 50% 50%)" },
  ];
  const variant = entranceVariants[index % entranceVariants.length];
  const delay = (index % 3) * 120;

  return (
    <div
      ref={cardRef}
      className="proj-card"
      style={{
        opacity: cardInView ? 1 : 0,
        transform: cardInView ? "none" : variant.from,
        transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms,
                     transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
      onClick={() => onClick(project)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── IMAGE LAYER with its own transition stack ── */}
      <div className="img-wrap">
        {/* Placeholder skeleton that pulses while image loads */}
        <div
          className="img-skeleton"
          style={{ opacity: imgLoaded ? 0 : 1, transition: "opacity 0.5s ease" }}
        />

        {/* Clip-reveal wipe that plays once card enters view */}
        <div
          className="img-clip-reveal"
          style={{
            clipPath: cardInView ? "inset(0 0 0 0)" : variant.clip,
            transition: `clip-path 0.9s cubic-bezier(0.77,0,0.175,1) ${delay + 60}ms`,
          }}
        >
          <Image
            src={project.img}
            alt={project.title}
            fill
            className={`proj-img ${hovered ? "hovered" : ""} ${imgLoaded ? "loaded" : ""}`}
            style={{ objectFit: "cover" }}
            sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
            onLoad={() => setImgLoaded(true)}
          />
        </div>

        {/* Gold line wipe that sweeps across once image loads — decorative reveal */}
        <div
          className="img-sweep-line"
          style={{
            transform: cardInView && imgLoaded ? "scaleX(0)" : "scaleX(1)",
            transition: `transform 0.8s cubic-bezier(0.77,0,0.175,1) ${delay + 120}ms`,
          }}
        />
      </div>

      {/* Overlay darkens on hover */}
      <div className={`proj-overlay ${hovered ? "hovered" : ""}`} />

      {/* Shimmer sweep on hover */}
      <div className={`proj-shimmer ${hovered ? "active" : ""}`} />

      {/* Status tag */}
      <span className={`proj-tag ${project.tag}`}>{project.tag}</span>

      {/* Card info — slides up on hover */}
      <div className="proj-info">
        <div className={`proj-cat ${hovered ? "show" : ""}`}>{project.category}</div>
        <div className="proj-title">{project.title}</div>
        <div className={`proj-client ${hovered ? "show" : ""}`}>{project.client}</div>
        <div className={`proj-desc ${hovered ? "show" : ""}`}>{project.desc}</div>
        <div className={`proj-meta ${hovered ? "show" : ""}`}>
          <span className="meta-pill">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <rect x="3" y="4" width="18" height="18" rx="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
            </svg>
            {project.year}
          </span>
          <span className="meta-dot" />
          <span className="meta-pill">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            </svg>
            {project.area}
          </span>
        </div>
        <div className={`proj-cta ${hovered ? "show" : ""}`}>
          View Project
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════ */
export default function ProjectsPage() {
  const [filter, setFilter] = useState("All");
  const [filterAnim, setFilterAnim] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const [lbImgLoaded, setLbImgLoaded] = useState(false);
  const heroRef = useRef(null);
  const [heroOffset, setHeroOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setHeroOffset(window.scrollY * 0.38);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  const filtered = filter === "All" ? projects : projects.filter(p => p.category === filter);

  const handleFilter = (f) => {
    if (f === filter) return;
    setFilterAnim(true);
    setTimeout(() => { setFilter(f); setFilterAnim(false); }, 260);
  };

  const openLightbox = (p) => { setLbImgLoaded(false); setLightbox(p); };
  const lbNav = (dir) => {
    const idx = filtered.findIndex(p => p.id === lightbox.id);
    const next = filtered[(idx + dir + filtered.length) % filtered.length];
    setLbImgLoaded(false);
    setLightbox(next);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap');

        :root {
          --gold: #c9a96e;
          --gold-lt: #f0d898;
          --dark:  #0a0a0a;
          --dark2: #111111;
          --dark3: #1a1a1a;
          --muted: rgba(255,255,255,0.42);
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .proj-page {
          background: var(--dark);
          min-height: 100vh;
          font-family: 'Montserrat', sans-serif;
          color: rgba(255,255,255,0.85);
          overflow-x: hidden;
        }

        /* ══ HERO ══ */
        .hero {
          position: relative; height: 56vh; min-height: 380px;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
        }
        .hero-bg {
          position: absolute; inset: -25%;
          background: url('/img3.jpg') center/cover no-repeat;
          filter: brightness(0.2) saturate(0.5);
          will-change: transform;
        }
        .hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(180deg,rgba(10,10,10,.35) 0%,rgba(10,10,10,.75) 100%);
        }
        .hero-content {
          position: relative; z-index: 2; text-align: center; padding: 0 20px;
        }
        .hero-eyebrow {
          font-size: 10px; letter-spacing: 5px; color: var(--gold);
          font-weight: 500; margin-bottom: 16px;
          display: flex; align-items: center; justify-content: center; gap: 14px;
          animation: fadeUp .8s ease .2s both;
        }
        .hero-eyebrow::before,.hero-eyebrow::after {
          content:''; width:40px; height:1px; background:var(--gold); opacity:.5;
        }
        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(48px,7vw,88px); font-weight: 300;
          color: #fff; letter-spacing: -1px; line-height: 1;
          animation: fadeUp .9s cubic-bezier(.16,1,.3,1) .35s both;
        }
        .hero-title em { font-style: italic; color: var(--gold); }
        .hero-sub {
          font-size: 11px; letter-spacing: 2px; color: var(--muted);
          margin-top: 18px; animation: fadeUp .8s ease .55s both;
        }
        .hero-line {
          width: 0; height: 1px; background: var(--gold);
          margin: 22px auto 0;
          animation: lineGrow 1s ease .7s forwards;
        }
        @keyframes lineGrow { to { width: 60px; } }
        .breadcrumb {
          position: absolute; bottom: 22px; left: 50%; transform: translateX(-50%);
          display: flex; align-items: center; gap: 8px;
          font-size: 9.5px; letter-spacing: 2px; color: var(--muted);
          animation: fadeUp .7s ease .9s both;
        }
        .breadcrumb a { color: var(--muted); text-decoration: none; transition: color .2s; }
        .breadcrumb a:hover { color: var(--gold); }

        /* ══ STATS ══ */
        .stats-bar {
          background: var(--dark2);
          border-top: 1px solid rgba(201,169,110,.1);
          border-bottom: 1px solid rgba(201,169,110,.1);
          padding: 32px 0;
        }
        .stats-inner {
          max-width: 1000px; margin: 0 auto;
          display: flex; justify-content: center; flex-wrap: wrap;
        }
        .stat-item {
          flex: 1; min-width: 140px; text-align: center;
          padding: 0 32px; position: relative;
        }
        .stat-item+.stat-item::before {
          content:''; position:absolute; left:0; top:50%; transform:translateY(-50%);
          height:40px; width:1px; background:rgba(201,169,110,.15);
        }
        .stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 42px; font-weight: 600; color: var(--gold); line-height: 1;
        }
        .stat-label {
          font-size: 9px; letter-spacing: 2.5px; color: var(--muted);
          margin-top: 6px; text-transform: uppercase;
        }

        /* ══ FILTER ══ */
        .filter-section {
          padding: 60px 48px 40px; max-width: 1440px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 20px;
        }
        .section-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px; font-weight: 300; color: #fff;
        }
        .section-label em { font-style: italic; color: var(--gold); }
        .filter-tabs { display: flex; gap: 4px; flex-wrap: wrap; }
        .filter-btn {
          padding: 8px 20px; font-size: 10px; font-weight: 600; letter-spacing: 2px;
          color: var(--muted); background: none;
          border: 1px solid rgba(255,255,255,.08);
          cursor: pointer; font-family: 'Montserrat', sans-serif;
          transition: all .28s cubic-bezier(.4,0,.2,1);
          position: relative; overflow: hidden;
        }
        .filter-btn::before {
          content:''; position:absolute; inset:0;
          background:var(--gold); transform:scaleX(0); transform-origin:left;
          transition:transform .28s cubic-bezier(.4,0,.2,1); z-index:0;
        }
        .filter-btn span { position:relative; z-index:1; }
        .filter-btn:hover { color:#fff; border-color:rgba(201,169,110,.3); }
        .filter-btn.active { color:#000; border-color:var(--gold); }
        .filter-btn.active::before { transform:scaleX(1); }

        /* ══ GRID ══ */
        .grid-wrap {
          max-width: 1440px; margin: 0 auto; padding: 0 48px 80px;
        }
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3px;
          transition: opacity .25s ease;
        }
        .projects-grid.fading { opacity: 0; pointer-events: none; }

        /* ══ CARD ══ */
        .proj-card {
          position: relative; overflow: hidden;
          aspect-ratio: 4/3; cursor: pointer;
          background: var(--dark3);
        }
        .proj-card:first-child { grid-row: span 2; aspect-ratio: unset; }
        .proj-card:nth-child(5) { grid-column: span 2; aspect-ratio: 16/7; }

        /* ── IMAGE WRAP: clip-reveal container ── */
        .img-wrap {
          position: absolute; inset: 0; overflow: hidden;
        }

        /* Pulsing skeleton shown while image loads */
        .img-skeleton {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(110deg,
            var(--dark3) 30%,
            rgba(201,169,110,.06) 50%,
            var(--dark3) 70%);
          background-size: 200% 100%;
          animation: skeletonPulse 1.6s ease-in-out infinite;
        }
        @keyframes skeletonPulse {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* Clip-reveal wrapper */
        .img-clip-reveal {
          position: absolute; inset: 0; z-index: 2;
          will-change: clip-path;
        }

        /* The actual image */
        .proj-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          /* Blur-up: starts blurry+desaturated, clears on load */
          filter: blur(18px) brightness(.6) saturate(.3) scale(1.08);
          transform: scale(1.08);
          transition:
            filter 1.1s cubic-bezier(.4,0,.2,1),
            transform 0.8s cubic-bezier(.4,0,.2,1);
          opacity: 0;
        }
        .proj-img.loaded {
          filter: blur(0px) brightness(.78) saturate(.85) scale(1);
          transform: scale(1);
          opacity: 1;
          transition:
            filter 1.1s cubic-bezier(.4,0,.2,1),
            transform 0.8s cubic-bezier(.4,0,.2,1),
            opacity .3s ease;
        }
        /* Hover: zoom + desaturate */
        .proj-img.loaded.hovered {
          filter: blur(0px) brightness(.48) saturate(.55) scale(1.08);
          transform: scale(1.08);
          transition:
            filter .65s cubic-bezier(.4,0,.2,1),
            transform .65s cubic-bezier(.4,0,.2,1);
        }

        /* Gold sweep line that wipes away after reveal */
        .img-sweep-line {
          position: absolute; inset: 0; z-index: 5;
          background: linear-gradient(90deg, transparent 0%, rgba(201,169,110,.18) 50%, var(--dark) 100%);
          transform-origin: right;
          pointer-events: none;
        }

        /* ── OVERLAYS ── */
        .proj-overlay {
          position: absolute; inset: 0; z-index: 6;
          background: linear-gradient(to top,
            rgba(0,0,0,.9) 0%,
            rgba(0,0,0,.35) 45%,
            transparent 100%);
          transition: background .45s ease;
        }
        .proj-overlay.hovered {
          background: linear-gradient(to top,
            rgba(0,0,0,.97) 0%,
            rgba(0,0,0,.62) 55%,
            rgba(0,0,0,.12) 100%);
        }
        .proj-shimmer {
          position: absolute; inset: 0; z-index: 7;
          background: linear-gradient(115deg,
            transparent 30%, rgba(201,169,110,.07) 50%, transparent 70%);
          transform: translateX(-110%);
          pointer-events: none;
        }
        .proj-shimmer.active {
          transform: translateX(110%);
          transition: transform .7s ease;
        }

        /* Tag */
        .proj-tag {
          position: absolute; top: 16px; right: 16px; z-index: 9;
          padding: 4px 12px; font-size: 8px; font-weight: 700;
          letter-spacing: 2px; border: 1px solid;
        }
        .proj-tag.completed { color:var(--gold); border-color:var(--gold); background:rgba(201,169,110,.08); }
        .proj-tag.ongoing   { color:#7ec8a0; border-color:#7ec8a0; background:rgba(126,200,160,.08); }

        /* ── INFO PANEL ── */
        .proj-info {
          position: absolute; bottom: 0; left: 0; right: 0;
          z-index: 8; padding: 22px 22px 20px;
        }
        .proj-cat {
          font-size: 9px; letter-spacing: 3px; color: var(--gold); font-weight: 600;
          margin-bottom: 6px;
          opacity: 0; transform: translateY(10px);
          transition: opacity .3s ease .04s, transform .3s ease .04s;
        }
        .proj-cat.show { opacity: 1; transform: translateY(0); }

        .proj-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 21px; font-weight: 400; color: #fff; line-height: 1.2;
          margin-bottom: 5px;
          transform: translateY(5px);
          transition: transform .35s ease;
        }
        .proj-card:hover .proj-title { transform: translateY(0); }

        .proj-client {
          font-size: 9px; letter-spacing: 1.5px; color: var(--muted);
          opacity: 0; transform: translateY(10px);
          transition: opacity .3s ease .07s, transform .3s ease .07s;
        }
        .proj-client.show { opacity: 1; transform: translateY(0); }

        .proj-desc {
          font-size: 10.5px; line-height: 1.7; color: rgba(255,255,255,.48);
          margin-top: 9px;
          max-height: 0; overflow: hidden; opacity: 0;
          transition: max-height .45s ease .08s, opacity .35s ease .08s;
        }
        .proj-desc.show { max-height: 90px; opacity: 1; }

        .proj-meta {
          display: flex; align-items: center; gap: 10px;
          margin-top: 10px;
          opacity: 0; transform: translateY(12px);
          transition: opacity .3s ease .12s, transform .3s ease .12s;
        }
        .proj-meta.show { opacity: 1; transform: translateY(0); }
        .meta-pill {
          display: flex; align-items: center; gap: 5px;
          font-size: 9px; letter-spacing: 1.2px; color: var(--muted);
        }
        .meta-dot { width: 3px; height: 3px; border-radius: 50%; background: rgba(255,255,255,.2); }

        .proj-cta {
          display: inline-flex; align-items: center; gap: 8px;
          margin-top: 12px; font-size: 9px; font-weight: 700; letter-spacing: 2.5px;
          color: var(--gold); border-bottom: 1px solid rgba(201,169,110,.35);
          padding-bottom: 2px;
          opacity: 0; transform: translateY(14px);
          transition: opacity .3s ease .16s, transform .3s ease .16s;
        }
        .proj-cta.show { opacity: 1; transform: translateY(0); }
        .proj-cta svg { transition: transform .3s ease; }
        .proj-cta:hover svg { transform: translateX(4px); }

        /* ══ CTA STRIP ══ */
        .cta-strip {
          background: var(--dark2);
          border-top: 1px solid rgba(201,169,110,.1);
          padding: 80px 48px; text-align: center; position: relative; overflow: hidden;
        }
        .cta-strip::before {
          content:''; position:absolute; inset:0;
          background: radial-gradient(ellipse 60% 60% at 50% 50%, rgba(201,169,110,.04), transparent);
          pointer-events: none;
        }
        .cta-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(32px,4vw,54px); font-weight: 300; color: #fff; margin-bottom: 14px;
        }
        .cta-title em { font-style: italic; color: var(--gold); }
        .cta-sub {
          font-size: 11px; letter-spacing: 1.5px; color: var(--muted);
          margin-bottom: 34px; max-width: 500px; margin-left: auto; margin-right: auto;
        }
        .cta-btn {
          display: inline-flex; align-items: center; gap: 12px;
          padding: 15px 40px; font-size: 10px; font-weight: 700; letter-spacing: 3px;
          color: #000; background: var(--gold);
          border: none; cursor: pointer; font-family: 'Montserrat', sans-serif;
          text-decoration: none;
          transition: all .3s ease; position: relative; overflow: hidden;
        }
        .cta-btn::before {
          content:''; position:absolute; inset:0; background:var(--gold-lt);
          transform:scaleX(0); transform-origin:left; transition:transform .3s ease;
        }
        .cta-btn span,.cta-btn svg { position:relative; z-index:1; }
        .cta-btn:hover::before { transform:scaleX(1); }
        .cta-btn:hover { transform:translateY(-2px); box-shadow:0 12px 30px rgba(201,169,110,.3); }

        /* ══ LIGHTBOX ══ */
        .lb-overlay {
          position: fixed; inset: 0; z-index: 99999;
          background: rgba(0,0,0,.95);
          display: flex; align-items: center; justify-content: center;
          animation: lbIn .3s ease;
          backdrop-filter: blur(10px);
        }
        @keyframes lbIn { from{opacity:0} to{opacity:1} }

        .lb-content {
          display: flex; max-width: 1100px; width: 95vw; max-height: 90vh;
          animation: lbSlide .42s cubic-bezier(.16,1,.3,1);
          box-shadow: 0 40px 100px rgba(0,0,0,.8);
          overflow: hidden;
        }
        @keyframes lbSlide {
          from{opacity:0;transform:scale(.92) translateY(22px)}
          to  {opacity:1;transform:scale(1)   translateY(0)}
        }

        .lb-img-wrap {
          flex: 1.4; position: relative; min-height: 420px; max-height: 80vh;
          overflow: hidden; background: var(--dark3);
        }
        /* Lightbox image: blur-up on each open/navigate */
        .lb-img {
          width: 100% !important; height: 100% !important; object-fit: cover;
          filter: blur(20px) brightness(.5) saturate(.4);
          transform: scale(1.06);
          transition: filter 1.1s cubic-bezier(.4,0,.2,1),
                      transform 1.1s cubic-bezier(.4,0,.2,1);
        }
        .lb-img.loaded {
          filter: blur(0px) brightness(1) saturate(1);
          transform: scale(1);
        }
        /* Subtle Ken Burns on lightbox */
        .lb-img.loaded { animation: kenBurns 9s ease-in-out infinite alternate; }
        @keyframes kenBurns {
          from { transform: scale(1);     transform-origin: 60% 40%; }
          to   { transform: scale(1.04);  transform-origin: 40% 60%; }
        }

        .lb-close {
          position: absolute; top: 16px; right: 16px; z-index: 2;
          width: 36px; height: 36px; background: rgba(0,0,0,.5);
          border: 1px solid rgba(255,255,255,.12);
          color: #fff; cursor: pointer; font-size: 15px;
          display: flex; align-items: center; justify-content: center;
          transition: all .25s; font-family: sans-serif;
        }
        .lb-close:hover { background:rgba(201,169,110,.15); border-color:var(--gold); color:var(--gold); transform:rotate(90deg); }

        .lb-nav {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 40px; height: 40px; z-index: 2;
          background: rgba(0,0,0,.45); border: 1px solid rgba(255,255,255,.12);
          color: #fff; cursor: pointer; font-size: 20px;
          display: flex; align-items: center; justify-content: center;
          transition: all .25s;
        }
        .lb-nav:hover { background:var(--gold); border-color:var(--gold); color:#000; }
        .lb-nav.prev { left: 12px; }
        .lb-nav.next { right: 12px; }

        .lb-info {
          width: 310px; flex-shrink: 0; background: var(--dark2);
          padding: 38px 28px;
          display: flex; flex-direction: column; justify-content: space-between;
          border-left: 1px solid rgba(201,169,110,.1);
          overflow-y: auto;
        }
        .lb-cat { font-size: 9px; letter-spacing: 3px; color: var(--gold); font-weight: 700; margin-bottom: 10px; }
        .lb-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 27px; font-weight: 400; color: #fff; line-height: 1.25; margin-bottom: 14px;
        }
        .lb-desc { font-size: 11px; line-height: 1.8; color: var(--muted); flex: 1; margin-bottom: 22px; }
        .lb-details {
          border-top: 1px solid rgba(255,255,255,.06); padding-top: 18px;
          display: flex; flex-direction: column; gap: 10px;
        }
        .lb-row { display: flex; justify-content: space-between; font-size: 9.5px; letter-spacing: 1px; }
        .lb-key { color: var(--muted); }
        .lb-val { color: #fff; font-weight: 600; }

        /* ══ KEYFRAMES ══ */
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(22px); }
          to   { opacity:1; transform:translateY(0); }
        }

        /* ══ RESPONSIVE ══ */
        @media(max-width:1024px){
          .projects-grid{grid-template-columns:repeat(2,1fr);}
          .proj-card:first-child{grid-row:span 1;aspect-ratio:4/3;}
          .proj-card:nth-child(5){grid-column:span 1;aspect-ratio:4/3;}
          .filter-section,.grid-wrap{padding-left:28px;padding-right:28px;}
        }
        @media(max-width:768px){
          .projects-grid{grid-template-columns:1fr;gap:3px;}
          .proj-card:first-child,.proj-card:nth-child(5){grid-row:unset;grid-column:unset;aspect-ratio:4/3;}
          .filter-section{padding:36px 18px 24px;flex-direction:column;align-items:flex-start;}
          .grid-wrap{padding:0 18px 48px;}
          .lb-content{flex-direction:column;}
          .lb-info{width:100%;max-height:42vh;}
          .cta-strip{padding:56px 24px;}
        }
      `}</style>

      <div className="proj-page">

        {/* ── HERO ── */}
        <section className="hero" ref={heroRef}>
          <div className="hero-bg" style={{ transform: `translateY(${heroOffset}px)` }} />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="hero-eyebrow">Our Portfolio</p>
            <h1 className="hero-title">Project <em>Gallery</em></h1>
            <p className="hero-sub">CRAFTING SPACES THAT INSPIRE &amp; ENDURE</p>
            <div className="hero-line" />
          </div>
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span style={{ color: "var(--gold)" }}>›</span>
            <span style={{ color: "rgba(255,255,255,.6)" }}>Projects</span>
          </nav>
        </section>

        {/* ── STATS ── */}
        <div className="stats-bar">
          <div className="stats-inner">
            {[
              { num: 220, label: "Projects Completed" },
              { num: 8,   label: "Years of Excellence" },
              { num: 160, label: "Happy Clients" },
              { num: 15,  label: "Ongoing Projects" },
            ].map(s => (
              <div className="stat-item" key={s.label}>
                <div className="stat-num"><Counter target={s.num} /></div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── FILTER ── */}
        <div className="filter-section">
          <h2 className="section-label">Showcasing Our <em>Finest</em> Work</h2>
          <div className="filter-tabs">
            {FILTERS.map(f => (
              <button key={f} className={`filter-btn${filter === f ? " active" : ""}`}
                onClick={() => handleFilter(f)}>
                <span>{f}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── GRID ── */}
        <div className="grid-wrap">
          <div className={`projects-grid${filterAnim ? " fading" : ""}`}>
            {filtered.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} onClick={openLightbox} />
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <section className="cta-strip">
          <h2 className="cta-title">Ready to Build Your <em>Dream</em>?</h2>
          <p className="cta-sub">Let's discuss your next project. Our expert team is eager to bring your vision to life.</p>
          <Link href="/contact" className="cta-btn">
            <span>Get a Free Quote</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </section>
      </div>

      {/* ── LIGHTBOX ── */}
      {lightbox && (
        <div className="lb-overlay" onClick={() => setLightbox(null)}>
          <div className="lb-content" onClick={e => e.stopPropagation()}>
            <div className="lb-img-wrap">
              <Image
                src={lightbox.img} alt={lightbox.title} fill
                className={`lb-img${lbImgLoaded ? " loaded" : ""}`}
                style={{ objectFit: "cover" }}
                sizes="70vw" priority
                onLoad={() => setLbImgLoaded(true)}
              />
              <button className="lb-close" onClick={() => setLightbox(null)}>✕</button>
              <button className="lb-nav prev" onClick={() => lbNav(-1)}>‹</button>
              <button className="lb-nav next" onClick={() => lbNav(1)}>›</button>
            </div>
            <div className="lb-info">
              <div>
                <div className="lb-cat">{lightbox.category}</div>
                <h2 className="lb-title">{lightbox.title}</h2>
                <p className="lb-desc">{lightbox.desc}</p>
              </div>
              <div className="lb-details">
                {[
                  { k: "Client", v: lightbox.client },
                  { k: "Year",   v: lightbox.year },
                  { k: "Area",   v: lightbox.area },
                  { k: "Status", v: lightbox.tag[0].toUpperCase() + lightbox.tag.slice(1) },
                ].map(r => (
                  <div className="lb-row" key={r.k}>
                    <span className="lb-key">{r.k}</span>
                    <span className="lb-val">{r.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}