import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// ─────────────────────────────────────────────────────────────
//  KALINGA KIDS — About Page
//  Design: Refined editorial with scroll-triggered reveals
//  Palette: Navy · Orange · Green · Sky · Yellow · Red
//  Fonts: DM Serif Display + DM Sans (matches Home.jsx)
// ─────────────────────────────────────────────────────────────

// ── Scroll-reveal hook ────────────────────────────────────────
function useReveal(options = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

// ── CountUp ───────────────────────────────────────────────────
function CountUp({ target, suffix = "", duration = 1800 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let s = 0;
          const step = target / (duration / 16);
          const t = setInterval(() => {
            s += step;
            if (s >= target) {
              setCount(target);
              clearInterval(t);
            } else setCount(Math.floor(s));
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);
  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const timeline = [
  {
    year: "2014",
    title: "Founded with a Vision",
    desc: "Kalinga Kids was established in Kanan Vihar, Patia with a single classroom and a mission to make early learning joyful.",
    color: "#E8533A",
  },
  {
    year: "2016",
    title: "Expanded Programmes",
    desc: "Introduced structured LKG & UKG curricula with activity-based learning designed by early childhood specialists.",
    color: "#2B7AB8",
  },
  {
    year: "2019",
    title: "Award Recognition",
    desc: "Recognised as one of Bhubaneswar's leading play schools for excellence in holistic child development.",
    color: "#2E8B57",
  },
  {
    year: "2022",
    title: "Campus Upgrade",
    desc: "Expanded campus with dedicated music studio, library corner, CCTV-monitored play areas and a nutrition programme.",
    color: "#D4891A",
  },
  {
    year: "2024",
    title: "500+ Happy Families",
    desc: "Crossed 500 enrolled students, building a thriving community of confident, curious young learners.",
    color: "#C0392B",
  },
];

const values = [
  {
    icon: "🎯",
    title: "Purposeful Play",
    desc: "Every activity is intentionally designed to build cognitive, social and physical skills simultaneously.",
    color: "#E8533A",
    bg: "rgba(232,83,58,0.06)",
  },
  {
    icon: "🌱",
    title: "Holistic Growth",
    desc: "We nurture the whole child — mind, body, creativity and emotional intelligence in equal measure.",
    color: "#2E8B57",
    bg: "rgba(46,139,87,0.06)",
  },
  {
    icon: "🔒",
    title: "Safe & Secure",
    desc: "CCTV-monitored campus, trained staff and strict safety protocols so parents can trust completely.",
    color: "#2B7AB8",
    bg: "rgba(43,122,184,0.06)",
  },
  {
    icon: "👩‍🏫",
    title: "Expert Educators",
    desc: "Qualified, experienced teachers who genuinely love working with young children every single day.",
    color: "#D4891A",
    bg: "rgba(212,137,26,0.06)",
  },
  {
    icon: "🤝",
    title: "Family Partnership",
    desc: "We keep parents involved through daily updates, open communication and regular progress sharing.",
    color: "#C0392B",
    bg: "rgba(192,57,43,0.06)",
  },
  {
    icon: "✨",
    title: "Joy of Learning",
    desc: "We believe learning should feel like an adventure — curious, exciting and never a burden.",
    color: "#9B59B6",
    bg: "rgba(155,89,182,0.06)",
  },
];

const team = [
  {
    name: "Dr. Niharika K M Sahoo",
    role: "Founder & Director",
    initial: "SR",
    color: "#E8533A",
  },
  {
    name: "Mrs. Priya Mohanty",
    role: "Head of Curriculum",
    initial: "PM",
    color: "#2E8B57",
  },
  {
    name: "Mrs. Reena Das",
    role: "Lead Educator — Nursery",
    initial: "RD",
    color: "#2B7AB8",
  },
  {
    name: "Mrs. Anita Sahoo",
    role: "Lead Educator — LKG & UKG",
    initial: "AS",
    color: "#D4891A",
  },
];

export default function About() {
  const [heroRef, heroVisible] = useReveal();
  const [missionRef, missionVisible] = useReveal();
  const [valuesRef, valuesVisible] = useReveal();
  const [timelineRef, timelineVisible] = useReveal();
  const [teamRef, teamVisible] = useReveal();
  const [ctaRef, ctaVisible] = useReveal();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

        :root {
          --ab-navy  : #1A3A5C;
          --ab-orange: #E8533A;
          --ab-green : #2E8B57;
          --ab-sky   : #2B7AB8;
          --ab-yellow: #D4891A;
          --ab-red   : #C0392B;
          --ab-off   : #F8F7F4;
          --ab-border: #E8E6E0;
          --ab-body  : #4A4A5A;
          --ab-serif : 'DM Serif Display', Georgia, serif;
          --ab-sans  : 'DM Sans', system-ui, sans-serif;
          --ab-sh    : 0 2px 24px rgba(26,58,92,0.08);
          --ab-sh-lg : 0 12px 48px rgba(26,58,92,0.12);
        }

        .ab-page {
          font-family: var(--ab-sans);
          color: var(--ab-body);
          overflow-x: hidden;
        }

        /* ── SCROLL REVEAL ──────────────────────────────── */
        .ab-reveal {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1),
                      transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .ab-reveal.ab-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .ab-reveal-left {
          opacity: 0;
          transform: translateX(-40px);
          transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1),
                      transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .ab-reveal-left.ab-visible { opacity:1; transform:translateX(0); }
        .ab-reveal-right {
          opacity: 0;
          transform: translateX(40px);
          transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1),
                      transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .ab-reveal-right.ab-visible { opacity:1; transform:translateX(0); }

        .ab-d1 { transition-delay: 0.08s !important; }
        .ab-d2 { transition-delay: 0.16s !important; }
        .ab-d3 { transition-delay: 0.24s !important; }
        .ab-d4 { transition-delay: 0.32s !important; }
        .ab-d5 { transition-delay: 0.40s !important; }
        .ab-d6 { transition-delay: 0.48s !important; }

        /* ── EYEBROW ────────────────────────────────────── */
        .ab-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: var(--ab-orange);
          margin-bottom: 16px;
        }
        .ab-eyebrow::before {
          content: "";
          display: block;
          width: 24px; height: 2px;
          background: var(--ab-orange);
          border-radius: 2px;
        }

        /* ── TYPOGRAPHY ─────────────────────────────────── */
        .ab-h1 {
          font-family: var(--ab-serif);
          font-size: clamp(40px, 5.5vw, 72px);
          font-weight: 400;
          line-height: 1.08;
          color: var(--ab-navy);
          letter-spacing: -0.5px;
        }
        .ab-h2 {
          font-family: var(--ab-serif);
          font-size: clamp(30px, 3.8vw, 50px);
          font-weight: 400;
          line-height: 1.12;
          color: var(--ab-navy);
          letter-spacing: -0.3px;
        }
        .ab-h3 {
          font-family: var(--ab-serif);
          font-size: 24px;
          font-weight: 400;
          color: var(--ab-navy);
        }
        .ab-lead { font-size: 18px; line-height: 1.8; color: var(--ab-body); font-weight: 300; }
        .ab-body { font-size: 15px; line-height: 1.72; color: var(--ab-body); }

        /* ════════════════════════════════════════════════
           1. HERO
        ════════════════════════════════════════════════ */
        .ab-hero {
          min-height: 72vh;
          background: var(--ab-off);
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          padding: 100px 0 80px;
        }

        /* dot-grid texture */
        .ab-hero::before {
          content: "";
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(26,58,92,0.07) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
        }

        /* logo-color vertical bar — same as home hero */
        .ab-hero::after {
          content: "";
          position: absolute; top:0; left:0;
          width: 5px; height: 100%;
          background: linear-gradient(to bottom,
            var(--ab-red), var(--ab-orange),
            var(--ab-yellow), var(--ab-green), var(--ab-sky)
          );
        }

        .ab-hero-inner {
          max-width: 1160px;
          margin: 0 auto;
          padding: 0 32px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          position: relative; z-index: 1;
        }

        .ab-hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: white;
          border: 1.5px solid var(--ab-border);
          border-radius: 4px;
          padding: 6px 14px;
          font-size: 12px;
          font-weight: 600;
          color: var(--ab-green);
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 28px;
          box-shadow: var(--ab-sh);
        }
        .ab-hero-dot {
          width: 7px; height: 7px;
          background: var(--ab-green);
          border-radius: 50%;
          animation: abBlink 1.5s ease infinite;
        }
        @keyframes abBlink { 0%,100%{opacity:1} 50%{opacity:0.2} }

        .ab-hero-divider {
          width: 56px; height: 3px;
          background: linear-gradient(90deg, var(--ab-red), var(--ab-orange), var(--ab-yellow));
          border-radius: 2px;
          margin: 28px 0;
        }

        /* image side */
        .ab-hero-visual { position: relative; }
        .ab-hero-img {
          width: 100%;
          border-radius: 12px;
          display: block;
          box-shadow: var(--ab-sh-lg);
          aspect-ratio: 4/5;
          object-fit: cover;
        }

        /* colored accent squares behind image */
        .ab-sq {
          position: absolute;
          border-radius: 10px;
          z-index: -1;
        }
        .ab-sq-1 { width:190px;height:190px; background:var(--ab-orange); opacity:0.1; top:-22px;right:-22px; }
        .ab-sq-2 { width:130px;height:130px; background:var(--ab-green);  opacity:0.12;bottom:-18px;left:-18px; }

        /* floating stat card */
        .ab-float-card {
          position: absolute;
          background: white;
          border-radius: 10px;
          padding: 16px 20px;
          box-shadow: var(--ab-sh-lg);
          min-width: 160px;
          animation: abFloat 4s ease-in-out infinite;
        }
        @keyframes abFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        .ab-fc-1 { top:32px; left:-40px; border-left:4px solid var(--ab-orange); animation-delay:0s; }
        .ab-fc-2 { bottom:48px; right:-32px; border-left:4px solid var(--ab-green); animation-delay:2s; }
        .ab-fc-label { font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#bbb;margin-bottom:4px; }
        .ab-fc-value { font-family:var(--ab-serif);font-size:22px;color:var(--ab-navy);line-height:1; }
        .ab-fc-sub   { font-size:11px;color:#aaa;margin-top:3px; }

        /* ════════════════════════════════════════════════
           2. STATS STRIP
        ════════════════════════════════════════════════ */
        .ab-stats {
          background: var(--ab-navy);
          padding: 56px 0;
        }
        .ab-stats-inner {
          max-width: 1160px; margin: 0 auto; padding: 0 32px;
          display: grid; grid-template-columns: repeat(4,1fr);
        }
        .ab-stat {
          text-align: center; padding: 16px;
          border-right: 1px solid rgba(255,255,255,0.1);
        }
        .ab-stat:last-child { border-right: none; }
        .ab-stat-num { font-family:var(--ab-serif);font-size:50px;color:white;line-height:1; }
        .ab-stat-label { font-size:12px;color:rgba(255,255,255,0.5);margin-top:8px;text-transform:uppercase;letter-spacing:0.5px; }
        .ab-stat-line { display:block;width:28px;height:3px;border-radius:2px;margin:14px auto 0; }

        /* ════════════════════════════════════════════════
           3. MISSION
        ════════════════════════════════════════════════ */
        .ab-mission {
          padding: 100px 0;
          background: white;
        }
        .ab-mission-inner {
          max-width: 1160px; margin: 0 auto; padding: 0 32px;
          display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;
        }
        .ab-mission-img {
          width: 100%; border-radius: 12px; display: block;
          box-shadow: var(--ab-sh-lg); aspect-ratio: 4/3; object-fit: cover;
        }
        .ab-mission-badge {
          position: absolute; bottom: -20px; right: -20px;
          background: var(--ab-navy); color: white;
          border-radius: 10px; padding: 18px 22px; text-align: center;
          box-shadow: var(--ab-sh-lg);
        }
        .ab-mb-num  { font-family:var(--ab-serif);font-size:38px;line-height:1; }
        .ab-mb-text { font-size:10px;opacity:0.6;text-transform:uppercase;letter-spacing:1px;margin-top:4px; }

        .ab-mission-img-wrap { position:relative; }

        .ab-pull-quote {
          font-family: var(--ab-serif);
          font-size: clamp(22px,3vw,32px);
          font-style: italic;
          color: var(--ab-navy);
          line-height: 1.45;
          border-left: 4px solid var(--ab-orange);
          padding-left: 24px;
          margin: 32px 0;
        }

        /* ════════════════════════════════════════════════
           4. VALUES
        ════════════════════════════════════════════════ */
        .ab-values {
          padding: 100px 0;
          background: var(--ab-off);
        }
        .ab-values-inner { max-width:1160px;margin:0 auto;padding:0 32px; }

        .ab-values-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-top: 56px;
        }
        .ab-value-card {
          background: white;
          border-radius: 12px;
          padding: 32px 28px;
          border: 1px solid var(--ab-border);
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          position: relative;
          overflow: hidden;
        }
        .ab-value-card::before {
          content:"";
          position:absolute;
          top:0;left:0;width:4px;height:0;
          transition:height 0.3s ease;
          border-radius:0 0 4px 0;
        }
        .ab-value-card:hover { transform:translateY(-6px);box-shadow:var(--ab-sh-lg);border-color:transparent; }
        .ab-value-card:hover::before { height:100%; }

        .ab-value-icon {
          font-size: 32px;
          margin-bottom: 16px;
          display: block;
          transition: transform 0.25s ease;
        }
        .ab-value-card:hover .ab-value-icon { transform: scale(1.2) rotate(-8deg); }
        .ab-value-title { font-family:var(--ab-sans);font-weight:700;font-size:16px;color:var(--ab-navy);margin-bottom:8px; }
        .ab-value-desc  { font-size:14px;color:#888;line-height:1.65; }

        /* ════════════════════════════════════════════════
           5. TIMELINE
        ════════════════════════════════════════════════ */
        .ab-timeline-sec {
          padding: 100px 0;
          background: white;
        }
        .ab-timeline-inner { max-width:1160px;margin:0 auto;padding:0 32px; }

        .ab-timeline {
          position: relative;
          margin-top: 60px;
        }
        /* vertical center line */
        .ab-timeline::before {
          content:"";
          position:absolute;
          top:0;bottom:0;left:50%;
          width:2px;
          background:linear-gradient(to bottom, var(--ab-orange), var(--ab-sky));
          transform:translateX(-50%);
          border-radius:2px;
        }

        .ab-tl-item {
          display:grid;
          grid-template-columns:1fr 56px 1fr;
          align-items:start;
          gap:0;
          margin-bottom:56px;
          position:relative;
        }
        .ab-tl-item:last-child { margin-bottom:0; }

        /* alternate left/right */
        .ab-tl-item:nth-child(even) .ab-tl-content { grid-column:3; }
        .ab-tl-item:nth-child(even) .ab-tl-spacer  { grid-column:1;grid-row:1; }
        .ab-tl-item:nth-child(even) .ab-tl-dot-col { grid-column:2;grid-row:1; }

        .ab-tl-dot-col {
          display:flex;
          flex-direction:column;
          align-items:center;
          padding-top:16px;
        }
        .ab-tl-dot {
          width:18px;height:18px;
          border-radius:50%;
          border:3px solid white;
          box-shadow:0 0 0 3px currentColor;
          flex-shrink:0;
          transition:transform 0.3s ease;
        }
        .ab-tl-item:hover .ab-tl-dot { transform:scale(1.3); }

        .ab-tl-content {
          background:white;
          border:1px solid var(--ab-border);
          border-radius:12px;
          padding:24px 28px;
          margin:8px 20px;
          box-shadow:var(--ab-sh);
          transition:transform 0.25s ease,box-shadow 0.25s ease;
          opacity:0;
          transform:translateY(20px);
          transition:opacity 0.6s cubic-bezier(0.16,1,0.3,1),
                    transform 0.6s cubic-bezier(0.16,1,0.3,1),
                    box-shadow 0.25s ease;
        }
        .ab-tl-content.ab-visible { opacity:1;transform:translateY(0); }
        .ab-tl-content:hover { transform:translateY(-3px);box-shadow:var(--ab-sh-lg); }

        .ab-tl-year {
          font-family:var(--ab-serif);
          font-size:13px;
          font-weight:400;
          letter-spacing:1px;
          margin-bottom:8px;
          opacity:0.8;
        }
        .ab-tl-title { font-family:var(--ab-sans);font-weight:700;font-size:16px;color:var(--ab-navy);margin-bottom:8px; }
        .ab-tl-desc  { font-size:13.5px;color:#888;line-height:1.65; }

        /* ════════════════════════════════════════════════
           6. TEAM
        ════════════════════════════════════════════════ */
        .ab-team {
          padding: 100px 0;
          background: var(--ab-off);
        }
        .ab-team-inner { max-width:1160px;margin:0 auto;padding:0 32px; }
        .ab-team-grid {
          display:grid;
          grid-template-columns:repeat(4,1fr);
          gap:20px;
          margin-top:56px;
        }
        .ab-team-card {
          background:white;
          border-radius:12px;
          padding:32px 20px 28px;
          text-align:center;
          border:1px solid var(--ab-border);
          transition:transform 0.25s ease,box-shadow 0.25s ease;
        }
        .ab-team-card:hover { transform:translateY(-6px);box-shadow:var(--ab-sh-lg); }

        .ab-team-avatar {
          width:72px;height:72px;
          border-radius:50%;
          display:flex;align-items:center;justify-content:center;
          font-family:var(--ab-serif);
          font-size:24px;
          color:white;
          margin:0 auto 18px;
          box-shadow:0 6px 20px rgba(0,0,0,0.12);
          position:relative;
        }
        /* spinning ring on avatar — matches navbar logo */
        .ab-team-avatar::before {
          content:"";
          position:absolute;inset:-3px;
          border-radius:50%;
          background:conic-gradient(var(--ab-ring,#E8533A) 0%,transparent 60%,var(--ab-ring,#E8533A) 100%);
          animation:abAvatarSpin 6s linear infinite;
          z-index:-1;
          opacity:0;
          transition:opacity 0.3s ease;
        }
        .ab-team-card:hover .ab-team-avatar::before { opacity:1; }
        @keyframes abAvatarSpin { to{transform:rotate(360deg)} }

        .ab-team-name { font-family:var(--ab-sans);font-weight:700;font-size:15px;color:var(--ab-navy);margin-bottom:5px; }
        .ab-team-role { font-size:13px;color:#999;line-height:1.5; }

        /* ════════════════════════════════════════════════
           7. CTA BAND
        ════════════════════════════════════════════════ */
        .ab-cta {
          padding: 100px 0;
          background: var(--ab-navy);
          position: relative;
          overflow: hidden;
          text-align: center;
        }
        .ab-cta::before {
          content:"";
          position:absolute;top:-100px;left:-100px;
          width:400px;height:400px;
          background:radial-gradient(circle,rgba(232,83,58,0.15),transparent 65%);
          border-radius:50%;pointer-events:none;
        }
        .ab-cta::after {
          content:"";
          position:absolute;bottom:-80px;right:-80px;
          width:320px;height:320px;
          background:radial-gradient(circle,rgba(46,139,87,0.1),transparent 65%);
          border-radius:50%;pointer-events:none;
        }
        .ab-cta-inner { max-width:680px;margin:0 auto;padding:0 32px;position:relative;z-index:1; }
        .ab-cta-h { font-family:var(--ab-serif);font-size:clamp(30px,4vw,50px);color:white;margin-bottom:16px;line-height:1.1; }
        .ab-cta-sub { font-size:17px;color:rgba(255,255,255,0.6);margin-bottom:40px;font-weight:300;line-height:1.7; }
        .ab-cta-btns { display:flex;gap:16px;justify-content:center;flex-wrap:wrap; }

        .ab-btn-primary {
          display:inline-flex;align-items:center;gap:8px;
          background:var(--ab-orange);color:white;
          font-family:var(--ab-sans);font-weight:600;font-size:15px;
          padding:14px 30px;border-radius:6px;text-decoration:none;
          border:2px solid var(--ab-orange);letter-spacing:0.2px;
          transition:background 0.22s ease,color 0.22s ease,transform 0.22s ease;
        }
        .ab-btn-primary:hover { background:transparent;color:var(--ab-orange);transform:translateY(-2px);text-decoration:none; }

        .ab-btn-outline {
          display:inline-flex;align-items:center;gap:8px;
          background:transparent;color:white;
          font-family:var(--ab-sans);font-weight:600;font-size:15px;
          padding:14px 30px;border-radius:6px;text-decoration:none;
          border:2px solid rgba(255,255,255,0.35);letter-spacing:0.2px;
          transition:border-color 0.22s ease,background 0.22s ease,transform 0.22s ease;
        }
        .ab-btn-outline:hover { border-color:white;background:rgba(255,255,255,0.08);transform:translateY(-2px);text-decoration:none; }

        /* ── RESPONSIVE ─────────────────────────────────── */
        @media(max-width:992px){
          .ab-hero-inner   { grid-template-columns:1fr;gap:48px; }
          .ab-hero-visual  { display:none; }
          .ab-mission-inner{ grid-template-columns:1fr;gap:48px; }
          .ab-values-grid  { grid-template-columns:1fr 1fr; }
          .ab-team-grid    { grid-template-columns:1fr 1fr; }
          .ab-stats-inner  { grid-template-columns:1fr 1fr; }
          .ab-stat         { border-right:none;border-bottom:1px solid rgba(255,255,255,0.1); }

          /* mobile timeline — single column */
          .ab-timeline::before { left:24px; }
          .ab-tl-item { grid-template-columns:48px 1fr; }
          .ab-tl-item:nth-child(even) .ab-tl-content { grid-column:2;grid-row:1; }
          .ab-tl-item:nth-child(even) .ab-tl-spacer  { display:none; }
          .ab-tl-item:nth-child(even) .ab-tl-dot-col { grid-column:1;grid-row:1; }
          .ab-tl-content { margin:8px 0 8px 16px; }
        }
        @media(max-width:600px){
          .ab-values-grid { grid-template-columns:1fr; }
          .ab-team-grid   { grid-template-columns:1fr 1fr; }
          .ab-hero-inner  { padding:0 20px; }
          .ab-mission-inner,.ab-values-inner,.ab-timeline-inner,
          .ab-team-inner,.ab-cta-inner,.ab-stats-inner { padding:0 20px; }
        }
      `}</style>

      <div className="ab-page">
        {/* ══════════ 1. HERO ══════════ */}
        <section className="ab-hero">
          <div className="ab-hero-inner" ref={heroRef}>
            <div>
              <div className={`ab-reveal ${heroVisible ? "ab-visible" : ""}`}>
                <div className="ab-hero-tag">
                  <span className="ab-hero-dot" /> Established 2012
                </div>
              </div>
              <h1
                className={`ab-h1 ab-reveal ab-d1 ${
                  heroVisible ? "ab-visible" : ""
                }`}
              >
                The School That
                <br />
                <em style={{ fontStyle: "italic", color: "var(--ab-orange)" }}>
                  Cares Like Home
                </em>
              </h1>
              <div
                className={`ab-hero-divider ab-reveal ab-d2 ${
                  heroVisible ? "ab-visible" : ""
                }`}
              />
              <p
                className={`ab-lead ab-reveal ab-d2 ${
                  heroVisible ? "ab-visible" : ""
                }`}
                style={{ maxWidth: 500 }}
              >
                Since 2012, Kalinga Kids Play School has been nurturing young
                minds in Patia, Bhubaneswar — creating a safe, joyful and
                structured environment where every child thrives.
              </p>
              <div
                className={`ab-reveal ab-d3 ${heroVisible ? "ab-visible" : ""}`}
                style={{
                  display: "flex",
                  gap: 16,
                  flexWrap: "wrap",
                  marginTop: 36,
                }}
              >
                <Link to="/admission" className="ab-btn-primary">
                  Apply for Admission →
                </Link>
                <Link
                  to="/contact"
                  className="ab-btn-outline"
                  style={{
                    color: "var(--ab-navy)",
                    borderColor: "rgba(26,58,92,0.3)",
                  }}
                >
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="ab-hero-visual">
              <div className="ab-sq ab-sq-1" />
              <div className="ab-sq ab-sq-2" />
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80"
                alt="Kalinga Kids classroom"
                className="ab-hero-img"
              />
              <div className="ab-float-card ab-fc-1">
                <div className="ab-fc-label">Founded</div>
                <div className="ab-fc-value">2012</div>
                <div className="ab-fc-sub">A decade of trust</div>
              </div>
              <div className="ab-float-card ab-fc-2">
                <div className="ab-fc-label">Students</div>
                <div
                  className="ab-fc-value"
                  style={{ color: "var(--ab-green)" }}
                >
                  500+
                </div>
                <div className="ab-fc-sub">Happy families</div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ 2. STATS ══════════ */}
        {/* <div className="ab-stats">
          <div className="ab-stats-inner">
            {[
              { n:500, s:"+", l:"Happy Students",      c:"var(--ab-orange)" },
              { n:10,  s:"+", l:"Years of Excellence", c:"var(--ab-yellow)" },
              { n:20,  s:"+", l:"Expert Educators",    c:"var(--ab-green)"  },
              { n:98,  s:"%", l:"Parent Satisfaction", c:"var(--ab-sky)"    },
            ].map((x,i) => (
              <div className="ab-stat" key={i}>
                <div className="ab-stat-num"><CountUp target={x.n} suffix={x.s} /></div>
                <div className="ab-stat-label">{x.l}</div>
                <span className="ab-stat-line" style={{ background:x.c }} />
              </div>
            ))}
          </div>
        </div> */}

        {/* ══════════ 3. MISSION ══════════ */}
        <section className="ab-mission" ref={missionRef}>
          <div className="ab-mission-inner">
            <div
              className={`ab-reveal-left ${missionVisible ? "ab-visible" : ""}`}
            >
              <div className="ab-mission-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1588072432836-e10032774350?w=700&q=80"
                  alt="Children learning"
                  className="ab-mission-img"
                />
                <div className="ab-mission-badge">
                  <div className="ab-mb-num">10+</div>
                  <div className="ab-mb-text">
                    Years of
                    <br />
                    Excellence
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div
                className={`ab-eyebrow ab-reveal ab-d1 ${
                  missionVisible ? "ab-visible" : ""
                }`}
              >
                Our Mission
              </div>
              <h2
                className={`ab-h2 ab-reveal ab-d1 ${
                  missionVisible ? "ab-visible" : ""
                }`}
                style={{ marginBottom: 0 }}
              >
                Education That
                <br />
                <em style={{ fontStyle: "italic", color: "var(--ab-sky)" }}>
                  Feels Natural
                </em>
              </h2>
              <blockquote
                className={`ab-pull-quote ab-reveal ab-d2 ${
                  missionVisible ? "ab-visible" : ""
                }`}
              >
                "Every child deserves love, patience and encouragement — just
                like home."
              </blockquote>
              <p
                className={`ab-body ab-reveal ab-d3 ${
                  missionVisible ? "ab-visible" : ""
                }`}
              >
                Located in{" "}
                <strong style={{ color: "var(--ab-navy)" }}>
                  Kanan Vihar Phase-II, Patia, Bhubaneswar
                </strong>
                , we have spent over a decade refining an activity-based
                curriculum that treats each child as an individual — celebrating
                their unique pace, learning style and personality.
              </p>
              <p
                className={`ab-body ab-reveal ab-d4 ${
                  missionVisible ? "ab-visible" : ""
                }`}
                style={{ marginTop: 14 }}
              >
                We partner closely with families, keeping parents informed and
                involved every step of the way — because we believe great
                outcomes happen when school and home work together.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════ 4. VALUES ══════════ */}
        {/* <section className="ab-values" ref={valuesRef}>
          <div className="ab-values-inner">
            <div className={`ab-reveal ${valuesVisible ? "ab-visible" : ""}`} style={{ textAlign:"center" }}>
              <div className="ab-eyebrow" style={{ justifyContent:"center" }}>What We Stand For</div>
              <h2 className="ab-h2">
                Our Core<br />
                <em style={{ fontStyle:"italic", color:"var(--ab-green)" }}>Values & Principles</em>
              </h2>
            </div>
            <div className="ab-values-grid">
              {values.map((v, i) => (
                <div
                  key={i}
                  className={`ab-value-card ab-reveal ab-d${i % 3 + 1} ${valuesVisible ? "ab-visible" : ""}`}
                  style={{ "--card-color": v.color }}
                >
                  <style>{`.ab-value-card:nth-child(${i+1})::before { background:${v.color}; }`}</style>
                  <span className="ab-value-icon">{v.icon}</span>
                  <div className="ab-value-title">{v.title}</div>
                  <p className="ab-value-desc">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* ══════════ 5. TIMELINE ══════════ */}
        {/* <section className="ab-timeline-sec" ref={timelineRef}>
          <div className="ab-timeline-inner">
            <div className={`ab-reveal ${timelineVisible ? "ab-visible" : ""}`} style={{ textAlign:"center" }}>
              <div className="ab-eyebrow" style={{ justifyContent:"center" }}>Our Journey</div>
              <h2 className="ab-h2">
                A Decade of<br />
                <em style={{ fontStyle:"italic", color:"var(--ab-orange)" }}>Growth & Impact</em>
              </h2>
            </div>

            <div className="ab-timeline" style={{ marginTop:64 }}>
              {timeline.map((item, i) => (
                <div className="ab-tl-item" key={i}>
                  {i % 2 === 0 ? (
                    <>
                      <div
                        className={`ab-tl-content ${timelineVisible ? "ab-visible" : ""}`}
                        style={{ transitionDelay:`${i * 0.12}s` }}
                      >
                        <div className="ab-tl-year" style={{ color:item.color }}>{item.year}</div>
                        <div className="ab-tl-title">{item.title}</div>
                        <p className="ab-tl-desc">{item.desc}</p>
                      </div>
                      <div className="ab-tl-dot-col">
                        <div className="ab-tl-dot" style={{ color:item.color, backgroundColor:item.color }} />
                      </div>
                      <div className="ab-tl-spacer" />
                    </>
                  ) : (
                    <>
                      <div className="ab-tl-spacer" />
                      <div className="ab-tl-dot-col">
                        <div className="ab-tl-dot" style={{ color:item.color, backgroundColor:item.color }} />
                      </div>
                      <div
                        className={`ab-tl-content ${timelineVisible ? "ab-visible" : ""}`}
                        style={{ transitionDelay:`${i * 0.12}s` }}
                      >
                        <div className="ab-tl-year" style={{ color:item.color }}>{item.year}</div>
                        <div className="ab-tl-title">{item.title}</div>
                        <p className="ab-tl-desc">{item.desc}</p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* ══════════ 6. TEAM ══════════ */}
        <section className="ab-team" ref={teamRef}>
          <div className="ab-team-inner">
            <div
              className={`ab-reveal ${teamVisible ? "ab-visible" : ""}`}
              style={{ textAlign: "center" }}
            >
              <div className="ab-eyebrow" style={{ justifyContent: "center" }}>
                The People Behind It
              </div>
              <h2 className="ab-h2">
                Meet Our
                <br />
                <em style={{ fontStyle: "italic", color: "var(--ab-sky)" }}>
                  Dedicated Educators
                </em>
              </h2>
            </div>
            <div className="ab-team-grid">
              {team.map((m, i) => (
                <div
                  key={i}
                  className={`ab-team-card ab-reveal ab-d${i + 1} ${
                    teamVisible ? "ab-visible" : ""
                  }`}
                >
                  <div
                    className="ab-team-avatar"
                    style={{ background: m.color, "--ab-ring": m.color }}
                  >
                    {m.initial}
                  </div>
                  <div className="ab-team-name">{m.name}</div>
                  <div className="ab-team-role">{m.role}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ 7. CTA BAND ══════════ */}
        <section className="ab-cta" ref={ctaRef}>
          <div className="ab-cta-inner">
            <div className={`ab-reveal ${ctaVisible ? "ab-visible" : ""}`}>
              <h2 className="ab-cta-h">
                Ready to Join the
                <br />
                <em style={{ fontStyle: "italic", color: "var(--ab-orange)" }}>
                  Kalinga Family?
                </em>
              </h2>
              <p className="ab-cta-sub">
                Admissions for 2025–26 are now open. Secure your child's place
                in Bhubaneswar's most nurturing play school today.
              </p>
              <div className="ab-cta-btns">
                <Link to="/admission" className="ab-btn-primary">
                  Apply for Admission →
                </Link>
                <Link to="/contact" className="ab-btn-outline">
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
