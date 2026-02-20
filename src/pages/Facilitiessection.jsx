// ══════════════════════════════════════════════════════════════
//  HOW TO USE
//  Option A — Drop-in component: import and place in your page
//  Option B — Inline: copy the CSS into your <style> block and
//             copy the JSX into your Home() return
// ══════════════════════════════════════════════════════════════

import { useRef, useState } from "react";

const facilities = [
  { icon: "🏫", title: "Safe Classrooms",      desc: "Purpose-built, child-friendly spaces designed to spark curiosity and focused learning." },
  { icon: "🛝", title: "Play Areas",            desc: "Supervised indoor & outdoor play zones promoting physical growth and teamwork." },
  { icon: "📷", title: "CCTV Monitoring",       desc: "24/7 campus surveillance ensuring complete security and parent peace of mind." },
  { icon: "🎵", title: "Music & Movement",      desc: "Dedicated studio nurturing rhythm, expression and creative performance." },
  { icon: "📖", title: "Library Corner",        desc: "A curated collection of age-appropriate books fostering a love of reading." },
  { icon: "🍱", title: "Nutrition Programme",   desc: "Balanced, wholesome meals crafted to fuel growing minds and bodies." },
];

// accent color per card — matches logo palette
const ACCENTS = ["#C0392B","#2B7AB8","#2E8B57","#E8533A","#D4891A","#1A3A5C"];

export default function FacilitiesSection() {
  const trackRef = useRef(null);
  const [idx, setIdx] = useState(0);

  const goTo = (next) => {
    const clamped = Math.max(0, Math.min(next, facilities.length - 1));
    setIdx(clamped);
    const card = trackRef.current?.children[clamped];
    if (card) card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  const onScroll = () => {
    const t = trackRef.current;
    if (!t) return;
    const w = (t.children[0]?.offsetWidth ?? 280) + 16; // card + gap
    setIdx(Math.round(t.scrollLeft / w));
  };

  return (
    <>
      <style>{`
        /* ── shared card styles ─────────────────────── */
        .fac-card {
          background: white;
          border-radius: 10px;
          padding: 30px 26px;
          border: 1px solid #E8E6E0;
          transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
          position: relative;
          overflow: hidden;
          cursor: default;
          flex-shrink: 0;
        }

        /* colored left-bar that grows on hover */
        .fac-card::before {
          content: "";
          position: absolute;
          top: 0; left: 0;
          width: 4px; height: 0;
          border-radius: 0 0 4px 0;
          transition: height 0.28s ease;
          background: var(--fac-accent, #1A3A5C);
        }
        .fac-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 40px rgba(26,58,92,0.13);
          border-color: transparent;
        }
        .fac-card:hover::before { height: 100%; }

        .fac-icon {
          font-size: 36px;
          margin-bottom: 16px;
          display: block;
          transition: transform 0.25s ease;
        }
        .fac-card:hover .fac-icon { transform: scale(1.15) rotate(-6deg); }

        .fac-title {
          font-weight: 700;
          font-size: 15px;
          color: #1A3A5C;
          margin-bottom: 8px;
        }
        .fac-desc {
          font-size: 13.5px;
          color: #999;
          line-height: 1.65;
          margin: 0;
        }

        /* ── DESKTOP: 3-col grid ────────────────────── */
        .fac-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        /* ── MOBILE: slider (hidden on desktop) ─────── */
        .fac-mobile { display: none; }

        .fac-track {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding: 8px 4px 4px;
        }
        .fac-track::-webkit-scrollbar { display: none; }

        .fac-track .fac-card {
          scroll-snap-align: center;
          width: 78vw;
          max-width: 310px;
          min-height: 200px;
        }

        /* arrows + dots row */
        .fac-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          margin-top: 24px;
        }

        .fac-btn {
          width: 44px; height: 44px;
          border-radius: 50%;
          background: white;
          border: 2px solid #E8E6E0;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
          cursor: pointer;
          color: #1A3A5C;
          box-shadow: 0 2px 12px rgba(26,58,92,0.08);
          transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.2s, box-shadow 0.2s;
          padding: 0; line-height: 1; flex-shrink: 0;
        }
        .fac-btn:hover:not(:disabled) {
          background: #1A3A5C;
          border-color: #1A3A5C;
          color: white;
          transform: scale(1.1);
          box-shadow: 0 6px 18px rgba(26,58,92,0.24);
        }
        .fac-btn:disabled { opacity: 0.28; cursor: not-allowed; }

        .fac-dots { display: flex; gap: 7px; align-items: center; }
        .fac-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #E8E6E0;
          border: none; padding: 0; cursor: pointer;
          transition: width 0.25s ease, background 0.25s ease, border-radius 0.25s ease;
        }
        .fac-dot.on {
          background: #1A3A5C;
          width: 22px;
          border-radius: 4px;
        }

        /* ── BREAKPOINTS ──────────────────────────────── */
        @media (max-width: 768px) {
          .fac-grid   { display: none; }
          .fac-mobile { display: block; }
        }
        @media (max-width: 480px) {
          .fac-track .fac-card { width: 86vw; }
        }
      `}</style>

      <section style={{ background: "#F8F7F4", padding: "100px 0" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 32px" }}>

          {/* header */}
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            {/* eyebrow */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontSize: 11, fontWeight: 700, letterSpacing: "2.5px",
              textTransform: "uppercase", color: "#2E8B57", marginBottom: 14
            }}>
              <span style={{ display:"block", width:24, height:2, background:"#2E8B57", borderRadius:2 }} />
              Our Campus
            </div>
            <h2 style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 400, lineHeight: 1.12,
              color: "#1A3A5C", letterSpacing: "-0.3px", margin: 0
            }}>
              World-Class Facilities<br />
              <em style={{ fontStyle: "italic", color: "#2E8B57" }}>Built for Young Learners</em>
            </h2>
          </div>

          {/* ── DESKTOP GRID ── */}
          <div className="fac-grid">
            {facilities.map((f, i) => (
              <div
                className="fac-card"
                key={i}
                style={{ "--fac-accent": ACCENTS[i] }}
              >
                <span className="fac-icon">{f.icon}</span>
                <div className="fac-title">{f.title}</div>
                <p className="fac-desc">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* ── MOBILE SLIDER ── */}
          <div className="fac-mobile">
            <div className="fac-track" ref={trackRef} onScroll={onScroll}>
              {facilities.map((f, i) => (
                <div
                  className="fac-card"
                  key={i}
                  style={{ "--fac-accent": ACCENTS[i] }}
                >
                  <span className="fac-icon">{f.icon}</span>
                  <div className="fac-title">{f.title}</div>
                  <p className="fac-desc">{f.desc}</p>
                </div>
              ))}
            </div>

            <div className="fac-controls">
              {/* left arrow */}
              <button
                className="fac-btn"
                onClick={() => goTo(idx - 1)}
                disabled={idx === 0}
                aria-label="Previous"
              >←</button>

              {/* dots */}
              <div className="fac-dots">
                {facilities.map((_, i) => (
                  <button
                    key={i}
                    className={`fac-dot ${idx === i ? "on" : ""}`}
                    onClick={() => goTo(i)}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              {/* right arrow */}
              <button
                className="fac-btn"
                onClick={() => goTo(idx + 1)}
                disabled={idx === facilities.length - 1}
                aria-label="Next"
              >→</button>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}