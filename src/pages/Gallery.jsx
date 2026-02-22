import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────
//  KALINGA KIDS — Gallery Page
//  · Masonry photo grid with lightbox
//  · Embedded Instagram feed via official Instagram embed
//  · Full design-system match: DM Serif + DM Sans, navy/orange
// ─────────────────────────────────────────────────────────────

const PHOTOS = [
  { src:"https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&q=80", label:"Classroom Learning",  span:2 },
  { src:"https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80", label:"Art & Craft",          span:1 },
  { src:"https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80", label:"Play Time",            span:1 },
  { src:"https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=800&q=80", label:"Story Time",           span:1 },
  { src:"https://images.unsplash.com/photo-1587614203976-365c74645e83?w=800&q=80", label:"Music & Movement",     span:1 },
  { src:"https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=800&q=80", label:"Outdoor Activities",  span:2 },
  { src:"https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80", label:"Sports Day",           span:1 },
  { src:"https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&q=80", label:"Science Exploration",  span:1 },
];

/* scroll-reveal hook */
function useReveal() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); io.disconnect(); }
    }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, vis];
}

export default function Gallery() {
  const [lightbox, setLightbox]   = useState(null); // { src, label, idx }
  const [filter, setFilter]       = useState("All");
  const [heroRef,  heroVis]  = useReveal();
  const [gridRef,  gridVis]  = useReveal();
  const [igRef,    igVis]    = useReveal();

  /* Load Elfsight platform script once */
  useEffect(() => {
    if (document.querySelector('script[src*="elfsightcdn.com"]')) return;
    const s = document.createElement("script");
    s.src = "https://elfsightcdn.com/platform.js";
    s.async = true;
    document.head.appendChild(s);
  }, []);

  /* keyboard close lightbox */
  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const navigate = (dir) => {
    const next = (lightbox.idx + dir + PHOTOS.length) % PHOTOS.length;
    setLightbox({ ...PHOTOS[next], idx: next });
  };

  const FILTERS = ["All", "Classroom", "Art & Play", "Outdoor", "Events"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

        :root {
          --gl-navy  : #1A3A5C;
          --gl-orange: #E8533A;
          --gl-green : #2E8B57;
          --gl-sky   : #2B7AB8;
          --gl-yellow: #D4891A;
          --gl-red   : #C0392B;
          --gl-off   : #F8F7F4;
          --gl-border: #E8E6E0;
          --gl-body  : #5A5A6A;
          --gl-serif : 'DM Serif Display', Georgia, serif;
          --gl-sans  : 'DM Sans', system-ui, sans-serif;
          --gl-sh    : 0 2px 20px rgba(26,58,92,0.07);
          --gl-sh-lg : 0 12px 44px rgba(26,58,92,0.13);
        }

        .gl-page { font-family: var(--gl-sans); overflow-x: hidden; color: var(--gl-body); }

        /* ── REVEAL ─────────────────────────────────── */
        .gl-up {
          opacity:0; transform:translateY(28px);
          transition: opacity 0.65s cubic-bezier(0.16,1,0.3,1),
                      transform 0.65s cubic-bezier(0.16,1,0.3,1);
        }
        .gl-up.in { opacity:1; transform:translateY(0); }
        .gd1{transition-delay:0.05s!important} .gd2{transition-delay:0.13s!important}
        .gd3{transition-delay:0.21s!important} .gd4{transition-delay:0.29s!important}
        .gd5{transition-delay:0.37s!important} .gd6{transition-delay:0.45s!important}

        .gl-wrap { max-width:1160px; margin:0 auto; padding:0 32px; }

        .gl-eyebrow {
          display:inline-flex; align-items:center; gap:8px;
          font-size:11px; font-weight:700; letter-spacing:2.5px;
          text-transform:uppercase; color:var(--gl-orange);
          margin-bottom:14px;
        }
        .gl-eyebrow::before {
          content:""; display:block; width:22px; height:2px;
          background:var(--gl-orange); border-radius:2px;
        }

        /* ════════════════════════════════════════════
           1. HERO
        ════════════════════════════════════════════ */
        .gl-hero {
          min-height:46vh; background:var(--gl-navy);
          display:flex; align-items:center;
          position:relative; overflow:hidden; padding:100px 0 60px;
        }
        /* dot-grid on dark */
        .gl-hero::before {
          content:""; position:absolute; inset:0;
          background-image:radial-gradient(rgba(255,255,255,0.04) 1px,transparent 1px);
          background-size:30px 30px; pointer-events:none;
        }
        /* glows */
        .gl-hero-glow1 {
          position:absolute; top:-60px; right:-60px;
          width:360px; height:360px; border-radius:50%;
          background:radial-gradient(circle,rgba(232,83,58,0.18),transparent 65%);
          pointer-events:none;
        }
        .gl-hero-glow2 {
          position:absolute; bottom:-40px; left:-40px;
          width:260px; height:260px; border-radius:50%;
          background:radial-gradient(circle,rgba(46,139,87,0.15),transparent 65%);
          pointer-events:none;
        }
        /* logo-colour left bar */
        .gl-hero::after {
          content:""; position:absolute; top:0; left:0;
          width:5px; height:100%;
          background:linear-gradient(to bottom,var(--gl-red),var(--gl-orange),var(--gl-yellow),var(--gl-green),var(--gl-sky));
        }

        .gl-hero-inner {
          position:relative; z-index:1;
          display:grid; grid-template-columns:1fr 1fr;
          gap:64px; align-items:center;
        }

        .gl-hero-tag {
          display:inline-flex; align-items:center; gap:8px;
          background:rgba(255,255,255,0.1); border:1.5px solid rgba(255,255,255,0.15);
          border-radius:4px; padding:6px 14px;
          font-size:11.5px; font-weight:700; color:rgba(255,255,255,0.7);
          letter-spacing:1px; text-transform:uppercase; margin-bottom:22px;
        }
        .gl-blink { width:7px;height:7px;background:#45c57a;border-radius:50%;animation:glBlink 1.5s ease infinite; }
        @keyframes glBlink { 0%,100%{opacity:1}50%{opacity:0.2} }

        .gl-h1 {
          font-family:var(--gl-serif);
          font-size:clamp(36px,5vw,64px);
          font-weight:400; line-height:1.08;
          color:white; letter-spacing:-0.5px; margin:0;
        }
        .gl-divider {
          width:52px; height:3px; border-radius:2px;
          background:linear-gradient(90deg,var(--gl-red),var(--gl-orange),var(--gl-yellow));
          margin:22px 0;
        }
        .gl-hero-lead { font-size:16px; line-height:1.78; color:rgba(255,255,255,0.6); font-weight:300; max-width:440px; }

        /* Instagram follow button */
        .gl-ig-follow {
          display:inline-flex; align-items:center; gap:10px;
          padding:12px 22px; border-radius:8px; margin-top:26px;
          background:linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888);
          color:white; font-family:var(--gl-sans); font-weight:700;
          font-size:14.5px; text-decoration:none; letter-spacing:0.2px;
          border:none; cursor:pointer; transition:all 0.22s ease;
          box-shadow:0 8px 24px rgba(220,39,67,0.35);
        }
        .gl-ig-follow:hover { transform:translateY(-2px); box-shadow:0 12px 32px rgba(220,39,67,0.45); text-decoration:none; color:white; }
        .gl-ig-logo { font-size:20px; }

        /* right side — photo collage preview */
        .gl-hero-collage {
          display:grid; grid-template-columns:1fr 1fr; grid-template-rows:auto auto;
          gap:10px;
        }
        .gl-collage-img {
          border-radius:10px; overflow:hidden; aspect-ratio:1;
          box-shadow:0 8px 24px rgba(0,0,0,0.35);
          transition:transform 0.25s ease;
        }
        .gl-collage-img:first-child { grid-column:span 2; aspect-ratio:16/7; }
        .gl-collage-img:hover { transform:scale(1.02); }
        .gl-collage-img img { width:100%; height:100%; object-fit:cover; display:block; }

        /* ════════════════════════════════════════════
           2. PHOTO GRID
        ════════════════════════════════════════════ */
        .gl-grid-sec { padding:72px 0; background:var(--gl-off); }

        .gl-grid-head {
          display:flex; align-items:flex-end; justify-content:space-between;
          margin-bottom:32px; flex-wrap:wrap; gap:16px;
        }

        /* filter pills */
        .gl-filters { display:flex; gap:8px; flex-wrap:wrap; }
        .gl-filter-btn {
          padding:8px 18px; border-radius:50px;
          font-family:var(--gl-sans); font-weight:600; font-size:13px;
          border:1.5px solid var(--gl-border); background:white; color:var(--gl-body);
          cursor:pointer; transition:all 0.18s ease;
        }
        .gl-filter-btn:hover { border-color:var(--gl-navy); color:var(--gl-navy); }
        .gl-filter-btn.on {
          background:var(--gl-navy); border-color:var(--gl-navy);
          color:white; box-shadow:0 4px 14px rgba(26,58,92,0.2);
        }

        /* masonry grid */
        .gl-masonry {
          display:grid;
          grid-template-columns:repeat(3,1fr);
          grid-auto-rows:220px;
          gap:14px;
        }

        .gl-item {
          position:relative; overflow:hidden; border-radius:12px;
          cursor:pointer; box-shadow:var(--gl-sh);
          transition:transform 0.25s ease, box-shadow 0.25s ease;
        }
        .gl-item.span2 { grid-column:span 2; }
        .gl-item:hover { transform:translateY(-4px); box-shadow:var(--gl-sh-lg); }

        .gl-item img {
          width:100%; height:100%; object-fit:cover; display:block;
          transition:transform 0.4s ease;
        }
        .gl-item:hover img { transform:scale(1.06); }

        /* hover overlay */
        .gl-item-ov {
          position:absolute; inset:0;
          background:linear-gradient(to top,rgba(26,58,92,0.75),transparent 55%);
          opacity:0; transition:opacity 0.25s ease;
          display:flex; align-items:flex-end; padding:16px 18px;
        }
        .gl-item:hover .gl-item-ov { opacity:1; }
        .gl-item-label {
          font-size:13px; font-weight:700; color:white;
          display:flex; align-items:center; gap:6px;
        }
        .gl-item-label::before {
          content:""; display:block; width:18px; height:2px;
          background:var(--gl-orange); border-radius:2px;
        }

        /* zoom icon */
        .gl-zoom {
          position:absolute; top:12px; right:12px;
          width:34px; height:34px; border-radius:50%;
          background:rgba(255,255,255,0.9);
          display:flex; align-items:center; justify-content:center;
          font-size:14px; opacity:0; transform:scale(0.8);
          transition:all 0.22s ease;
          box-shadow:0 2px 10px rgba(0,0,0,0.2);
        }
        .gl-item:hover .gl-zoom { opacity:1; transform:scale(1); }

        /* ════════════════════════════════════════════
           3. INSTAGRAM EMBED SECTION
        ════════════════════════════════════════════ */
        .gl-ig-sec { padding:22px 0; background:white; }

        .gl-ig-head { text-align:center; margin-bottom:8px; }
        .gl-h2 {
          font-family:var(--gl-serif);
          font-size:clamp(26px,3.5vw,44px);
          font-weight:400; line-height:1.12;
          color:var(--gl-navy); letter-spacing:-0.3px; margin:0;
        }
        .gl-ig-sub {
          font-size:15px; color:var(--gl-body); margin-top:10px;
          font-weight:300; line-height:1.7;
        }

        /* Instagram handle pill */
        .gl-ig-handle {
          display:inline-flex; align-items:center; gap:8px;
          background:var(--gl-off); border:1.5px solid var(--gl-border);
          border-radius:50px; padding:8px 18px; margin-top:16px;
          font-size:13.5px; font-weight:600; color:var(--gl-navy);
          text-decoration:none; transition:all 0.2s ease;
        }
        .gl-ig-handle:hover {
          background:white; border-color:var(--gl-orange);
          color:var(--gl-orange); transform:translateY(-1px);
          box-shadow:var(--gl-sh); text-decoration:none;
        }

        /* Elfsight widget wrapper */
        .gl-elfsight-wrap {
          width:100%;
          border-radius:16px;
          overflow:hidden;
          box-shadow:var(--gl-sh-lg);
          border:1px solid var(--gl-border);
          background:white;
          min-height:400px;
        }
        /* Override any Elfsight container styles for seamless fit */
        .gl-elfsight-wrap .eapps-instagram-feed,
        .gl-elfsight-wrap .eapps-widget {
          border-radius:16px !important;
          overflow:hidden !important;
        }

        /* IG CTA strip */
        .gl-ig-cta {
          text-align:center; margin-top:36px;
          padding-top:32px; border-top:1px solid var(--gl-border);
        }
        .gl-ig-cta-text { font-size:15px; color:var(--gl-body); margin-bottom:16px; font-weight:400; }

        /* ════════════════════════════════════════════
           4. LIGHTBOX
        ════════════════════════════════════════════ */
        .gl-lb-ov {
          position:fixed; inset:0; z-index:99999;
          background:rgba(8,16,26,0.92);
          backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px);
          display:flex; align-items:center; justify-content:center;
          padding:24px; animation:glOvIn 0.25s ease both;
        }
        @keyframes glOvIn { from{opacity:0} to{opacity:1} }

        .gl-lb-box {
          position:relative; max-width:860px; width:100%;
          animation:glBoxIn 0.4s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes glBoxIn { from{opacity:0;transform:scale(0.9)} to{opacity:1;transform:scale(1)} }

        .gl-lb-img {
          width:100%; max-height:80vh; object-fit:contain;
          border-radius:14px; display:block;
          box-shadow:0 32px 80px rgba(0,0,0,0.5);
        }

        .gl-lb-label {
          text-align:center; margin-top:16px;
          font-size:14px; color:rgba(255,255,255,0.6); font-weight:500;
          display:flex; align-items:center; justify-content:center; gap:8px;
        }
        .gl-lb-label::before {
          content:""; display:block; width:18px; height:2px;
          background:var(--gl-orange); border-radius:2px;
        }
        .gl-lb-label::after {
          content:""; display:block; width:18px; height:2px;
          background:var(--gl-orange); border-radius:2px;
        }

        /* close */
        .gl-lb-close {
          position:fixed; top:20px; right:20px;
          width:44px; height:44px; border-radius:50%;
          background:rgba(255,255,255,0.1); border:1.5px solid rgba(255,255,255,0.2);
          display:flex; align-items:center; justify-content:center;
          font-size:20px; color:white; cursor:pointer;
          transition:all 0.2s ease;
        }
        .gl-lb-close:hover { background:rgba(255,255,255,0.2); transform:scale(1.1); }

        /* prev/next arrows */
        .gl-lb-arrow {
          position:absolute; top:50%; transform:translateY(-50%);
          width:48px; height:48px; border-radius:50%;
          background:rgba(255,255,255,0.12); border:1.5px solid rgba(255,255,255,0.2);
          display:flex; align-items:center; justify-content:center;
          font-size:20px; color:white; cursor:pointer;
          transition:all 0.2s ease;
        }
        .gl-lb-arrow:hover { background:rgba(255,255,255,0.22); transform:translateY(-50%) scale(1.08); }
        .gl-lb-arrow.prev { left:-64px; }
        .gl-lb-arrow.next { right:-64px; }

        /* counter */
        .gl-lb-counter {
          position:absolute; bottom:-40px; left:50%; transform:translateX(-50%);
          font-size:12px; color:rgba(255,255,255,0.4); letter-spacing:2px;
        }

        /* ── RESPONSIVE ─────────────────────────────── */
        @media(max-width:960px){
          .gl-hero-inner  { grid-template-columns:1fr; gap:40px; }
          .gl-hero-collage{ display:none; }
          .gl-masonry     { grid-template-columns:1fr 1fr; }
          .gl-item.span2  { grid-column:span 2; }
          .gl-lb-arrow.prev{ left:-8px; }
          .gl-lb-arrow.next{ right:-8px; }
        }
        @media(max-width:600px){
          .gl-wrap        { padding:0 16px; }
          .gl-hero        { padding:88px 0 50px; }
          .gl-masonry     { grid-template-columns:1fr 1fr; grid-auto-rows:160px; }
          .gl-item.span2  { grid-column:span 2; }
          .gl-grid-head   { flex-direction:column; align-items:flex-start; }
          .gl-lb-arrow    { display:none; }
        }
      `}</style>

      {lightbox && (
        <div className="gl-lb-ov" onClick={() => setLightbox(null)}>
          <button className="gl-lb-close" onClick={() => setLightbox(null)}>✕</button>
          <div className="gl-lb-box" onClick={e => e.stopPropagation()}>
            <button className="gl-lb-arrow prev" onClick={() => navigate(-1)}>←</button>
            <img className="gl-lb-img" src={lightbox.src} alt={lightbox.label} />
            <button className="gl-lb-arrow next" onClick={() => navigate(1)}>→</button>
            <div className="gl-lb-label">{lightbox.label}</div>
            <div className="gl-lb-counter">{lightbox.idx + 1} / {PHOTOS.length}</div>
          </div>
        </div>
      )}

      <div className="gl-page">

        {/* ════════ 1. HERO ════════ */}
        {/* <section className="gl-hero" ref={heroRef}> */}
          {/* <div className="gl-hero-glow1" />
          <div className="gl-hero-glow2" />
          <div className="gl-wrap">
            <div className="gl-hero-inner"> */}
              {/* <div>
                <div className={`gl-up ${heroVis?"in":""}`}>
                  <div className="gl-hero-tag"><span className="gl-blink" /> Life at Kalinga Kids</div>
                </div>
                <h1 className={`gl-h1 gl-up gd1 ${heroVis?"in":""}`}>
                  Moments That<br />
                  <em style={{fontStyle:"italic",color:"#FFB347"}}>Tell Our Story</em>
                </h1>
                <div className={`gl-divider gl-up gd2 ${heroVis?"in":""}`} />
                <p className={`gl-hero-lead gl-up gd2 ${heroVis?"in":""}`}>
                  A glimpse into everyday life at <strong style={{color:"white",fontWeight:700}}>Kalinga Kids Play School</strong> — the laughter, learning and little moments that make childhood magical.
                </p>
                <a
                  className={`gl-ig-follow gl-up gd3 ${heroVis?"in":""}`}
                  href="https://www.instagram.com/kalingakidss/"
                  target="_blank" rel="noopener noreferrer"
                >
                  <span className="gl-ig-logo">📸</span>
                  Follow us on Instagram
                </a>
              </div> */}

              {/* collage — desktop */}
              {/* <div className={`gl-hero-collage gl-up gd2 ${heroVis?"in":""}`}>
                {PHOTOS.slice(0,3).map((p,i) => (
                  <div className="gl-collage-img" key={i}>
                    <img src={p.src} alt={p.label} />
                  </div>
                ))}
              </div> */}
            {/* </div>
          </div>
        </section> */}

        {/* ════════ 2. PHOTO GRID ════════ */}
        {/* <section className="gl-grid-sec" ref={gridRef}>
          <div className="gl-wrap">
            <div className="gl-grid-head">
              <div>
                <div className="gl-eyebrow">Photo Gallery</div>
                <h2 style={{fontFamily:"var(--gl-serif)",fontSize:"clamp(24px,3vw,38px)",fontWeight:400,color:"var(--gl-navy)",margin:0}}>
                  Captured <em style={{fontStyle:"italic",color:"var(--gl-orange)"}}>Memories</em>
                </h2>
              </div>
              <div className="gl-filters">
                {FILTERS.map(f => (
                  <button
                    key={f}
                    className={`gl-filter-btn ${filter===f?"on":""}`}
                    onClick={() => setFilter(f)}
                  >{f}</button>
                ))}
              </div>
            </div>

            <div className={`gl-masonry gl-up ${gridVis?"in":""}`}>
              {PHOTOS.map((p, i) => (
                <div
                  key={i}
                  className={`gl-item ${p.span===2?"span2":""} gl-up gd${(i%4)+1} ${gridVis?"in":""}`}
                  onClick={() => setLightbox({ ...p, idx:i })}
                >
                  <img src={p.src} alt={p.label} loading="lazy" />
                  <div className="gl-item-ov">
                    <div className="gl-item-label">{p.label}</div>
                  </div>
                  <div className="gl-zoom">🔍</div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* ════════ 3. INSTAGRAM EMBED ════════ */}
        <section className="gl-ig-sec" ref={igRef}>
          <div className="gl-wrap">
            <div className={`gl-ig-head gl-up ${igVis?"in":""}`}>
              <div className="gl-eyebrow" style={{justifyContent:"center"}}>Live from Instagram</div>
              <h2 className="gl-h2">
                Follow Us on<br />
                <em style={{fontStyle:"italic",color:"#E1306C"}}>@kalingakidss</em>
              </h2>
              <p className="gl-ig-sub">
                See what's happening at school every day — art, play, celebrations and more.<br />
                Stay connected with your child's journey.
              </p>
              <a
                href="https://www.instagram.com/kalingakidss/"
                target="_blank" rel="noopener noreferrer"
                className="gl-ig-handle"
              >
                📸 @kalingakidss
              </a>
            </div>

            {/* ─── INSTAGRAM POSTS ─────────────────────────────────────
                Replace the URLs inside blockquote data-instgrm-permalink
                with your school's actual post URLs from Instagram.
                To get a post URL: Open post → tap ··· → Copy Link
            ──────────────────────────────────────────────────────── */}
            {/* ── ELFSIGHT INSTAGRAM FEED WIDGET ── */}
            <div className={`gl-elfsight-wrap gl-up gd1 ${igVis?"in":""}`}>
              <div
                className="elfsight-app-bed38f9f-81ac-4339-aa6e-c147c2ae1913"
                data-elfsight-app-lazy
              />
            </div>

            {/* IG CTA */}
            <div className={`gl-ig-cta gl-up gd2 ${igVis?"in":""}`}>
              <p className="gl-ig-cta-text">See all our latest moments and activities on Instagram</p>
              <a
                href="https://www.instagram.com/kalingakidss/"
                target="_blank" rel="noopener noreferrer"
                className="gl-ig-follow"
                style={{display:"inline-flex"}}
              >
                <span className="gl-ig-logo">📸</span>
                Follow @kalingakidss on Instagram
              </a>
            </div>

          </div>
        </section>

      </div>
    </>
  );
}