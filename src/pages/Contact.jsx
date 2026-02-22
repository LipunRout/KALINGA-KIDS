import { useState, useEffect, useRef } from "react";
import { useForm } from "@formspree/react";

// ─────────────────────────────────────────────────────────────
//  KALINGA KIDS — Contact Page
//  Full design system: DM Serif + DM Sans, navy/orange palette
// ─────────────────────────────────────────────────────────────

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

const INFO_CARDS = [
  {
    icon: "📍",
    color: "#E8533A",
    bg: "rgba(232,83,58,0.08)",
    title: "Our Address",
    lines: ["Kanan Vihar Phase-II,", "Patia, Bhubaneswar – 751024"],
    action: { label: "Get Directions →", href: "https://maps.google.com/?q=Kanan+Vihar+Phase+II+Patia+Bhubaneswar" },
  },
  {
    icon: "📞",
    color: "#2B7AB8",
    bg: "rgba(43,122,184,0.08)",
    title: "Phone",
    lines: ["+91 70088 44395"],
    action: { label: "Call Now →", href: "tel:7008844395" },
  },
  {
    icon: "📧",
    color: "#2E8B57",
    bg: "rgba(46,139,87,0.08)",
    title: "Email",
    lines: ["Kalingakidss@gmail.com"],
    action: { label: "Send Email →", href: "mailto:Kalingakidss@gmail.com" },
  },
  {
    icon: "🕐",
    color: "#D4891A",
    bg: "rgba(212,137,26,0.08)",
    title: "School Hours",
    lines: ["Mon – Sat: 8:00 AM – 1:00 PM", "Sunday: Closed"],
    action: null,
  },
];

const TEAM = [
  { name: "Jyothsna Ma'am", role: "Admissions Coordinator", color: "#E8533A", initial: "JM", phone: "7008844395" },
  { name: "Sunita Ma'am",   role: "Director & Principal",   color: "#2E8B57", initial: "SM", phone: "7008844395" },
];

export default function Contact() {
  const [form, setForm]     = useState({ name:"", email:"", phone:"", message:"" });
  const [popup, setPopup]   = useState(false);
  const [state, formSubmit] = useForm("xwvnroyz");

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    await formSubmit(e);
    setPopup(true);
    setForm({ name:"", email:"", phone:"", message:"" });
  };

  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") setPopup(false); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const [heroRef,  heroVis]  = useReveal();
  const [cardsRef, cardsVis] = useReveal();
  const [mainRef,  mainVis]  = useReveal();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

        :root {
          --ct-navy  : #1A3A5C;
          --ct-orange: #E8533A;
          --ct-green : #2E8B57;
          --ct-sky   : #2B7AB8;
          --ct-yellow: #D4891A;
          --ct-red   : #C0392B;
          --ct-off   : #F8F7F4;
          --ct-border: #E8E6E0;
          --ct-body  : #5A5A6A;
          --ct-serif : 'DM Serif Display', Georgia, serif;
          --ct-sans  : 'DM Sans', system-ui, sans-serif;
          --ct-sh    : 0 2px 20px rgba(26,58,92,0.07);
          --ct-sh-lg : 0 12px 44px rgba(26,58,92,0.12);
        }

        .ct-page { font-family:var(--ct-sans); overflow-x:hidden; color:var(--ct-body); }

        /* ── REVEAL ─────────────────────────────────── */
        .ct-up {
          opacity:0; transform:translateY(26px);
          transition:opacity 0.65s cubic-bezier(0.16,1,0.3,1),
                     transform 0.65s cubic-bezier(0.16,1,0.3,1);
        }
        .ct-up.in { opacity:1; transform:translateY(0); }
        .ct-left {
          opacity:0; transform:translateX(-36px);
          transition:opacity 0.65s cubic-bezier(0.16,1,0.3,1),
                     transform 0.65s cubic-bezier(0.16,1,0.3,1);
        }
        .ct-left.in { opacity:1; transform:translateX(0); }
        .ct-right {
          opacity:0; transform:translateX(36px);
          transition:opacity 0.65s cubic-bezier(0.16,1,0.3,1),
                     transform 0.65s cubic-bezier(0.16,1,0.3,1);
        }
        .ct-right.in { opacity:1; transform:translateX(0); }
        .cd1{transition-delay:0.05s!important} .cd2{transition-delay:0.13s!important}
        .cd3{transition-delay:0.21s!important} .cd4{transition-delay:0.29s!important}

        .ct-wrap { max-width:1160px; margin:0 auto; padding:0 32px; }

        .ct-eyebrow {
          display:inline-flex; align-items:center; gap:8px;
          font-size:11px; font-weight:700; letter-spacing:2.5px;
          text-transform:uppercase; color:var(--ct-orange); margin-bottom:14px;
        }
        .ct-eyebrow::before {
          content:""; display:block; width:22px; height:2px;
          background:var(--ct-orange); border-radius:2px;
        }

        /* ════════════════════════════════════════════
           1. HERO
        ════════════════════════════════════════════ */
        .ct-hero {
          min-height:44vh; background:var(--ct-navy);
          display:flex; align-items:center;
          position:relative; overflow:hidden; padding:100px 0 60px;
        }
        .ct-hero::before {
          content:""; position:absolute; inset:0;
          background-image:radial-gradient(rgba(255,255,255,0.038) 1px,transparent 1px);
          background-size:30px 30px; pointer-events:none;
        }
        .ct-hero::after {
          content:""; position:absolute; top:0; left:0; width:5px; height:100%;
          background:linear-gradient(to bottom,var(--ct-red),var(--ct-orange),
            var(--ct-yellow),var(--ct-green),var(--ct-sky));
        }
        .ct-glow1 {
          position:absolute; top:-80px; right:-60px;
          width:340px; height:340px; border-radius:50%; pointer-events:none;
          background:radial-gradient(circle,rgba(232,83,58,0.16),transparent 65%);
        }
        .ct-glow2 {
          position:absolute; bottom:-50px; left:-40px;
          width:260px; height:260px; border-radius:50%; pointer-events:none;
          background:radial-gradient(circle,rgba(46,139,87,0.13),transparent 65%);
        }

        .ct-hero-inner {
          position:relative; z-index:1;
          display:grid; grid-template-columns:1.1fr 1fr;
          gap:64px; align-items:center;
        }

        .ct-hero-tag {
          display:inline-flex; align-items:center; gap:8px;
          background:rgba(255,255,255,0.09); border:1.5px solid rgba(255,255,255,0.14);
          border-radius:4px; padding:6px 14px;
          font-size:11.5px; font-weight:700; color:rgba(255,255,255,0.65);
          letter-spacing:1px; text-transform:uppercase; margin-bottom:22px;
        }
        .ct-blink { width:7px;height:7px;background:#45c57a;border-radius:50%;animation:ctBlink 1.5s ease infinite; }
        @keyframes ctBlink { 0%,100%{opacity:1}50%{opacity:0.2} }

        .ct-h1 {
          font-family:var(--ct-serif);
          font-size:clamp(36px,5vw,64px);
          font-weight:400; line-height:1.08;
          color:white; letter-spacing:-0.5px; margin:0;
        }
        .ct-divider {
          width:52px; height:3px; border-radius:2px;
          background:linear-gradient(90deg,var(--ct-red),var(--ct-orange),var(--ct-yellow));
          margin:22px 0;
        }
        .ct-hero-lead { font-size:16.5px; line-height:1.78; color:rgba(255,255,255,0.55); font-weight:300; max-width:440px; }

        .ct-hero-btns { display:flex; gap:12px; flex-wrap:wrap; margin-top:28px; }
        .ct-btn-og {
          display:inline-flex; align-items:center; gap:8px;
          background:var(--ct-orange); color:white;
          font-family:var(--ct-sans); font-weight:700; font-size:14.5px;
          padding:13px 26px; border-radius:7px; text-decoration:none;
          border:2px solid var(--ct-orange); transition:all 0.22s ease;
        }
        .ct-btn-og:hover { background:#d44027; border-color:#d44027; transform:translateY(-2px); box-shadow:0 10px 28px rgba(232,83,58,0.38); text-decoration:none; color:white; }
        .ct-btn-wh {
          display:inline-flex; align-items:center; gap:8px;
          background:transparent; color:white;
          font-family:var(--ct-sans); font-weight:600; font-size:14.5px;
          padding:13px 26px; border-radius:7px; text-decoration:none;
          border:2px solid rgba(255,255,255,0.28); transition:all 0.22s ease;
        }
        .ct-btn-wh:hover { border-color:white; background:rgba(255,255,255,0.08); transform:translateY(-2px); text-decoration:none; color:white; }

        /* hero right — quick contact tiles */
        .ct-hero-right { display:flex; flex-direction:column; gap:12px; }
        .ct-qc {
          background:rgba(255,255,255,0.07); border:1px solid rgba(255,255,255,0.1);
          border-radius:12px; padding:18px 20px;
          display:flex; align-items:center; gap:14px;
          text-decoration:none;
          transition:all 0.2s ease;
        }
        .ct-qc:hover { background:rgba(255,255,255,0.12); border-color:rgba(255,255,255,0.2); transform:translateX(4px); text-decoration:none; }
        .ct-qc-icon {
          width:42px; height:42px; border-radius:10px;
          display:flex; align-items:center; justify-content:center;
          font-size:18px; flex-shrink:0;
        }
        .ct-qc-label { font-size:10px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:rgba(255,255,255,0.4); margin-bottom:3px; }
        .ct-qc-value { font-size:14.5px; font-weight:600; color:white; }

        /* ════════════════════════════════════════════
           2. INFO CARDS
        ════════════════════════════════════════════ */
        .ct-cards-sec { padding:0; background:var(--ct-off); }

        .ct-cards-grid {
          display:grid; grid-template-columns:repeat(4,1fr); gap:0;
          transform:translateY(-44px);
        }

        .ct-info-card {
          background:white; padding:28px 24px;
          border-right:1px solid var(--ct-border);
          border-top:4px solid transparent;
          transition:all 0.22s ease; cursor:default;
          position:relative; overflow:hidden;
        }
        .ct-info-card:first-child { border-radius:14px 0 0 14px; }
        .ct-info-card:last-child  { border-radius:0 14px 14px 0; border-right:none; }
        .ct-info-card:hover { transform:translateY(-4px); box-shadow:var(--ct-sh-lg); z-index:1; }
        .ct-info-card:hover .ct-ic-icon-wrap { transform:scale(1.1) rotate(-5deg); }

        .ct-ic-icon-wrap {
          width:46px; height:46px; border-radius:12px;
          display:flex; align-items:center; justify-content:center;
          font-size:20px; margin-bottom:14px;
          transition:transform 0.22s ease;
        }
        .ct-ic-title { font-weight:700; font-size:12px; letter-spacing:1.5px; text-transform:uppercase; color:#bbb; margin-bottom:8px; }
        .ct-ic-lines { display:flex; flex-direction:column; gap:3px; }
        .ct-ic-line  { font-size:14px; color:var(--ct-navy); font-weight:500; line-height:1.45; }
        .ct-ic-action {
          display:inline-flex; align-items:center; gap:5px;
          font-size:12px; font-weight:700; text-decoration:none;
          margin-top:12px; transition:gap 0.18s ease;
        }
        .ct-ic-action:hover { gap:8px; text-decoration:none; }

        /* ════════════════════════════════════════════
           3. MAIN — FORM + MAP + TEAM
        ════════════════════════════════════════════ */
        .ct-main { padding:20px 0 80px; background:var(--ct-off); }

        .ct-main-grid {
          display:grid; grid-template-columns:1.1fr 1fr;
          gap:40px; align-items:start;
        }

        /* ── LEFT COL ────────────────────────────── */
        .ct-left-col { display:flex; flex-direction:column; gap:24px; }

        /* FORM CARD */
        .ct-form-card {
          background:white; border-radius:16px;
          border:1px solid var(--ct-border);
          box-shadow:var(--ct-sh); overflow:hidden;
        }

        .ct-form-head {
          background:var(--ct-navy); padding:22px 28px 20px;
          position:relative; overflow:hidden;
        }
        .ct-form-head::before {
          content:""; position:absolute; top:-40px; right:-40px;
          width:160px; height:160px; border-radius:50%;
          background:radial-gradient(circle,rgba(232,83,58,0.2),transparent 65%);
          pointer-events:none;
        }
        .ct-form-stripe {
          height:3px;
          background:linear-gradient(90deg,var(--ct-red),var(--ct-orange),var(--ct-yellow),var(--ct-green),var(--ct-sky));
          margin:-22px -28px 18px;
        }
        .ct-form-head-title {
          font-family:var(--ct-serif); font-size:22px; color:white;
          font-weight:400; margin:0 0 4px; position:relative; z-index:1;
        }
        .ct-form-head-title em { font-style:italic; color:#FFB347; }
        .ct-form-head-sub { font-size:13px; color:rgba(255,255,255,0.45); position:relative; z-index:1; }

        .ct-form-body { padding:24px 28px 28px; }

        /* field */
        .ct-field { display:flex; flex-direction:column; gap:5px; margin-bottom:12px; }
        .ct-field:last-of-type { margin-bottom:0; }
        .ct-lbl { font-size:10.5px; font-weight:700; letter-spacing:1px; text-transform:uppercase; color:#888; }

        .ct-inp, .ct-ta {
          width:100%; padding:12px 14px;
          border:1.5px solid var(--ct-border); border-radius:9px;
          font-family:var(--ct-sans); font-size:14.5px; color:#1C1C2E;
          background:var(--ct-off); outline:none; box-sizing:border-box;
          transition:border-color 0.2s, background 0.2s, box-shadow 0.2s;
          appearance:none;
        }
        .ct-inp::placeholder, .ct-ta::placeholder { color:#C0BDB6; }
        .ct-inp:focus, .ct-ta:focus {
          border-color:var(--ct-navy); background:white;
          box-shadow:0 0 0 3px rgba(26,58,92,0.09);
        }
        .ct-ta { resize:vertical; min-height:110px; }

        .ct-row { display:grid; grid-template-columns:1fr 1fr; gap:12px; }

        /* submit */
        .ct-submit {
          width:100%; padding:14px 24px; margin-top:16px;
          background:var(--ct-navy); color:white;
          border:2px solid var(--ct-navy); border-radius:9px;
          font-family:var(--ct-sans); font-weight:700; font-size:15px;
          cursor:pointer; display:flex; align-items:center; justify-content:center;
          gap:10px; position:relative; overflow:hidden; transition:all 0.22s ease;
        }
        .ct-submit::before {
          content:""; position:absolute; top:0; left:-100%; width:50%; height:100%;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent);
          transition:left 0.55s ease;
        }
        .ct-submit:hover:not(:disabled)::before { left:160%; }
        .ct-submit:hover:not(:disabled) { background:#0f2540; box-shadow:0 10px 28px rgba(26,58,92,0.3); transform:translateY(-2px); }
        .ct-submit:disabled { opacity:0.45; cursor:not-allowed; }
        .ct-submit-arrow { font-size:17px; transition:transform 0.2s; }
        .ct-submit:hover:not(:disabled) .ct-submit-arrow { transform:translateX(5px); }
        .ct-spin { width:16px;height:16px;border:2.5px solid rgba(255,255,255,0.3);border-top-color:#fff;border-radius:50%;animation:ctSpin 0.65s linear infinite;flex-shrink:0; }
        @keyframes ctSpin { to{transform:rotate(360deg)} }

        /* TEAM CARD */
        .ct-team-card {
          background:white; border-radius:16px;
          border:1px solid var(--ct-border); box-shadow:var(--ct-sh);
          padding:24px 28px;
        }
        .ct-team-label {
          font-size:10.5px; font-weight:700; letter-spacing:2px;
          text-transform:uppercase; color:#bbb; margin-bottom:16px;
          display:flex; align-items:center; gap:10px;
        }
        .ct-team-label::after { content:""; flex:1; height:1px; background:var(--ct-border); }
        .ct-team-list { display:flex; flex-direction:column; gap:12px; }
        .ct-team-item {
          display:flex; align-items:center; gap:14px;
          padding:14px 16px; border-radius:10px;
          border:1px solid var(--ct-border); background:var(--ct-off);
          transition:all 0.2s ease;
        }
        .ct-team-item:hover { transform:translateX(4px); box-shadow:var(--ct-sh); border-color:transparent; }
        .ct-team-avatar {
          width:46px; height:46px; border-radius:50%;
          display:flex; align-items:center; justify-content:center;
          font-family:var(--ct-serif); font-size:16px; color:white;
          flex-shrink:0; box-shadow:0 4px 14px rgba(0,0,0,0.15);
        }
        .ct-team-name { font-weight:700; font-size:14px; color:var(--ct-navy); margin-bottom:2px; }
        .ct-team-role { font-size:12px; color:#aaa; }
        .ct-team-call {
          margin-left:auto; display:flex; align-items:center; justify-content:center;
          width:36px; height:36px; border-radius:50%;
          background:rgba(46,139,87,0.1); color:var(--ct-green);
          font-size:16px; text-decoration:none; flex-shrink:0;
          transition:all 0.18s ease;
        }
        .ct-team-call:hover { background:var(--ct-green); color:white; transform:scale(1.1); text-decoration:none; }

        /* ── RIGHT COL ───────────────────────────── */
        .ct-right-col { display:flex; flex-direction:column; gap:24px; }

        /* MAP */
        .ct-map-card {
          background:white; border-radius:16px;
          border:1px solid var(--ct-border); box-shadow:var(--ct-sh);
          overflow:hidden;
        }
        .ct-map-head {
          padding:18px 24px 16px;
          border-bottom:1px solid var(--ct-border);
          display:flex; align-items:center; justify-content:space-between;
        }
        .ct-map-title {
          font-family:var(--ct-serif); font-size:20px;
          color:var(--ct-navy); font-weight:400; margin:0;
        }
        .ct-map-dir {
          display:inline-flex; align-items:center; gap:6px;
          font-size:12.5px; font-weight:700; color:var(--ct-sky);
          text-decoration:none; transition:gap 0.18s ease;
        }
        .ct-map-dir:hover { gap:9px; text-decoration:none; }

        .ct-map-frame {
          width:100%; height:280px; display:block;
          border:none; filter:saturate(0.85);
          transition:filter 0.3s ease;
        }
        .ct-map-card:hover .ct-map-frame { filter:saturate(1); }

        /* SOCIAL CARD */
        .ct-social-card {
          background:var(--ct-navy); border-radius:16px;
          padding:24px 28px; position:relative; overflow:hidden;
        }
        .ct-social-card::before {
          content:""; position:absolute; top:-40px; right:-40px;
          width:160px; height:160px; border-radius:50%;
          background:radial-gradient(circle,rgba(232,83,58,0.18),transparent 65%);
          pointer-events:none;
        }
        .ct-social-title {
          font-family:var(--ct-serif); font-size:20px; color:white;
          margin-bottom:6px; position:relative; z-index:1;
        }
        .ct-social-sub { font-size:13px; color:rgba(255,255,255,0.45); margin-bottom:18px; position:relative; z-index:1; }
        .ct-social-row { display:flex; gap:10px; flex-wrap:wrap; position:relative; z-index:1; }
        .ct-social-btn {
          display:inline-flex; align-items:center; gap:8px;
          padding:10px 18px; border-radius:8px;
          font-family:var(--ct-sans); font-weight:600; font-size:13.5px;
          text-decoration:none; border:1.5px solid rgba(255,255,255,0.15);
          background:rgba(255,255,255,0.07); color:white;
          transition:all 0.2s ease;
        }
        .ct-social-btn:hover { border-color:rgba(255,255,255,0.4); background:rgba(255,255,255,0.14); transform:translateY(-2px); text-decoration:none; color:white; }
        .ct-social-btn.ig:hover { background:linear-gradient(135deg,rgba(240,148,51,0.3),rgba(220,39,67,0.3),rgba(188,24,136,0.3)); border-color:rgba(220,39,67,0.5); }
        .ct-social-btn.wa:hover { background:rgba(37,211,102,0.2); border-color:rgba(37,211,102,0.5); }
        .ct-social-btn.em:hover { background:rgba(43,122,184,0.2); border-color:rgba(43,122,184,0.5); }

        /* ════════════════════════════════════════════
           SUCCESS POPUP
        ════════════════════════════════════════════ */
        .ct-ov {
          position:fixed; inset:0; background:rgba(8,16,26,0.82);
          backdrop-filter:blur(10px); -webkit-backdrop-filter:blur(10px);
          z-index:99999; display:flex; align-items:center; justify-content:center;
          padding:24px; animation:ctOvIn 0.25s ease both;
        }
        @keyframes ctOvIn { from{opacity:0} to{opacity:1} }

        .ct-pop {
          background:white; border-radius:20px;
          max-width:400px; width:100%; overflow:hidden;
          box-shadow:0 48px 100px rgba(0,0,0,0.4);
          animation:ctPopIn 0.5s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes ctPopIn { from{opacity:0;transform:scale(0.82) translateY(36px)} to{opacity:1;transform:scale(1) translateY(0)} }

        .ct-pop-top {
          background:#0f2336; padding:36px 32px 28px;
          text-align:center; position:relative; overflow:hidden;
        }
        .ct-pop-top::before { content:"";position:absolute;top:-50px;right:-50px;width:180px;height:180px;background:radial-gradient(circle,rgba(232,83,58,0.2),transparent 65%);border-radius:50%;pointer-events:none; }
        .ct-pop-stripe { height:4px; background:linear-gradient(90deg,#C0392B,#E8533A,#D4891A,#2E8B57,#2B7AB8); margin:-36px -32px 28px; }

        .ct-pop-tick { width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,#2E8B57,#45c57a);display:flex;align-items:center;justify-content:center;margin:0 auto 16px;box-shadow:0 0 0 12px rgba(46,139,87,0.14),0 14px 40px rgba(46,139,87,0.3);position:relative;z-index:1;animation:ctTickPop 0.55s cubic-bezier(0.16,1,0.3,1) 0.1s both; }
        @keyframes ctTickPop { from{transform:scale(0) rotate(-30deg);opacity:0} to{transform:scale(1) rotate(0);opacity:1} }
        .ct-pop-svg { width:30px;height:30px;stroke:#fff;stroke-width:2.8;fill:none;stroke-linecap:round;stroke-linejoin:round; }
        .ct-pop-path { stroke-dasharray:44;stroke-dashoffset:44;animation:ctDraw 0.45s ease 0.6s forwards; }
        @keyframes ctDraw { to{stroke-dashoffset:0} }

        .ct-pop-h { font-family:var(--ct-serif);font-size:26px;color:#fff;margin-bottom:8px;position:relative;z-index:1;animation:ctUp 0.45s ease 0.2s both; }
        .ct-pop-sub { font-size:14px;color:rgba(255,255,255,0.5);line-height:1.65;position:relative;z-index:1;animation:ctUp 0.45s ease 0.3s both; }
        @keyframes ctUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }

        .ct-pop-bot { padding:24px 28px 28px; }
        .ct-pop-info { background:var(--ct-off);border:1px solid var(--ct-border);border-radius:10px;padding:14px 16px;margin-bottom:20px;font-size:13.5px;color:var(--ct-body);line-height:1.65;animation:ctUp 0.4s ease 0.35s both; }
        .ct-pop-info strong { color:var(--ct-navy);font-weight:700; }
        .ct-pop-close { width:100%;padding:14px;background:var(--ct-navy);color:#fff;border:2px solid var(--ct-navy);border-radius:10px;font-family:var(--ct-sans);font-weight:700;font-size:15px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;transition:all 0.22s ease; }
        .ct-pop-close:hover { background:transparent;color:var(--ct-navy);transform:translateY(-1px); }

        /* ── RESPONSIVE ─────────────────────────────── */
        @media(max-width:960px){
          .ct-hero-inner { grid-template-columns:1fr; gap:40px; }
          .ct-hero-right { display:none; }
          .ct-cards-grid { grid-template-columns:1fr 1fr; }
          .ct-info-card  { border-right:none; border-bottom:1px solid var(--ct-border); }
          .ct-info-card:first-child{ border-radius:14px 14px 0 0; }
          .ct-info-card:last-child { border-radius:0 0 14px 14px; border-bottom:none; }
          .ct-main-grid  { grid-template-columns:1fr; }
        }
        @media(max-width:600px){
          .ct-wrap        { padding:0 18px; }
          .ct-hero        { padding:88px 0 50px; }
          .ct-cards-grid  { grid-template-columns:1fr; transform:translateY(-28px); }
          .ct-info-card   { border-radius:0 !important; }
          .ct-info-card:first-child { border-radius:14px 14px 0 0 !important; }
          .ct-info-card:last-child  { border-radius:0 0 14px 14px !important; }
          .ct-row         { grid-template-columns:1fr; }
          .ct-hero-btns   { flex-direction:column; }
          .ct-social-row  { flex-direction:column; }
        }
      `}</style>

      {/* ══════════ SUCCESS POPUP ══════════ */}
      {popup && (
        <div className="ct-ov" onClick={(e) => e.target === e.currentTarget && setPopup(false)}>
          <div className="ct-pop" role="dialog" aria-modal="true">
            <div className="ct-pop-top">
              <div className="ct-pop-stripe" />
              <div className="ct-pop-tick">
                <svg className="ct-pop-svg" viewBox="0 0 30 30">
                  <polyline className="ct-pop-path" points="5,15 12,22 25,8" />
                </svg>
              </div>
              <h2 className="ct-pop-h">Message Sent!</h2>
              <p className="ct-pop-sub">Thank you for reaching out. We'll get back to you within 24 hours.</p>
            </div>
            <div className="ct-pop-bot">
              <div className="ct-pop-info">
                For urgent queries, call us directly at <strong>+91 70088 44395</strong> or reach out to <strong>Jyothsna Ma'am</strong> or <strong>Sunita Ma'am</strong>.
              </div>
              <button className="ct-pop-close" onClick={() => setPopup(false)}>Done →</button>
            </div>
          </div>
        </div>
      )}

      <div className="ct-page">

        {/* ════════ 1. HERO ════════ */}
        <section className="ct-hero" ref={heroRef}>
          <div className="ct-glow1" /><div className="ct-glow2" />
          <div className="ct-wrap">
            <div className="ct-hero-inner">
              <div>
                <div className={`ct-up ${heroVis?"in":""}`}>
                  <div className="ct-hero-tag"><span className="ct-blink" /> We'd Love to Hear From You</div>
                </div>
                <h1 className={`ct-h1 ct-up cd1 ${heroVis?"in":""}`}>
                  Get in <em style={{fontStyle:"italic",color:"#FFB347"}}>Touch</em><br />With Us
                </h1>
                <div className={`ct-divider ct-up cd2 ${heroVis?"in":""}`} />
                <p className={`ct-hero-lead ct-up cd2 ${heroVis?"in":""}`}>
                  Have questions about admissions, programmes or a visit?
                  Our team at <strong style={{color:"white",fontWeight:700}}>Kalinga Kids</strong> is always happy to help — just reach out.
                </p>
                <div className={`ct-hero-btns ct-up cd3 ${heroVis?"in":""}`}>
                  <a href="tel:7008844395"                     className="ct-btn-og">📞 Call Now</a>
                  <a href="mailto:Kalingakidss@gmail.com"      className="ct-btn-wh">✉ Send Email</a>
                </div>
              </div>

              {/* quick contact tiles — desktop */}
              <div className={`ct-hero-right ct-right cd1 ${heroVis?"in":""}`}>
                {[
                  { icon:"📞", bg:"rgba(43,122,184,0.15)",  label:"Call Us",   value:"+91 70088 44395",        href:"tel:7008844395" },
                  { icon:"✉",  bg:"rgba(46,139,87,0.15)",   label:"Email",     value:"Kalingakidss@gmail.com", href:"mailto:Kalingakidss@gmail.com" },
                  { icon:"📍", bg:"rgba(232,83,58,0.15)",   label:"Address",   value:"Kanan Vihar Ph-II, Patia, BBSR", href:"https://maps.google.com/?q=Kanan+Vihar+Phase+II+Patia+Bhubaneswar" },
                  { icon:"🕐", bg:"rgba(212,137,26,0.15)",  label:"Open Mon–Sat", value:"8:00 AM – 1:00 PM",  href:null },
                ].map((q, i) => (
                  q.href
                    ? <a key={i} className="ct-qc" href={q.href} target={q.href.startsWith("http")?"_blank":undefined} rel="noopener noreferrer">
                        <div className="ct-qc-icon" style={{background:q.bg}}>{q.icon}</div>
                        <div><div className="ct-qc-label">{q.label}</div><div className="ct-qc-value">{q.value}</div></div>
                      </a>
                    : <div key={i} className="ct-qc">
                        <div className="ct-qc-icon" style={{background:q.bg}}>{q.icon}</div>
                        <div><div className="ct-qc-label">{q.label}</div><div className="ct-qc-value">{q.value}</div></div>
                      </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════ 2. INFO CARDS (overlap hero) ════════ */}
        <div style={{background:"var(--ct-off)", paddingBottom:0}} ref={cardsRef}>
          <div className="ct-wrap">
            <div className="ct-cards-grid" style={{boxShadow:"var(--ct-sh-lg)",borderRadius:14}}>
              {INFO_CARDS.map((c, i) => (
                <div
                  key={i}
                  className={`ct-info-card ct-up cd${i+1} ${cardsVis?"in":""}`}
                  style={{borderTopColor:c.color}}
                >
                  <div className="ct-ic-icon-wrap" style={{background:c.bg}}>{c.icon}</div>
                  <div className="ct-ic-title">{c.title}</div>
                  <div className="ct-ic-lines">
                    {c.lines.map((l, j) => <div key={j} className="ct-ic-line">{l}</div>)}
                  </div>
                  {c.action && (
                    <a href={c.action.href} target={c.action.href.startsWith("http")?"_blank":undefined}
                      rel="noopener noreferrer"
                      className="ct-ic-action" style={{color:c.color}}
                    >
                      {c.action.label}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ════════ 3. MAIN ════════ */}
        <section className="ct-main" ref={mainRef}>
          <div className="ct-wrap">
            <div className="ct-main-grid">

              {/* LEFT — form + team */}
              <div className={`ct-left-col ct-left ${mainVis?"in":""}`}>

                {/* form */}
                <div className="ct-form-card">
                  <div className="ct-form-head">
                    <div className="ct-form-stripe" />
                    <h3 className="ct-form-head-title">Send Us a <em>Message</em></h3>
                    <p className="ct-form-head-sub">We reply within 24 hours — usually much sooner.</p>
                  </div>
                  <div className="ct-form-body">
                    <form onSubmit={handleSubmit}>
                      <div className="ct-row">
                        <div className="ct-field">
                          <label className="ct-lbl">Your Name</label>
                          <input className="ct-inp" type="text" name="name" placeholder="Full name" value={form.name} onChange={set("name")} required />
                        </div>
                        <div className="ct-field">
                          <label className="ct-lbl">Phone Number</label>
                          <input className="ct-inp" type="tel" name="phone" placeholder="+91 00000 00000" value={form.phone} onChange={set("phone")} />
                        </div>
                      </div>
                      <div className="ct-field" style={{marginBottom:12}}>
                        <label className="ct-lbl">Email Address</label>
                        <input className="ct-inp" type="email" name="email" placeholder="your@email.com" value={form.email} onChange={set("email")} required />
                      </div>
                      <div className="ct-field">
                        <label className="ct-lbl">Your Message</label>
                        <textarea className="ct-ta" name="message" placeholder="Tell us how we can help…" value={form.message} onChange={set("message")} required />
                      </div>
                      <button type="submit" className="ct-submit" disabled={state.submitting}>
                        {state.submitting
                          ? <><div className="ct-spin" /> Sending...</>
                          : <>Send Message <span className="ct-submit-arrow">→</span></>
                        }
                      </button>
                    </form>
                  </div>
                </div>

                {/* team */}
                <div className="ct-team-card">
                  <div className="ct-team-label">Speak Directly With</div>
                  <div className="ct-team-list">
                    {TEAM.map((t, i) => (
                      <div className="ct-team-item" key={i}>
                        <div className="ct-team-avatar" style={{background:t.color}}>{t.initial}</div>
                        <div>
                          <div className="ct-team-name">{t.name}</div>
                          <div className="ct-team-role">{t.role}</div>
                        </div>
                        <a href={`tel:${t.phone}`} className="ct-team-call" title={`Call ${t.name}`}>📞</a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT — map + social */}
              <div className={`ct-right-col ct-right cd1 ${mainVis?"in":""}`}>

                {/* Google Maps embed */}
                <div className="ct-map-card">
                  <div className="ct-map-head">
                    <h3 className="ct-map-title">Find Us</h3>
                    <a
                      href="https://maps.google.com/?q=Kanan+Vihar+Phase+II+Patia+Bhubaneswar"
                      target="_blank" rel="noopener noreferrer"
                      className="ct-map-dir"
                    >Get Directions →</a>
                  </div>
                  <iframe
                    className="ct-map-frame"
                    title="Kalinga Kids Location"
                    src="https://maps.google.com/maps?q=Kanan+Vihar+Phase+II,+Patia,+Bhubaneswar,+Odisha+751024&output=embed&z=15"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>

                {/* Social / reach us */}
                <div className="ct-social-card">
                  <h3 className="ct-social-title">Connect With Us</h3>
                  <p className="ct-social-sub">Follow our daily moments or reach out directly on social.</p>
                  <div className="ct-social-row">
                    <a href="https://www.instagram.com/kalingakidss/" target="_blank" rel="noopener noreferrer" className="ct-social-btn ig">
                      📸 Instagram
                    </a>
                    <a href="https://wa.me/917008844395" target="_blank" rel="noopener noreferrer" className="ct-social-btn wa">
                      💬 WhatsApp
                    </a>
                    <a href="mailto:Kalingakidss@gmail.com" className="ct-social-btn em">
                      ✉ Email Us
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}