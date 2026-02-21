import { useEffect, useRef, useState } from "react";
import AdmissionForm from "../components/AdmissionForm";

// ─────────────────────────────────────────────────────────────
//  KALINGA KIDS — Admission Page
//  Full page: Hero band → Why Join → Steps → Form + Info Panel
//  Design: Same system as Home.jsx — navy, orange, DM Serif
// ─────────────────────────────────────────────────────────────

/* scroll-reveal hook */
function useReveal() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, vis];
}

const STEPS = [
  { n:"01", color:"#E8533A", title:"Fill the Enquiry Form",  desc:"Submit your details through our online form or visit us in person." },
  { n:"02", color:"#2B7AB8", title:"Receive a Callback",     desc:"Our admissions coordinator will call within 24 hours to answer your questions." },
  { n:"03", color:"#2E8B57", title:"Schedule a Visit",       desc:"Tour the campus, meet our educators and see the classrooms firsthand." },
  { n:"04", color:"#D4891A", title:"Complete Enrolment",     desc:"Submit documents, pay the fee and secure your child's place." },
];

const REASONS = [
  { icon:"🎯", color:"#E8533A", bg:"rgba(232,83,58,0.08)",  title:"Activity-Based Learning",  desc:"Every lesson is hands-on, experiential and built around curiosity." },
  { icon:"🔒", color:"#2B7AB8", bg:"rgba(43,122,184,0.08)", title:"Safe & Monitored Campus",  desc:"CCTV, trained staff and strict entry protocols at all times." },
  { icon:"🌱", color:"#2E8B57", bg:"rgba(46,139,87,0.08)",  title:"Holistic Development",     desc:"Cognitive, physical, social and emotional growth in equal measure." },
  { icon:"👩‍🏫", color:"#D4891A", bg:"rgba(212,137,26,0.08)", title:"Expert Educators",        desc:"Qualified, passionate teachers who genuinely love early learning." },
  { icon:"🚌", color:"#9B59B6", bg:"rgba(155,89,182,0.08)", title:"GPS Transport",            desc:"Safe, trackable bus service with live parent notifications." },
  { icon:"📱", color:"#C0392B", bg:"rgba(192,57,43,0.08)",  title:"Daily Parent Updates",     desc:"Photos, progress reports and announcements via our parent app." },
];

const PROGRAMS = [
  { name:"Play Group", age:"2–3 Years", color:"#E8533A", emoji:"🎨" },
  { name:"Nursery",    age:"3–4 Years", color:"#2B7AB8", emoji:"📖" },
  { name:"LKG",        age:"4–5 Years", color:"#2E8B57", emoji:"✏️"  },
  { name:"UKG",        age:"5–6 Years", color:"#D4891A", emoji:"🎓"  },
];

export default function Admission() {
  const [heroRef,   heroVis]   = useReveal();
  const [whyRef,    whyVis]    = useReveal();
  const [stepsRef,  stepsVis]  = useReveal();
  const [formRef,   formVis]   = useReveal();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

        :root {
          --ad-navy  : #1A3A5C;
          --ad-orange: #E8533A;
          --ad-green : #2E8B57;
          --ad-sky   : #2B7AB8;
          --ad-yellow: #D4891A;
          --ad-red   : #C0392B;
          --ad-off   : #F8F7F4;
          --ad-border: #E8E6E0;
          --ad-body  : #5A5A6A;
          --ad-serif : 'DM Serif Display', Georgia, serif;
          --ad-sans  : 'DM Sans', system-ui, sans-serif;
          --ad-sh    : 0 2px 20px rgba(26,58,92,0.07);
          --ad-sh-lg : 0 12px 44px rgba(26,58,92,0.11);
        }

        .ad-page { font-family: var(--ad-sans); overflow-x: hidden; }

        /* ── REVEAL ANIMATIONS ───────────────────────── */
        .ad-up {
          opacity: 0; transform: translateY(28px);
          transition: opacity 0.65s cubic-bezier(0.16,1,0.3,1),
                      transform 0.65s cubic-bezier(0.16,1,0.3,1);
        }
        .ad-up.in { opacity:1; transform:translateY(0); }
        .ad-left {
          opacity:0; transform:translateX(-36px);
          transition: opacity 0.65s cubic-bezier(0.16,1,0.3,1),
                      transform 0.65s cubic-bezier(0.16,1,0.3,1);
        }
        .ad-left.in { opacity:1; transform:translateX(0); }
        .ad-right {
          opacity:0; transform:translateX(36px);
          transition: opacity 0.65s cubic-bezier(0.16,1,0.3,1),
                      transform 0.65s cubic-bezier(0.16,1,0.3,1);
        }
        .ad-right.in { opacity:1; transform:translateX(0); }

        .d1{transition-delay:0.05s!important}
        .d2{transition-delay:0.13s!important}
        .d3{transition-delay:0.21s!important}
        .d4{transition-delay:0.29s!important}
        .d5{transition-delay:0.37s!important}
        .d6{transition-delay:0.45s!important}

        /* ── SHARED ──────────────────────────────────── */
        .ad-wrap { max-width:1160px; margin:0 auto; padding:0 32px; }

        .ad-eyebrow {
          display:inline-flex; align-items:center; gap:8px;
          font-size:11px; font-weight:700; letter-spacing:2.5px;
          text-transform:uppercase; color:var(--ad-orange);
          margin-bottom:14px;
        }
        .ad-eyebrow::before {
          content:""; display:block; width:22px; height:2px;
          background:var(--ad-orange); border-radius:2px;
        }

        .ad-h1 {
          font-family:var(--ad-serif);
          font-size:clamp(38px,5.5vw,68px);
          font-weight:400; line-height:1.08;
          color:var(--ad-navy); letter-spacing:-0.5px; margin:0;
        }
        .ad-h2 {
          font-family:var(--ad-serif);
          font-size:clamp(28px,3.8vw,46px);
          font-weight:400; line-height:1.12;
          color:var(--ad-navy); letter-spacing:-0.3px; margin:0;
        }

        /* ════════════════════════════════════════════
           1. HERO
        ════════════════════════════════════════════ */
        .ad-hero {
          min-height: 56vh;
          background: var(--ad-off);
          display: flex; align-items: center;
          position: relative; overflow: hidden;
          padding: 110px 0 72px;
        }

        /* dot-grid texture */
        .ad-hero::before {
          content:""; position:absolute; inset:0;
          background-image: radial-gradient(rgba(26,58,92,0.065) 1px, transparent 1px);
          background-size: 30px 30px; pointer-events:none;
        }
        /* vertical logo-color bar */
        .ad-hero::after {
          content:""; position:absolute; top:0; left:0;
          width:5px; height:100%;
          background:linear-gradient(to bottom,
            var(--ad-red),var(--ad-orange),var(--ad-yellow),
            var(--ad-green),var(--ad-sky));
        }

        .ad-hero-inner {
          position:relative; z-index:1;
          display:grid; grid-template-columns:1fr 1fr;
          gap:64px; align-items:center;
        }

        /* blinking dot tag */
        .ad-hero-tag {
          display:inline-flex; align-items:center; gap:8px;
          background:white; border:1.5px solid var(--ad-border);
          border-radius:4px; padding:6px 14px;
          font-size:11.5px; font-weight:700; color:var(--ad-green);
          letter-spacing:1px; text-transform:uppercase;
          margin-bottom:24px; box-shadow:var(--ad-sh);
        }
        .ad-blink {
          width:7px; height:7px; background:var(--ad-green);
          border-radius:50%;
          animation: adBlink 1.5s ease infinite;
        }
        @keyframes adBlink { 0%,100%{opacity:1}50%{opacity:0.2} }

        .ad-hero-divider {
          width:52px; height:3px; border-radius:2px;
          background:linear-gradient(90deg,var(--ad-red),var(--ad-orange),var(--ad-yellow));
          margin:22px 0;
        }

        .ad-hero-lead {
          font-size:17px; line-height:1.78; color:var(--ad-body);
          font-weight:300; max-width:460px;
        }

        .ad-hero-cta {
          display:flex; gap:14px; flex-wrap:wrap; margin-top:30px;
        }

        /* programme badges in hero */
        .ad-hero-progs {
          display:flex; flex-wrap:wrap; gap:10px; margin-top:32px;
          padding-top:32px; border-top:1px solid var(--ad-border);
        }
        .ad-hero-prog {
          display:flex; align-items:center; gap:8px;
          background:white; border:1.5px solid var(--ad-border);
          border-radius:8px; padding:8px 14px;
          box-shadow:var(--ad-sh); transition:all 0.2s ease;
        }
        .ad-hero-prog:hover {
          transform:translateY(-2px); box-shadow:var(--ad-sh-lg);
        }
        .ad-hero-prog-emoji { font-size:18px; }
        .ad-hero-prog-name { font-weight:700; font-size:13px; color:var(--ad-navy); }
        .ad-hero-prog-age  { font-size:11px; color:#bbb; margin-left:2px; }

        /* right side — stat cards grid */
        .ad-hero-right {
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:14px;
        }
        .ad-stat-card {
          background:white; border-radius:14px;
          padding:24px 20px; border:1px solid var(--ad-border);
          box-shadow:var(--ad-sh);
          transition:transform 0.25s ease, box-shadow 0.25s ease;
          position:relative; overflow:hidden;
        }
        .ad-stat-card::before {
          content:""; position:absolute;
          top:0; left:0; width:4px; height:100%;
          border-radius:14px 0 0 14px;
        }
        .ad-stat-card:hover { transform:translateY(-4px); box-shadow:var(--ad-sh-lg); }
        .ad-stat-num {
          font-family:var(--ad-serif); font-size:42px;
          color:var(--ad-navy); line-height:1;
        }
        .ad-stat-lbl {
          font-size:12px; color:#aaa; margin-top:6px;
          text-transform:uppercase; letter-spacing:0.5px; font-weight:600;
        }
        .ad-stat-card.big { grid-column:span 2; display:flex; align-items:center; gap:20px; }
        .ad-stat-card.big .ad-stat-num { font-size:52px; }

        /* ════════════════════════════════════════════
           2. WHY KALINGA KIDS
        ════════════════════════════════════════════ */
        .ad-why { padding:72px 0; background:white; }

        .ad-why-head { text-align:center; margin-bottom:48px; }

        .ad-why-grid {
          display:grid; grid-template-columns:repeat(3,1fr); gap:16px;
        }

        .ad-why-card {
          border-radius:12px; padding:26px 22px;
          border:1px solid var(--ad-border);
          transition:transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
          position:relative; overflow:hidden; cursor:default;
        }
        .ad-why-card::before {
          content:""; position:absolute;
          top:0; left:0; width:4px; height:0;
          transition:height 0.3s ease; border-radius:0 0 4px 0;
        }
        .ad-why-card:hover { transform:translateY(-5px); box-shadow:var(--ad-sh-lg); border-color:transparent; }
        .ad-why-card:hover::before { height:100%; }

        .ad-why-icon {
          font-size:30px; margin-bottom:14px; display:block;
          transition:transform 0.25s ease;
        }
        .ad-why-card:hover .ad-why-icon { transform:scale(1.18) rotate(-7deg); }
        .ad-why-title { font-weight:700; font-size:15px; color:var(--ad-navy); margin-bottom:7px; }
        .ad-why-desc  { font-size:13.5px; color:#999; line-height:1.65; }

        /* ════════════════════════════════════════════
           3. HOW IT WORKS (STEPS)
        ════════════════════════════════════════════ */
        .ad-steps-sec {
          padding:72px 0;
          background:var(--ad-navy);
          position:relative; overflow:hidden;
        }
        /* subtle radial glows */
        .ad-steps-sec::before {
          content:""; position:absolute;
          top:-80px; left:-80px; width:360px; height:360px;
          background:radial-gradient(circle,rgba(232,83,58,0.14),transparent 65%);
          border-radius:50%; pointer-events:none;
        }
        .ad-steps-sec::after {
          content:""; position:absolute;
          bottom:-60px; right:-60px; width:300px; height:300px;
          background:radial-gradient(circle,rgba(46,139,87,0.11),transparent 65%);
          border-radius:50%; pointer-events:none;
        }

        .ad-steps-head { text-align:center; margin-bottom:52px; }
        .ad-steps-head .ad-eyebrow { color:rgba(255,255,255,0.5); }
        .ad-steps-head .ad-eyebrow::before { background:rgba(255,255,255,0.4); }
        .ad-steps-head .ad-h2 { color:white; }

        .ad-steps-grid {
          display:grid; grid-template-columns:repeat(4,1fr);
          gap:20px; position:relative; z-index:1;
        }

        /* connector line between steps */
        .ad-steps-grid::before {
          content:""; position:absolute;
          top:36px; left:calc(12.5% + 10px); right:calc(12.5% + 10px);
          height:2px;
          background:linear-gradient(90deg,
            var(--ad-orange), var(--ad-sky), var(--ad-green), var(--ad-yellow));
          z-index:0;
        }

        .ad-step {
          background:rgba(255,255,255,0.05);
          border:1px solid rgba(255,255,255,0.09);
          border-radius:14px; padding:28px 20px 24px;
          text-align:center; position:relative; z-index:1;
          transition:background 0.22s ease, transform 0.22s ease, border-color 0.22s ease;
          cursor:default;
        }
        .ad-step:hover {
          background:rgba(255,255,255,0.09);
          border-color:rgba(255,255,255,0.18);
          transform:translateY(-5px);
        }

        .ad-step-circle {
          width:52px; height:52px;
          border-radius:50%;
          display:flex; align-items:center; justify-content:center;
          margin:0 auto 18px;
          font-family:var(--ad-serif);
          font-size:20px; color:white;
          position:relative; z-index:1;
          box-shadow:0 6px 20px rgba(0,0,0,0.25);
          transition:transform 0.25s ease, box-shadow 0.25s ease;
        }
        .ad-step:hover .ad-step-circle {
          transform:scale(1.1);
          box-shadow:0 10px 28px rgba(0,0,0,0.3);
        }

        .ad-step-title { font-weight:700; font-size:14.5px; color:white; margin-bottom:8px; }
        .ad-step-desc  { font-size:13px; color:rgba(255,255,255,0.5); line-height:1.65; }

        /* ════════════════════════════════════════════
           4. FORM + INFO PANEL
        ════════════════════════════════════════════ */
        .ad-main {
          padding:22px 0 80px;
          background:var(--ad-off);
          position:relative; overflow:hidden;
        }
        .ad-main::before {
          content:""; position:absolute; inset:0;
          background-image:radial-gradient(rgba(26,58,92,0.05) 1px,transparent 1px);
          background-size:30px 30px; pointer-events:none;
        }

        .ad-main-grid {
          display:grid; grid-template-columns:1fr 1.05fr;
          gap:52px; align-items:start;
          position:relative; z-index:1;
        }

        /* ── INFO PANEL (left) ───────────────────── */
        .ad-info { position:sticky; top:96px; }

        .ad-info-title {
          font-family:var(--ad-serif); font-size:32px;
          font-weight:400; color:var(--ad-navy);
          line-height:1.18; margin-bottom:10px;
        }
        .ad-info-title em { font-style:italic; color:var(--ad-orange); }

        .ad-info-sub {
          font-size:14.5px; line-height:1.75;
          color:var(--ad-body); margin-bottom:28px; font-weight:300;
        }

        /* info bullets */
        .ad-info-items { display:flex; flex-direction:column; gap:0; }

        .ad-info-item {
          display:flex; gap:14px; align-items:flex-start;
          padding:16px 0;
          border-bottom:1px solid var(--ad-border);
          transition:all 0.2s ease;
          cursor:default;
        }
        .ad-info-item:last-child { border-bottom:none; }
        .ad-info-item:hover .ad-info-icon-wrap { transform:scale(1.1) rotate(-4deg); }

        .ad-info-icon-wrap {
          width:42px; height:42px; border-radius:10px;
          display:flex; align-items:center; justify-content:center;
          font-size:18px; flex-shrink:0;
          transition:transform 0.2s ease;
        }
        .ad-info-text-title { font-weight:700; font-size:14px; color:var(--ad-navy); margin-bottom:3px; }
        .ad-info-text-desc  { font-size:13px; color:#aaa; line-height:1.55; }

        /* programme pills */
        .ad-prog-pills {
          display:flex; flex-wrap:wrap; gap:8px;
          margin-top:24px;
        }
        .ad-prog-pill {
          display:flex; align-items:center; gap:7px;
          background:white; border:1.5px solid var(--ad-border);
          border-radius:50px; padding:7px 14px;
          box-shadow:var(--ad-sh);
          transition:all 0.2s ease;
          cursor:default;
        }
        .ad-prog-pill:hover { transform:translateY(-2px); box-shadow:var(--ad-sh-lg); }
        .ad-prog-pill-dot { width:8px; height:8px; border-radius:50%; flex-shrink:0; }
        .ad-prog-pill-name { font-weight:700; font-size:12.5px; color:var(--ad-navy); }
        .ad-prog-pill-age  { font-size:11px; color:#bbb; }

        /* contact strip under info */
        .ad-contact-strip {
          display:flex; gap:10px; flex-wrap:wrap;
          margin-top:24px; padding-top:24px;
          border-top:1px solid var(--ad-border);
        }
        .ad-contact-chip {
          display:flex; align-items:center; gap:8px;
          background:white; border:1.5px solid var(--ad-border);
          border-radius:8px; padding:10px 14px;
          font-size:13px; font-weight:600; color:var(--ad-navy);
          box-shadow:var(--ad-sh); text-decoration:none;
          transition:all 0.2s ease;
        }
        .ad-contact-chip:hover {
          border-color:var(--ad-orange); color:var(--ad-orange);
          transform:translateY(-2px); text-decoration:none;
        }
        .ad-contact-chip-icon { font-size:16px; }

        /* ── BUTTONS ─────────────────────────────── */
        .ad-btn-dk {
          display:inline-flex; align-items:center; gap:8px;
          background:var(--ad-navy); color:white;
          font-family:var(--ad-sans); font-weight:600; font-size:14.5px;
          padding:13px 26px; border-radius:6px; text-decoration:none;
          border:2px solid var(--ad-navy); letter-spacing:0.2px;
          transition:all 0.22s ease;
        }
        .ad-btn-dk:hover {
          background:transparent; color:var(--ad-navy);
          transform:translateY(-2px); text-decoration:none;
          box-shadow:0 8px 24px rgba(26,58,92,0.15);
        }
        .ad-btn-ol {
          display:inline-flex; align-items:center; gap:8px;
          background:transparent; color:var(--ad-navy);
          font-family:var(--ad-sans); font-weight:600; font-size:14.5px;
          padding:13px 26px; border-radius:6px; text-decoration:none;
          border:2px solid rgba(26,58,92,0.25); letter-spacing:0.2px;
          transition:all 0.22s ease;
        }
        .ad-btn-ol:hover {
          border-color:var(--ad-navy); transform:translateY(-2px);
          text-decoration:none;
        }

        /* ── RESPONSIVE ──────────────────────────── */
        @media(max-width:1024px){
          .ad-steps-grid { grid-template-columns:1fr 1fr; }
          .ad-steps-grid::before { display:none; }
        }
        @media(max-width:900px){
          .ad-hero-inner  { grid-template-columns:1fr; gap:44px; }
          .ad-hero-right  { display:none; }
          .ad-why-grid    { grid-template-columns:1fr 1fr; }
          .ad-main-grid   { grid-template-columns:1fr; }
          .ad-info        { position:static; }
        }
        @media(max-width:600px){
          .ad-wrap          { padding:0 18px; }
          .ad-why-grid      { grid-template-columns:1fr; }
          .ad-steps-grid    { grid-template-columns:1fr; }
          .ad-hero-cta      { flex-direction:column; }
          .ad-hero          { padding:90px 0 56px; }
          .ad-hero-right    { display:none; }
        }
      `}</style>

      <div className="ad-page">

        {/* ════════ 1. HERO ════════ */}
        <section className="ad-hero" ref={heroRef}>
          <div className="ad-wrap">
            <div className="ad-hero-inner">

              <div>
                <div className={`ad-up ${heroVis?"in":""}`}>
                  <div className="ad-hero-tag">
                    <span className="ad-blink" /> Admissions Open — 2025–26
                  </div>
                </div>

                <h1 className={`ad-h1 ad-up d1 ${heroVis?"in":""}`}>
                  Secure Your<br/>
                  <em style={{fontStyle:"italic",color:"var(--ad-orange)"}}>Child's Future</em><br/>
                  Today
                </h1>

                <div className={`ad-hero-divider ad-up d2 ${heroVis?"in":""}`} />

                <p className={`ad-hero-lead ad-up d2 ${heroVis?"in":""}`}>
                  Join <strong style={{color:"var(--ad-navy)",fontWeight:700}}>Kalinga Kids Play School</strong> — Bhubaneswar's most trusted early learning institution since 2014. Limited seats available for this academic year.
                </p>

                <div className={`ad-hero-cta ad-up d3 ${heroVis?"in":""}`}>
                  <a href="#enquiry" className="ad-btn-dk">Apply Now →</a>
                  <a href="tel:7008844395" className="ad-btn-ol">📞 Call Us</a>
                </div>

                {/* <div className={`ad-hero-progs ad-up d4 ${heroVis?"in":""}`}>
                  {PROGRAMS.map((p) => (
                    <div className="ad-hero-prog" key={p.name}>
                      <span className="ad-hero-prog-emoji">{p.emoji}</span>
                      <span className="ad-hero-prog-name">{p.name}</span>
                      <span className="ad-hero-prog-age">· {p.age}</span>
                    </div>
                  ))}
                </div> */}
              </div>

              {/* right — stat cards */}
              <div className={`ad-hero-right ad-right ${heroVis?"in":""}`}>
                {[
                  { n:"5000+", l:"Students Enrolled",     c:"#E8533A", big:false },
                  { n:"10+",  l:"Years of Excellence",   c:"#2E8B57", big:false },
                  { n:"98%",  l:"Parent Satisfaction",   c:"#2B7AB8", big:false },
                  { n:"4.9★", l:"Google Rating",         c:"#D4891A", big:false },
                ].map((s,i) => (
                  <div className="ad-stat-card" key={i}
                    style={{"--_c":s.c}}
                  >
                    <style>{`.ad-stat-card:nth-child(${i+1})::before{background:${s.c}}`}</style>
                    <div className="ad-stat-num" style={{color:s.c}}>{s.n}</div>
                    <div className="ad-stat-lbl">{s.l}</div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* ════════ 2. WHY JOIN ════════ */}
        {/* <section className="ad-why" ref={whyRef}>
          <div className="ad-wrap">
            <div className={`ad-why-head ad-up ${whyVis?"in":""}`}>
              <div className="ad-eyebrow" style={{justifyContent:"center"}}>Why Choose Us</div>
              <h2 className="ad-h2">
                Everything Your Child<br/>
                <em style={{fontStyle:"italic",color:"var(--ad-green)"}}>Needs to Thrive</em>
              </h2>
            </div>

            <div className="ad-why-grid">
              {REASONS.map((r,i) => (
                <div
                  key={i}
                  className={`ad-why-card ad-up d${(i%3)+1} ${whyVis?"in":""}`}
                  style={{background:r.bg}}
                >
                  <style>{`.ad-why-card:nth-child(${i+1})::before{background:${r.color}}`}</style>
                  <span className="ad-why-icon">{r.icon}</span>
                  <div className="ad-why-title">{r.title}</div>
                  <p className="ad-why-desc">{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* ════════ 3. HOW IT WORKS ════════ */}
        {/* <section className="ad-steps-sec" ref={stepsRef}>
          <div className="ad-wrap">
            <div className={`ad-steps-head ad-up ${stepsVis?"in":""}`}>
              <div className="ad-eyebrow" style={{justifyContent:"center",color:"rgba(255,255,255,0.45)"}}>
                <span style={{background:"rgba(255,255,255,0.35)",display:"block",width:18,height:2,borderRadius:2}}/>
                Simple Process
              </div>
              <h2 className="ad-h2" style={{color:"white"}}>
                How Admission<br/>
                <em style={{fontStyle:"italic",color:"#FFB347"}}>Works</em>
              </h2>
            </div>

            <div className="ad-steps-grid">
              {STEPS.map((s,i) => (
                <div
                  key={i}
                  className={`ad-step ad-up d${i+1} ${stepsVis?"in":""}`}
                >
                  <div className="ad-step-circle" style={{background:s.color}}>
                    {s.n}
                  </div>
                  <div className="ad-step-title">{s.title}</div>
                  <p className="ad-step-desc">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* ════════ 4. FORM + INFO ════════ */}
        <section className="ad-main" id="enquiry" ref={formRef}>
          <div className="ad-wrap">
            <div className="ad-main-grid">

              {/* LEFT — info panel */}
              <div className={`ad-info ad-left ${formVis?"in":""}`}>
                <div className="ad-eyebrow">Enrol Today</div>
                <h2 className="ad-info-title">
                  Begin With a<br/>
                  <em>Simple Enquiry</em>
                </h2>
                <p className="ad-info-sub">
                  Fill the form and our admissions team will reach out within 24 hours to guide you through every step.
                </p>

                {/* <div className="ad-info-items">
                  {[
                    { icon:"⚡", bg:"rgba(212,137,26,0.1)", color:"#D4891A", title:"Quick Response",       desc:"We call back within 24 hours of receiving your enquiry." },
                    { icon:"🏫", bg:"rgba(43,122,184,0.1)", color:"#2B7AB8", title:"Free Campus Visit",    desc:"Schedule a guided tour — no commitment required." },
                    { icon:"📋", bg:"rgba(46,139,87,0.1)",  color:"#2E8B57", title:"Simple Documents",     desc:"Minimal paperwork. We guide you through what's needed." },
                    { icon:"💳", bg:"rgba(232,83,58,0.1)",  color:"#E8533A", title:"Flexible Fee Plans",   desc:"Affordable fee structure with installment options." },
                  ].map((item,i) => (
                    <div className="ad-info-item" key={i}>
                      <div className="ad-info-icon-wrap" style={{background:item.bg}}>
                        <span style={{fontSize:18}}>{item.icon}</span>
                      </div>
                      <div>
                        <div className="ad-info-text-title" style={{color:item.color}}>{item.title}</div>
                        <div className="ad-info-text-desc">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div> */}

                {/* programmes */}
                {/* <div style={{marginTop:24}}>
                  <div style={{fontSize:11,fontWeight:700,letterSpacing:"1.5px",textTransform:"uppercase",color:"#bbb",marginBottom:12}}>
                    Available Programmes
                  </div>
                  <div className="ad-prog-pills">
                    {PROGRAMS.map((p) => (
                      <div className="ad-prog-pill" key={p.name}>
                        <span className="ad-prog-pill-dot" style={{background:p.color}} />
                        <span className="ad-prog-pill-name">{p.name}</span>
                        <span className="ad-prog-pill-age">{p.age}</span>
                      </div>
                    ))}
                  </div>
                </div> */}

                {/* contact chips */}
                <div className="ad-contact-strip">
                  <a href="tel:7008844395" className="ad-contact-chip">
                    <span className="ad-contact-chip-icon">📞</span>
                    +91 70088 44395
                  </a>
                  <a href="mailto:Kalingakidss@gmail.com" className="ad-contact-chip">
                    <span className="ad-contact-chip-icon">📧</span>
                    Email Us
                  </a>
                </div>
              </div>

              {/* RIGHT — form */}
              <div className={`ad-right ${formVis?"in":""} d1`}>
                <AdmissionForm />
              </div>

            </div>
          </div>
        </section>

      </div>
    </>
  );
}