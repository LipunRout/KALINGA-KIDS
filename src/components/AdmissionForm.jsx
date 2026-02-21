import { useState } from "react";
import { useForm } from "@formspree/react";

// ─────────────────────────────────────────────────────────────
//  KALINGA KIDS  ·  Admission Enquiry Form
//  Design direction: "Luxury editorial" — dark navy card with
//  warm off-white inputs, orange accents, crisp typography.
//  Every px is intentional. Zero alignment issues.
// ─────────────────────────────────────────────────────────────

const PROGRAMS = [
  { value: "Play Group", age: "2–3 yrs", emoji: "🎨", color: "#E8533A" },
  { value: "Nursery",    age: "3–4 yrs", emoji: "📖", color: "#2B7AB8" },
  { value: "LKG",        age: "4–5 yrs", emoji: "✏️",  color: "#2E8B57" },
  { value: "UKG",        age: "5–6 yrs", emoji: "🎓",  color: "#D4891A" },
];

export default function AdmissionForm() {
  const [form, setForm] = useState({ name:"", phone:"", child:"", email:"", program:"" });
  const [popup, setPopup] = useState(false);
  const [submitterName, setSubmitterName] = useState("");
  const [state, formSubmit] = useForm("xwvnroyz");

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitterName(form.name);
    await formSubmit(e);
    setPopup(true);
    setForm({ name:"", phone:"", child:"", email:"", program:"" });
  };

  return (
    <>
      {/* ─────────────────────────────────── STYLES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

        /* ── VARIABLES ───────────────────────────────── */
        .af {
          --navy   : #1A3A5C;
          --navy2  : #0f2336;
          --orange : #E8533A;
          --green  : #2E8B57;
          --sky    : #2B7AB8;
          --yellow : #D4891A;
          --red    : #C0392B;
          --off    : #F8F7F4;
          --border : rgba(255,255,255,0.10);
          --muted  : rgba(255,255,255,0.45);
          --serif  : 'DM Serif Display', Georgia, serif;
          --sans   : 'DM Sans', system-ui, sans-serif;
          font-family: var(--sans);
        }

        /* ── CARD SHELL ──────────────────────────────── */
        .af-card {
          background  : var(--navy);
          border-radius: 18px;
          overflow    : hidden;
          box-shadow  :
            0 0 0 1px rgba(255,255,255,0.06),
            0 32px 72px rgba(0,0,0,0.28);
          position    : relative;
        }

        /* top 5-colour stripe */
        .af-stripe {
          height: 4px;
          background: linear-gradient(90deg,
            var(--red), var(--orange), var(--yellow), var(--green), var(--sky));
          flex-shrink: 0;
        }

        /* faint dot-grid texture */
        .af-card::after {
          content : "";
          position: absolute;
          inset   : 0;
          background-image: radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px);
          background-size : 28px 28px;
          pointer-events  : none;
          z-index : 0;
        }

        /* ── HEADER ──────────────────────────────────── */
        .af-head {
          padding  : 26px 32px 22px;
          position : relative;
          z-index  : 1;
          border-bottom: 1px solid var(--border);
        }

        .af-head-eyebrow {
          font-size     : 10px;
          font-weight   : 700;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color         : var(--orange);
          display       : flex;
          align-items   : center;
          gap           : 8px;
          margin-bottom : 8px;
        }
        .af-head-eyebrow::before {
          content   : "";
          display   : block;
          width     : 18px;
          height    : 2px;
          background: var(--orange);
          border-radius: 2px;
        }

        .af-head-title {
          font-family: var(--serif);
          font-size  : 26px;
          font-weight: 400;
          color      : #fff;
          line-height: 1.18;
          margin     : 0;
        }
        .af-head-title em {
          font-style: italic;
          color     : #FFB347;
        }

        .af-head-sub {
          font-size  : 13px;
          color      : var(--muted);
          margin-top : 6px;
          font-weight: 400;
          line-height: 1.5;
        }

        /* ── FORM BODY ───────────────────────────────── */
        .af-body {
          padding : 24px 32px 28px;
          position: relative;
          z-index : 1;
        }

        /* ── ROW (two columns) ───────────────────────── */
        .af-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap    : 12px;
          margin-bottom: 12px;
        }

        /* ── SINGLE FIELD ────────────────────────────── */
        .af-field { display: flex; flex-direction: column; gap: 6px; }

        .af-lbl {
          font-size     : 10.5px;
          font-weight   : 700;
          color         : rgba(255,255,255,0.55);
          letter-spacing: 1.2px;
          text-transform: uppercase;
        }

        /* input base */
        .af-inp,
        .af-sel {
          width      : 100%;
          padding    : 13px 15px;
          background : rgba(255,255,255,0.06);
          border     : 1.5px solid rgba(255,255,255,0.11);
          border-radius: 9px;
          font-family: var(--sans);
          font-size  : 14.5px;
          font-weight: 400;
          color      : #fff;
          outline    : none;
          transition : border-color 0.2s, background 0.2s, box-shadow 0.2s;
          appearance : none;
          box-sizing : border-box;
        }
        .af-inp::placeholder { color: rgba(255,255,255,0.28); }
        .af-inp:focus,
        .af-sel:focus {
          border-color: var(--orange);
          background  : rgba(255,255,255,0.10);
          box-shadow  : 0 0 0 3px rgba(232,83,58,0.18);
        }

        /* select wrapper keeps arrow aligned */
        .af-sel-wrap {
          position: relative;
          display : block;
        }
        .af-sel-wrap::after {
          content : "";
          position: absolute;
          right   : 14px;
          top     : 50%;
          transform: translateY(-50%);
          border-left  : 5px solid transparent;
          border-right : 5px solid transparent;
          border-top   : 6px solid rgba(255,255,255,0.35);
          pointer-events: none;
          transition   : border-top-color 0.2s;
        }
        .af-sel-wrap:focus-within::after { border-top-color: var(--orange); }
        .af-sel { padding-right: 38px; }
        .af-sel option { background: var(--navy); color: #fff; }

        /* ── PROGRAMME TILES ─────────────────────────── */
        .af-prog-lbl {
          font-size     : 10.5px;
          font-weight   : 700;
          color         : rgba(255,255,255,0.55);
          letter-spacing: 1.2px;
          text-transform: uppercase;
          margin-bottom : 8px;
        }

        .af-prog-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap    : 8px;
          margin-bottom: 18px;
        }

        .af-prog-opt { position: relative; }
        .af-prog-opt input {
          position: absolute;
          opacity : 0;
          width: 0; height: 0;
        }

        .af-prog-tile {
          display       : flex;
          flex-direction: column;
          align-items   : center;
          justify-content: center;
          gap           : 4px;
          padding       : 14px 6px 12px;
          border        : 1.5px solid rgba(255,255,255,0.10);
          border-radius : 11px;
          background    : rgba(255,255,255,0.04);
          cursor        : pointer;
          transition    : all 0.2s ease;
          text-align    : center;
          user-select   : none;
          -webkit-user-select: none;
        }
        .af-prog-tile:hover {
          border-color: rgba(255,255,255,0.3);
          background  : rgba(255,255,255,0.08);
          transform   : translateY(-3px);
          box-shadow  : 0 8px 20px rgba(0,0,0,0.25);
        }
        /* selected */
        .af-prog-opt input:checked + .af-prog-tile {
          background  : rgba(255,255,255,0.10);
          border-color: var(--pc, #E8533A);
          box-shadow  : 0 0 0 3px color-mix(in srgb, var(--pc, #E8533A) 22%, transparent),
                        0 8px 20px rgba(0,0,0,0.25);
          transform   : translateY(-3px);
        }

        .af-prog-emoji {
          font-size : 22px;
          line-height: 1;
          display   : block;
          transition: transform 0.2s;
        }
        .af-prog-opt input:checked + .af-prog-tile .af-prog-emoji { transform: scale(1.22) rotate(-5deg); }

        .af-prog-name {
          font-size  : 11.5px;
          font-weight: 700;
          color      : rgba(255,255,255,0.8);
          line-height: 1.2;
          transition : color 0.2s;
        }
        .af-prog-opt input:checked + .af-prog-tile .af-prog-name { color: var(--pc, #E8533A); }

        .af-prog-age {
          font-size  : 10px;
          color      : rgba(255,255,255,0.35);
          font-weight: 500;
          transition : color 0.2s;
        }
        .af-prog-opt input:checked + .af-prog-tile .af-prog-age { color: rgba(255,255,255,0.6); }

        /* ── SUBMIT BUTTON ───────────────────────────── */
        .af-btn {
          width        : 100%;
          padding      : 15px 24px;
          background   : var(--orange);
          color        : #fff;
          border       : 2px solid var(--orange);
          border-radius: 10px;
          font-family  : var(--sans);
          font-weight  : 700;
          font-size    : 15px;
          letter-spacing: 0.3px;
          cursor       : pointer;
          display      : flex;
          align-items  : center;
          justify-content: center;
          gap          : 10px;
          position     : relative;
          overflow     : hidden;
          transition   : all 0.22s ease;
        }
        /* shimmer sweep */
        .af-btn::before {
          content   : "";
          position  : absolute;
          top: 0; left: -100%;
          width: 50%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
          transition: left 0.55s ease;
        }
        .af-btn:hover:not(:disabled)::before { left: 160%; }
        .af-btn:hover:not(:disabled) {
          background : #d44027;
          border-color: #d44027;
          box-shadow : 0 10px 32px rgba(232,83,58,0.4);
          transform  : translateY(-2px);
        }
        .af-btn:active:not(:disabled) { transform: translateY(0); }
        .af-btn:disabled { opacity: 0.45; cursor: not-allowed; }

        .af-btn-arrow {
          font-size : 18px;
          transition: transform 0.2s;
          display   : inline-block;
        }
        .af-btn:hover:not(:disabled) .af-btn-arrow { transform: translateX(5px); }

        .af-spin {
          width: 17px; height: 17px;
          border: 2.5px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: afSpin 0.65s linear infinite;
          flex-shrink: 0;
        }
        @keyframes afSpin { to { transform: rotate(360deg); } }

        /* trust badges */
        .af-trust {
          display    : flex;
          align-items: center;
          justify-content: center;
          gap        : 20px;
          margin-top : 14px;
          flex-wrap  : wrap;
        }
        .af-trust-item {
          display    : flex;
          align-items: center;
          gap        : 5px;
          font-size  : 11.5px;
          color      : rgba(255,255,255,0.3);
          font-weight: 500;
          white-space: nowrap;
        }
        .af-trust-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        /* error */
        .af-err {
          display    : flex;
          align-items: center;
          gap        : 8px;
          background : rgba(192,57,43,0.18);
          border     : 1.5px solid rgba(192,57,43,0.35);
          border-radius: 8px;
          padding    : 11px 14px;
          font-size  : 13.5px;
          color      : #ff8070;
          margin-bottom: 14px;
          font-weight: 500;
        }

        /* ── SUCCESS POPUP ───────────────────────────── */
        .af-ov {
          position: fixed;
          inset   : 0;
          background: rgba(8,16,26,0.82);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          z-index : 99999;
          display : flex;
          align-items: center;
          justify-content: center;
          padding : 24px;
          animation: afOvIn 0.25s ease both;
        }
        @keyframes afOvIn { from{opacity:0} to{opacity:1} }

        .af-pop {
          background   : #fff;
          border-radius: 20px;
          max-width    : 420px;
          width        : 100%;
          overflow     : hidden;
          box-shadow   : 0 48px 100px rgba(0,0,0,0.4);
          animation    : afPopIn 0.5s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes afPopIn {
          from { opacity:0; transform: scale(0.82) translateY(36px); }
          to   { opacity:1; transform: scale(1)    translateY(0);    }
        }

        /* dark top half */
        .af-pop-top {
          background: var(--navy2, #0f2336);
          padding   : 36px 32px 30px;
          text-align: center;
          position  : relative;
          overflow  : hidden;
        }
        /* glows */
        .af-pop-top::before {
          content: ""; position:absolute;
          top:-60px; right:-60px; width:200px; height:200px;
          background: radial-gradient(circle, rgba(232,83,58,0.22), transparent 65%);
          border-radius: 50%; pointer-events:none;
        }
        .af-pop-top::after {
          content: ""; position:absolute;
          bottom:-50px; left:-40px; width:160px; height:160px;
          background: radial-gradient(circle, rgba(46,139,87,0.2), transparent 65%);
          border-radius: 50%; pointer-events:none;
        }

        .af-pop-stripe2 {
          height: 4px;
          background: linear-gradient(90deg, var(--red,#C0392B), #E8533A, #D4891A, #2E8B57, #2B7AB8);
          margin: -36px -32px 30px;
        }

        /* tick */
        .af-tick-ring {
          width: 78px; height: 78px;
          border-radius: 50%;
          background: linear-gradient(135deg, #2E8B57, #45c57a);
          display: flex; align-items:center; justify-content:center;
          margin: 0 auto 18px;
          box-shadow:
            0 0 0 12px rgba(46,139,87,0.14),
            0 14px 40px rgba(46,139,87,0.35);
          position: relative; z-index:1;
          animation: afTick 0.55s cubic-bezier(0.16,1,0.3,1) 0.1s both;
        }
        @keyframes afTick {
          from { transform:scale(0) rotate(-30deg); opacity:0; }
          to   { transform:scale(1) rotate(0deg);   opacity:1; }
        }
        .af-tick-svg {
          width:32px; height:32px;
          stroke:#fff; stroke-width:2.8;
          fill:none; stroke-linecap:round; stroke-linejoin:round;
        }
        .af-tick-path {
          stroke-dasharray : 44;
          stroke-dashoffset: 44;
          animation: afDraw 0.45s ease 0.55s forwards;
        }
        @keyframes afDraw { to { stroke-dashoffset: 0; } }

        .af-pop-h {
          font-family: var(--serif, 'DM Serif Display',Georgia,serif);
          font-size  : 28px;
          color      : #fff;
          margin-bottom: 8px;
          position   : relative; z-index:1;
          animation  : afUp 0.45s ease 0.2s both;
        }
        .af-pop-sub {
          font-size  : 14px;
          color      : rgba(255,255,255,0.55);
          line-height: 1.65;
          position   : relative; z-index:1;
          animation  : afUp 0.45s ease 0.3s both;
        }
        .af-pop-sub strong { color:rgba(255,255,255,0.88); font-weight:600; }
        @keyframes afUp {
          from { opacity:0; transform:translateY(14px); }
          to   { opacity:1; transform:translateY(0);    }
        }

        /* white bottom half */
        .af-pop-bot {
          padding: 26px 28px 28px;
        }

        .af-steps-label {
          font-size     : 10px;
          font-weight   : 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color         : #ccc;
          text-align    : center;
          display       : flex;
          align-items   : center;
          gap           : 10px;
          margin-bottom : 14px;
        }
        .af-steps-label::before,
        .af-steps-label::after { content:""; flex:1; height:1px; background:#E8E6E0; }

        .af-steps { display:flex; flex-direction:column; gap:8px; margin-bottom:22px; }

        .af-step {
          display    : flex;
          align-items: center;
          gap        : 12px;
          background : #F8F7F4;
          border     : 1px solid #E8E6E0;
          border-radius: 10px;
          padding    : 12px 14px;
          animation  : afUp 0.4s ease both;
        }
        .af-step:nth-child(1){animation-delay:0.35s}
        .af-step:nth-child(2){animation-delay:0.45s}
        .af-step:nth-child(3){animation-delay:0.55s}

        .af-step-num {
          width:26px; height:26px;
          border-radius:50%;
          display:flex; align-items:center; justify-content:center;
          font-size:12px; font-weight:700;
          color:#fff; flex-shrink:0;
        }
        .af-step-txt { font-size:13.5px; color:#555; line-height:1.4; }

        .af-pop-close {
          width:100%; padding:14px;
          background:#1A3A5C; color:#fff;
          border:2px solid #1A3A5C;
          border-radius:10px;
          font-family:var(--sans,'DM Sans',system-ui,sans-serif);
          font-weight:700; font-size:15px;
          cursor:pointer;
          transition:all 0.22s ease;
          display:flex; align-items:center; justify-content:center; gap:8px;
        }
        .af-pop-close:hover {
          background:transparent; color:#1A3A5C;
          transform:translateY(-1px);
          box-shadow:0 6px 20px rgba(26,58,92,0.15);
        }

        /* ── RESPONSIVE ──────────────────────────────── */
        @media(max-width:560px){
          .af-row           { grid-template-columns:1fr; }
          .af-prog-row      { grid-template-columns:1fr 1fr; }
          .af-head, .af-body{ padding-left:20px; padding-right:20px; }
          .af-pop-top       { padding:28px 20px 24px; }
          .af-pop-stripe2   { margin:-28px -20px 24px; }
          .af-pop-bot       { padding:20px 18px 24px; }
          .af-trust         { gap:12px; }
        }
      `}</style>

      {/* ─────────────────────── SUCCESS POPUP ── */}
      {popup && (
        <div className="af-ov" onClick={(e)=>e.target===e.currentTarget&&setPopup(false)}>
          <div className="af-pop" role="dialog" aria-modal="true">

            <div className="af-pop-top">
              <div className="af-pop-stripe2" />

              <div className="af-tick-ring">
                <svg className="af-tick-svg" viewBox="0 0 32 32">
                  <polyline className="af-tick-path" points="6,16 13,23 26,9" />
                </svg>
              </div>

              <h2 className="af-pop-h">Enquiry Received!</h2>
              <p className="af-pop-sub">
                Thank you{submitterName ? <>, <strong>{submitterName}</strong></> : ""}!<br/>
                We'll call you within <strong>24 hours</strong>.
              </p>
            </div>

            <div className="af-pop-bot">
              <div className="af-steps-label">What Happens Next</div>

              <div className="af-steps">
                {[
                  { c:"#2B7AB8", t:"Confirmation call from our admissions team"   },
                  { c:"#2E8B57", t:"Schedule a campus visit at your convenience"  },
                  { c:"#E8533A", t:"Admission documents shared via WhatsApp"      },
                ].map((s,i)=>(
                  <div className="af-step" key={i}>
                    <div className="af-step-num" style={{background:s.c}}>{i+1}</div>
                    <div className="af-step-txt">{s.t}</div>
                  </div>
                ))}
              </div>

              <button className="af-pop-close" onClick={()=>setPopup(false)}>
                Done &nbsp;→
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ─────────────────────────── FORM CARD ── */}
      <div className="af">
        <div className="af-card">
          <div className="af-stripe" />

          {/* header */}
          <div className="af-head">
            <div className="af-head-eyebrow">2025–26 Admissions Open</div>
            <h3 className="af-head-title">
              Begin Your Child's <em>Journey</em>
            </h3>
            <p className="af-head-sub">Fill in the details — we'll be in touch within 24 hours.</p>
          </div>

          {/* body */}
          <div className="af-body">
            <form onSubmit={handleSubmit}>

              {state.errors?.length > 0 && (
                <div className="af-err">⚠ Something went wrong. Please try again.</div>
              )}

              {/* row 1 — name + phone */}
              <div className="af-row">
                <div className="af-field">
                  <label className="af-lbl">Parent Name</label>
                  <input className="af-inp" type="text" name="name"
                    placeholder="Full name"
                    value={form.name} onChange={set("name")} required />
                </div>
                <div className="af-field">
                  <label className="af-lbl">Phone Number</label>
                  <input className="af-inp" type="tel" name="phone"
                    placeholder="+91 00000 00000"
                    value={form.phone} onChange={set("phone")} required />
                </div>
              </div>

              {/* row 2 — child + email */}
              <div className="af-row">
                <div className="af-field">
                  <label className="af-lbl">Child's Name</label>
                  <input className="af-inp" type="text" name="child"
                    placeholder="Child's full name"
                    value={form.child} onChange={set("child")} required />
                </div>
                <div className="af-field">
                  <label className="af-lbl">Email Address</label>
                  <input className="af-inp" type="email" name="email"
                    placeholder="your@email.com"
                    value={form.email} onChange={set("email")} required />
                </div>
              </div>

              {/* programme picker */}
              <div className="af-prog-lbl">Programme of Interest</div>
              <div className="af-prog-row">
                {PROGRAMS.map((p) => (
                  <label
                    className="af-prog-opt"
                    key={p.value}
                    style={{"--pc": p.color}}
                  >
                    <input
                      type="radio" name="program" value={p.value}
                      checked={form.program === p.value}
                      onChange={set("program")} required
                    />
                    <div className="af-prog-tile">
                      <span className="af-prog-emoji">{p.emoji}</span>
                      <span className="af-prog-name">{p.value}</span>
                      <span className="af-prog-age">{p.age}</span>
                    </div>
                  </label>
                ))}
              </div>

              {/* submit */}
              <button type="submit" className="af-btn" disabled={state.submitting}>
                {state.submitting
                  ? <><div className="af-spin"/> Submitting...</>
                  : <>Submit Enquiry <span className="af-btn-arrow">→</span></>
                }
              </button>

              {/* trust */}
              <div className="af-trust">
                {[
                  {dot:"#2E8B57", t:"Reply within 24 hrs"},
                  {dot:"#2B7AB8", t:"No spam, ever"},
                  {dot:"#E8533A", t:"Free consultation"},
                ].map((x,i)=>(
                  <div className="af-trust-item" key={i}>
                    <span className="af-trust-dot" style={{background:x.dot}}/>
                    {x.t}
                  </div>
                ))}
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}