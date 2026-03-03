'use client';
import { useEffect, useRef, useState } from 'react';

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

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref);
  const [form, setForm] = useState({ name:'', phone:'', email:'', message:'' });
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState(null);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    const subject = encodeURIComponent('Project Enquiry from Website');
    const body = encodeURIComponent(
      `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );
    window.open(`mailto:hera.cbe@gmail.com?subject=${subject}&body=${body}`, '_blank');
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name:'', phone:'', email:'', message:'' });
  };

  const contactInfo = [
    {
      icon: (
        <svg viewBox="0 0 24 24" width="20" fill="currentColor">
          <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
        </svg>
      ),
      label: 'Phone No',
      lines: ['99446 24724', '0422 435 2421'],
      href: 'tel:9944624724',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="20" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16v16H4z" strokeLinejoin="round"/>
          <path d="M4 4l8 9 8-9" strokeLinecap="round"/>
        </svg>
      ),
      label: 'Email Address',
      lines: ['hera.cbe@gmail.com'],
      href: 'mailto:hera.cbe@gmail.com',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="20" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      ),
      label: 'Office Address',
      lines: ['No 37, Sir Shanmugam Rd,', 'R.S. Puram, Coimbatore', 'Tamil Nadu 641002'],
      href: 'https://maps.google.com/?q=Hera+Construction+Coimbatore',
    },
  ];

  return (
    <section className="cs" ref={ref}>
      <div className="cs-glow cs-g1" />
      <div className="cs-glow cs-g2" />
      <div className="cs-grid" />

      <div className="cs-wrap">

        {/* ── HEADER ── */}
        <div className={`cs-head ${inView ? 'ch-in' : ''}`}>
          <div className="cs-tag">
            <span className="cs-tl" /><span>Contact</span><span className="cs-tl" />
          </div>
          <h2 className="cs-h2">
            Get In <em className="cs-glow-txt">Touch</em>
          </h2>
          <p className="cs-sub">
            Ready to start your dream project? Reach out to us today — we'd love
            to hear from you and bring your vision to life.
          </p>
        </div>

        {/* ── BODY ── */}
        <div className="cs-body">

          {/* LEFT — info cards */}
          <div className="cs-info">
            {contactInfo.map((item, i) => (
              <a
                key={i}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className={`ci-card ${inView ? 'ci-in' : ''}`}
                style={{ transitionDelay: `${0.1 + i * 0.1}s` }}
              >
                <div className="ci-icon">{item.icon}</div>
                <div className="ci-text">
                  <span className="ci-label">{item.label}</span>
                  {item.lines.map((l, j) => (
                    <span key={j} className="ci-line">{l}</span>
                  ))}
                </div>
                <div className="ci-arrow">
                  <svg viewBox="0 0 20 20" width="14" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 10h12M10 4l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="ci-bar" />
              </a>
            ))}

            {/* map embed */}
            <div className={`cs-map ${inView ? 'map-in' : ''}`}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.4!2d76.955!3d11.006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDAwJzIxLjYiTiA3NsKwNTcnMTguMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="180"
                style={{ border:0, filter:'invert(90%) hue-rotate(180deg) brightness(0.85) contrast(1.1)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Hera Construction Location"
              />
            </div>
          </div>

          {/* RIGHT — form */}
          <div className={`cs-form-wrap ${inView ? 'fw-in' : ''}`}>
            <div className="cs-form-head">
              <h3 className="cfh-title">Send a Message</h3>
              <p className="cfh-sub">We'll get back to you within 24 hours.</p>
            </div>

            {sent ? (
              <div className="cs-sent">
                <svg viewBox="0 0 48 48" width="44" fill="none">
                  <circle cx="24" cy="24" r="22" stroke="#c8a96e" strokeWidth="2"/>
                  <path d="M14 24l7 7 13-14" stroke="#c8a96e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p>Message sent! We'll reach out to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="cs-form">
                <div className="form-row">
                  <div className={`form-field ${focused==='name'?'ff-focus':''} ${form.name?'ff-filled':''}`}>
                    <input
                      type="text" name="name" value={form.name}
                      onChange={handleChange} required
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                      placeholder=" "
                    />
                    <label>Your Name</label>
                    <div className="ff-bar" />
                  </div>
                  <div className={`form-field ${focused==='phone'?'ff-focus':''} ${form.phone?'ff-filled':''}`}>
                    <input
                      type="tel" name="phone" value={form.phone}
                      onChange={handleChange}
                      onFocus={() => setFocused('phone')}
                      onBlur={() => setFocused(null)}
                      placeholder=" "
                    />
                    <label>Phone Number</label>
                    <div className="ff-bar" />
                  </div>
                </div>
                <div className={`form-field ${focused==='email'?'ff-focus':''} ${form.email?'ff-filled':''}`}>
                  <input
                    type="email" name="email" value={form.email}
                    onChange={handleChange} required
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    placeholder=" "
                  />
                  <label>Email Address</label>
                  <div className="ff-bar" />
                </div>
                <div className={`form-field ff-textarea ${focused==='message'?'ff-focus':''} ${form.message?'ff-filled':''}`}>
                  <textarea
                    name="message" value={form.message} rows={5}
                    onChange={handleChange} required
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    placeholder=" "
                  />
                  <label>Your Message</label>
                  <div className="ff-bar" />
                </div>
                <button type="submit" className="cs-submit">
                  <span>Send Message</span>
                  <svg viewBox="0 0 24 24" width="16" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .cs {
          position:relative; background:#080808;
          padding:clamp(70px,10vw,130px) 0; overflow:hidden;
        }
        .cs-glow {
          position:absolute; border-radius:50%;
          filter:blur(120px); pointer-events:none; z-index:0;
        }
        .cs-g1 { width:600px; height:600px; top:-150px; right:-150px;
          background:radial-gradient(circle,rgba(200,169,110,0.07) 0%,transparent 70%); }
        .cs-g2 { width:500px; height:500px; bottom:-100px; left:-100px;
          background:radial-gradient(circle,rgba(200,169,110,0.05) 0%,transparent 70%); }
        .cs-grid {
          position:absolute; inset:0; pointer-events:none; z-index:0;
          background-image:
            linear-gradient(rgba(200,169,110,0.025) 1px,transparent 1px),
            linear-gradient(90deg,rgba(200,169,110,0.025) 1px,transparent 1px);
          background-size:60px 60px;
        }
        .cs-wrap {
          position:relative; z-index:1;
          max-width:1300px; margin:0 auto;
          padding:0 clamp(20px,5vw,70px);
        }
        /* header */
        .cs-head {
          text-align:center; margin-bottom:clamp(44px,6vw,72px);
          opacity:0; transform:translateY(28px);
          transition:opacity 0.8s ease,transform 0.8s ease;
        }
        .ch-in { opacity:1; transform:translateY(0); }
        .cs-tag {
          display:inline-flex; align-items:center; gap:14px;
          font-size:0.67rem; font-weight:700; letter-spacing:0.3em;
          text-transform:uppercase; color:#c8a96e; margin-bottom:14px;
        }
        .cs-tl { display:block; width:36px; height:1px; background:#c8a96e; }
        .cs-h2 {
          font-family:'Georgia',serif; font-size:clamp(2rem,5vw,3.8rem);
          font-weight:700; color:#fff; line-height:1.1; margin:0 0 14px;
        }
        .cs-glow-txt {
          font-style:italic; color:#c8a96e;
          text-shadow:0 0 12px rgba(200,169,110,0.9),0 0 28px rgba(200,169,110,0.5),0 0 56px rgba(200,169,110,0.25);
          animation:gPulse 3s ease-in-out infinite;
        }
        @keyframes gPulse {
          0%,100%{text-shadow:0 0 12px rgba(200,169,110,0.9),0 0 28px rgba(200,169,110,0.5),0 0 56px rgba(200,169,110,0.25);}
          50%{text-shadow:0 0 20px rgba(200,169,110,1),0 0 44px rgba(200,169,110,0.7),0 0 85px rgba(200,169,110,0.38);}
        }
        .cs-sub {
          font-size:clamp(0.85rem,1.2vw,0.96rem);
          color:rgba(255,255,255,0.42); line-height:1.8; max-width:500px; margin:0 auto;
        }
        /* body */
        .cs-body {
          display:grid; grid-template-columns:1fr 1.4fr; gap:clamp(32px,5vw,72px);
          align-items:start;
        }
        /* info cards */
        .cs-info { display:flex; flex-direction:column; gap:12px; }
        .ci-card {
          display:flex; align-items:flex-start; gap:16px;
          padding:20px 20px;
          background:rgba(255,255,255,0.03);
          border:1px solid rgba(255,255,255,0.07);
          text-decoration:none; position:relative; overflow:hidden;
          opacity:0; transform:translateX(-20px);
          transition:opacity 0.6s cubic-bezier(0.23,1,0.32,1),
                      transform 0.6s cubic-bezier(0.23,1,0.32,1),
                      border-color 0.3s, background 0.3s;
        }
        .ci-in { opacity:1; transform:translateX(0); }
        .ci-card:hover { border-color:rgba(200,169,110,0.3); background:rgba(200,169,110,0.04); }
        .ci-icon {
          width:44px; height:44px; border-radius:50%;
          background:rgba(200,169,110,0.08); border:1px solid rgba(200,169,110,0.2);
          display:flex; align-items:center; justify-content:center;
          color:#c8a96e; flex-shrink:0; transition:all 0.3s;
        }
        .ci-card:hover .ci-icon {
          background:rgba(200,169,110,0.15); border-color:rgba(200,169,110,0.5);
          box-shadow:0 0 16px rgba(200,169,110,0.2);
        }
        .ci-text { display:flex; flex-direction:column; gap:2px; flex:1; }
        .ci-label {
          font-size:0.62rem; font-weight:700; letter-spacing:0.2em;
          text-transform:uppercase; color:#c8a96e;
        }
        .ci-line { font-size:0.84rem; color:rgba(255,255,255,0.65); font-weight:500; }
        .ci-arrow {
          color:rgba(200,169,110,0.3); flex-shrink:0; margin-top:2px;
          transition:color 0.3s, transform 0.3s;
        }
        .ci-card:hover .ci-arrow { color:#c8a96e; transform:translateX(4px); }
        .ci-bar {
          position:absolute; left:0; top:0; bottom:0; width:2px;
          background:linear-gradient(to bottom,transparent,#c8a96e,transparent);
          transform:scaleY(0); transform-origin:bottom;
          transition:transform 0.4s cubic-bezier(0.23,1,0.32,1);
        }
        .ci-card:hover .ci-bar { transform:scaleY(1); }

        /* map */
        .cs-map {
          overflow:hidden; border:1px solid rgba(200,169,110,0.15);
          opacity:0; transform:translateY(16px);
          transition:opacity 0.6s 0.4s ease, transform 0.6s 0.4s ease;
        }
        .map-in { opacity:1; transform:translateY(0); }

        /* form wrap */
        .cs-form-wrap {
          background:rgba(14,12,8,0.9);
          border:1px solid rgba(255,255,255,0.07);
          padding:clamp(24px,4vw,44px);
          opacity:0; transform:translateX(24px);
          transition:opacity 0.7s 0.15s cubic-bezier(0.23,1,0.32,1),
                      transform 0.7s 0.15s cubic-bezier(0.23,1,0.32,1);
        }
        .fw-in { opacity:1; transform:translateX(0); }
        .cs-form-head { margin-bottom:28px; }
        .cfh-title {
          font-family:'Georgia',serif; font-size:clamp(1.2rem,2vw,1.6rem);
          font-weight:700; color:#fff; margin:0 0 6px;
        }
        .cfh-sub { font-size:0.82rem; color:rgba(255,255,255,0.38); margin:0; }

        /* form fields */
        .cs-form { display:flex; flex-direction:column; gap:20px; }
        .form-row { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        .form-field {
          position:relative;
        }
        .form-field input,
        .form-field textarea {
          width:100%; background:rgba(255,255,255,0.04);
          border:1px solid rgba(255,255,255,0.1);
          padding:16px 14px 8px;
          color:#fff; font-size:0.88rem;
          outline:none; resize:none;
          transition:border-color 0.3s, background 0.3s;
          font-family:inherit;
          box-sizing:border-box;
        }
        .form-field input::placeholder,
        .form-field textarea::placeholder { color:transparent; }
        .ff-focus input,
        .ff-focus textarea {
          border-color:rgba(200,169,110,0.5);
          background:rgba(200,169,110,0.04);
        }
        .form-field label {
          position:absolute; left:14px; top:14px;
          font-size:0.82rem; color:rgba(255,255,255,0.35);
          pointer-events:none;
          transition:all 0.25s cubic-bezier(0.23,1,0.32,1);
        }
        .ff-focus label,
        .ff-filled label {
          top:5px; font-size:0.62rem;
          letter-spacing:0.14em; text-transform:uppercase;
          color:#c8a96e;
        }
        .ff-bar {
          position:absolute; bottom:0; left:0; right:0; height:2px;
          background:#c8a96e;
          transform:scaleX(0); transform-origin:left;
          transition:transform 0.35s cubic-bezier(0.23,1,0.32,1);
        }
        .ff-focus .ff-bar { transform:scaleX(1); }

        /* submit */
        .cs-submit {
          display:inline-flex; align-items:center; justify-content:center; gap:10px;
          padding:15px 36px; background:#c8a96e; color:#0a0a0a;
          font-size:0.78rem; font-weight:700; letter-spacing:0.14em;
          text-transform:uppercase; border:none; cursor:pointer;
          position:relative; overflow:hidden; transition:color 0.35s;
          width:100%;
        }
        .cs-submit::before {
          content:''; position:absolute; inset:0; background:#0a0a0a;
          transform:translateX(-100%);
          transition:transform 0.35s cubic-bezier(0.23,1,0.32,1);
        }
        .cs-submit:hover::before { transform:translateX(0); }
        .cs-submit:hover { color:#c8a96e; }
        .cs-submit span,.cs-submit svg { position:relative; z-index:1; }

        /* sent */
        .cs-sent {
          display:flex; flex-direction:column; align-items:center; gap:16px;
          padding:48px 24px; text-align:center;
        }
        .cs-sent p {
          font-family:'Georgia',serif; font-size:1.05rem;
          color:rgba(255,255,255,0.7); margin:0;
        }

        /* responsive */
        @media (max-width:900px) {
          .cs-body { grid-template-columns:1fr; }
        }
        @media (max-width:500px) {
          .form-row { grid-template-columns:1fr; }
        }
      `}</style>
    </section>
  );
}