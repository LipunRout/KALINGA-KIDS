import { useState, useEffect, useRef } from "react";

// ============================================================
// KALINGA KIDS — MIND-BLOWING PLAYSCHOOL HOMEPAGE
// Aesthetic: Joyful Maximalism — bold, bubbly, alive
// ============================================================

const floatingEmojis = ["🌟", "🎈", "🦋", "🌈", "⭐", "🎨", "🌻", "🎵", "🐣", "🍭"];

function FloatingEmoji({ emoji, style }) {
  return (
    <span className="floating-emoji" style={style}>
      {emoji}
    </span>
  );
}

function CountUp({ target, duration = 2000, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = target / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const programs = [
  {
    icon: "🎨",
    title: "Play Group",
    age: "2 – 3 Years",
    desc: "A joyful introduction through play, music, storytelling and sensory adventures.",
    color: "#FF6B6B",
    bg: "#FFF0F0",
  },
  {
    icon: "📚",
    title: "Nursery",
    age: "3 – 4 Years",
    desc: "Encouraging curiosity through interactive lessons and creative expression.",
    color: "#FFB347",
    bg: "#FFF8EE",
  },
  {
    icon: "✏️",
    title: "LKG",
    age: "4 – 5 Years",
    desc: "Developing early literacy, numeracy and social skills in a nurturing environment.",
    color: "#4ECDC4",
    bg: "#F0FFFE",
  },
  {
    icon: "🎓",
    title: "UKG",
    age: "5 – 6 Years",
    desc: "Preparing children for primary school with academic readiness and confidence.",
    color: "#9B59B6",
    bg: "#F8F0FF",
  },
];

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=600&q=80", label: "Learning Together" },
  { src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80", label: "Creative Time" },
  { src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&q=80", label: "Story Hour" },
  { src: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=600&q=80", label: "Art & Craft" },
  { src: "https://images.unsplash.com/photo-1603575448361-4ef76f84f75d?w=600&q=80", label: "Play Time" },
  { src: "https://images.unsplash.com/photo-1587614203976-365c74645e83?w=600&q=80", label: "Outdoor Fun" },
];

const facilities = [
  { icon: "🏫", title: "Safe Classrooms", desc: "Secure, child-friendly learning spaces designed for curiosity." },
  { icon: "🛝", title: "Play Area", desc: "Indoor & outdoor play for balanced physical development." },
  { icon: "📷", title: "CCTV Security", desc: "24/7 monitoring for your child's complete safety." },
  { icon: "🎵", title: "Music & Dance", desc: "Dedicated space to nurture rhythm and expression." },
  { icon: "📖", title: "Story Corner", desc: "A cozy reading nook filled with wonderful books." },
  { icon: "🍱", title: "Healthy Meals", desc: "Nutritious, kid-approved snacks and lunch daily." },
];

const testimonials = [
  { name: "Priya Mohanty", child: "Mom of Aanya, 4", quote: "Kalinga Kids transformed my shy daughter into a confident, happy child. Best decision we ever made!", avatar: "👩" },
  { name: "Rajesh Panda", child: "Dad of Arjun, 3", quote: "The teachers here are incredible. My son literally runs to school every morning. That says it all!", avatar: "👨" },
  { name: "Sunita Das", child: "Mom of Meera, 5", quote: "Amazing environment, loving teachers. My daughter learned so much while having the time of her life.", avatar: "👩‍🦱" },
];

export default function Home() {
  const [activeProgram, setActiveProgram] = useState(0);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [formData, setFormData] = useState({ name: "", phone: "", child: "", program: "" });
  const [submitted, setSubmitted] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setActiveTestimonial((p) => (p + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", phone: "", child: "", program: "" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;600;700;800&family=Nunito:wght@400;600;700;800&display=swap');

        :root {
          --yellow: #FFD93D;
          --orange: #FF6B35;
          --pink: #FF6B9D;
          --blue: #4ECDC4;
          --purple: #9B59B6;
          --green: #6BCB77;
          --red: #FF6B6B;
          --white: #FFFFFF;
          --dark: #2D2D2D;
          --light: #FFFDF7;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'Nunito', sans-serif;
          background: var(--light);
          overflow-x: hidden;
        }

        /* ========== FLOATING EMOJIS ========== */
        .floating-emoji {
          position: absolute;
          animation: floatUp 8s ease-in-out infinite;
          pointer-events: none;
          z-index: 1;
          user-select: none;
        }

        @keyframes floatUp {
          0%   { transform: translateY(0) rotate(0deg);   opacity: 0.7; }
          50%  { transform: translateY(-30px) rotate(10deg); opacity: 1; }
          100% { transform: translateY(0) rotate(0deg);   opacity: 0.7; }
        }

        /* ========== HERO ========== */
        .hero-section {
          min-height: 100vh;
          background: linear-gradient(135deg, #FFF7D6 0%, #FFE4EC 40%, #D8F3FF 100%);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          padding: 100px 0 60px;
        }

        .hero-section::before {
          content: "";
          position: absolute;
          top: -100px; right: -100px;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(255,107,157,0.2), transparent 70%);
          border-radius: 50%;
          animation: pulse 4s ease-in-out infinite;
        }

        .hero-section::after {
          content: "";
          position: absolute;
          bottom: -80px; left: -80px;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(78,205,196,0.25), transparent 70%);
          border-radius: 50%;
          animation: pulse 5s ease-in-out infinite reverse;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.15); }
        }

        .hero-badge {
          display: inline-block;
          background: linear-gradient(135deg, var(--yellow), var(--orange));
          color: white;
          font-family: 'Baloo 2', cursive;
          font-weight: 700;
          font-size: 14px;
          padding: 6px 18px;
          border-radius: 50px;
          margin-bottom: 20px;
          box-shadow: 0 4px 15px rgba(255,107,53,0.35);
          animation: bounceIn 0.8s cubic-bezier(.36,.07,.19,.97) both;
          letter-spacing: 0.5px;
        }

        @keyframes bounceIn {
          0%   { transform: scale(0); opacity: 0; }
          60%  { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); }
        }

        .hero-title {
          font-family: 'Baloo 2', cursive;
          font-size: clamp(40px, 6vw, 72px);
          font-weight: 800;
          line-height: 1.1;
          color: var(--dark);
          animation: slideUp 0.9s ease both 0.2s;
        }

        .hero-title .highlight {
          position: relative;
          color: var(--orange);
          display: inline-block;
        }

        .hero-title .highlight::after {
          content: "";
          position: absolute;
          bottom: 0; left: 0;
          width: 100%; height: 12px;
          background: var(--yellow);
          z-index: -1;
          border-radius: 4px;
          transform: skewX(-5deg);
        }

        .hero-subtitle {
          font-size: 18px;
          color: #555;
          max-width: 480px;
          line-height: 1.7;
          animation: slideUp 0.9s ease both 0.4s;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .hero-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, var(--orange), var(--pink));
          color: white;
          font-family: 'Baloo 2', cursive;
          font-weight: 700;
          font-size: 18px;
          padding: 16px 36px;
          border-radius: 60px;
          text-decoration: none;
          box-shadow: 0 8px 30px rgba(255,107,53,0.4);
          transition: all 0.3s ease;
          animation: slideUp 0.9s ease both 0.6s;
          border: none;
          cursor: pointer;
        }

        .hero-cta:hover {
          transform: translateY(-4px) scale(1.04);
          box-shadow: 0 14px 40px rgba(255,107,53,0.5);
          color: white;
          text-decoration: none;
        }

        .hero-cta-secondary {
          background: white;
          color: var(--orange);
          border: 3px solid var(--orange);
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Baloo 2', cursive;
          font-weight: 700;
          font-size: 16px;
          padding: 13px 28px;
          border-radius: 60px;
          text-decoration: none;
          transition: all 0.3s ease;
          animation: slideUp 0.9s ease both 0.7s;
        }

        .hero-cta-secondary:hover {
          background: var(--orange);
          color: white;
          text-decoration: none;
          transform: translateY(-3px);
        }

        .hero-img-wrapper {
          position: relative;
          animation: slideLeft 1s ease both 0.3s;
        }

        @keyframes slideLeft {
          from { opacity: 0; transform: translateX(50px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .hero-img {
          border-radius: 40px;
          width: 100%;
          box-shadow: 0 30px 70px rgba(0,0,0,0.15);
          transition: transform 0.5s ease;
        }

        .hero-img:hover { transform: scale(1.02) rotate(1deg); }

        .hero-badge-float {
          position: absolute;
          background: white;
          border-radius: 20px;
          padding: 12px 18px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.12);
          font-family: 'Baloo 2', cursive;
          font-weight: 700;
          font-size: 14px;
          z-index: 10;
        }

        .badge-float-1 {
          top: 20px; left: -30px;
          color: var(--orange);
          animation: float 3s ease-in-out infinite;
        }

        .badge-float-2 {
          bottom: 40px; right: -20px;
          color: var(--purple);
          animation: float 3s ease-in-out infinite 1.5s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-10px); }
        }

        /* ========== STATS STRIP ========== */
        .stats-strip {
          background: linear-gradient(135deg, var(--orange), var(--pink));
          padding: 50px 0;
          position: relative;
          overflow: hidden;
        }

        .stat-item { text-align: center; color: white; position: relative; }

        .stat-number {
          font-family: 'Baloo 2', cursive;
          font-size: clamp(42px, 6vw, 64px);
          font-weight: 800;
          line-height: 1;
          text-shadow: 0 4px 15px rgba(0,0,0,0.15);
        }

        .stat-label { font-size: 15px; font-weight: 600; opacity: 0.9; margin-top: 6px; }
        .stat-icon { font-size: 32px; margin-bottom: 8px; display: block; }

        /* ========== SECTION TITLES ========== */
        .section-heading {
          font-family: 'Baloo 2', cursive;
          font-size: clamp(32px, 4vw, 50px);
          font-weight: 800;
          color: var(--dark);
          margin-bottom: 16px;
        }

        .section-sub {
          font-size: 17px;
          color: #777;
          max-width: 560px;
          margin: 0 auto 50px;
          line-height: 1.7;
        }

        .section-pill {
          display: inline-block;
          background: var(--yellow);
          color: var(--dark);
          font-family: 'Baloo 2', cursive;
          font-weight: 700;
          font-size: 13px;
          padding: 4px 16px;
          border-radius: 50px;
          margin-bottom: 12px;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        /* ========== PROGRAMS ========== */
        .programs-section { padding: 100px 0; background: var(--light); }

        .program-tabs {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 40px;
        }

        .program-tab {
          background: white;
          border: 3px solid #eee;
          border-radius: 60px;
          padding: 10px 24px;
          font-family: 'Baloo 2', cursive;
          font-weight: 700;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #888;
        }

        .program-tab.active, .program-tab:hover {
          border-color: var(--orange);
          color: var(--orange);
          background: #FFF3EE;
          transform: translateY(-2px);
        }

        .program-card-big {
          border-radius: 32px;
          padding: 50px;
          display: flex;
          align-items: center;
          gap: 50px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.08);
          animation: fadeCard 0.4s ease;
        }

        @keyframes fadeCard {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .program-icon-big {
          font-size: 100px;
          flex-shrink: 0;
          width: 160px;
          height: 160px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          border-radius: 30px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          animation: float 3s ease-in-out infinite;
        }

        .program-age-badge {
          display: inline-block;
          background: white;
          border-radius: 50px;
          padding: 5px 16px;
          font-size: 13px;
          font-weight: 700;
          margin-bottom: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }

        .program-title-big {
          font-family: 'Baloo 2', cursive;
          font-size: 36px;
          font-weight: 800;
          margin-bottom: 10px;
          color: var(--dark);
        }

        .program-desc-big { font-size: 17px; color: #666; line-height: 1.7; max-width: 400px; }

        .program-learn-btn {
          display: inline-block;
          margin-top: 20px;
          padding: 12px 28px;
          border-radius: 50px;
          font-family: 'Baloo 2', cursive;
          font-weight: 700;
          font-size: 15px;
          text-decoration: none;
          color: white;
          transition: all 0.3s ease;
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
        }

        .program-learn-btn:hover {
          transform: translateY(-3px);
          color: white;
          text-decoration: none;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        /* ========== GALLERY ========== */
        .gallery-section {
          padding: 100px 0;
          background: linear-gradient(180deg, #FFF7D6 0%, #FFE4EC 100%);
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .gallery-grid .g-item:first-child { grid-column: span 2; }

        .gallery-item {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          transition: all 0.4s ease;
        }

        .gallery-item:hover {
          transform: scale(1.03) rotate(-1deg);
          box-shadow: 0 20px 50px rgba(0,0,0,0.2);
          z-index: 2;
        }

        .gallery-item img {
          width: 100%;
          height: 240px;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }

        .gallery-item:hover img { transform: scale(1.1); }

        .gallery-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(255,107,53,0.85), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          align-items: flex-end;
          padding: 20px;
        }

        .gallery-item:hover .gallery-overlay { opacity: 1; }

        .gallery-label {
          color: white;
          font-family: 'Baloo 2', cursive;
          font-size: 18px;
          font-weight: 700;
        }

        /* LIGHTBOX */
        .lightbox {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.9);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .lightbox img {
          max-width: 90vw;
          max-height: 85vh;
          border-radius: 20px;
          box-shadow: 0 30px 80px rgba(0,0,0,0.5);
        }

        .lightbox-close {
          position: absolute;
          top: 24px; right: 32px;
          color: white;
          font-size: 40px;
          cursor: pointer;
          font-family: 'Baloo 2', cursive;
          line-height: 1;
          opacity: 0.8;
          transition: opacity 0.2s;
        }

        .lightbox-close:hover { opacity: 1; }

        /* ========== FACILITIES ========== */
        .facilities-section { padding: 100px 0; background: white; }

        .facility-card {
          background: var(--light);
          border-radius: 24px;
          padding: 36px 28px;
          text-align: center;
          transition: all 0.35s ease;
          border: 3px solid transparent;
          cursor: default;
        }

        .facility-card:hover {
          transform: translateY(-10px);
          border-color: var(--yellow);
          box-shadow: 0 20px 50px rgba(255,107,53,0.12);
          background: white;
        }

        .facility-icon {
          font-size: 52px;
          margin-bottom: 16px;
          display: block;
          transition: transform 0.3s ease;
        }

        .facility-card:hover .facility-icon { transform: rotate(10deg) scale(1.2); }
        .facility-title { font-family: 'Baloo 2', cursive; font-size: 20px; font-weight: 700; color: var(--dark); margin-bottom: 8px; }
        .facility-desc { font-size: 14px; color: #888; line-height: 1.6; }

        /* ========== TESTIMONIALS ========== */
        .testimonials-section {
          padding: 100px 0;
          background: linear-gradient(135deg, #4ECDC4 0%, #44A8B3 100%);
          position: relative;
          overflow: hidden;
        }

        .testimonials-section::before {
          content: "❝";
          position: absolute;
          top: -40px; left: 5%;
          font-size: 300px;
          color: rgba(255,255,255,0.07);
          font-family: Georgia, serif;
          line-height: 1;
        }

        .testimonial-card {
          background: white;
          border-radius: 32px;
          padding: 50px;
          max-width: 700px;
          margin: 0 auto;
          text-align: center;
          box-shadow: 0 30px 80px rgba(0,0,0,0.15);
          animation: testimonialFade 0.5s ease;
        }

        @keyframes testimonialFade {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1); }
        }

        .testimonial-avatar { font-size: 64px; display: block; margin-bottom: 16px; }
        .testimonial-quote { font-size: 19px; color: #444; line-height: 1.8; font-style: italic; margin-bottom: 24px; }
        .testimonial-name { font-family: 'Baloo 2', cursive; font-size: 20px; font-weight: 800; color: var(--dark); }
        .testimonial-role { font-size: 14px; color: #999; }

        .testimonial-dots { display: flex; gap: 10px; justify-content: center; margin-top: 32px; }

        .testimonial-dot {
          width: 10px; height: 10px;
          border-radius: 50%;
          background: rgba(255,255,255,0.4);
          cursor: pointer;
          transition: all 0.3s ease;
          border: none; padding: 0;
        }

        .testimonial-dot.active { background: white; width: 28px; border-radius: 10px; }

        /* ========== ADMISSIONS ========== */
        .admission-section {
          padding: 100px 0;
          background: linear-gradient(135deg, #FFF7D6 0%, #FFE8D6 100%);
          position: relative;
          overflow: hidden;
        }

        .admission-section::after {
          content: "🎓";
          position: absolute;
          right: -30px; bottom: -30px;
          font-size: 200px;
          opacity: 0.08;
        }

        .admission-form {
          background: white;
          border-radius: 32px;
          padding: 50px;
          box-shadow: 0 30px 80px rgba(0,0,0,0.1);
        }

        .form-group { margin-bottom: 20px; }

        .form-label {
          font-family: 'Baloo 2', cursive;
          font-size: 15px;
          font-weight: 700;
          color: var(--dark);
          margin-bottom: 8px;
          display: block;
        }

        .form-control-custom {
          width: 100%;
          padding: 14px 20px;
          border: 3px solid #eee;
          border-radius: 16px;
          font-family: 'Nunito', sans-serif;
          font-size: 15px;
          color: var(--dark);
          transition: all 0.3s ease;
          outline: none;
          background: var(--light);
          appearance: none;
        }

        .form-control-custom:focus {
          border-color: var(--orange);
          box-shadow: 0 0 0 4px rgba(255,107,53,0.1);
          background: white;
        }

        .submit-btn {
          width: 100%;
          padding: 18px;
          background: linear-gradient(135deg, var(--orange), var(--pink));
          color: white;
          border: none;
          border-radius: 50px;
          font-family: 'Baloo 2', cursive;
          font-weight: 800;
          font-size: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 30px rgba(255,107,53,0.4);
          margin-top: 10px;
        }

        .submit-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 40px rgba(255,107,53,0.5);
        }

        .submit-success { text-align: center; padding: 40px; animation: bounceIn 0.6s ease; }
        .submit-success .big-emoji { font-size: 80px; display: block; margin-bottom: 16px; }

        .admission-info-card {
          background: linear-gradient(135deg, var(--orange), var(--pink));
          border-radius: 32px;
          padding: 50px 40px;
          color: white;
          height: 100%;
        }

        .info-item { display: flex; align-items: flex-start; gap: 16px; margin-bottom: 28px; }

        .info-icon {
          font-size: 30px;
          flex-shrink: 0;
          background: rgba(255,255,255,0.2);
          width: 52px; height: 52px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 14px;
        }

        .info-text-title { font-family: 'Baloo 2', cursive; font-size: 17px; font-weight: 700; margin-bottom: 4px; }
        .info-text-sub { font-size: 14px; opacity: 0.85; line-height: 1.5; }

        /* ========== CONTACT ========== */
        .contact-section { padding: 100px 0; background: var(--dark); color: white; }

        .contact-card {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 24px;
          padding: 40px 30px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .contact-card:hover {
          background: rgba(255,255,255,0.1);
          transform: translateY(-6px);
          border-color: var(--yellow);
        }

        .contact-icon { font-size: 48px; margin-bottom: 16px; display: block; }
        .contact-card h5 { font-family: 'Baloo 2', cursive; font-size: 20px; font-weight: 700; color: var(--yellow); margin-bottom: 10px; }
        .contact-card p { font-size: 15px; color: rgba(255,255,255,0.75); line-height: 1.6; }

        .map-container {
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          border: 3px solid rgba(255,255,255,0.1);
        }

        /* ========== ABOUT ========== */
        .about-section { padding: 100px 0; background: white; }
        .about-card { background: var(--light); border-radius: 32px; padding: 50px; }

        .value-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: white;
          border-radius: 50px;
          padding: 10px 20px;
          font-family: 'Baloo 2', cursive;
          font-weight: 700;
          font-size: 15px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.08);
          margin: 6px;
          transition: all 0.3s ease;
          color: var(--dark);
          border: 2px solid transparent;
        }

        .value-chip:hover {
          transform: translateY(-3px);
          border-color: var(--yellow);
          box-shadow: 0 8px 20px rgba(255,107,53,0.15);
        }

        /* ========== RESPONSIVE ========== */
        @media (max-width: 768px) {
          .gallery-grid { grid-template-columns: repeat(2, 1fr); }
          .gallery-grid .g-item:first-child { grid-column: span 2; }
          .program-card-big { flex-direction: column; padding: 30px; gap: 24px; text-align: center; }
          .program-icon-big { width: 120px; height: 120px; font-size: 70px; }
          .admission-form { padding: 30px 24px; }
          .testimonial-card { padding: 32px 24px; }
          .hero-badge-float { display: none; }
        }

        @media (max-width: 480px) {
          .gallery-grid { grid-template-columns: 1fr; }
          .gallery-grid .g-item:first-child { grid-column: span 1; }
        }
      `}</style>

      {/* ============ LIGHTBOX ============ */}
      {lightboxImg && (
        <div className="lightbox" onClick={() => setLightboxImg(null)}>
          <span className="lightbox-close">×</span>
          <img src={lightboxImg} alt="Gallery" onClick={(e) => e.stopPropagation()} />
        </div>
      )}

      {/* ============ HERO ============ */}
      <section className="hero-section">
        {floatingEmojis.map((e, i) => (
          <FloatingEmoji
            key={i}
            emoji={e}
            style={{
              left: `${5 + (i * 9.5) % 90}%`,
              top: `${10 + (i * 13) % 70}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${5 + (i % 4)}s`,
              fontSize: `${20 + (i % 3) * 8}px`,
            }}
          />
        ))}

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="hero-badge">🌟 Admissions Open 2025–26</span>
              <h1 className="hero-title mb-4">
                Where Little Minds Begin{" "}
                <span className="highlight">Big Journeys</span>
              </h1>
              <p className="hero-subtitle mb-5">
                At <strong>Kalinga Kids Play School</strong>, we nurture creativity,
                confidence and curiosity in every child — because every child deserves a magical start.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <a href="#admission" className="hero-cta">🎒 Enroll Now</a>
                <a href="#about" className="hero-cta-secondary">🎬 Our Story</a>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="hero-img-wrapper">
                <div className="hero-badge-float badge-float-1">🏆 Award Winning School</div>
                <img
                  src="https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&q=80"
                  className="hero-img"
                  alt="Happy kids at Kalinga Kids"
                />
                <div className="hero-badge-float badge-float-2">👶 500+ Happy Kids</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="stats-strip">
        <div className="container">
          <div className="row g-4 justify-content-center">
            {[
              { icon: "👶", num: 500, suffix: "+", label: "Happy Kids" },
              { icon: "👩‍🏫", num: 20, suffix: "+", label: "Expert Teachers" },
              { icon: "🏆", num: 10, suffix: "+", label: "Years of Excellence" },
              { icon: "⭐", num: 98, suffix: "%", label: "Parent Satisfaction" },
            ].map((s, i) => (
              <div className="col-6 col-md-3" key={i}>
                <div className="stat-item">
                  <span className="stat-icon">{s.icon}</span>
                  <div className="stat-number"><CountUp target={s.num} suffix={s.suffix} /></div>
                  <div className="stat-label">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ABOUT ============ */}
      <section className="about-section" id="about">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="about-card">
                <img
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=700&q=80"
                  alt="About Kalinga Kids"
                  style={{ width: "100%", borderRadius: "24px", marginBottom: "24px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                />
                <div className="d-flex flex-wrap justify-content-center">
                  {["🎨 Creativity", "💡 Curiosity", "🤝 Teamwork", "💪 Confidence", "📖 Learning", "❤️ Care"].map((v, i) => (
                    <span className="value-chip" key={i}>{v}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <span className="section-pill">About Us</span>
              <h2 className="section-heading">We Care Like <span style={{ color: "var(--orange)" }}>Home</span> 🏡</h2>
              <p style={{ fontSize: "17px", color: "#666", lineHeight: "1.8", marginBottom: "20px" }}>
                Located in the heart of <strong>Kanan Vihar Phase-II, Patia, Bhubaneswar</strong>, Kalinga Kids
                Play School has been a beacon of joy and learning for over a decade.
              </p>
              <p style={{ fontSize: "17px", color: "#666", lineHeight: "1.8", marginBottom: "30px" }}>
                We believe every child is born brilliant. Our activity-based approach, loving teachers, and
                vibrant environment ensure your little one grows — not just academically, but as a happy,
                confident human being.
              </p>
              <div className="row g-3">
                {[
                  { icon: "🎯", title: "Activity-Based Learning", desc: "Hands-on experiences that make concepts stick" },
                  { icon: "🌱", title: "Holistic Development", desc: "Mind, body and heart — all nurtured equally" },
                ].map((item, i) => (
                  <div className="col-sm-6" key={i}>
                    <div
                      style={{ background: "var(--light)", borderRadius: "20px", padding: "20px", border: "2px solid #eee", transition: "all 0.3s ease", cursor: "default" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--yellow)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "#eee"; e.currentTarget.style.transform = "translateY(0)"; }}
                    >
                      <span style={{ fontSize: "32px" }}>{item.icon}</span>
                      <h6 style={{ fontFamily: "'Baloo 2', cursive", fontWeight: "700", marginTop: "10px", marginBottom: "6px" }}>{item.title}</h6>
                      <p style={{ fontSize: "13px", color: "#888", margin: 0 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PROGRAMS ============ */}
      <section className="programs-section">
        <div className="container">
          <div className="text-center mb-2"><span className="section-pill">Programs</span></div>
          <h2 className="section-heading text-center">Programs Designed for <span style={{ color: "var(--orange)" }}>Every Stage</span></h2>
          <p className="section-sub text-center">From first steps to first grade — we've got the perfect program for your little star.</p>

          <div className="program-tabs">
            {programs.map((p, i) => (
              <button key={i} className={`program-tab ${activeProgram === i ? "active" : ""}`} onClick={() => setActiveProgram(i)}>
                {p.icon} {p.title}
              </button>
            ))}
          </div>

          <div className="program-card-big" style={{ background: programs[activeProgram].bg }} key={activeProgram}>
            <div className="program-icon-big">{programs[activeProgram].icon}</div>
            <div>
              <span className="program-age-badge" style={{ color: programs[activeProgram].color }}>
                🕐 {programs[activeProgram].age}
              </span>
              <h3 className="program-title-big">{programs[activeProgram].title}</h3>
              <p className="program-desc-big">{programs[activeProgram].desc}</p>
              <a
                href="#admission"
                className="program-learn-btn"
                style={{ background: `linear-gradient(135deg, ${programs[activeProgram].color}, ${programs[activeProgram].color}cc)` }}
              >
                Enroll in {programs[activeProgram].title} →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ GALLERY ============ */}
      <section className="gallery-section">
        <div className="container">
          <div className="text-center mb-2"><span className="section-pill">Gallery</span></div>
          <h2 className="section-heading text-center">Moments at <span style={{ color: "var(--orange)" }}>Kalinga Kids</span> 📸</h2>
          <p className="section-sub text-center">Every day is a celebration. Peek into the wonderful world inside our school!</p>

          <div className="gallery-grid">
            {galleryImages.map((img, i) => (
              <div key={i} className="gallery-item g-item" onClick={() => setLightboxImg(img.src)}>
                <img src={img.src} alt={img.label} />
                <div className="gallery-overlay">
                  <span className="gallery-label">{img.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FACILITIES ============ */}
      <section className="facilities-section">
        <div className="container">
          <div className="text-center mb-2"><span className="section-pill">Facilities</span></div>
          <h2 className="section-heading text-center">World-Class <span style={{ color: "var(--orange)" }}>Facilities</span> 🏫</h2>
          <p className="section-sub text-center">Everything your child needs to thrive — safe, fun and inspiring.</p>

          <div className="row g-4">
            {facilities.map((f, i) => (
              <div key={i} className="col-md-4 col-sm-6">
                <div className="facility-card">
                  <span className="facility-icon">{f.icon}</span>
                  <div className="facility-title">{f.title}</div>
                  <p className="facility-desc">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="testimonials-section">
        <div className="container">
          <div className="text-center mb-2">
            <span className="section-pill" style={{ background: "rgba(255,255,255,0.2)", color: "white" }}>Testimonials</span>
          </div>
          <h2 className="section-heading text-center mb-5" style={{ color: "white" }}>
            Parents <span style={{ color: "var(--yellow)" }}>Love</span> Us ❤️
          </h2>

          <div key={activeTestimonial}>
            <div className="testimonial-card">
              <span className="testimonial-avatar">{testimonials[activeTestimonial].avatar}</span>
              <p className="testimonial-quote">"{testimonials[activeTestimonial].quote}"</p>
              <div className="testimonial-name">{testimonials[activeTestimonial].name}</div>
              <div className="testimonial-role">{testimonials[activeTestimonial].child}</div>
            </div>
          </div>

          <div className="testimonial-dots">
            {testimonials.map((_, i) => (
              <button key={i} className={`testimonial-dot ${activeTestimonial === i ? "active" : ""}`} onClick={() => setActiveTestimonial(i)} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ ADMISSIONS ============ */}
      <section className="admission-section" id="admission">
        <div className="container">
          <div className="text-center mb-2"><span className="section-pill">Admissions</span></div>
          <h2 className="section-heading text-center">Ready to Join the <span style={{ color: "var(--orange)" }}>Kalinga Family?</span> 🎒</h2>
          <p className="section-sub text-center">Fill out the form and we'll get back to you within 24 hours!</p>

          <div className="row g-4 align-items-start">
            <div className="col-lg-5">
              <div className="admission-info-card">
                <h3 style={{ fontFamily: "'Baloo 2', cursive", fontSize: "26px", fontWeight: "800", marginBottom: "32px" }}>
                  Why Choose Us? 🌟
                </h3>
                {[
                  { icon: "📅", title: "Flexible Timings", sub: "Morning & afternoon batches available for your convenience." },
                  { icon: "💰", title: "Affordable Fees", sub: "Quality education shouldn't be a burden. Flexible fee structure." },
                  { icon: "🚌", title: "Safe Transport", sub: "GPS-tracked school buses for worry-free commuting." },
                  { icon: "📲", title: "Parent Updates", sub: "Daily updates & photos shared with parents via app." },
                ].map((item, i) => (
                  <div className="info-item" key={i}>
                    <div className="info-icon">{item.icon}</div>
                    <div>
                      <div className="info-text-title">{item.title}</div>
                      <div className="info-text-sub">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-7">
              <div className="admission-form">
                {submitted ? (
                  <div className="submit-success">
                    <span className="big-emoji">🎉</span>
                    <h3 style={{ fontFamily: "'Baloo 2', cursive", fontSize: "28px", fontWeight: "800", color: "var(--dark)", marginBottom: "12px" }}>
                      Yay! We Got It!
                    </h3>
                    <p style={{ color: "#666", fontSize: "17px" }}>
                      Thank you for your interest in Kalinga Kids. Our team will contact you within 24 hours!
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <h3 style={{ fontFamily: "'Baloo 2', cursive", fontSize: "26px", fontWeight: "800", color: "var(--dark)", marginBottom: "28px" }}>
                      Admission Enquiry Form 📝
                    </h3>

                    <div className="row g-3">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="form-label">Parent's Name</label>
                          <input type="text" className="form-control-custom" placeholder="Your full name"
                            value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="form-label">Phone Number</label>
                          <input type="tel" className="form-control-custom" placeholder="+91 98765 43210"
                            value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} required />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="form-label">Child's Name</label>
                          <input type="text" className="form-control-custom" placeholder="Child's full name"
                            value={formData.child} onChange={e => setFormData({ ...formData, child: e.target.value })} required />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="form-label">Program Interested In</label>
                          <select className="form-control-custom" value={formData.program}
                            onChange={e => setFormData({ ...formData, program: e.target.value })} required>
                            <option value="">Select a program</option>
                            <option>Play Group (2–3 Years)</option>
                            <option>Nursery (3–4 Years)</option>
                            <option>LKG (4–5 Years)</option>
                            <option>UKG (5–6 Years)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <button type="submit" className="submit-btn">🚀 Submit Enquiry</button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section className="contact-section">
        <div className="container">
          <div className="text-center mb-2">
            <span className="section-pill" style={{ background: "rgba(255,255,255,0.1)", color: "var(--yellow)" }}>Contact Us</span>
          </div>
          <h2 className="section-heading text-center mb-5" style={{ color: "white" }}>
            Come Visit <span style={{ color: "var(--yellow)" }}>Kalinga Kids</span> 📍
          </h2>

          <div className="row g-4 mb-5">
            {[
              { icon: "📍", title: "Address", info: "Kanan Vihar Phase-II\nPatia, Bhubaneswar, Odisha" },
              { icon: "📞", title: "Call Us", info: "+91 98765 43210\n+91 98765 43211" },
              { icon: "📧", title: "Email Us", info: "info@kalingakids.com\nadmissions@kalingakids.com" },
              { icon: "🕐", title: "School Hours", info: "Mon – Sat: 8:00 AM – 1:00 PM\nSun: Closed" },
            ].map((c, i) => (
              <div key={i} className="col-sm-6 col-lg-3">
                <div className="contact-card">
                  <span className="contact-icon">{c.icon}</span>
                  <h5>{c.title}</h5>
                  <p style={{ whiteSpace: "pre-line" }}>{c.info}</p>
                </div>
              </div>
            ))}
          </div>
          

          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29926.107061537732!2d85.8036422189984!3d20.351391392542567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909e9c6ab6773%3A0xe86bebdee01461a!2sKalingakids%20playschool!5e0!3m2!1sen!2sin!4v1771529141462!5m2!1sen!2sin"
              width="100%"
              height="380"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              title="Kalinga Kids Location"
            />
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <div style={{ background: "#1a1a1a", padding: "24px 0", textAlign: "center" }}>
        <p style={{ color: "rgba(255,255,255,0.5)", margin: 0, fontSize: "14px" }}>
          © 2025 Kalinga Kids Play School · Made with ❤️ in Bhubaneswar
        </p>
      </div>
    </>
  );
}