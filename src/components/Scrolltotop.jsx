// ScrollToTop.jsx
// ─────────────────────────────────────────────────────────────
//  Place this component ONCE inside your <Router> in App.jsx
//  It scrolls the window to the top on every route change.
// ─────────────────────────────────────────────────────────────

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrolltoTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null; // renders nothing
}