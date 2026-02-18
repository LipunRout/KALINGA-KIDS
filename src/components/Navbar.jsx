import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top luxury-navbar ${
        scrolled ? "navbar-scrolled" : ""
      }`}
    >
      <div className="container">
        <NavLink
          className="navbar-brand d-flex align-items-center luxury-brand"
          to="/"
        >
          <img
            src="/logo-1.png"
            alt="Kalinga Kids Logo"
            className="navbar-logo"
          />
          <span className="ms-2 brand-text">Kalinga Kids</span>
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link luxury-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link luxury-link" to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link luxury-link" to="/programs">
                Programs
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link luxury-link" to="/gallery">
                Gallery
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link luxury-link" to="/admission">
                Admission
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link luxury-link" to="/contact">
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
