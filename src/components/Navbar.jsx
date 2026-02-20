import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

// ─────────────────────────────────────────────────────────────
//  KALINGA KIDS NAVBAR — Professional Edition
//  Matches Home.jsx design system:
//  · Fonts: DM Serif Display + DM Sans
//  · Palette: Navy #1A3A5C · Orange #E8533A · Green #2E8B57
//  · Logo spinning ring: kept (user requested)
// ─────────────────────────────────────────────────────────────

const navLinks = [
  { to: "/",          label: "Home",      icon: "○" },
  { to: "/about",     label: "About",     icon: "○" },
  { to: "/programs",  label: "Programs",  icon: "○" },
  { to: "/gallery",   label: "Gallery",   icon: "○" },
  { to: "/admission", label: "Admission", icon: "○" },
  { to: "/contact",   label: "Contact",   icon: "○" },
];

// logo accent colors — same as home hero vertical bar
const RING_COLORS = ["#C0392B","#E8533A","#D4891A","#2E8B57","#2B7AB8","#1A3A5C"];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [hoveredLink, setHovered] = useState(null);
  const location  = useLocation();
  const wrapRef   = useRef(null);

  // close on route change
  useEffect(() => { setMenuOpen(false); }, [location]);

  // scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close on click outside
  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, []);

  // lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

        /* ── TOKENS (mirror Home.jsx) ──────────────────── */
        :root {
          --nav-navy   : #1A3A5C;
          --nav-red    : #C0392B;
          --nav-orange : #E8533A;
          --nav-yellow : #D4891A;
          --nav-green  : #2E8B57;
          --nav-sky    : #2B7AB8;
          --nav-off    : #F8F7F4;
          --nav-border : #E8E6E0;
          --nav-serif  : 'DM Serif Display', Georgia, serif;
          --nav-sans   : 'DM Sans', system-ui, sans-serif;
        }

        /* ── WRAPPER (fixed, full-width) ───────────────── */
        .nav-wrap {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 9999;
          font-family: var(--nav-sans);
        }

        /* ── TOP BAR ───────────────────────────────────── */
        .nav-bar {
          width: 100%;
          background: #ffffff;
          border-bottom: 1px solid var(--nav-border);
          transition: box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .nav-bar.is-scrolled {
          box-shadow: 0 2px 24px rgba(26,58,92,0.1);
          border-bottom-color: rgba(26,58,92,0.12);
        }

        /* logo-color accent line — 5px, always visible */
        .nav-accent-line {
          height: 3px;
          background: linear-gradient(90deg,
            var(--nav-red),
            var(--nav-orange),
            var(--nav-yellow),
            var(--nav-green),
            var(--nav-sky)
          );
          background-size: 300% auto;
          animation: navRainbow 6s linear infinite;
        }
        @keyframes navRainbow { to { background-position: 300% center; } }

        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1160px;
          margin: 0 auto;
          padding: 0 32px;
          height: 72px;
          transition: height 0.3s ease;
        }
        .nav-bar.is-scrolled .nav-inner { height: 62px; }

        /* ── BRAND ─────────────────────────────────────── */
        .nav-brand {
          display: flex;
          align-items: center;
          gap: 14px;
          text-decoration: none !important;
          flex-shrink: 0;
          transition: opacity 0.2s ease;
        }
        .nav-brand:hover { opacity: 0.88; text-decoration: none !important; }

        /* spinning logo ring — user requested to keep */
        .nav-logo-wrap {
          position: relative;
          flex-shrink: 0;
          width: 52px; height: 52px;
          transition: width 0.3s, height 0.3s;
        }
        .nav-bar.is-scrolled .nav-logo-wrap { width: 44px; height: 44px; }

        .nav-logo-ring {
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          background: conic-gradient(
            var(--nav-red)    0%,
            var(--nav-orange) 20%,
            var(--nav-yellow) 40%,
            var(--nav-green)  60%,
            var(--nav-sky)    80%,
            var(--nav-red)   100%
          );
          animation: navLogoSpin 8s linear infinite;
          z-index: 0;
        }
        @keyframes navLogoSpin { to { transform: rotate(360deg); } }

        .nav-logo-disk {
          position: absolute;
          inset: 3px;
          border-radius: 50%;
          background: white;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .nav-logo-img {
          width: 85%; height: 85%;
          object-fit: contain;
          border-radius: 50%;
          display: block;
        }

        /* brand text */
        .nav-brand-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
          line-height: 1;
        }
        .nav-school-name {
          font-family: var(--nav-serif);
          font-size: 20px;
          font-weight: 400;
          color: var(--nav-navy);
          letter-spacing: -0.2px;
          transition: font-size 0.3s ease;
          line-height: 1.1;
        }
        .nav-bar.is-scrolled .nav-school-name { font-size: 17px; }

        .nav-tagline {
          font-family: var(--nav-sans);
          font-size: 10px;
          font-weight: 600;
          color: #bbb;
          letter-spacing: 1.8px;
          text-transform: uppercase;
        }

        /* ── DESKTOP LINKS ─────────────────────────────── */
        .nav-links-list {
          display: flex;
          align-items: center;
          gap: 0;
          list-style: none;
          margin: 0; padding: 0;
        }

        .nav-link {
          position: relative;
          display: flex;
          align-items: center;
          padding: 6px 14px;
          font-family: var(--nav-sans);
          font-weight: 500;
          font-size: 14.5px;
          color: #666;
          text-decoration: none !important;
          transition: color 0.2s ease;
          white-space: nowrap;
        }

        /* animated underline bar */
        .nav-link::after {
          content: "";
          position: absolute;
          bottom: -2px; left: 14px; right: 14px;
          height: 2px;
          background: var(--nav-orange);
          border-radius: 2px;
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.25s cubic-bezier(0.4,0,0.2,1);
        }
        .nav-link:hover { color: var(--nav-navy); text-decoration: none !important; }
        .nav-link:hover::after { transform: scaleX(1); }

        .nav-link.is-active {
          color: var(--nav-orange);
          font-weight: 600;
        }
        .nav-link.is-active::after { transform: scaleX(1); background: var(--nav-orange); }

        /* ── APPLY CTA BUTTON ──────────────────────────── */
        .nav-cta {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: var(--nav-navy);
          color: white !important;
          font-family: var(--nav-sans);
          font-weight: 600;
          font-size: 14px;
          padding: 10px 22px;
          border-radius: 6px;
          text-decoration: none !important;
          margin-left: 16px;
          border: 2px solid var(--nav-navy);
          transition: background 0.22s ease, color 0.22s ease, transform 0.22s ease, box-shadow 0.22s ease;
          white-space: nowrap;
          letter-spacing: 0.2px;
        }
        .nav-cta:hover {
          background: transparent;
          color: var(--nav-navy) !important;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(26,58,92,0.18);
          text-decoration: none !important;
        }
        /* dot indicator on active */
        .nav-cta.is-active {
          background: var(--nav-orange);
          border-color: var(--nav-orange);
        }
        .nav-cta.is-active:hover {
          background: transparent;
          color: var(--nav-orange) !important;
        }

        /* ── HAMBURGER ─────────────────────────────────── */
        .nav-burger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          width: 44px; height: 44px;
          background: var(--nav-off);
          border: 1.5px solid var(--nav-border);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          flex-shrink: 0;
          padding: 0;
        }
        .nav-burger:hover {
          border-color: var(--nav-navy);
          background: white;
          box-shadow: 0 2px 10px rgba(26,58,92,0.1);
        }

        .nav-bline {
          display: block;
          width: 18px; height: 2px;
          background: var(--nav-navy);
          border-radius: 2px;
          transition: all 0.32s cubic-bezier(0.4,0,0.2,1);
          transform-origin: center;
        }
        .nav-burger.is-open .nav-bline:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .nav-burger.is-open .nav-bline:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .nav-burger.is-open .nav-bline:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* ── MOBILE DROPDOWN ───────────────────────────── */
        .nav-dropdown {
          position: absolute;
          top: 100%; left: 0; right: 0;
          background: white;
          border-bottom: 3px solid var(--nav-orange);
          box-shadow: 0 20px 60px rgba(26,58,92,0.12);
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          transform: translateY(-6px);
          pointer-events: none;
          transition:
            max-height 0.4s cubic-bezier(0.4,0,0.2,1),
            opacity    0.28s ease,
            transform  0.28s ease;
        }
        .nav-dropdown.is-open {
          max-height: 520px;
          opacity: 1;
          transform: translateY(0);
          pointer-events: all;
        }

        /* thin logo-color stripe at top of dropdown */
        .nav-dropdown-stripe {
          height: 3px;
          background: linear-gradient(90deg,
            var(--nav-red), var(--nav-orange),
            var(--nav-yellow), var(--nav-green), var(--nav-sky)
          );
        }

        /* mobile link rows */
        .nav-mob-list {
          list-style: none;
          margin: 0; padding: 8px 0;
        }
        .nav-mob-list li + li {
          border-top: 1px solid rgba(26,58,92,0.06);
        }

        .nav-mob-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 28px;
          font-family: var(--nav-sans);
          font-weight: 600;
          font-size: 15px;
          color: #555;
          text-decoration: none !important;
          transition: all 0.18s ease;
          border-left: 3px solid transparent;
        }
        .nav-mob-link:hover,
        .nav-mob-link.is-active {
          color: var(--nav-navy);
          border-left-color: var(--nav-orange);
          background: rgba(26,58,92,0.03);
          padding-left: 32px;
          text-decoration: none !important;
        }
        .nav-mob-link.is-active {
          color: var(--nav-orange);
          font-weight: 700;
        }

        .mob-link-label { flex: 1; }
        .mob-link-arrow {
          font-size: 12px;
          color: var(--nav-orange);
          opacity: 0;
          transform: translateX(-4px);
          transition: all 0.18s ease;
        }
        .nav-mob-link:hover .mob-link-arrow,
        .nav-mob-link.is-active .mob-link-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        /* stagger in */
        .nav-mob-list li {
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.28s ease, transform 0.28s ease;
        }
        .nav-dropdown.is-open .nav-mob-list li { opacity: 1; transform: translateY(0); }
        .nav-dropdown.is-open .nav-mob-list li:nth-child(1) { transition-delay: 0.05s; }
        .nav-dropdown.is-open .nav-mob-list li:nth-child(2) { transition-delay: 0.09s; }
        .nav-dropdown.is-open .nav-mob-list li:nth-child(3) { transition-delay: 0.13s; }
        .nav-dropdown.is-open .nav-mob-list li:nth-child(4) { transition-delay: 0.17s; }
        .nav-dropdown.is-open .nav-mob-list li:nth-child(5) { transition-delay: 0.21s; }
        .nav-dropdown.is-open .nav-mob-list li:nth-child(6) { transition-delay: 0.25s; }

        /* mobile apply CTA */
        .nav-mob-cta {
          padding: 16px 24px 20px;
          border-top: 1px solid var(--nav-border);
          background: var(--nav-off);
        }
        .nav-mob-cta a {
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--nav-navy);
          color: white !important;
          padding: 14px 24px;
          border-radius: 8px;
          font-family: var(--nav-sans);
          font-weight: 700;
          font-size: 15px;
          text-decoration: none !important;
          border: 2px solid var(--nav-navy);
          transition: background 0.22s, color 0.22s, transform 0.22s;
          letter-spacing: 0.2px;
        }
        .nav-mob-cta a:hover {
          background: transparent;
          color: var(--nav-navy) !important;
          transform: translateY(-1px);
        }

        /* ── DIM OVERLAY ───────────────────────────────── */
        .nav-dim {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(26,58,92,0.3);
          backdrop-filter: blur(2px);
          z-index: 9998;
          animation: navDimIn 0.25s ease;
        }
        @keyframes navDimIn { from{opacity:0} to{opacity:1} }
        .nav-dim.show { display: block; }

        /* ── RESPONSIVE ────────────────────────────────── */
        @media (max-width: 991px) {
          .nav-links-list { display: none; }
          .nav-cta.desktop { display: none; }
          .nav-burger { display: flex; }
        }

        @media (max-width: 480px) {
          .nav-inner { padding: 0 18px; height: 62px; }
          .nav-logo-wrap { width: 44px; height: 44px; }
          .nav-school-name { font-size: 17px; }
          .nav-tagline { display: none; }
        }

        /* push page content below navbar */
        body { padding-top: 75px !important; }
      `}</style>

      {/* DIM overlay */}
      <div
        className={`nav-dim ${menuOpen ? "show" : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* NAVBAR WRAPPER — ref wraps bar + dropdown */}
      <div className="nav-wrap" ref={wrapRef}>

        {/* ── TOP BAR ── */}
        <div className={`nav-bar ${scrolled ? "is-scrolled" : ""}`}>
          {/* logo-color accent stripe across very top */}
          <div className="nav-accent-line" />

          <div className="nav-inner">

            {/* BRAND */}
            <NavLink className="nav-brand" to="/">
              <div className="nav-logo-wrap">
                <div className="nav-logo-ring" />
                <div className="nav-logo-disk">
                  <img src="/logo-1.png" alt="Kalinga Kids" className="nav-logo-img" />
                </div>
              </div>
              <div className="nav-brand-text">
                <span className="nav-school-name">Kalinga Kids</span>
                <span className="nav-tagline">Play School · Bhubaneswar</span>
              </div>
            </NavLink>

            {/* DESKTOP LINKS */}
            <ul className="nav-links-list">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === "/"}
                    className={({ isActive }) =>
                      `nav-link${isActive ? " is-active" : ""}`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
              <li>
                <NavLink
                  to="/admission"
                  className={({ isActive }) =>
                    `nav-cta desktop${isActive ? " is-active" : ""}`
                  }
                >
                  Apply Now →
                </NavLink>
              </li>
            </ul>

            {/* HAMBURGER */}
            <button
              className={`nav-burger ${menuOpen ? "is-open" : ""}`}
              onClick={() => setMenuOpen(p => !p)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <span className="nav-bline" />
              <span className="nav-bline" />
              <span className="nav-bline" />
            </button>

          </div>
        </div>

        {/* ── MOBILE DROPDOWN ── */}
        <div className={`nav-dropdown ${menuOpen ? "is-open" : ""}`}>
          <div className="nav-dropdown-stripe" />

          <ul className="nav-mob-list">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === "/"}
                  className={({ isActive }) =>
                    `nav-mob-link${isActive ? " is-active" : ""}`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="mob-link-label">{label}</span>
                  <span className="mob-link-arrow">→</span>
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="nav-mob-cta">
            <NavLink to="/admission" onClick={() => setMenuOpen(false)}>
              Apply for Admission →
            </NavLink>
          </div>
        </div>

      </div>
    </>
  );
}