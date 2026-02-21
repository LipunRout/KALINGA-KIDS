import { Link } from "react-router-dom";

// ─────────────────────────────────────────────────────────────
//  KALINGA KIDS FOOTER — Professional Edition
//  Matches Home.jsx design system:
//  · Fonts  : DM Serif Display + DM Sans
//  · Palette: Navy #1A3A5C · Red · Orange · Yellow · Green · Sky
//  · Tone   : Premium institution — structured, warm, trustworthy
// ─────────────────────────────────────────────────────────────

const quickLinks = [
  { label: "Home",      to: "/"          },
  { label: "About Us",  to: "/about"     },
  { label: "Programs",  to: "/programs"  },
  { label: "Gallery",   to: "/gallery"   },
  { label: "Admission", to: "/admission" },
  { label: "Contact",   to: "/contact"   },
];

const programs = [
  { label: "Play Group", age: "2–3 Years", color: "#E8533A" },
  { label: "Nursery",    age: "3–4 Years", color: "#2B7AB8" },
  { label: "LKG",        age: "4–5 Years", color: "#2E8B57" },
  { label: "UKG",        age: "5–6 Years", color: "#D4891A" },
];

// same logo colors used in navbar ring & hero bar
const LOGO_COLORS = ["#C0392B","#E8533A","#D4891A","#2E8B57","#2B7AB8"];

export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

        /* ── TOKENS ──────────────────────────────────────── */
        :root {
          --ft-navy   : #1A3A5C;
          --ft-orange : #c342c6;
          --ft-yellow : #D4891A;
          --ft-green  : #2E8B57;
          --ft-sky    : #2B7AB8;
          --ft-red    : #C0392B;
          --ft-serif  : 'DM Serif Display', Georgia, serif;
          --ft-sans   : 'DM Sans', system-ui, sans-serif;
          --ft-bg     : #0F1923;      /* deep navy-dark, not pure black */
          --ft-surface: rgba(255,255,255,0.04);
          --ft-border : rgba(255,255,255,0.08);
          --ft-muted  : rgba(255,255,255,0.45);
          --ft-soft   : rgba(255,255,255,0.7);
        }

        /* ════════════════════════════════════════════════
           FOOTER SHELL
        ════════════════════════════════════════════════ */
        .pf-footer {
          background: var(--ft-bg);
          font-family: var(--ft-sans);
          position: relative;
          overflow: hidden;
        }

        /* very subtle radial glow — matches home hero blobs, toned down */
        .pf-footer::before {
          content: "";
          position: absolute;
          top: -120px; left: -120px;
          width: 480px; height: 480px;
          background: radial-gradient(circle, rgba(26,58,92,0.45), transparent 65%);
          border-radius: 50%;
          pointer-events: none;
        }
        .pf-footer::after {
          content: "";
          position: absolute;
          bottom: -80px; right: -80px;
          width: 360px; height: 360px;
          background: radial-gradient(circle, rgba(46,139,87,0.1), transparent 65%);
          border-radius: 50%;
          pointer-events: none;
        }

        /* logo-color accent line — matches navbar top stripe */
        .pf-accent-line {
          height: 3px;
          background: linear-gradient(90deg,
            var(--ft-red),
            var(--ft-orange),
            var(--ft-yellow),
            var(--ft-green),
            var(--ft-sky)
          );
          background-size: 300% auto;
          animation: pfRainbow 8s linear infinite;
        }
        @keyframes pfRainbow { to { background-position: 300% center; } }

        /* ════════════════════════════════════════════════
           TOP BAND — school name + mission line
        ════════════════════════════════════════════════ */
        .pf-top {
          max-width: 1160px;
          margin: 0 auto;
          padding: 64px 32px 48px;
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 60px;
          align-items: center;
          border-bottom: 1px solid var(--ft-border);
          position: relative;
          z-index: 1;
        }

        .pf-brand-name {
          font-family: var(--ft-serif);
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 400;
          color: #fff;
          line-height: 1.1;
          letter-spacing: -0.3px;
          margin-bottom: 12px;
        }
        .pf-brand-name em {
          font-style: italic;
          color: var(--ft-orange);
        }

        .pf-tagline {
          font-size: 15px;
          color: var(--ft-muted);
          line-height: 1.7;
          max-width: 420px;
          font-weight: 300;
        }

        /* apply CTA in top-right */
        .pf-apply-wrap { text-align: right; }
        .pf-apply-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--ft-muted);
          margin-bottom: 14px;
        }
        .pf-apply-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--ft-orange);
          color: white;
          font-family: var(--ft-sans);
          font-weight: 600;
          font-size: 15px;
          padding: 14px 28px;
          border-radius: 6px;
          text-decoration: none;
          border: 2px solid var(--ft-orange);
          transition: background 0.22s ease, color 0.22s ease, transform 0.22s ease;
          letter-spacing: 0.2px;
        }
        .pf-apply-btn:hover {
          background: transparent;
          color: var(--ft-orange);
          text-decoration: none;
          transform: translateY(-2px);
        }

        /* ════════════════════════════════════════════════
           MAIN GRID — 3 columns
        ════════════════════════════════════════════════ */
        .pf-grid {
          max-width: 1160px;
          margin: 0 auto;
          padding: 56px 32px;
          display: grid;
          grid-template-columns: 1.1fr 1fr 1.2fr;
          gap: 48px;
          border-bottom: 1px solid var(--ft-border);
          position: relative;
          z-index: 1;
        }

        /* column heading — matches home "eyebrow" style */
        .pf-col-head {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--ft-sans);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--ft-orange);
          margin-bottom: 24px;
        }
        .pf-col-head::before {
          content: "";
          display: block;
          width: 18px; height: 2px;
          background: var(--ft-orange);
          border-radius: 2px;
          flex-shrink: 0;
        }

        /* ── QUICK LINKS ──────────────────────────────── */
        .pf-links {
          list-style: none;
          margin: 0; padding: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .pf-links a {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--ft-muted);
          text-decoration: none;
          font-size: 14.5px;
          font-weight: 400;
          padding: 7px 0;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          transition: color 0.2s ease, padding-left 0.2s ease;
        }
        .pf-links a .pf-arr {
          font-size: 11px;
          color: var(--ft-orange);
          opacity: 0;
          transform: translateX(-4px);
          transition: all 0.2s ease;
          flex-shrink: 0;
        }
        .pf-links a:hover {
          color: #fff;
          padding-left: 6px;
          text-decoration: none;
        }
        .pf-links a:hover .pf-arr {
          opacity: 1;
          transform: translateX(0);
        }

        /* ── PROGRAMS ──────────────────────────────────── */
        .pf-progs {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .pf-prog {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 11px 14px;
          background: var(--ft-surface);
          border: 1px solid var(--ft-border);
          border-radius: 8px;
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
          cursor: default;
        }
        .pf-prog:hover {
          background: rgba(255,255,255,0.07);
          transform: translateX(4px);
        }
        .pf-prog-name {
          font-family: var(--ft-sans);
          font-weight: 600;
          font-size: 14px;
          color: #fff;
        }
        .pf-prog-age {
          font-size: 12px;
          color: var(--ft-muted);
          font-weight: 400;
        }
        .pf-prog-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
          margin-left: 10px;
        }

        /* ── CONTACT ───────────────────────────────────── */
        .pf-contacts {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .pf-contact {
          display: flex;
          gap: 14px;
          align-items: flex-start;
        }
        .pf-contact-icon {
          width: 36px; height: 36px;
          border-radius: 7px;
          background: var(--ft-surface);
          border: 1px solid var(--ft-border);
          display: flex; align-items: center; justify-content: center;
          font-size: 15px;
          flex-shrink: 0;
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .pf-contact:hover .pf-contact-icon {
          background: rgba(232,83,58,0.15);
          border-color: rgba(232,83,58,0.3);
        }
        .pf-contact-body {
          font-size: 13.5px;
          color: var(--ft-muted);
          line-height: 1.65;
          font-weight: 400;
          transition: color 0.2s ease;
        }
        .pf-contact:hover .pf-contact-body { color: var(--ft-soft); }
        .pf-contact-body a {
          color: inherit;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .pf-contact-body a:hover { color: var(--ft-orange); }

        /* ════════════════════════════════════════════════
           BOTTOM BAR — social + copyright
        ════════════════════════════════════════════════ */
        .pf-bottom {
          max-width: 1160px;
          margin: 0 auto;
          padding: 28px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }

        .pf-copy {
          font-size: 13px;
          color: rgba(255,255,255,0.3);
          font-weight: 400;
          line-height: 1.6;
        }
        .pf-copy strong { color: rgba(255,255,255,0.55); font-weight: 600; }

        /* social icon buttons */
        .pf-socials {
          display: flex;
          gap: 10px;
          align-items: center;
        }
        .pf-social {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 9px 18px;
          border-radius: 6px;
          font-family: var(--ft-sans);
          font-weight: 600;
          font-size: 13.5px;
          text-decoration: none;
          border: 1.5px solid var(--ft-border);
          color: var(--ft-muted);
          background: var(--ft-surface);
          transition: all 0.22s ease;
        }
        .pf-social i { font-size: 14px; }
        .pf-social:hover { transform: translateY(-2px); text-decoration: none; }

        .pf-fb:hover { background: #1877F2; border-color: #1877F2; color: white; box-shadow: 0 6px 18px rgba(24,119,242,0.35); }
        .pf-ig:hover { background: linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888); border-color: transparent; color: white; box-shadow: 0 6px 18px rgba(220,39,67,0.35); }
        .pf-li:hover { background: #0077B5; border-color: #0077B5; color: white; box-shadow: 0 6px 18px rgba(0,119,181,0.35); }

        /* ════════════════════════════════════════════════
           RESPONSIVE
        ════════════════════════════════════════════════ */
        @media (max-width: 900px) {
          .pf-top  { grid-template-columns: 1fr; gap: 28px; }
          .pf-apply-wrap { text-align: left; }
          .pf-grid { grid-template-columns: 1fr 1fr; gap: 36px; }
        }
        @media (max-width: 600px) {
          .pf-top  { padding: 44px 20px 36px; }
          .pf-grid { grid-template-columns: 1fr; padding: 36px 20px; gap: 36px; }
          .pf-bottom { flex-direction: column; align-items: flex-start; padding: 24px 20px; gap: 20px; }
          .pf-socials { flex-wrap: wrap; }
        }
      `}</style>

      <footer className="pf-footer">

        {/* logo-color accent stripe */}
        <div className="pf-accent-line" />

        {/* ── TOP BAND ── */}
        <div className="pf-top">
          <div>
            <h2 className="pf-brand-name">
              Kalinga Kids<br />
              <em>Play School</em>
            </h2>
            <p className="pf-tagline">
              A trusted institution in early childhood education since 2014 —
              where every child is nurtured to discover their brilliance.
            </p>
          </div>
          <div className="pf-apply-wrap">
            <div className="pf-apply-label">2025–26 Admissions Open</div>
            <Link className="pf-apply-btn" to="/admission">
              Apply for Admission →
            </Link>
          </div>
        </div>

        {/* ── MAIN 3-COL GRID ── */}
        <div className="pf-grid">

          {/* Quick Links */}
          <div>
            <div className="pf-col-head">Quick Links</div>
            <ul className="pf-links">
              {quickLinks.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to}>
                    <span className="pf-arr">→</span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programmes */}
          {/* <div>
            <div className="pf-col-head">Programmes</div>
            <div className="pf-progs">
              {programs.map(({ label, age, color }) => (
                <div className="pf-prog" key={label}>
                  <div>
                    <div className="pf-prog-name">{label}</div>
                    <div className="pf-prog-age">{age}</div>
                  </div>
                  <div className="pf-prog-dot" style={{ background: color }} />
                </div>
              ))}
            </div>
          </div> */}

          {/* Contact */}
          <div>
            <div className="pf-col-head">Get In Touch</div>
            <div className="pf-contacts">
              <div className="pf-contact">
                <div className="pf-contact-icon">📍</div>
                <div className="pf-contact-body">
                  Kanan Vihar Phase-II, Patia<br />
                  Bhubaneswar – 751024, Odisha
                </div>
              </div>
              <div className="pf-contact">
                <div className="pf-contact-icon">📞</div>
                <div className="pf-contact-body">
                  <a href="tel:7008844395">+91 70088 44395</a>
                </div>
              </div>
              <div className="pf-contact">
                <div className="pf-contact-icon">📧</div>
                <div className="pf-contact-body">
                  <a href="mailto:Kalingakidss@gmail.com">Kalingakidss@gmail.com</a>
                </div>
              </div>
              <div className="pf-contact">
                <div className="pf-contact-icon">🕐</div>
                <div className="pf-contact-body">
                  Monday – Saturday<br />8:00 AM – 1:00 PM
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="pf-bottom">
          <p className="pf-copy">
            © 2026 <strong>Kalinga Kids Play School</strong> · All rights reserved ·
            Patia, Bhubaneswar
          </p>
          <div className="pf-socials">
            <a className="pf-social pf-fb" href="https://www.facebook.com/kalingakidss" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-facebook" /> Facebook
            </a>
            <a className="pf-social pf-ig" href="https://www.instagram.com/kalingakidss/" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-instagram" /> Instagram
            </a>
            <a className="pf-social pf-li" href="https://www.linkedin.com/company/kalinga-kids/posts/?feedView=all" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-linkedin" /> LinkedIn
            </a>
          </div>
        </div>

      </footer>
    </>
  );
}