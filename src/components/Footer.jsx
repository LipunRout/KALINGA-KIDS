function Footer() {
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Programs", href: "/programs" },
    { label: "Gallery", href: "/gallery" },
    { label: "Admission", href: "/admission" },
    { label: "Contact", href: "/contact" },
  ];

  const programs = [
    { emoji: "🎨", label: "Play Group", age: "2–3 yrs" },
    { emoji: "📚", label: "Nursery", age: "3–4 yrs" },
    { emoji: "✏️", label: "LKG", age: "4–5 yrs" },
    { emoji: "🎓", label: "UKG", age: "5–6 yrs" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Nunito:wght@400;500;600;700&display=swap');

        :root {
          --f-orange : #FF6B35;
          --f-yellow : #FFD93D;
          --f-pink   : #FF6B9D;
          --f-teal   : #4ECDC4;
          --f-purple : #A855F7;
          --f-dark   : #0F0F1A;
          --f-card   : #181828;
          --f-border : rgba(255,255,255,0.07);
          --f-muted  : rgba(255,255,255,0.5);
        }

        /* ========================================================
           FOOTER SHELL
        ======================================================== */
        .kk-footer {
          background: var(--f-dark);
          position: relative;
          overflow: hidden;
          font-family: 'Nunito', sans-serif;
        }

        /* ── big soft glow blobs in background ── */
        .kk-footer::before {
          content: "";
          position: absolute;
          top: -120px; left: -120px;
          width: 420px; height: 420px;
          background: radial-gradient(circle, rgba(255,107,53,0.18), transparent 65%);
          border-radius: 50%;
          pointer-events: none;
        }
        .kk-footer::after {
          content: "";
          position: absolute;
          bottom: -100px; right: -80px;
          width: 380px; height: 380px;
          background: radial-gradient(circle, rgba(78,205,196,0.15), transparent 65%);
          border-radius: 50%;
          pointer-events: none;
        }

        /* ── animated rainbow top border ── */
        .kk-footer-rainbow {
          height: 5px;
          background: linear-gradient(90deg,
            var(--f-orange), var(--f-yellow),
            var(--f-pink),   var(--f-teal),
            var(--f-purple), var(--f-orange)
          );
          background-size: 300% auto;
          animation: kkRainbow 4s linear infinite;
        }
        @keyframes kkRainbow { to { background-position: 300% center; } }

        /* ========================================================
           HERO BAND — big school name + tagline
        ======================================================== */
        .kk-footer-hero {
          text-align: center;
          padding: 60px 24px 40px;
          position: relative;
          z-index: 1;
        }

        /* floating emoji row */
        .kk-footer-emojis {
          display: flex;
          justify-content: center;
          gap: 18px;
          margin-bottom: 22px;
          font-size: 28px;
          flex-wrap: wrap;
        }

        .kk-footer-emojis span {
          display: inline-block;
          animation: kkBob 3s ease-in-out infinite;
          cursor: default;
          transition: transform 0.2s ease;
        }
        .kk-footer-emojis span:hover { transform: scale(1.5) rotate(-10deg); }
        .kk-footer-emojis span:nth-child(1) { animation-delay: 0s; }
        .kk-footer-emojis span:nth-child(2) { animation-delay: 0.3s; }
        .kk-footer-emojis span:nth-child(3) { animation-delay: 0.6s; }
        .kk-footer-emojis span:nth-child(4) { animation-delay: 0.9s; }
        .kk-footer-emojis span:nth-child(5) { animation-delay: 1.2s; }
        .kk-footer-emojis span:nth-child(6) { animation-delay: 1.5s; }

        @keyframes kkBob {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-8px); }
        }

        .kk-footer-school-name {
          font-family: 'Baloo 2', cursive;
          font-size: clamp(32px, 6vw, 58px);
          font-weight: 800;
          line-height: 1;
          margin-bottom: 12px;
          /* colour the text with the gradient */
          background: linear-gradient(135deg, var(--f-orange), var(--f-yellow), var(--f-pink));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 30px rgba(255,107,53,0.35));
        }

        .kk-footer-tagline {
          font-family: 'Nunito', sans-serif;
          font-size: 17px;
          font-weight: 600;
          color: var(--f-muted);
          letter-spacing: 0.5px;
        }
        .kk-footer-tagline .heart {
          color: var(--f-pink);
          display: inline-block;
          animation: kkHeartbeat 1.4s ease-in-out infinite;
        }
        @keyframes kkHeartbeat {
          0%, 100% { transform: scale(1); }
          14%       { transform: scale(1.35); }
          28%       { transform: scale(1); }
          42%       { transform: scale(1.2); }
          56%       { transform: scale(1); }
        }

        /* divider wavy line */
        .kk-footer-divider {
          width: 80px; height: 4px;
          background: linear-gradient(90deg, var(--f-orange), var(--f-pink));
          border-radius: 4px;
          margin: 20px auto 0;
        }

        /* ========================================================
           MAIN GRID
        ======================================================== */
        .kk-footer-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          max-width: 1100px;
          margin: 0 auto;
          padding: 40px 28px 50px;
          position: relative;
          z-index: 1;
        }

        @media (max-width: 800px) {
          .kk-footer-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 520px) {
          .kk-footer-grid { grid-template-columns: 1fr; padding: 30px 20px 40px; }
        }

        /* ── column card ── */
        .kk-footer-col {
          background: var(--f-card);
          border: 1px solid var(--f-border);
          border-radius: 24px;
          padding: 28px 24px;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .kk-footer-col:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.35);
          border-color: rgba(255,107,53,0.3);
        }

        .kk-footer-col-title {
          font-family: 'Baloo 2', cursive;
          font-size: 17px;
          font-weight: 800;
          color: var(--f-yellow);
          margin-bottom: 18px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .kk-footer-col-title::after {
          content: "";
          flex: 1;
          height: 2px;
          background: linear-gradient(90deg, var(--f-orange), transparent);
          border-radius: 2px;
        }

        /* ── quick links ── */
        .kk-footer-links {
          list-style: none;
          margin: 0; padding: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .kk-footer-links a {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--f-muted);
          text-decoration: none;
          font-size: 14.5px;
          font-weight: 600;
          transition: all 0.2s ease;
          padding: 4px 0;
        }
        .kk-footer-links a .arrow {
          font-size: 11px;
          opacity: 0;
          transform: translateX(-6px);
          transition: all 0.2s ease;
          color: var(--f-orange);
        }
        .kk-footer-links a:hover {
          color: #fff;
          padding-left: 6px;
        }
        .kk-footer-links a:hover .arrow {
          opacity: 1;
          transform: translateX(0);
        }

        /* ── programs list ── */
        .kk-programs-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .kk-prog-item {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(255,255,255,0.04);
          border-radius: 12px;
          padding: 10px 14px;
          transition: background 0.2s ease, transform 0.2s ease;
          border: 1px solid rgba(255,255,255,0.05);
        }
        .kk-prog-item:hover {
          background: rgba(255,107,53,0.12);
          transform: translateX(4px);
          border-color: rgba(255,107,53,0.25);
        }
        .kk-prog-emoji {
          font-size: 22px;
          display: inline-block;
          transition: transform 0.2s ease;
        }
        .kk-prog-item:hover .kk-prog-emoji { transform: scale(1.3) rotate(-8deg); }
        .kk-prog-name {
          font-family: 'Baloo 2', cursive;
          font-weight: 700;
          font-size: 14px;
          color: #fff;
          line-height: 1;
        }
        .kk-prog-age {
          font-size: 11.5px;
          color: var(--f-muted);
          margin-top: 2px;
        }

        /* ── contact info ── */
        .kk-contact-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .kk-contact-item {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }
        .kk-contact-icon {
          font-size: 20px;
          flex-shrink: 0;
          background: rgba(255,107,53,0.15);
          width: 38px; height: 38px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 10px;
          border: 1px solid rgba(255,107,53,0.2);
          transition: background 0.2s ease;
        }
        .kk-contact-item:hover .kk-contact-icon {
          background: rgba(255,107,53,0.3);
        }
        .kk-contact-text {
          font-size: 13.5px;
          color: var(--f-muted);
          line-height: 1.6;
          font-weight: 500;
          transition: color 0.2s ease;
        }
        .kk-contact-item:hover .kk-contact-text { color: rgba(255,255,255,0.85); }

        /* ========================================================
           SOCIAL ICONS BAND
        ======================================================== */
        .kk-footer-social-band {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 16px;
          padding: 10px 24px 40px;
          position: relative;
          z-index: 1;
          flex-wrap: wrap;
        }

        .kk-social-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 50px;
          text-decoration: none;
          font-family: 'Baloo 2', cursive;
          font-weight: 700;
          font-size: 14px;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }
        .kk-social-btn i { font-size: 16px; }

        .kk-social-fb {
          background: rgba(24,119,242,0.15);
          color: #4A90E2;
          border-color: rgba(24,119,242,0.25);
        }
        .kk-social-fb:hover {
          background: #1877F2;
          color: #fff;
          transform: translateY(-3px) scale(1.06);
          box-shadow: 0 10px 28px rgba(24,119,242,0.4);
        }

        .kk-social-ig {
          background: rgba(225,48,108,0.12);
          color: #E1306C;
          border-color: rgba(225,48,108,0.25);
        }
        .kk-social-ig:hover {
          background: linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
          color: #fff;
          transform: translateY(-3px) scale(1.06);
          box-shadow: 0 10px 28px rgba(220,39,67,0.4);
        }

        .kk-social-li {
          background: rgba(0,119,181,0.12);
          color: #0077B5;
          border-color: rgba(0,119,181,0.25);
        }
        .kk-social-li:hover {
          background: #0077B5;
          color: #fff;
          transform: translateY(-3px) scale(1.06);
          box-shadow: 0 10px 28px rgba(0,119,181,0.4);
        }

        /* ========================================================
           BOTTOM BAR
        ======================================================== */
        .kk-footer-bottom {
          border-top: 1px solid var(--f-border);
          padding: 18px 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
          text-align: center;
        }

        .kk-footer-bottom-text {
          font-size: 13px;
          color: rgba(255,255,255,0.35);
          font-weight: 500;
        }

        .kk-footer-bottom-text .kkn-highlight {
          color: var(--f-orange);
          font-weight: 700;
        }

        /* made-with pulse */
        .kk-made-heart {
          color: var(--f-pink);
          display: inline-block;
          animation: kkHeartbeat 1.4s ease-in-out infinite;
        }

        /* ========================================================
           FLOATING SPARKLES in background
        ======================================================== */
        .kk-sparkle {
          position: absolute;
          pointer-events: none;
          border-radius: 50%;
          animation: kkSparkle 5s ease-in-out infinite;
          z-index: 0;
        }
        @keyframes kkSparkle {
          0%, 100% { opacity: 0.3; transform: scale(1) rotate(0deg); }
          50%       { opacity: 0.8; transform: scale(1.4) rotate(180deg); }
        }
      `}</style>

      <footer className="kk-footer">
        {/* animated sparkles */}
        {[
          { w:8,  top:"15%", left:"8%",  bg:"var(--f-orange)", delay:"0s" },
          { w:6,  top:"35%", left:"90%", bg:"var(--f-yellow)", delay:"1s" },
          { w:10, top:"60%", left:"5%",  bg:"var(--f-pink)",   delay:"2s" },
          { w:5,  top:"75%", left:"75%", bg:"var(--f-teal)",   delay:"0.5s" },
          { w:7,  top:"20%", left:"55%", bg:"var(--f-purple)", delay:"1.7s" },
        ].map((s, i) => (
          <div
            key={i}
            className="kk-sparkle"
            style={{
              width: s.w, height: s.w,
              top: s.top, left: s.left,
              background: s.bg,
              animationDelay: s.delay,
              opacity: 0.4,
            }}
          />
        ))}

        {/* rainbow top stripe */}
        <div className="kk-footer-rainbow" />

        {/* ── hero band ── */}
        <div className="kk-footer-hero">
          <div className="kk-footer-emojis">
            {["🌟","🎨","📚","🎈","🦋","🎓"].map((e, i) => (
              <span key={i}>{e}</span>
            ))}
          </div>
          <h2 className="kk-footer-school-name">Kalinga Kids Play School</h2>
          <p className="kk-footer-tagline">
            Where Every Child Shines &nbsp;·&nbsp; We Care Like Home&nbsp;
            <span className="heart">❤</span>
          </p>
          <div className="kk-footer-divider" />
        </div>

        {/* ── 3-column grid ── */}
        <div className="kk-footer-grid">

          {/* col 1 — quick links */}
          <div className="kk-footer-col">
            <div className="kk-footer-col-title">🔗 Quick Links</div>
            <ul className="kk-footer-links">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <a href={href}>
                    <span className="arrow">→</span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* col 2 — programs */}
          <div className="kk-footer-col">
            <div className="kk-footer-col-title">🏫 Our Programs</div>
            <div className="kk-programs-list">
              {programs.map(({ emoji, label, age }) => (
                <div className="kk-prog-item" key={label}>
                  <span className="kk-prog-emoji">{emoji}</span>
                  <div>
                    <div className="kk-prog-name">{label}</div>
                    <div className="kk-prog-age">Age: {age}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* col 3 — contact */}
          <div className="kk-footer-col">
            <div className="kk-footer-col-title">📬 Get In Touch</div>
            <div className="kk-contact-list">
              <div className="kk-contact-item">
                <div className="kk-contact-icon">📍</div>
                <div className="kk-contact-text">
                  Kanan Vihar Phase-II, Patia,<br />
                  Bhubaneswar – 751024
                </div>
              </div>
              <div className="kk-contact-item">
                <div className="kk-contact-icon">📞</div>
                <div className="kk-contact-text">
                  <a href="tel:7008844395" style={{ color:"inherit", textDecoration:"none" }}>
                    +91 70088 44395
                  </a>
                </div>
              </div>
              <div className="kk-contact-item">
                <div className="kk-contact-icon">📧</div>
                <div className="kk-contact-text">
                  <a href="mailto:Kalingakidss@gmail.com" style={{ color:"inherit", textDecoration:"none" }}>
                    Kalingakidss@gmail.com
                  </a>
                </div>
              </div>
              <div className="kk-contact-item">
                <div className="kk-contact-icon">🕐</div>
                <div className="kk-contact-text">Mon – Sat &nbsp;|&nbsp; 8 AM – 1 PM</div>
              </div>
            </div>
          </div>

        </div>

        {/* ── social buttons ── */}
        <div className="kk-footer-social-band">
          <a
            className="kk-social-btn kk-social-fb"
            href="https://www.facebook.com/kalingakidss"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-facebook" /> Facebook
          </a>
          <a
            className="kk-social-btn kk-social-ig"
            href="https://www.instagram.com/kalingakidss/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-instagram" /> Instagram
          </a>
          <a
            className="kk-social-btn kk-social-li"
            href="https://www.linkedin.com/company/kalinga-kids/posts/?feedView=all"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-linkedin" /> LinkedIn
          </a>
        </div>

        {/* ── bottom bar ── */}
        <div className="kk-footer-bottom">
          <span className="kk-footer-bottom-text">
            © 2026 <span className="kkn-highlight">Kalinga Kids Play School</span>.
            All rights reserved. &nbsp;·&nbsp; Made with <span className="kk-made-heart">❤</span> in Bhubaneswar
          </span>
        </div>

      </footer>
    </>
  );
}

export default Footer;