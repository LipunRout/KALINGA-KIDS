import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

const navLinks = [
  { to: "/", label: "Home", emoji: "🏠" },
  { to: "/about", label: "About", emoji: "💛" },
  { to: "/programs", label: "Programs", emoji: "📚" },
  { to: "/gallery", label: "Gallery", emoji: "📸" },
  { to: "/admission", label: "Admission", emoji: "🎒" },
  { to: "/contact", label: "Contact", emoji: "📞" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const wrapperRef = useRef(null);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [location]);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close when clicking anywhere OUTSIDE the entire navbar+dropdown wrapper
  useEffect(() => {
    const handleOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Nunito:wght@500;600;700&display=swap');

        :root {
          --nn-orange: #FF6B35;
          --nn-yellow: #FFD93D;
          --nn-pink:   #FF6B9D;
          --nn-teal:   #4ECDC4;
          --nn-dark:   #1E1E2E;
        }

        /* ================================================
           WRAPPER — fixed to top, everything inside
        ================================================ */
        .kkn-wrapper {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 9999;
        }

        /* ================================================
           TOP BAR — always SOLID white, never transparent
        ================================================ */
        .kkn-bar {
          width: 100%;
          background: #FFFFFF;
          border-bottom: 3px solid var(--nn-yellow);
          box-shadow: 0 2px 16px rgba(255,107,53,0.08);
          transition: box-shadow 0.3s ease, border-color 0.3s ease;
        }

        .kkn-bar.scrolled {
          border-bottom-color: var(--nn-orange);
          box-shadow: 0 4px 28px rgba(255,107,53,0.16);
        }

        .kkn-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 28px;
          height: 76px;
          transition: height 0.3s ease;
        }
        .kkn-bar.scrolled .kkn-inner { height: 64px; }

        /* ================================================
           BRAND
        ================================================ */
        .kkn-brand {
          display: flex;
          align-items: center;
          gap: 13px;
          text-decoration: none !important;
          flex-shrink: 0;
          transition: transform 0.25s ease;
        }
        .kkn-brand:hover { transform: scale(1.03); }

        /* spinning rainbow ring around logo */
        .kkn-logo-wrap {
          position: relative;
          flex-shrink: 0;
          width: 56px; height: 56px;
          transition: width 0.3s, height 0.3s;
        }
        .kkn-bar.scrolled .kkn-logo-wrap { width: 46px; height: 46px; }

        .kkn-ring {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: conic-gradient(
            var(--nn-orange) 0%,
            var(--nn-yellow) 30%,
            var(--nn-pink)   60%,
            var(--nn-teal)   80%,
            var(--nn-orange) 100%
          );
          animation: kkSpin 5s linear infinite;
          z-index: 0;
        }
        @keyframes kkSpin { to { transform: rotate(360deg); } }

        .kkn-logo-disk {
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

        .kkn-logo-img {
          width: 86%;
          height: 86%;
          object-fit: contain;
          border-radius: 50%;
          display: block;
        }

        /* school name & tagline stacked below logo */
        .kkn-brand-text {
          display: flex;
          flex-direction: column;
          gap: 1px;
          line-height: 1;
        }

        .kkn-school-name {
          font-family: 'Baloo 2', cursive;
          font-size: 21px;
          font-weight: 800;
          color: var(--nn-orange);
          letter-spacing: 0.2px;
          transition: font-size 0.3s ease;
        }
        .kkn-bar.scrolled .kkn-school-name { font-size: 18px; }

        .kkn-tagline {
          font-family: 'Nunito', sans-serif;
          font-size: 10px;
          font-weight: 700;
          color: #aaa;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        /* ================================================
           DESKTOP NAV LINKS
        ================================================ */
        .kkn-nav-list {
          display: flex;
          align-items: center;
          gap: 2px;
          list-style: none;
          margin: 0; padding: 0;
        }

        .kkn-nav-link {
          position: relative;
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 7px 13px;
          font-family: 'Baloo 2', cursive;
          font-weight: 700;
          font-size: 14.5px;
          color: #555;
          text-decoration: none !important;
          border-radius: 50px;
          transition: color 0.2s, background 0.2s;
        }

        .kkn-nav-link .le {
          font-size: 13px;
          display: inline-block;
          opacity: 0;
          transform: scale(0.4) rotate(-20deg);
          transition: all 0.2s ease;
        }

        .kkn-nav-link:hover .le,
        .kkn-nav-link.is-active .le {
          opacity: 1;
          transform: scale(1) rotate(0deg);
        }

        .kkn-nav-link:hover { color: var(--nn-orange); background: rgba(255,107,53,0.07); }
        .kkn-nav-link.is-active { color: var(--nn-orange); background: rgba(255,107,53,0.1); }

        .kkn-nav-link.is-active::after {
          content: "";
          position: absolute;
          bottom: 3px; left: 50%;
          transform: translateX(-50%);
          width: 6px; height: 6px;
          background: var(--nn-orange);
          border-radius: 50%;
        }

        /* ENROLL button */
        .kkn-enroll {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: linear-gradient(135deg, var(--nn-orange), var(--nn-pink));
          color: #fff !important;
          padding: 9px 22px;
          border-radius: 50px;
          font-family: 'Baloo 2', cursive;
          font-weight: 800;
          font-size: 14px;
          text-decoration: none !important;
          margin-left: 10px;
          box-shadow: 0 5px 18px rgba(255,107,53,0.35);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          white-space: nowrap;
        }
        .kkn-enroll:hover {
          transform: translateY(-2px) scale(1.04);
          box-shadow: 0 9px 26px rgba(255,107,53,0.45);
        }
        .kkn-enroll::after { display: none !important; }

        /* ================================================
           HAMBURGER (mobile only)
        ================================================ */
        .kkn-burger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          width: 46px; height: 46px;
          border-radius: 12px;
          background: linear-gradient(135deg, #FFF7D6, #FFE4EC);
          border: 2px solid rgba(255,107,53,0.25);
          cursor: pointer;
          transition: all 0.25s ease;
          flex-shrink: 0;
        }
        .kkn-burger:hover {
          border-color: var(--nn-orange);
          box-shadow: 0 4px 16px rgba(255,107,53,0.2);
          transform: scale(1.06);
        }

        .kkn-bline {
          display: block;
          width: 20px; height: 2.5px;
          background: var(--nn-dark);
          border-radius: 3px;
          transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
          transform-origin: center;
        }
        .kkn-burger.is-open .kkn-bline:nth-child(1) {
          transform: translateY(7.5px) rotate(45deg);
          background: var(--nn-orange);
        }
        .kkn-burger.is-open .kkn-bline:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .kkn-burger.is-open .kkn-bline:nth-child(3) {
          transform: translateY(-7.5px) rotate(-45deg);
          background: var(--nn-orange);
        }

        /* ================================================
           MOBILE DROPDOWN — slides DOWN from bar
        ================================================ */
        .kkn-dropdown {
          position: absolute;
          top: 100%; left: 0; right: 0;
          background: #fff;
          border-top: 2px solid var(--nn-yellow);
          border-bottom: 4px solid var(--nn-orange);
          box-shadow: 0 24px 60px rgba(0,0,0,0.14);
          overflow: hidden;
          /* animate with max-height trick */
          max-height: 0;
          opacity: 0;
          transform: translateY(-8px);
          transition:
            max-height 0.42s cubic-bezier(0.4,0,0.2,1),
            opacity    0.3s ease,
            transform  0.3s ease;
          pointer-events: none;
        }
        .kkn-dropdown.is-open {
          max-height: 560px;
          opacity: 1;
          transform: translateY(0);
          pointer-events: all;
        }

        /* animated rainbow stripe at very top */
        .kkn-rainbow {
          height: 4px;
          background: linear-gradient(90deg,
            var(--nn-orange), var(--nn-yellow),
            var(--nn-pink),   var(--nn-teal),
            var(--nn-orange)
          );
          background-size: 200% auto;
          animation: kkRainbow 2.5s linear infinite;
        }
        @keyframes kkRainbow { to { background-position: 200% center; } }

        /* link rows */
        .kkn-mob-list {
          list-style: none;
          margin: 0; padding: 6px 0;
        }

        .kkn-mob-list li + li { border-top: 1px solid rgba(255,107,53,0.07); }

        .kkn-mob-link {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 13px 28px;
          font-family: 'Baloo 2', cursive;
          font-weight: 700;
          font-size: 16px;
          color: var(--nn-dark);
          text-decoration: none !important;
          transition: all 0.2s ease;
          border-left: 4px solid transparent;
        }

        .kkn-mob-link .mob-emoji {
          font-size: 20px;
          width: 28px; text-align: center;
          display: inline-block;
          transition: transform 0.2s ease;
        }
        .kkn-mob-link .mob-label { flex: 1; }
        .kkn-mob-link .mob-arrow {
          font-size: 13px;
          opacity: 0;
          transform: translateX(-6px);
          transition: all 0.2s ease;
          color: var(--nn-orange);
          font-weight: 800;
        }

        .kkn-mob-link:hover,
        .kkn-mob-link.is-active {
          background: linear-gradient(90deg, rgba(255,217,61,0.13), rgba(255,107,53,0.05));
          border-left-color: var(--nn-orange);
          color: var(--nn-orange);
          padding-left: 34px;
        }
        .kkn-mob-link:hover .mob-emoji,
        .kkn-mob-link.is-active .mob-emoji { transform: scale(1.25) rotate(-8deg); }
        .kkn-mob-link:hover .mob-arrow,
        .kkn-mob-link.is-active .mob-arrow { opacity: 1; transform: translateX(0); }

        /* stagger-in animation */
        .kkn-mob-list li {
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .kkn-dropdown.is-open .kkn-mob-list li { opacity: 1; transform: translateY(0); }
        .kkn-dropdown.is-open .kkn-mob-list li:nth-child(1) { transition-delay: 0.06s; }
        .kkn-dropdown.is-open .kkn-mob-list li:nth-child(2) { transition-delay: 0.10s; }
        .kkn-dropdown.is-open .kkn-mob-list li:nth-child(3) { transition-delay: 0.14s; }
        .kkn-dropdown.is-open .kkn-mob-list li:nth-child(4) { transition-delay: 0.18s; }
        .kkn-dropdown.is-open .kkn-mob-list li:nth-child(5) { transition-delay: 0.22s; }
        .kkn-dropdown.is-open .kkn-mob-list li:nth-child(6) { transition-delay: 0.26s; }

        /* enroll CTA inside dropdown */
        .kkn-mob-cta {
          padding: 14px 22px 20px;
          border-top: 2px dashed rgba(255,107,53,0.18);
          background: linear-gradient(135deg, #FFF9F0, #FFF0F6);
        }
        .kkn-mob-cta a {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: linear-gradient(135deg, var(--nn-orange), var(--nn-pink));
          color: #fff !important;
          padding: 14px;
          border-radius: 16px;
          font-family: 'Baloo 2', cursive;
          font-weight: 800;
          font-size: 17px;
          text-decoration: none !important;
          box-shadow: 0 6px 20px rgba(255,107,53,0.35);
          transition: transform 0.25s, box-shadow 0.25s;
        }
        .kkn-mob-cta a:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(255,107,53,0.45);
        }

        /* ================================================
           DIM OVERLAY — darkens rest of page when menu open
        ================================================ */
        .kkn-dim {
          display: none;
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.38);
          backdrop-filter: blur(3px);
          z-index: 9998;   /* just below kkn-wrapper */
          animation: kkDimIn 0.3s ease;
        }
        @keyframes kkDimIn { from { opacity:0; } to { opacity:1; } }
        .kkn-dim.show { display: block; }

        /* ================================================
           RESPONSIVE
        ================================================ */
        @media (max-width: 991px) {
          .kkn-nav-list { display: none; }
          .kkn-burger   { display: flex; }
        }

        @media (max-width: 480px) {
          .kkn-tagline  { display: none; }
          .kkn-inner    { padding: 0 16px; height: 66px; }
          .kkn-logo-wrap{ width: 48px; height: 48px; }
          .kkn-school-name { font-size: 18px; }
        }

        /* Push ALL page content below the navbar */
        body { padding-top: 76px !important; }
      `}</style>

      {/* DIM — clicking it closes the menu */}
      <div
        className={`kkn-dim ${menuOpen ? "show" : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* WRAPPER — ref here catches both bar AND dropdown */}
      <div className="kkn-wrapper" ref={wrapperRef}>

        {/* ── TOP BAR ── */}
        <div className={`kkn-bar ${scrolled ? "scrolled" : ""}`}>
          <div className="kkn-inner">

            {/* BRAND */}
            <NavLink className="kkn-brand" to="/">
              <div className="kkn-logo-wrap">
                <div className="kkn-ring" />
                <div className="kkn-logo-disk">
                  <img src="/logo-1.png" alt="Kalinga Kids" className="kkn-logo-img" />
                </div>
              </div>
              <div className="kkn-brand-text">
                <span className="kkn-school-name">Kalinga Kids</span>
                <span className="kkn-tagline">Play School · Bhubaneswar</span>
              </div>
            </NavLink>

            {/* DESKTOP LINKS */}
            <ul className="kkn-nav-list">
              {navLinks.map(({ to, label, emoji }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === "/"}
                    className={({ isActive }) =>
                      `kkn-nav-link${isActive ? " is-active" : ""}`
                    }
                  >
                    <span className="le">{emoji}</span>
                    {label}
                  </NavLink>
                </li>
              ))}
              <li>
                <NavLink
                  to="/admission"
                  className={({ isActive }) =>
                    `kkn-enroll${isActive ? " is-active" : ""}`
                  }
                >
                  🎒 Enroll Now
                </NavLink>
              </li>
            </ul>

            {/* HAMBURGER */}
            <button
              className={`kkn-burger ${menuOpen ? "is-open" : ""}`}
              onClick={() => setMenuOpen((p) => !p)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <span className="kkn-bline" />
              <span className="kkn-bline" />
              <span className="kkn-bline" />
            </button>
          </div>
        </div>

        {/* ── MOBILE DROPDOWN — slides DOWN ── */}
        <div className={`kkn-dropdown ${menuOpen ? "is-open" : ""}`}>
          <div className="kkn-rainbow" />

          <ul className="kkn-mob-list">
            {navLinks.map(({ to, label, emoji }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === "/"}
                  className={({ isActive }) =>
                    `kkn-mob-link${isActive ? " is-active" : ""}`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="mob-emoji">{emoji}</span>
                  <span className="mob-label">{label}</span>
                  <span className="mob-arrow">→</span>
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="kkn-mob-cta">
            <NavLink to="/admission" onClick={() => setMenuOpen(false)}>
              🎒 Enroll Your Child Now
            </NavLink>
          </div>
        </div>

      </div>
    </>
  );
}

export default Navbar;