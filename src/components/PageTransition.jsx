// PageTransition.jsx
// ─────────────────────────────────────────────────────────────
//  Smooth route transition — pure CSS, no flicker, no library.
//
//  HOW TO USE in App.jsx:
//
//    import PageTransition from "./PageTransition";
//
//    <BrowserRouter>
//      <Navbar />
//      <Routes>
//        <Route path="/"          element={<PageTransition><Home /></PageTransition>}      />
//        <Route path="/about"     element={<PageTransition><About /></PageTransition>}     />
//        <Route path="/programs"  element={<PageTransition><Programs /></PageTransition>}  />
//        <Route path="/gallery"   element={<PageTransition><Gallery /></PageTransition>}   />
//        <Route path="/admission" element={<PageTransition><Admission /></PageTransition>} />
//        <Route path="/contact"   element={<PageTransition><Contact /></PageTransition>}   />
//      </Routes>
//      <Footer />
//    </BrowserRouter>
//
//  React re-mounts <PageTransition> on every route change
//  (because it's a fresh element in each Route), so the CSS
//  animation fires naturally from 0 → 1 on every navigation.
//  ScrollToTop is also handled here — no separate component needed.
// ─────────────────────────────────────────────────────────────

import { useEffect } from "react";

export default function PageTransition({ children }) {
  // scroll to top instantly when this component mounts (= new route)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <style>{`
        @keyframes pageIn {
          0% {
            opacity: 0;
            transform: translateY(16px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .page-transition {
          animation: pageIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
      `}</style>

      <div className="page-transition">
        {children}
      </div>
    </>
  );
}