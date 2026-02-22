import { useState, useEffect, useRef } from "react";
import AdmissionForm from "../components/AdmissionForm";
import { Link } from "react-router-dom";
import Gallery from "./Gallery";

// ─────────────────────────────────────────────────────────────
//  KALINGA KIDS  ·  Professional Edition
//  Palette: Logo colors — Navy, Red, Orange, Yellow, Green, Sky
//  Tone: Refined Warmth — premium private school aesthetic
// ─────────────────────────────────────────────────────────────

function CountUp({ target, duration = 2000, suffix = "" }) {
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

const programs = [
  {
    icon: "🎨",
    title: "Play Group",
    age: "2 – 3 Years",
    desc: "Sensory play, music, storytelling and motor skill development in a joyful, structured environment.",
    color: "#E8533A",
    accent: "#FEF0ED",
  },
  {
    icon: "📖",
    title: "Nursery",
    age: "3 – 4 Years",
    desc: "Language development, number concepts and social skills through guided exploration and creative play.",
    color: "#2B7AB8",
    accent: "#EDF5FC",
  },
  {
    icon: "✏️",
    title: "LKG",
    age: "4 – 5 Years",
    desc: "Early literacy, numeracy and reasoning introduced through activity-based, hands-on classroom learning.",
    color: "#2E8B57",
    accent: "#EDF7F2",
  },
  {
    icon: "🎓",
    title: "UKG",
    age: "5 – 6 Years",
    desc: "School-readiness programme building academic confidence, independence and a love for lifelong learning.",
    color: "#D4891A",
    accent: "#FEF6E8",
  },
];

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=700&q=80",
    label: "Learning Together",
  },
  {
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=700&q=80",
    label: "Creative Time",
  },
  {
    src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=700&q=80",
    label: "Story Hour",
  },
  {
    src: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=700&q=80",
    label: "Art & Craft",
  },
  {
    src: "https://images.unsplash.com/photo-1603575448361-4ef76f84f75d?w=700&q=80",
    label: "Play Time",
  },
  {
    src: "https://images.unsplash.com/photo-1587614203976-365c74645e83?w=700&q=80",
    label: "Outdoor Fun",
  },
];

const facilities = [
  {
    icon: "🏫",
    title: "Safe Classrooms",
    desc: "Purpose-built, child-friendly spaces designed to spark curiosity and focused learning.",
  },
  {
    icon: "🛝",
    title: "Play Areas",
    desc: "Supervised indoor & outdoor play zones promoting physical growth and teamwork.",
  },
  {
    icon: "📷",
    title: "CCTV Monitoring",
    desc: "24/7 campus surveillance ensuring complete security and parent peace of mind.",
  },
  {
    icon: "🎵",
    title: "Music & Movement",
    desc: "Dedicated studio nurturing rhythm, expression and creative performance.",
  },
  {
    icon: "📖",
    title: "Library Corner",
    desc: "A curated collection of age-appropriate books fostering a love of reading.",
  },
  {
    icon: "🍱",
    title: "Nutrition Programme",
    desc: "Balanced, wholesome meals crafted to fuel growing minds and bodies.",
  },
];

const testimonials = [
  {
    name: "Priya Mohanty",
    role: "Parent of Aanya, Age 4",
    quote:
      "Kalinga Kids transformed my shy daughter into a confident, curious child. The teachers are extraordinary and genuinely invested in every child's growth.",
    initials: "PM",
    color: "#E8533A",
  },
  {
    name: "Rajesh Panda",
    role: "Parent of Arjun, Age 3",
    quote:
      "My son runs to school every single morning — that says everything about the environment they have built here. Truly exceptional educators.",
    initials: "RP",
    color: "#2E8B57",
  },
  {
    name: "Sunita Das",
    role: "Parent of Meera, Age 5",
    quote:
      "The structured yet nurturing curriculum gave my daughter the perfect foundation. She transitioned to primary school with complete confidence.",
    initials: "SD",
    color: "#2B7AB8",
  },
];

const whyUs = [
  {
    icon: "🎯",
    title: "Activity-Based Learning",
    desc: "Concepts introduced through hands-on experience, not rote memorisation.",
  },
  {
    icon: "🌱",
    title: "Holistic Development",
    desc: "Equal focus on cognitive, social, emotional and physical growth.",
  },
  {
    icon: "👩‍🏫",
    title: "Qualified Educators",
    desc: "Trained, experienced teachers with a passion for early childhood.",
  },
  {
    icon: "🔒",
    title: "Safe Environment",
    desc: "CCTV-monitored, child-proofed campus with strict safety protocols.",
  },
];

export default function Home() {
  const [activeProgram, setActiveProgram] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [activeTest, setActiveTest] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    child: "",
    program: "",
  });

  useEffect(() => {
    const t = setInterval(
      () => setActiveTest((p) => (p + 1) % testimonials.length),
      5000
    );
    return () => clearInterval(t);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
    setFormData({ name: "", phone: "", child: "", program: "" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

        /* ── DESIGN TOKENS ────────────────────────────── */
        :root {
          --navy   : #1A3A5C;
          --red    : #C0392B;
          --orange : #c342c6;
          --yellow : #D4891A;
          --green  :rgb(139, 46, 137);
          --sky    : #2B7AB8;
          --white  : #FFFFFF;
          --off    : #F8F7F4;
          --dark   : #1C1C2E;
          --body   : #4A4A5A;
          --border : #E8E6E0;
          --serif  : 'DM Serif Display', Georgia, serif;
          --sans   : 'DM Sans', system-ui, sans-serif;
          --sh     : 0 2px 24px rgba(26,58,92,0.08);
          --sh-lg  : 0 12px 48px rgba(26,58,92,0.12);
        }

        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

        body {
          font-family: var(--sans);
          color: var(--body);
          background: var(--white);
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }

        /* ── LAYOUT ──────────────────────────────────── */
        .kk-wrap { max-width:1160px; margin:0 auto; padding:0 32px; }
        .kk-sec  { padding:64px 0; }

        /* ── TYPE ────────────────────────────────────── */
        .eyebrow {
          display:inline-flex; align-items:center; gap:8px;
          font-family:var(--sans); font-size:11px; font-weight:700;
          letter-spacing:2.5px; text-transform:uppercase;
          color:var(--orange); margin-bottom:10px;
        }
        .eyebrow::before {
          content:""; display:block; width:24px; height:2px;
          background:var(--orange); border-radius:2px; flex-shrink:0;
        }

        .h1 {
          font-family:var(--serif); font-size:clamp(40px,5.5vw,74px);
          font-weight:400; line-height:1.08; color:var(--navy); letter-spacing:-0.5px;
        }
        .h2 {
          font-family:var(--serif); font-size:clamp(32px,4vw,52px);
          font-weight:400; line-height:1.12; color:var(--navy); letter-spacing:-0.3px;
        }
        .h3 { font-family:var(--serif); font-size:26px; font-weight:400; color:var(--navy); line-height:1.25; }
        .lead { font-size:18px; line-height:1.75; color:var(--body); font-weight:300; }
        .body-text { font-size:15px; line-height:1.7; color:var(--body); }

        /* ── BUTTONS ─────────────────────────────────── */
        .btn-dk {
          display:inline-flex; align-items:center; gap:10px;
          background:var(--navy); color:#fff;
          font-family:var(--sans); font-weight:600; font-size:15px;
          padding:14px 30px; border-radius:6px; text-decoration:none;
          border:2px solid var(--navy); cursor:pointer; letter-spacing:0.2px;
          transition:all 0.22s ease;
        }
        .btn-dk:hover { background:transparent; color:var(--navy); text-decoration:none; transform:translateY(-2px); box-shadow:0 8px 24px rgba(26,58,92,0.18); }

        .btn-ol {
          display:inline-flex; align-items:center; gap:10px;
          background:transparent; color:var(--navy);
          font-family:var(--sans); font-weight:600; font-size:15px;
          padding:12px 28px; border-radius:6px; text-decoration:none;
          border:2px solid rgba(26,58,92,0.3); cursor:pointer;
          transition:all 0.22s ease;
        }
        .btn-ol:hover { border-color:var(--navy); background:var(--navy); color:#fff; text-decoration:none; transform:translateY(-2px); }

        /* ── FADE IN ─────────────────────────────────── */
        @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        .fu  { animation:fadeUp 0.7s ease both; }
        .d1  { animation-delay:0.15s; }
        .d2  { animation-delay:0.30s; }
        .d3  { animation-delay:0.45s; }
        .d4  { animation-delay:0.60s; }

        /* ════════════════════════════════════════════════
           HERO
        ════════════════════════════════════════════════ */
        .hero {
          min-height:100vh; background:var(--off);
          display:flex; align-items:center;
          position:relative; overflow:hidden;
          padding:35px 0 60px;
        }
        /* subtle dot grid */
        .hero::before {
          content:""; position:absolute; inset:0;
          background-image: radial-gradient(rgba(26,58,92,0.07) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events:none;
        }
        /* logo-color vertical bar */
        .hero::after {
          content:""; position:absolute; top:0; left:0;
          width:5px; height:100%;
          background:linear-gradient(to bottom,var(--red),var(--orange),var(--yellow),var(--green),var(--sky));
        }

        .hero-grid {
          display:grid; grid-template-columns:1fr 1fr;
          gap:52px; align-items:center; position:relative; z-index:1;
        }

        /* ── LOGO WATERMARK ──────────────────────────────── */
        .hero-watermark {
          position    : absolute;
          top         : 30%;
          left        : 50%;
          transform   : translate(-50%, -50%);
          width       : clamp(320px, 55vw, 640px);
          height      : clamp(320px, 55vw, 640px);
          z-index     : 0;
          pointer-events : none;
          animation   : wmFadeIn 1.6s cubic-bezier(0.16,1,0.3,1) 0.3s both;
        }
        .hero-watermark img {
          width          : 100%;
          height         : 100%;
          object-fit     : contain;
          display        : block;
          opacity        : 0.20;
          filter         : saturate(0.15) contrast(0.88);
          mix-blend-mode : multiply;
          animation      : wmBreath 9s ease-in-out infinite 2s;
        }
        @keyframes wmFadeIn {
          from { opacity:0; transform:translate(-50%,-50%) scale(0.86); }
          to   { opacity:0.3; transform:translate(-50%,-50%) scale(1);    }
        }
        @keyframes wmBreath {
          0%,100% { opacity:0.42; transform:scale(1);     }
          50%     { opacity:0.55; transform:scale(1.028); }
        }

        .hero-tag {
          display:inline-flex; align-items:center; gap:8px;
          background:white; border:1.5px solid var(--border);
          border-radius:4px; padding:6px 14px;
          font-size:12px; font-weight:700; color:var(--green);
          letter-spacing:1px; text-transform:uppercase;
          margin-bottom:10px; box-shadow:var(--sh);
        }
        .hero-tag-dot { width:7px; height:7px; background:var(--green); border-radius:50%; animation:blink 1.5s ease infinite; }
        @keyframes blink { 0%,100%{opacity:1}50%{opacity:0.25} }

        .hero-divider {
          width:56px; height:3px;
          background:linear-gradient(90deg,var(--red),var(--orange),var(--yellow));
          border-radius:2px; margin:18px 0;
        }

        .hero-micro-stats {
          display:flex; gap:0; margin-top:26px;
          padding-top:26px; border-top:1px solid var(--border);
        }
        .hms-item { flex:1; padding:0 24px 0 0; }
        .hms-item + .hms-item { border-left:1px solid var(--border); padding-left:24px; }
        .hms-num {
          font-family:var(--serif); font-size:36px;
          color:var(--navy); line-height:1;
        }
        .hms-label { font-size:11px; color:#999; margin-top:5px; text-transform:uppercase; letter-spacing:0.5px; font-weight:600; }

        /* right visual */
        .hero-visual { position:relative; }
        .hero-img {
          width:100%; border-radius:12px; display:block;
          box-shadow:var(--sh-lg); aspect-ratio:4/5; object-fit:cover;
        }
        .hero-bg-sq {
          position:absolute; border-radius:10px; z-index:-1;
        }
        .hbsq-1 { width:200px;height:200px; background:var(--orange); opacity:0.1; top:-24px;right:-24px; }
        .hbsq-2 { width:140px;height:140px; background:var(--green);  opacity:0.12;bottom:-20px;left:-20px; }

        .hero-float-card {
          position:absolute; background:white; border-radius:10px;
          padding:16px 20px; box-shadow:var(--sh-lg); min-width:175px;
        }
        .hfc-top    { top:36px; left:-44px; border-left:4px solid var(--orange); }
        .hfc-bottom { bottom:52px; right:-36px; border-left:4px solid var(--green); }
        .hfc-label  { font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#bbb;margin-bottom:4px; }
        .hfc-value  { font-family:var(--serif);font-size:22px;color:var(--navy);line-height:1; }
        .hfc-sub    { font-size:11px;color:#aaa;margin-top:3px; }

        /* ════════════════════════════════════════════════
           STATS STRIP
        ════════════════════════════════════════════════ */
        .stats-bar { background:var(--navy); padding:38px 0; }
        .stats-row { display:grid; grid-template-columns:repeat(4,1fr); }
        .s-item {
          text-align:center; padding:14px 12px;
          border-right:1px solid rgba(255,255,255,0.1);
        }
        .s-item:last-child { border-right:none; }
        .s-num { font-family:var(--serif);font-size:52px;color:white;line-height:1; }
        .s-label { font-size:12px;color:rgba(255,255,255,0.5);margin-top:8px;text-transform:uppercase;letter-spacing:0.5px; }
        .s-line { display:block;width:28px;height:3px;border-radius:2px;margin:14px auto 0; }

        /* ════════════════════════════════════════════════
           ABOUT
        ════════════════════════════════════════════════ */
        .about-grid {
          display:grid; grid-template-columns:1fr 1fr;
          gap:52px; align-items:center;
        }
        .about-img-wrap { position:relative; }
        .about-img {
          width:100%; border-radius:12px; display:block;
          box-shadow:var(--sh-lg); aspect-ratio:4/3; object-fit:cover;
        }
        .about-badge {
          position:absolute; bottom:-16px; right:-16px;
          background:var(--navy); color:white;
          border-radius:10px; padding:20px 24px; text-align:center;
          box-shadow:var(--sh-lg);
        }
        .ab-num  { font-family:var(--serif);font-size:40px;line-height:1; }
        .ab-text { font-size:10px;opacity:0.6;text-transform:uppercase;letter-spacing:1px;margin-top:4px; }

        .why-grid { display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:20px; }
        .why-card {
          background:var(--off); border-radius:10px; padding:16px;
          border:1px solid var(--border); transition:all 0.22s ease;
        }
        .why-card:hover { border-color:var(--orange);background:white;transform:translateY(-3px);box-shadow:var(--sh); }
        .wc-icon  { font-size:24px;margin-bottom:8px;display:block; }
        .wc-title { font-family:var(--sans);font-weight:700;font-size:14px;color:var(--navy);margin-bottom:4px; }
        .wc-desc  { font-size:13px;color:#999;line-height:1.6; }

        /* ════════════════════════════════════════════════
           PROGRAMS
        ════════════════════════════════════════════════ */
        .prog-tabs { display:flex;gap:8px;margin-bottom:10px;flex-wrap:wrap; }
        .prog-tab {
          display:flex;align-items:center;gap:8px;
          padding:10px 22px; border-radius:6px;
          border:2px solid var(--border); background:white;
          font-family:var(--sans); font-weight:600; font-size:14px;
          color:var(--body); cursor:pointer; transition:all 0.2s ease;
        }
        .prog-tab:hover { border-color:var(--navy);color:var(--navy); }
        .prog-tab.is-active { background:var(--navy);color:white;border-color:var(--navy); }

        .prog-panel {
          display:grid; grid-template-columns:1fr 1.4fr;
          border-radius:14px; overflow:hidden;
          box-shadow:var(--sh-lg); animation:fadeUp 0.38s ease both;
        }
        .pp-left {
          display:flex;flex-direction:column;align-items:center;justify-content:center;
          padding:38px 28px; gap:18px; text-align:center;
        }
        .pp-emoji { font-size:72px;line-height:1;display:block; }
        .pp-age-tag {
          display:inline-block;padding:6px 16px;border-radius:4px;
          font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;
          background:rgba(255,255,255,0.55);
        }
        .pp-right {
          background:white;padding:38px 32px;
          display:flex;flex-direction:column;justify-content:center;
        }
        .pp-title { font-family:var(--serif);font-size:38px;color:var(--navy);margin-bottom:14px;line-height:1.1; }
        .pp-desc  { font-size:16px;line-height:1.75;color:var(--body);max-width:400px;margin-bottom:10px; }
        .pp-features { display:flex;flex-direction:column;gap:7px;margin-bottom:20px; }
        .pp-feat { display:flex;align-items:center;gap:10px;font-size:14px;color:var(--body); }
        .pp-dot  { width:7px;height:7px;border-radius:50%;flex-shrink:0; }

        /* ════════════════════════════════════════════════
           GALLERY
        ════════════════════════════════════════════════ */
        .gal-header {
          display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:22px;
        }
        .gal-grid {
          display:grid;grid-template-columns:repeat(3,1fr);
          grid-template-rows:auto auto;gap:12px;
        }
        .gal-grid .g-main { grid-column:span 2; }

        .g-item {
          position:relative;border-radius:10px;overflow:hidden;cursor:pointer;
          background:#eee;
        }
        .g-item img { width:100%;height:260px;object-fit:cover;display:block;transition:transform 0.45s ease; }
        .g-item:hover img { transform:scale(1.06); }
        .g-overlay {
          position:absolute;inset:0;
          background:linear-gradient(to top,rgba(26,58,92,0.8),transparent 55%);
          opacity:0;transition:opacity 0.3s ease;
          display:flex;align-items:flex-end;padding:18px;
        }
        .g-item:hover .g-overlay { opacity:1; }
        .g-label { color:white;font-family:var(--sans);font-weight:600;font-size:14px;letter-spacing:0.3px; }

        /* lightbox */
        .lightbox {
          position:fixed;inset:0;background:rgba(0,0,0,0.93);
          z-index:99999;display:flex;align-items:center;justify-content:center;
          animation:fadeIn 0.22s ease;
        }
        @keyframes fadeIn { from{opacity:0}to{opacity:1} }
        .lightbox img { max-width:90vw;max-height:88vh;border-radius:8px; }
        .lb-close { position:absolute;top:24px;right:32px;color:white;font-size:34px;cursor:pointer;opacity:0.7;transition:opacity 0.2s; }
        .lb-close:hover { opacity:1; }

        /* ════════════════════════════════════════════════
           FACILITIES
        ════════════════════════════════════════════════ */
        .fac-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:18px; }
        .fac-card {
          background:white;border-radius:10px;padding:20px 18px;
          border:1px solid var(--border);transition:all 0.22s ease;
          position:relative;overflow:hidden;
        }
        .fac-card::before {
          content:"";position:absolute;top:0;left:0;
          width:4px;height:0;transition:height 0.3s ease;
        }
        .fac-card:hover { transform:translateY(-4px);box-shadow:var(--sh-lg);border-color:transparent; }
        .fac-card:hover::before { height:100%; }
        .fac-card:nth-child(1)::before { background:var(--red);    }
        .fac-card:nth-child(2)::before { background:var(--sky);    }
        .fac-card:nth-child(3)::before { background:var(--green);  }
        .fac-card:nth-child(4)::before { background:var(--orange); }
        .fac-card:nth-child(5)::before { background:var(--yellow); }
        .fac-card:nth-child(6)::before { background:var(--navy);   }
        .fac-icon  { font-size:34px;margin-bottom:8px;display:block; }
        .fac-title { font-weight:700;font-size:15px;color:var(--navy);margin-bottom:7px; }
        .fac-desc  { font-size:13.5px;color:#999;line-height:1.65; }

        /* ════════════════════════════════════════════════
           TESTIMONIALS
        ════════════════════════════════════════════════ */
        .test-section { background:var(--navy);padding:64px 0; }
        .test-grid { display:grid;grid-template-columns:1fr 1.5fr;gap:52px;align-items:center; }
        .test-left .h2 { color:white; }
        .test-left .eyebrow { color:var(--yellow); }
        .test-left .eyebrow::before { background:var(--yellow); }
        .test-desc { color:rgba(255,255,255,0.6);font-size:16px;line-height:1.75;margin-top:12px; }
        .test-dots { display:flex;gap:8px;margin-top:22px; }
        .t-dot { width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,0.25);border:none;padding:0;cursor:pointer;transition:all 0.3s ease; }
        .t-dot.active { background:var(--yellow);width:24px;border-radius:4px; }

        .test-card {
          background:white;border-radius:14px;padding:22px;
          box-shadow:0 24px 64px rgba(0,0,0,0.25);
          animation:fadeUp 0.5s ease both;position:relative;
        }
        .t-qmark {
          font-family:var(--serif);font-size:100px;line-height:0.7;
          color:var(--orange);opacity:0.2;
          position:absolute;top:28px;left:32px;pointer-events:none;
        }
        .t-text {
          font-family:var(--serif);font-size:19px;line-height:1.7;
          color:var(--dark);font-style:italic;margin-bottom:10px;position:relative;z-index:1;
        }
        .t-author { display:flex;align-items:center;gap:14px; }
        .t-avatar {
          width:48px;height:48px;border-radius:50%;
          display:flex;align-items:center;justify-content:center;
          font-family:var(--sans);font-weight:700;font-size:16px;color:white;flex-shrink:0;
        }
        .t-name { font-weight:700;font-size:15px;color:var(--navy); }
        .t-role { font-size:13px;color:#aaa;margin-top:2px; }

        /* ════════════════════════════════════════════════
           ADMISSION
        ════════════════════════════════════════════════ */
        .adm-grid { display:grid;grid-template-columns:1fr 1.3fr;gap:40px;align-items:start; }
        .adm-info {
          background:var(--off);border-radius:14px;padding:22px 20px;
          border:1px solid var(--border);position:sticky;top:100px;
        }
        .adm-item { display:flex;gap:14px;align-items:flex-start;padding:12px 0;border-bottom:1px solid var(--border); }
        .adm-item:last-child { border-bottom:none; }
        .adm-icon { width:42px;height:42px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0; }
        .adm-title { font-weight:700;font-size:14px;color:var(--navy);margin-bottom:3px; }
        .adm-sub   { font-size:13px;color:#999;line-height:1.6; }

        .adm-form-wrap {
          background:white;border-radius:14px;padding:22px;
          border:1px solid var(--border);box-shadow:var(--sh);
        }
        .f-field { margin-bottom:12px; }
        .f-field label { display:block;font-size:11px;font-weight:700;color:var(--navy);margin-bottom:7px;letter-spacing:0.5px;text-transform:uppercase; }
        .f-field input, .f-field select {
          width:100%;padding:13px 15px;border:1.5px solid var(--border);border-radius:7px;
          font-family:var(--sans);font-size:15px;color:var(--dark);
          background:var(--off);outline:none;transition:all 0.2s ease;appearance:none;
        }
        .f-field input:focus, .f-field select:focus {
          border-color:var(--navy);background:white;box-shadow:0 0 0 3px rgba(26,58,92,0.08);
        }
        .f-submit {
          width:100%;padding:15px;background:var(--navy);color:white;
          border:2px solid var(--navy);border-radius:7px;
          font-family:var(--sans);font-weight:700;font-size:16px;
          cursor:pointer;transition:all 0.22s ease;margin-top:6px;letter-spacing:0.2px;
        }
        .f-submit:hover { background:transparent;color:var(--navy);transform:translateY(-2px);box-shadow:0 8px 24px rgba(26,58,92,0.15); }

        .adm-success { text-align:center;padding:32px 16px; }
        .adm-tick {
          width:60px;height:60px;background:var(--green);border-radius:50%;
          display:flex;align-items:center;justify-content:center;
          font-size:26px;margin:0 auto 20px;
        }

        /* ════════════════════════════════════════════════
           CONTACT
        ════════════════════════════════════════════════ */
        .con-cards { display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:10px; }
        .con-card {
          background:white;border-radius:10px;padding:18px 16px;
          border:1px solid var(--border);text-align:center;transition:all 0.22s ease;
        }
        .con-card:hover { transform:translateY(-4px);box-shadow:var(--sh-lg);border-color:transparent; }
        .con-icon  { font-size:30px;margin-bottom:8px;display:block; }
        .con-title { font-weight:700;font-size:12px;color:var(--navy);margin-bottom:8px;text-transform:uppercase;letter-spacing:0.8px; }
        .con-body  { font-size:14px;color:var(--body);line-height:1.65;white-space:pre-line; }
        .map-box   { border-radius:12px;overflow:hidden;border:1px solid var(--border);box-shadow:var(--sh); }

        /* ════════════════════════════════════════════════
           RESPONSIVE
        ════════════════════════════════════════════════ */
        @media(max-width:992px){
          .hero-grid    { grid-template-columns:1fr; }
          .hero-visual  { display:none; }
          .about-grid   { grid-template-columns:1fr;gap:48px; }
          .test-grid    { grid-template-columns:1fr;gap:44px; }
          .adm-grid     { grid-template-columns:1fr;gap:36px; }
          .adm-info     { position:static; }
          .con-cards    { grid-template-columns:1fr 1fr; }
          .fac-grid     { grid-template-columns:1fr 1fr; }
          .stats-row    { grid-template-columns:1fr 1fr; }
          .s-item       { border-right:none;border-bottom:1px solid rgba(255,255,255,0.1); }
        }
        @media(max-width:640px){
          .hero-micro-stats { flex-direction:column;gap:20px; }
          .hms-item+.hms-item { border-left:none;padding-left:0;border-top:1px solid var(--border);padding-top:20px; }
          .prog-panel       { grid-template-columns:1fr; }
          .pp-left          { padding:22px 16px 14px; }
          .pp-right         { padding:14px 16px 22px; }
          .gal-grid         { grid-template-columns:1fr 1fr; }
          .gal-grid .g-main { grid-column:span 2; }
          .fac-grid         { grid-template-columns:1fr; }
          .con-cards        { grid-template-columns:1fr; }
          .why-grid         { grid-template-columns:1fr; }
          .adm-form-wrap    { padding:22px 16px; }
          .kk-wrap          { padding:0 18px; }
        }
      `}</style>

      {/* LIGHTBOX */}
      {lightboxImg && (
        <div className="lightbox" onClick={() => setLightboxImg(null)}>
          <span className="lb-close">×</span>
          <img
            src={lightboxImg}
            alt="Gallery"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* ══════════ HERO ══════════ */}
      <section className="hero">
        {/* faded logo watermark — sits behind all content */}
        <div className="hero-watermark" aria-hidden="true">
          <img src="/logo-1.png" alt="" />
        </div>

        <div className="kk-wrap">
          <div className="hero-grid">
            <div>
              <div className="hero-tag fu">
                <span className="hero-tag-dot" /> Admissions Open — 2025–26
              </div>
              <h1 className="h1 fu d1">
                Where Every Child
                <br />
                <em style={{ fontStyle: "italic", color: "#c342c6" }}>
                  Discovers Their Brilliance
                </em>
              </h1>
              <div className="hero-divider fu d2" />
              <p className="lead fu d2" style={{ maxWidth: 500 }}>
                At{" "}
                <strong style={{ color: "var(--navy)", fontWeight: 700 }}>
                  Kalinga Kids Play School
                </strong>
                , Patia, Bhubaneswar — we provide a nurturing, structured
                environment where children aged 2–6 grow academically, socially
                and emotionally.
              </p>
              <div className="d-flex flex-wrap gap-3 mt-4 fu d3">
                <Link to="/admission" className="btn-dk">
                  Apply for Admission →
                </Link>
                <Link to="/about" className="btn-ol">
                  Learn About Us
                </Link>
              </div>
              <div className="hero-micro-stats fu d4">
                <div className="hms-item">
                  <div className="hms-num">
                    <CountUp target={5000} suffix="+" />
                  </div>
                  <div className="hms-label">Students Enrolled</div>
                </div>
                <div className="hms-item">
                  <div className="hms-num">
                    <CountUp target={10} suffix="+" />
                  </div>
                  <div className="hms-label">Years of Excellence</div>
                </div>
                <div className="hms-item">
                  <div className="hms-num">
                    <CountUp target={98} suffix="%" />
                  </div>
                  <div className="hms-label">Parent Satisfaction</div>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-bg-sq hbsq-1" />
              <div className="hero-bg-sq hbsq-2" />
              <img
                src="https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&q=80"
                alt="Children at Kalinga Kids"
                className="hero-img"
              />
              <div className="hero-float-card hfc-top">
                <div className="hfc-label">Established</div>
                <div className="hfc-value">2012</div>
                <div className="hfc-sub">A decade of excellence</div>
              </div>
              <div className="hero-float-card hfc-bottom">
                <div className="hfc-label">Parent Rating</div>
                <div className="hfc-value" style={{ color: "var(--green)" }}>
                  ★ 4.9
                </div>
                <div className="hfc-sub">500+ reviews</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ STATS ══════════ */}
      <div className="stats-bar">
        <div className="kk-wrap">
          <div className="stats-row">
            {[
              { n: 5000, s: "+", l: "Happy Students", c: "var(--orange)" },
              { n: 20, s: "+", l: "Expert Educators", c: "var(--yellow)" },
              { n: 4, s: "", l: "Academic Programmes", c: "var(--green)" },
              { n: 98, s: "%", l: "Parent Satisfaction", c: "var(--sky)" },
            ].map((x, i) => (
              <div className="s-item" key={i}>
                <div className="s-num">
                  <CountUp target={x.n} suffix={x.s} />
                </div>
                <div className="s-label">{x.l}</div>
                <span className="s-line" style={{ background: x.c }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════ ABOUT ══════════ */}
      <section className="kk-sec" id="about" style={{ background: "white" }}>
        <div className="kk-wrap">
          <div className="about-grid">
            <div className="about-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=700&q=80"
                alt="About Kalinga Kids"
                className="about-img"
              />
              <div className="about-badge">
                <div className="ab-num">10+</div>
                <div className="ab-text">
                  Years of
                  <br />
                  Excellence
                </div>
              </div>
            </div>
            <div>
              <div className="eyebrow">About Kalinga Kids</div>
              <h2 className="h2" style={{ marginBottom: 20 }}>
                We Care Like Home —<br />
                <em style={{ fontStyle: "italic", color: "#c342c6" }}>
                  Because We Mean It
                </em>
              </h2>
              <p className="lead" style={{ marginBottom: 14 }}>
                Located in{" "}
                <strong style={{ color: "var(--navy)", fontWeight: 700 }}>
                  Kanan Vihar Phase-II, Patia, Bhubaneswar
                </strong>
                , Kalinga Kids Play School has been a trusted institution in
                early childhood education since 2014.
              </p>
              <p className="body-text">
                We believe every child is born with extraordinary potential. Our
                activity-based, child-centred curriculum ensures that learning
                is never a chore — it is an adventure. Our dedicated educators
                build genuine relationships with every family we serve.
              </p>
              <div className="why-grid">
                {whyUs.map((w, i) => (
                  <div className="why-card" key={i}>
                    <span className="wc-icon">{w.icon}</span>
                    <div className="wc-title">{w.title}</div>
                    <div className="wc-desc">{w.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ PROGRAMS ══════════ */}
      <section className="kk-sec" style={{ background: "var(--off)" }}>
        <div className="kk-wrap">
          <div className="text-center mb-5">
            <div className="eyebrow" style={{ justifyContent: "center" }}>
              Academic Programmes
            </div>
            <h2 className="h2">
              Structured Learning for
              <br />
              <em style={{ fontStyle: "italic", color: "var(--sky)" }}>
                Every Stage of Childhood
              </em>
            </h2>
          </div>
          <div className="prog-tabs">
            {programs.map((p, i) => (
              <button
                key={i}
                className={`prog-tab${activeProgram === i ? " is-active" : ""}`}
                onClick={() => setActiveProgram(i)}
              >
                {p.icon} {p.title}
              </button>
            ))}
          </div>
          <div className="prog-panel" key={activeProgram}>
            <div
              className="pp-left"
              style={{ background: programs[activeProgram].accent }}
            >
              <span className="pp-emoji">{programs[activeProgram].icon}</span>
              <div
                className="pp-age-tag"
                style={{
                  color: programs[activeProgram].color,
                  border: `2px solid ${programs[activeProgram].color}`,
                }}
              >
                {programs[activeProgram].age}
              </div>
            </div>
            <div className="pp-right">
              <div
                className="eyebrow"
                style={{ color: programs[activeProgram].color }}
              >
                {programs[activeProgram].title} Programme
              </div>
              <div className="pp-title">{programs[activeProgram].title}</div>
              <p className="pp-desc">{programs[activeProgram].desc}</p>
              <div className="pp-features">
                {[
                  "Play-based & structured learning",
                  "Qualified and caring educators",
                  "Small class sizes for personal attention",
                ].map((f, i) => (
                  <div className="pp-feat" key={i}>
                    <span
                      className="pp-dot"
                      style={{ background: programs[activeProgram].color }}
                    />
                    {f}
                  </div>
                ))}
              </div>
              <a
                href="/admission"
                className="btn-dk"
                style={{
                  alignSelf: "flex-start",
                  background: programs[activeProgram].color,
                  borderColor: programs[activeProgram].color,
                }}
              >
                Enquire About {programs[activeProgram].title} →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ GALLERY ══════════ */}
      <Gallery />
      {/* <section className="kk-sec" style={{ background: "white" }}>
        <div className="kk-wrap">
          <div className="gal-header">
            <div>
              <div className="eyebrow">Campus Life</div>
              <h2 className="h2">
                Moments at
                <br />
                <em style={{ fontStyle: "italic", color: "var(--orange)" }}>
                  Kalinga Kids
                </em>
              </h2>
            </div>
            <p
              className="body-text"
              style={{ maxWidth: 260, textAlign: "right" }}
            >
              Every day is filled with learning, laughter and meaningful
              milestones.
            </p>
          </div>
          <div className="gal-grid">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className={`g-item${i === 0 ? " g-main" : ""}`}
                onClick={() => setLightboxImg(img.src)}
              >
                <img src={img.src} alt={img.label} />
                <div className="g-overlay">
                  <span className="g-label">{img.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ══════════ FACILITIES ══════════ */}
      <section className="kk-sec" style={{ background: "var(--off)" }}>
        <div className="kk-wrap">
          <div className="text-center mb-5">
            <div className="eyebrow" style={{ justifyContent: "center" }}>
              Our Campus
            </div>
            <h2 className="h2">
              World-Class Facilities
              <br />
              <em style={{ fontStyle: "italic", color: "var(--green)" }}>
                Built for Young Learners
              </em>
            </h2>
          </div>
          <div className="fac-grid">
            {facilities.map((f, i) => (
              <div className="fac-card" key={i}>
                <span className="fac-icon">{f.icon}</span>
                <div className="fac-title">{f.title}</div>
                <p className="fac-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ TESTIMONIALS ══════════ */}
      <section className="test-section">
        <div className="kk-wrap">
          <div className="test-grid">
            <div>
              <div className="eyebrow">Parent Voices</div>
              <h2 className="h2" style={{ color: "white" }}>
                What Families
                <br />
                Say About Us
              </h2>
              <p className="test-desc">
                Real stories from the parents who trust us with their most
                precious people.
              </p>
              <div className="test-dots">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    className={`t-dot${activeTest === i ? " active" : ""}`}
                    onClick={() => setActiveTest(i)}
                  />
                ))}
              </div>
            </div>
            <div key={activeTest}>
              <div className="test-card">
                <div className="t-qmark">"</div>
                <p className="t-text">"{testimonials[activeTest].quote}"</p>
                <div className="t-author">
                  <div
                    className="t-avatar"
                    style={{ background: testimonials[activeTest].color }}
                  >
                    {testimonials[activeTest].initials}
                  </div>
                  <div>
                    <div className="t-name">
                      {testimonials[activeTest].name}
                    </div>
                    <div className="t-role">
                      {testimonials[activeTest].role}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ ADMISSION ══════════ */}
      {/* <section
        className="kk-sec"
        id="admission"
        style={{ background: "white" }}
      >
        <div className="kk-wrap">
          <div className="text-center mb-5">
            <div className="eyebrow" style={{ justifyContent: "center" }}>
              Enrol Today
            </div>
            <h2 className="h2">
              Begin Your Child's
              <br />
              <em style={{ fontStyle: "italic", color: "var(--orange)" }}>
                Journey With Us
              </em>
            </h2>
          </div>
          <div className="adm-grid">
            <div className="adm-info">
              <h3 className="h3" style={{ marginBottom: 6 }}>
                Why Kalinga Kids?
              </h3>
              <p
                className="body-text"
                style={{ marginBottom: 4, color: "#aaa" }}
              >
                Everything you need to feel confident in your choice.
              </p>
              {[
                {
                  icon: "📅",
                  color: "var(--sky)",
                  bg: "rgba(43,122,184,0.1)",
                  title: "Flexible Batches",
                  sub: "Morning & afternoon sessions to suit your schedule.",
                },
                {
                  icon: "💰",
                  color: "var(--green)",
                  bg: "rgba(46,139,87,0.1)",
                  title: "Affordable Fees",
                  sub: "Quality education with a transparent fee structure.",
                },
                {
                  icon: "🚌",
                  color: "var(--orange)",
                  bg: "rgba(232,83,58,0.1)",
                  title: "GPS-Tracked Transport",
                  sub: "Safe, monitored commuting for complete peace of mind.",
                },
                {
                  icon: "📲",
                  color: "var(--navy)",
                  bg: "rgba(26,58,92,0.1)",
                  title: "Daily Parent Updates",
                  sub: "Photos & progress shared via our parent portal.",
                },
              ].map((item, i) => (
                <div className="adm-item" key={i}>
                  <div
                    className="adm-icon"
                    style={{ background: item.bg, color: item.color }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div className="adm-title">{item.title}</div>
                    <div className="adm-sub">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="adm-form-wrap">
              {submitted ? (
                <div className="adm-success">
                  <div className="adm-tick">✓</div>
                  <h3 className="h3" style={{ marginBottom: 12 }}>
                    Enquiry Received!
                  </h3>
                  <p className="body-text">
                    Our admissions team will contact you within 24 hours to
                    discuss the next steps.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="h3" style={{ marginBottom: 6 }}>
                    Admission Enquiry
                  </h3>
                  <p
                    className="body-text"
                    style={{ marginBottom: 28, color: "#aaa" }}
                  >
                    Fill in the form and we'll be in touch shortly.
                  </p>
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-sm-6">
                        <div className="f-field">
                          <label>Parent / Guardian Name</label>
                          <input
                            type="text"
                            placeholder="Full name"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="f-field">
                          <label>Phone Number</label>
                          <input
                            type="tel"
                            placeholder="+91 00000 00000"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                phone: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="f-field">
                          <label>Child's Name</label>
                          <input
                            type="text"
                            placeholder="Child's full name"
                            value={formData.child}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                child: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="f-field">
                          <label>Programme of Interest</label>
                          <select
                            value={formData.program}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                program: e.target.value,
                              })
                            }
                            required
                          >
                            <option value="">Select programme</option>
                            <option>Play Group (2–3 Years)</option>
                            <option>Nursery (3–4 Years)</option>
                            <option>LKG (4–5 Years)</option>
                            <option>UKG (5–6 Years)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="f-submit">
                      Submit Enquiry →
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section> */}
      {/* <AdmissionForm /> */}

      {/* ══════════ CONTACT ══════════ */}
      <section className="kk-sec" style={{ background: "var(--off)" }}>
        <div className="kk-wrap">
          <div className="text-center mb-5">
            <div className="eyebrow" style={{ justifyContent: "center" }}>
              Find Us
            </div>
            <h2 className="h2">
              Visit{" "}
              <em style={{ fontStyle: "italic", color: "var(--sky)" }}>
                Kalinga Kids
              </em>
            </h2>
          </div>
          <div className="con-cards">
            {[
              {
                icon: "📍",
                title: "Address",
                body: "Kanan Vihar Phase-II\nPatia, Bhubaneswar – 751024",
              },
              { icon: "📞", title: "Phone", body: "+91 70088 44395" },
              { icon: "📧", title: "Email", body: "Kalingakidss@gmail.com" },
              {
                icon: "🕐",
                title: "School Hours",
                body: "Mon – Sat: 8 AM – 1 PM\nSunday: Closed",
              },
            ].map((c, i) => (
              <div className="con-card" key={i}>
                <span className="con-icon">{c.icon}</span>
                <div className="con-title">{c.title}</div>
                <div className="con-body">{c.body}</div>
              </div>
            ))}
          </div>
          <div className="map-box">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29926.107061537732!2d85.8036422189984!3d20.351391392542567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909e9c6ab6773%3A0xe86bebdee01461a!2sKalingakids%20playschool!5e0!3m2!1sen!2sin!4v1771529141462!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              title="Kalinga Kids Location"
            />
          </div>
        </div>
      </section>
    </>
  );
}
