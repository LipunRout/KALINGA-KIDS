import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// ─────────────────────────────────────────────────────────────
//  KALINGA KIDS — Programs Page
//  Design: Editorial + Interactive — same DM Serif / DM Sans system
//  Mobile: Full-screen swipeable cards with snap scrolling
// ─────────────────────────────────────────────────────────────

const PROGRAMS = [
  {
    name: "Play Group",
    age: "2–3 Years",
    emoji: "🎨",
    color: "#E8533A",
    bg: "rgba(232,83,58,0.07)",
    tag: "Foundation",
    headline: "Where Learning Begins",
    desc: "Our Play Group is designed to ease little ones into their very first structured environment — through sensory play, music, art and gentle social interaction.",
    features: [
      "Sensory & tactile play activities",
      "Music, rhythm & movement sessions",
      "Storytime & picture book reading",
      "First social skills & sharing",
      "Colourful art & craft projects",
    ],
    outcome: "Confidence to separate, curiosity to explore",
    seats: "Limited — 12 per batch",
  },
  {
    name: "Nursery",
    age: "3–4 Years",
    emoji: "📖",
    color: "#2B7AB8",
    bg: "rgba(43,122,184,0.07)",
    tag: "Discovery",
    headline: "Curiosity in Full Bloom",
    desc: "Nursery introduces structured learning through play — letters, numbers, colours, shapes and the joy of discovery in a warm, encouraging classroom.",
    features: [
      "Pre-literacy & phonics readiness",
      "Number sense & early numeracy",
      "Colours, shapes & pattern work",
      "Creative dramatics & role-play",
      "Outdoor supervised free play",
    ],
    outcome: "Language readiness & independent thinking",
    seats: "Limited — 15 per batch",
  },
  {
    name: "LKG",
    age: "4–5 Years",
    emoji: "✏️",
    color: "#2E8B57",
    bg: "rgba(46,139,87,0.07)",
    tag: "Growth",
    headline: "Building Strong Foundations",
    desc: "Lower Kindergarten transitions children from informal learning to structured academics — reading, writing and arithmetic — with patience and encouragement.",
    features: [
      "Handwriting & letter formation",
      "Phonics-based reading readiness",
      "Basic addition & subtraction",
      "Environmental science exploration",
      "Group projects & presentations",
    ],
    outcome: "Academic readiness with strong motor skills",
    seats: "Limited — 18 per batch",
  },
  {
    name: "UKG",
    age: "5–6 Years",
    emoji: "🎓",
    color: "#D4891A",
    bg: "rgba(212,137,26,0.07)",
    tag: "Excellence",
    headline: "Ready for the World",
    desc: "Upper Kindergarten prepares children for primary school through advanced literacy, numeracy, critical thinking and leadership — the final step of their Kalinga Kids journey.",
    features: [
      "Advanced reading & comprehension",
      "Written expression & storytelling",
      "Mathematical reasoning & puzzles",
      "Science experiments & observation",
      "Leadership & public speaking",
    ],
    outcome: "School-ready with confidence & character",
    seats: "Limited — 18 per batch",
  },
];

/* scroll-reveal hook */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, vis];
}

export default function Programs() {
  const [active, setActive] = useState(0);
  const prog = PROGRAMS[active];

  /* mobile swiper sync */
  const mobileRef = useRef(null);
  const [mobileIdx, setMobileIdx] = useState(0);

  const goTo = (i) => {
    const clamped = Math.max(0, Math.min(i, PROGRAMS.length - 1));
    setMobileIdx(clamped);
    const card = mobileRef.current?.children[clamped];
    if (card)
      card.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
  };

  const onMobileScroll = () => {
    const t = mobileRef.current;
    if (!t) return;
    const w = (t.children[0]?.offsetWidth ?? 300) + 16;
    setMobileIdx(Math.round(t.scrollLeft / w));
  };

  const [heroRef, heroVis] = useReveal();
  const [tabsRef, tabsVis] = useReveal();
  const [featsRef, featsVis] = useReveal();
  const [ctaRef, ctaVis] = useReveal();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

        :root {
          --pg-navy  : #1A3A5C;
          --pg-orange: #E8533A;
          --pg-green : #2E8B57;
          --pg-sky   : #2B7AB8;
          --pg-yellow: #D4891A;
          --pg-red   : #C0392B;
          --pg-off   : #F8F7F4;
          --pg-border: #E8E6E0;
          --pg-body  : #5A5A6A;
          --pg-serif : 'DM Serif Display', Georgia, serif;
          --pg-sans  : 'DM Sans', system-ui, sans-serif;
          --pg-sh    : 0 2px 20px rgba(26,58,92,0.07);
          --pg-sh-lg : 0 12px 44px rgba(26,58,92,0.12);
        }

        .pg-page { font-family: var(--pg-sans); overflow-x: hidden; color: var(--pg-body); }

        /* ── REVEAL ────────────────────────────────── */
        .pg-up {
          opacity:0; transform:translateY(28px);
          transition: opacity 0.65s cubic-bezier(0.16,1,0.3,1),
                      transform 0.65s cubic-bezier(0.16,1,0.3,1);
        }
        .pg-up.in { opacity:1; transform:translateY(0); }
        .pg-left {
          opacity:0; transform:translateX(-36px);
          transition: opacity 0.65s cubic-bezier(0.16,1,0.3,1),
                      transform 0.65s cubic-bezier(0.16,1,0.3,1);
        }
        .pg-left.in { opacity:1; transform:translateX(0); }
        .pg-right {
          opacity:0; transform:translateX(36px);
          transition: opacity 0.65s cubic-bezier(0.16,1,0.3,1),
                      transform 0.65s cubic-bezier(0.16,1,0.3,1);
        }
        .pg-right.in { opacity:1; transform:translateX(0); }

        .pd1{transition-delay:0.05s!important} .pd2{transition-delay:0.13s!important}
        .pd3{transition-delay:0.21s!important} .pd4{transition-delay:0.29s!important}
        .pd5{transition-delay:0.37s!important} .pd6{transition-delay:0.45s!important}

        /* ── SHARED ────────────────────────────────── */
        .pg-wrap { max-width:1160px; margin:0 auto; padding:0 32px; }

        .pg-eyebrow {
          display:inline-flex; align-items:center; gap:8px;
          font-size:11px; font-weight:700; letter-spacing:2.5px;
          text-transform:uppercase; color:var(--pg-orange); margin-bottom:14px;
        }
        .pg-eyebrow::before {
          content:""; display:block; width:22px; height:2px;
          background:var(--pg-orange); border-radius:2px;
        }
        .pg-h1 {
          font-family:var(--pg-serif);
          font-size:clamp(38px,5.5vw,68px);
          font-weight:400; line-height:1.08;
          color:var(--pg-navy); letter-spacing:-0.5px; margin:0;
        }
        .pg-h2 {
          font-family:var(--pg-serif);
          font-size:clamp(26px,3.5vw,44px);
          font-weight:400; line-height:1.12;
          color:var(--pg-navy); letter-spacing:-0.3px; margin:0;
        }

        /* ════════════════════════════════════════════
           1. HERO
        ════════════════════════════════════════════ */
        .pg-hero {
          min-height:52vh; background:var(--pg-off);
          display:flex; align-items:center;
          position:relative; overflow:hidden; padding:100px 0 64px;
        }
        .pg-hero::before {
          content:""; position:absolute; inset:0;
          background-image:radial-gradient(rgba(26,58,92,0.065) 1px,transparent 1px);
          background-size:30px 30px; pointer-events:none;
        }
        .pg-hero::after {
          content:""; position:absolute; top:0; left:0;
          width:5px; height:100%;
          background:linear-gradient(to bottom,
            var(--pg-red),var(--pg-orange),var(--pg-yellow),
            var(--pg-green),var(--pg-sky));
        }

        .pg-hero-inner {
          position:relative; z-index:1;
          display:grid; grid-template-columns:1.1fr 1fr;
          gap:64px; align-items:center;
        }

        .pg-hero-tag {
          display:inline-flex; align-items:center; gap:8px;
          background:white; border:1.5px solid var(--pg-border);
          border-radius:4px; padding:6px 14px;
          font-size:11.5px; font-weight:700; color:var(--pg-green);
          letter-spacing:1px; text-transform:uppercase;
          margin-bottom:22px; box-shadow:var(--pg-sh);
        }
        .pg-blink {
          width:7px; height:7px; background:var(--pg-green);
          border-radius:50%; animation:pgBlink 1.5s ease infinite;
        }
        @keyframes pgBlink { 0%,100%{opacity:1}50%{opacity:0.2} }

        .pg-divider {
          width:52px; height:3px; border-radius:2px;
          background:linear-gradient(90deg,var(--pg-red),var(--pg-orange),var(--pg-yellow));
          margin:22px 0;
        }

        .pg-hero-lead { font-size:17px; line-height:1.78; color:var(--pg-body); font-weight:300; max-width:480px; }

        /* hero programme pill grid */
        .pg-hero-pills {
          display:grid; grid-template-columns:repeat(2,1fr); gap:12px; margin-top:30px;
        }
        .pg-hero-pill {
          display:flex; align-items:center; gap:10px;
          background:white; border:1.5px solid var(--pg-border);
          border-radius:10px; padding:12px 16px; box-shadow:var(--pg-sh);
          transition:all 0.2s ease; cursor:default;
          text-decoration:none;
        }
        .pg-hero-pill:hover { transform:translateY(-3px); box-shadow:var(--pg-sh-lg); border-color:var(--ph-c,var(--pg-orange)); }
        .pg-pill-emoji { font-size:22px; }
        .pg-pill-name { font-weight:700; font-size:14px; color:var(--pg-navy); }
        .pg-pill-age  { font-size:11.5px; color:#bbb; margin-top:1px; }
        .pg-pill-tag  {
          margin-left:auto; font-size:9.5px; font-weight:700;
          letter-spacing:1.5px; text-transform:uppercase;
          padding:3px 8px; border-radius:4px; white-space:nowrap;
        }

        /* hero right — big stat card */
        .pg-hero-right { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
        .pg-stat {
          background:white; border-radius:14px;
          padding:22px 18px; border:1px solid var(--pg-border);
          box-shadow:var(--pg-sh); position:relative; overflow:hidden;
          transition:transform 0.22s, box-shadow 0.22s;
        }
        .pg-stat::before {
          content:""; position:absolute; top:0; left:0;
          width:4px; height:100%; border-radius:14px 0 0 14px;
        }
        .pg-stat:hover { transform:translateY(-4px); box-shadow:var(--pg-sh-lg); }
        .pg-stat-num { font-family:var(--pg-serif); font-size:38px; line-height:1; }
        .pg-stat-lbl { font-size:11.5px; color:#aaa; margin-top:6px; text-transform:uppercase; letter-spacing:0.5px; font-weight:600; }

        /* ════════════════════════════════════════════
           2. DESKTOP TAB SECTION
        ════════════════════════════════════════════ */
        .pg-tabs-sec {
          padding:72px 0; background:white;
        }

        /* tab pills */
        .pg-tab-bar {
          display:flex; gap:8px; margin-bottom:44px; flex-wrap:wrap;
          border-bottom:2px solid var(--pg-border); padding-bottom:0;
        }
        .pg-tab {
          display:flex; align-items:center; gap:8px;
          padding:12px 22px 14px; border-radius:8px 8px 0 0;
          font-family:var(--pg-sans); font-weight:600; font-size:14.5px;
          color:#999; border:none; background:transparent;
          cursor:pointer; transition:all 0.2s ease;
          position:relative; bottom:-2px;
          border-bottom:2px solid transparent;
        }
        .pg-tab:hover { color:var(--pg-navy); background:var(--pg-off); }
        .pg-tab.active {
          color:var(--pt-c,var(--pg-orange));
          border-bottom:2px solid var(--pt-c,var(--pg-orange));
          background:white;
          font-weight:700;
        }
        .pg-tab-emoji { font-size:18px; transition:transform 0.2s; }
        .pg-tab.active .pg-tab-emoji { transform:scale(1.15) rotate(-5deg); }
        .pg-tab-name {}

        /* programme panel */
        .pg-panel {
          display:grid; grid-template-columns:1fr 1.1fr; gap:0;
          border-radius:16px; overflow:hidden;
          box-shadow:var(--pg-sh-lg);
          border:1px solid var(--pg-border);
          animation:pgPanelIn 0.4s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes pgPanelIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }

        /* left — coloured identity */
        .pg-panel-left {
          padding:44px 36px; display:flex; flex-direction:column;
          justify-content:space-between; position:relative; overflow:hidden;
        }
        .pg-panel-left::before {
          content:""; position:absolute; top:-40px; right:-40px;
          width:180px; height:180px;
          background:radial-gradient(circle,rgba(255,255,255,0.18),transparent 65%);
          border-radius:50%; pointer-events:none;
        }
        .pg-panel-left::after {
          content:""; position:absolute; bottom:-30px; left:-20px;
          width:130px; height:130px;
          background:radial-gradient(circle,rgba(0,0,0,0.06),transparent 65%);
          border-radius:50%; pointer-events:none;
        }

        .pg-panel-tag {
          display:inline-flex; align-items:center; gap:6px;
          background:rgba(255,255,255,0.2); border:1.5px solid rgba(255,255,255,0.3);
          border-radius:4px; padding:5px 12px;
          font-size:10px; font-weight:700; letter-spacing:2px;
          text-transform:uppercase; color:white; width:fit-content;
          margin-bottom:18px;
        }

        .pg-panel-emoji { font-size:72px; line-height:1; margin-bottom:16px; display:block; }

        .pg-panel-name {
          font-family:var(--pg-serif); font-size:38px;
          font-weight:400; color:white; line-height:1.1; margin-bottom:6px;
        }
        .pg-panel-age {
          font-size:14px; color:rgba(255,255,255,0.7); font-weight:400;
        }

        .pg-panel-outcome {
          background:rgba(255,255,255,0.12); border:1px solid rgba(255,255,255,0.2);
          border-radius:10px; padding:14px 16px; margin-top:24px;
          position:relative; z-index:1;
        }
        .pg-panel-outcome-lbl {
          font-size:9.5px; font-weight:700; letter-spacing:2px;
          text-transform:uppercase; color:rgba(255,255,255,0.6); margin-bottom:5px;
        }
        .pg-panel-outcome-txt { font-size:14px; color:white; font-weight:600; line-height:1.4; }

        /* right — content */
        .pg-panel-right { background:white; padding:44px 40px; }

        .pg-panel-headline {
          font-family:var(--pg-serif); font-size:28px; color:var(--pg-navy);
          line-height:1.2; margin-bottom:14px;
        }
        .pg-panel-desc { font-size:15px; line-height:1.78; color:var(--pg-body); margin-bottom:26px; }

        .pg-panel-feats-lbl {
          font-size:10px; font-weight:700; letter-spacing:2px;
          text-transform:uppercase; color:#bbb; margin-bottom:12px;
          display:flex; align-items:center; gap:10px;
        }
        .pg-panel-feats-lbl::after { content:""; flex:1; height:1px; background:var(--pg-border); }

        .pg-feats { display:flex; flex-direction:column; gap:9px; margin-bottom:28px; }
        .pg-feat {
          display:flex; align-items:center; gap:12px;
          font-size:14px; color:var(--pg-body);
        }
        .pg-feat-dot {
          width:8px; height:8px; border-radius:50%; flex-shrink:0;
        }

        .pg-panel-seats {
          display:flex; align-items:center; gap:10px;
          background:var(--pg-off); border:1px solid var(--pg-border);
          border-radius:8px; padding:12px 16px; margin-bottom:24px;
          font-size:13.5px; color:var(--pg-body);
        }
        .pg-seats-dot { width:8px; height:8px; border-radius:50%; background:#E8533A; animation:pgBlink 1.5s ease infinite; }

        .pg-panel-cta {
          display:inline-flex; align-items:center; gap:8px;
          background:var(--pg-navy); color:white;
          font-family:var(--pg-sans); font-weight:600; font-size:14.5px;
          padding:13px 26px; border-radius:7px; text-decoration:none;
          border:2px solid var(--pg-navy); letter-spacing:0.2px;
          transition:all 0.22s ease; cursor:pointer;
        }
        .pg-panel-cta:hover {
          background:transparent; color:var(--pg-navy);
          transform:translateY(-2px); box-shadow:0 8px 24px rgba(26,58,92,0.14);
          text-decoration:none;
        }

        /* ════════════════════════════════════════════
           3. MOBILE CARDS (swipeable, hidden on desktop)
        ════════════════════════════════════════════ */
        .pg-mobile-sec { display:none; padding:60px 0 52px; background:white; }

        .pg-mobile-head { text-align:center; margin-bottom:32px; padding:0 24px; }

        .pg-mobile-track {
          display:flex; gap:16px;
          overflow-x:auto; scroll-snap-type:x mandatory;
          -webkit-overflow-scrolling:touch;
          scrollbar-width:none; padding:8px 24px 16px;
        }
        .pg-mobile-track::-webkit-scrollbar { display:none; }

        /* mobile card */
        .pg-mc {
          scroll-snap-align:center; flex-shrink:0;
          width:82vw; max-width:340px;
          border-radius:18px; overflow:hidden;
          box-shadow:0 8px 40px rgba(26,58,92,0.14);
          border:1px solid var(--pg-border);
          display:flex; flex-direction:column;
        }

        /* top coloured band */
        .pg-mc-top {
          padding:28px 24px 22px; position:relative; overflow:hidden;
        }
        .pg-mc-top::before {
          content:""; position:absolute; top:-30px; right:-30px;
          width:130px; height:130px;
          background:radial-gradient(circle,rgba(255,255,255,0.16),transparent 65%);
          border-radius:50%; pointer-events:none;
        }
        .pg-mc-tag {
          display:inline-flex;
          background:rgba(255,255,255,0.2); border:1px solid rgba(255,255,255,0.3);
          border-radius:4px; padding:4px 10px;
          font-size:9px; font-weight:700; letter-spacing:2px;
          text-transform:uppercase; color:white; margin-bottom:16px;
        }
        .pg-mc-emoji { font-size:48px; display:block; margin-bottom:10px; }
        .pg-mc-name { font-family:var(--pg-serif); font-size:28px; color:white; margin-bottom:4px; }
        .pg-mc-age  { font-size:13px; color:rgba(255,255,255,0.7); }

        /* bottom white content */
        .pg-mc-bot { background:white; padding:22px 22px 26px; flex:1; }
        .pg-mc-desc { font-size:13.5px; line-height:1.7; color:var(--pg-body); margin-bottom:18px; }

        .pg-mc-feats { display:flex; flex-direction:column; gap:8px; margin-bottom:18px; }
        .pg-mc-feat {
          display:flex; align-items:center; gap:10px;
          font-size:13px; color:var(--pg-body);
        }
        .pg-mc-feat-dot { width:7px; height:7px; border-radius:50%; flex-shrink:0; }

        .pg-mc-outcome {
          background:var(--pg-off); border:1px solid var(--pg-border);
          border-radius:8px; padding:11px 14px; margin-bottom:18px;
          font-size:12.5px; color:var(--pg-body); line-height:1.5;
        }
        .pg-mc-outcome strong { color:var(--pg-navy); font-weight:700; }

        .pg-mc-cta {
          display:flex; align-items:center; justify-content:center; gap:6px;
          width:100%; padding:13px; background:var(--pg-navy);
          color:white; border:none; border-radius:8px;
          font-family:var(--pg-sans); font-weight:700; font-size:14px;
          cursor:pointer; text-decoration:none;
          transition:all 0.2s ease;
        }
        .pg-mc-cta:hover { opacity:0.88; text-decoration:none; }

        /* arrows + dots */
        .pg-mob-controls {
          display:flex; align-items:center; justify-content:center;
          gap:14px; margin-top:22px; padding:0 24px;
        }
        .pg-mob-arrow {
          width:44px; height:44px; border-radius:50%;
          background:white; border:2px solid var(--pg-border);
          display:flex; align-items:center; justify-content:center;
          font-size:18px; cursor:pointer; color:var(--pg-navy);
          box-shadow:0 2px 12px rgba(26,58,92,0.08);
          transition:all 0.2s ease; padding:0;
        }
        .pg-mob-arrow:hover:not(:disabled) {
          background:var(--pg-navy); border-color:var(--pg-navy); color:white;
          transform:scale(1.08); box-shadow:0 6px 18px rgba(26,58,92,0.22);
        }
        .pg-mob-arrow:disabled { opacity:0.28; cursor:not-allowed; }

        .pg-mob-dots { display:flex; gap:7px; align-items:center; }
        .pg-mob-dot {
          width:8px; height:8px; border-radius:50%;
          background:var(--pg-border); border:none; padding:0; cursor:pointer;
          transition:all 0.25s ease;
        }
        .pg-mob-dot.on { background:var(--pg-navy); width:22px; border-radius:4px; }

        /* ════════════════════════════════════════════
           4. FEATURES STRIP
        ════════════════════════════════════════════ */
        .pg-feats-strip { background:var(--pg-navy); padding:60px 0; }
        .pg-feats-grid {
          display:grid; grid-template-columns:repeat(4,1fr); gap:0;
          border-radius:0;
        }
        .pg-fs-item {
          text-align:center; padding:28px 20px;
          border-right:1px solid rgba(255,255,255,0.09);
          transition:background 0.2s ease;
        }
        .pg-fs-item:last-child { border-right:none; }
        .pg-fs-item:hover { background:rgba(255,255,255,0.04); }
        .pg-fs-icon { font-size:32px; margin-bottom:12px; display:block; }
        .pg-fs-title { font-weight:700; font-size:14px; color:white; margin-bottom:6px; }
        .pg-fs-desc  { font-size:12.5px; color:rgba(255,255,255,0.5); line-height:1.6; }

        /* ════════════════════════════════════════════
           5. CTA BAND
        ════════════════════════════════════════════ */
        .pg-cta-sec {
          background:var(--pg-off); padding:72px 0;
          position:relative; overflow:hidden;
        }
        .pg-cta-sec::before {
          content:""; position:absolute; inset:0;
          background-image:radial-gradient(rgba(26,58,92,0.055) 1px,transparent 1px);
          background-size:28px 28px; pointer-events:none;
        }
        .pg-cta-inner { text-align:center; position:relative; z-index:1; max-width:640px; margin:0 auto; }
        .pg-cta-h { font-family:var(--pg-serif); font-size:clamp(28px,4vw,48px); color:var(--pg-navy); margin-bottom:14px; }
        .pg-cta-sub { font-size:16px; color:var(--pg-body); margin-bottom:32px; line-height:1.7; font-weight:300; }
        .pg-cta-btns { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; }
        .pg-btn-dk {
          display:inline-flex; align-items:center; gap:8px;
          background:var(--pg-navy); color:white;
          font-family:var(--pg-sans); font-weight:600; font-size:14.5px;
          padding:13px 28px; border-radius:7px; text-decoration:none;
          border:2px solid var(--pg-navy); transition:all 0.22s ease;
        }
        .pg-btn-dk:hover { background:transparent; color:var(--pg-navy); transform:translateY(-2px); text-decoration:none; box-shadow:0 8px 24px rgba(26,58,92,0.14); }
        .pg-btn-ol {
          display:inline-flex; align-items:center; gap:8px;
          background:transparent; color:var(--pg-navy);
          font-family:var(--pg-sans); font-weight:600; font-size:14.5px;
          padding:13px 28px; border-radius:7px; text-decoration:none;
          border:2px solid rgba(26,58,92,0.25); transition:all 0.22s ease;
        }
        .pg-btn-ol:hover { border-color:var(--pg-navy); transform:translateY(-2px); text-decoration:none; }

        /* ── RESPONSIVE ──────────────────────────── */
        @media(max-width:900px){
          .pg-hero-inner { grid-template-columns:1fr; gap:40px; }
          .pg-hero-right { display:none; }
          .pg-tabs-sec  { display:none; }          /* hide desktop tabs on mobile */
          .pg-mobile-sec{ display:block; }          /* show mobile swiper         */
          .pg-feats-grid{ grid-template-columns:1fr 1fr; }
          .pg-fs-item   { border-right:none; border-bottom:1px solid rgba(255,255,255,0.09); }
          .pg-fs-item:nth-child(even)  { border-left:1px solid rgba(255,255,255,0.09); }
        }
        @media(max-width:600px){
          .pg-wrap       { padding:0 18px; }
          .pg-hero       { padding:88px 0 52px; }
          .pg-hero-pills { grid-template-columns:1fr 1fr; gap:10px; }
          .pg-feats-grid { grid-template-columns:1fr; }
          .pg-fs-item    { border-right:none; border-left:none !important; }
          .pg-cta-btns   { flex-direction:column; align-items:center; }
          .pg-feats-strip{ padding:44px 0; }
          .pg-mobile-sec { padding:48px 0 40px; }
        }
      `}</style>

      <div className="pg-page">
        {/* ════════ 1. HERO ════════ */}
        <section className="pg-hero" ref={heroRef}>
          <div className="pg-wrap">
            <div className="pg-hero-inner">
              <div>
                <div className={`pg-up ${heroVis ? "in" : ""}`}>
                  <div className="pg-hero-tag">
                    <span className="pg-blink" /> 4 Programmes · Ages 2–6
                  </div>
                </div>
                <h1 className={`pg-h1 pg-up pd1 ${heroVis ? "in" : ""}`}>
                  Programmes
                  <br />
                  <em
                    style={{ fontStyle: "italic", color: "var(--pg-orange)" }}
                  >
                    Built to Inspire
                  </em>
                </h1>
                <div
                  className={`pg-divider pg-up pd2 ${heroVis ? "in" : ""}`}
                />
                <p className={`pg-hero-lead pg-up pd2 ${heroVis ? "in" : ""}`}>
                  Every programme at{" "}
                  <strong style={{ color: "var(--pg-navy)", fontWeight: 700 }}>
                    Kalinga Kids
                  </strong>{" "}
                  is carefully designed for each developmental stage — combining
                  structure, play and genuine curiosity to help every child
                  thrive.
                </p>
                <div
                  className={`pg-hero-pills pg-up pd3 ${heroVis ? "in" : ""}`}
                >
                  {PROGRAMS.map((p, i) => (
                    <div
                      className="pg-hero-pill"
                      key={i}
                      style={{ "--ph-c": p.color }}
                      onClick={() => {
                        setActive(i);
                        document
                          .querySelector(".pg-tabs-sec")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      <span className="pg-pill-emoji">{p.emoji}</span>
                      <div>
                        <div className="pg-pill-name">{p.name}</div>
                        <div className="pg-pill-age">{p.age}</div>
                      </div>
                      <span
                        className="pg-pill-tag"
                        style={{ background: p.bg, color: p.color }}
                      >
                        {p.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* stat cards — desktop only */}
              <div className={`pg-hero-right pg-right ${heroVis ? "in" : ""}`}>
                {[
                  { n: "4", l: "Programmes", c: "#E8533A" },
                  { n: "5000+", l: "Children Enrolled", c: "#2E8B57" },
                  { n: "10+", l: "Years of Excellence", c: "#2B7AB8" },
                  { n: "98%", l: "Parent Satisfaction", c: "#D4891A" },
                ].map((s, i) => (
                  <div className="pg-stat" key={i}>
                    <style>{`.pg-stat:nth-child(${i + 1})::before{background:${
                      s.c
                    }}`}</style>
                    <div className="pg-stat-num" style={{ color: s.c }}>
                      {s.n}
                    </div>
                    <div className="pg-stat-lbl">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════ 2. DESKTOP TABS ════════ */}
        <section className="pg-tabs-sec" ref={tabsRef}>
          <div className="pg-wrap">
            {/* eyebrow */}
            <div
              className={`pg-up ${tabsVis ? "in" : ""}`}
              style={{ marginBottom: 0 }}
            >
              <div className="pg-eyebrow">Our Programmes</div>
            </div>

            {/* tab bar */}
            <div className={`pg-tab-bar pg-up pd1 ${tabsVis ? "in" : ""}`}>
              {PROGRAMS.map((p, i) => (
                <button
                  key={i}
                  className={`pg-tab ${active === i ? "active" : ""}`}
                  style={{ "--pt-c": p.color }}
                  onClick={() => setActive(i)}
                >
                  <span className="pg-tab-emoji">{p.emoji}</span>
                  <span className="pg-tab-name">{p.name}</span>
                  <span
                    style={{ fontSize: 11, color: "#bbb", fontWeight: 500 }}
                  >
                    ·{p.age}
                  </span>
                </button>
              ))}
            </div>

            {/* programme panel — re-renders on tab change */}
            <div
              key={active}
              className={`pg-panel pg-up pd2 ${tabsVis ? "in" : ""}`}
            >
              {/* left coloured side */}
              <div className="pg-panel-left" style={{ background: prog.color }}>
                <div>
                  <div className="pg-panel-tag">{prog.tag}</div>
                  <span className="pg-panel-emoji">{prog.emoji}</span>
                  <div className="pg-panel-name">{prog.name}</div>
                  <div className="pg-panel-age">Ages {prog.age}</div>
                </div>
                <div className="pg-panel-outcome">
                  <div className="pg-panel-outcome-lbl">Learning Outcome</div>
                  <div className="pg-panel-outcome-txt">{prog.outcome}</div>
                </div>
              </div>

              {/* right content side */}
              <div className="pg-panel-right">
                <h3 className="pg-panel-headline">{prog.headline}</h3>
                <p className="pg-panel-desc">{prog.desc}</p>

                <div className="pg-panel-feats-lbl">
                  What Your Child Will Learn
                </div>
                <div className="pg-feats">
                  {prog.features.map((f, i) => (
                    <div className="pg-feat" key={i}>
                      <span
                        className="pg-feat-dot"
                        style={{ background: prog.color }}
                      />
                      {f}
                    </div>
                  ))}
                </div>

                <div className="pg-panel-seats">
                  <span className="pg-seats-dot" />
                  <span>
                    <strong style={{ color: prog.color }}>
                      Seats filling fast
                    </strong>{" "}
                    · {prog.seats}
                  </span>
                </div>

                <a href="/admission" className="pg-panel-cta">
                  Apply for {prog.name} →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ════════ 3. MOBILE SWIPER ════════ */}
        <section className="pg-mobile-sec">
          <div className="pg-mobile-head">
            <div className="pg-eyebrow" style={{ justifyContent: "center" }}>
              Our Programmes
            </div>
            <h2 className="pg-h2">
              Choose the Right
              <br />
              <em style={{ fontStyle: "italic", color: "var(--pg-orange)" }}>
                Programme
              </em>
            </h2>
          </div>

          {/* swipeable track */}
          <div
            className="pg-mobile-track"
            ref={mobileRef}
            onScroll={onMobileScroll}
          >
            {PROGRAMS.map((p, i) => (
              <div className="pg-mc" key={i}>
                {/* coloured top */}
                <div className="pg-mc-top" style={{ background: p.color }}>
                  <div className="pg-mc-tag">{p.tag}</div>
                  <span className="pg-mc-emoji">{p.emoji}</span>
                  <div className="pg-mc-name">{p.name}</div>
                  <div className="pg-mc-age">Ages {p.age}</div>
                </div>

                {/* white bottom */}
                <div className="pg-mc-bot">
                  <p className="pg-mc-desc">{p.desc}</p>

                  <div className="pg-mc-feats">
                    {p.features.slice(0, 4).map((f, j) => (
                      <div className="pg-mc-feat" key={j}>
                        <span
                          className="pg-mc-feat-dot"
                          style={{ background: p.color }}
                        />
                        {f}
                      </div>
                    ))}
                  </div>

                  <div className="pg-mc-outcome">
                    <strong>Outcome: </strong>
                    {p.outcome}
                  </div>

                  <Link to="/admission" className="pg-mc-cta">
                    Apply for {p.name} →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* controls */}
          <div className="pg-mob-controls">
            <button
              className="pg-mob-arrow"
              onClick={() => goTo(mobileIdx - 1)}
              disabled={mobileIdx === 0}
              aria-label="Previous"
            >
              ←
            </button>
            <div className="pg-mob-dots">
              {PROGRAMS.map((_, i) => (
                <button
                  key={i}
                  className={`pg-mob-dot ${mobileIdx === i ? "on" : ""}`}
                  onClick={() => goTo(i)}
                  aria-label={`Programme ${i + 1}`}
                />
              ))}
            </div>
            <button
              className="pg-mob-arrow"
              onClick={() => goTo(mobileIdx + 1)}
              disabled={mobileIdx === PROGRAMS.length - 1}
              aria-label="Next"
            >
              →
            </button>
          </div>
        </section>

        {/* ════════ 4. FEATURES STRIP ════════ */}
        <div className="pg-feats-strip" ref={featsRef}>
          <div className="pg-wrap">
            <div className="pg-feats-grid">
              {[
                {
                  icon: "🏫",
                  title: "Safe Environment",
                  desc: "CCTV-monitored, clean and child-friendly classrooms at all times.",
                },
                {
                  icon: "👩‍🏫",
                  title: "Expert Educators",
                  desc: "Qualified, passionate teachers trained in early childhood methods.",
                },
                {
                  icon: "🎵",
                  title: "Activity-Based",
                  desc: "Every lesson is hands-on, experiential and built around curiosity.",
                },
                {
                  icon: "📱",
                  title: "Parent Updates",
                  desc: "Daily photos and progress reports shared directly with families.",
                },
              ].map((f, i) => (
                <div
                  key={i}
                  className={`pg-fs-item pg-up pd${i + 1} ${
                    featsVis ? "in" : ""
                  }`}
                >
                  <span className="pg-fs-icon">{f.icon}</span>
                  <div className="pg-fs-title">{f.title}</div>
                  <p className="pg-fs-desc">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ════════ 5. CTA ════════ */}
        <section className="pg-cta-sec" ref={ctaRef}>
          <div className="pg-wrap">
            <div className={`pg-cta-inner pg-up ${ctaVis ? "in" : ""}`}>
              <h2 className="pg-cta-h">
                Ready to Enrol
                <br />
                <em style={{ fontStyle: "italic", color: "var(--pg-orange)" }}>
                  Your Child?
                </em>
              </h2>
              <p className="pg-cta-sub">
                Seats are limited for the 2025–26 academic year. Fill out a
                quick enquiry and our admissions team will guide you through
                every step.
              </p>
              <div className="pg-cta-btns">
                <Link to="/admission" className="pg-btn-dk">
                  Apply for Admission →
                </Link>
                <Link to="/contact" className="pg-btn-ol">
                  Schedule a Visit
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
