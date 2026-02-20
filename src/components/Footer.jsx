import { NavLink } from "react-router-dom";

function Footer() {
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Programs", href: "/programs" },
    { label: "Gallery", href: "/gallery" },
    { label: "Admission", href: "/admission" },
    { label: "Contact", href: "/contact" },
  ];

  const programs = [
    { label: "Play Group", age: "2–3 yrs" },
    { label: "Nursery", age: "3–4 yrs" },
    { label: "LKG", age: "4–5 yrs" },
    { label: "UKG", age: "5–6 yrs" },
  ];

  return (
    <>
      <style>{`
        .pro-footer {
          background: #0F172A;
          color: #fff;
          padding: 80px 0 40px;
          font-family: 'Nunito', sans-serif;
        }

        .pro-footer-container {
          max-width: 1100px;
          margin: auto;
          padding: 0 20px;
        }

        .pro-footer-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }

        @media (max-width: 768px) {
          .pro-footer-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }

        .pro-footer h4 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          margin-bottom: 20px;
          color: #FFD93D;
        }

        .pro-footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .pro-footer-links li {
          margin-bottom: 10px;
        }

        .pro-footer-links a {
          text-decoration: none;
          color: rgba(255,255,255,0.7);
          font-size: 14px;
          transition: 0.3s ease;
        }

        .pro-footer-links a:hover {
          color: #fff;
          padding-left: 5px;
        }

        .pro-program-item {
          font-size: 14px;
          margin-bottom: 8px;
          color: rgba(255,255,255,0.75);
        }

        .pro-contact p {
          font-size: 14px;
          margin-bottom: 8px;
          color: rgba(255,255,255,0.7);
        }

        .pro-footer-bottom {
          margin-top: 50px;
          padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.1);
          text-align: center;
          font-size: 13px;
          color: rgba(255,255,255,0.5);
        }

        .pro-footer-brand {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 10px;
          color: #fff;
        }

        .pro-footer-tagline {
          font-size: 14px;
          color: rgba(255,255,255,0.6);
          margin-bottom: 20px;
        }

        .pro-social {
          display: flex;
          gap: 15px;
          margin-top: 15px;
        }

        .pro-social a {
          color: rgba(255,255,255,0.6);
          font-size: 18px;
          transition: 0.3s ease;
        }

        .pro-social a:hover {
          color: #FFD93D;
        }
      `}</style>

      <footer className="pro-footer">
        <div className="pro-footer-container">

          <div className="pro-footer-grid">

            {/* Brand Section */}
            <div>
              <div className="pro-footer-brand">
                Kalinga Kids Play School
              </div>
              <div className="pro-footer-tagline">
                We Care Like Home
              </div>

              <div className="pro-social">
                <a href="https://www.facebook.com/kalingakidss"><i className="bi bi-facebook"></i></a>
                <a href="https://www.instagram.com/kalingakidss/?hl=en"><i className="bi bi-instagram"></i></a>
                <a href="https://www.linkedin.com/company/kalinga-kids/posts/?feedView=all"><i className="bi bi-linkedin"></i></a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4>Quick Links</h4>
              <ul className="pro-footer-links">
                {quickLinks.map(({ label, href }) => (
                  <li key={label}>
                    <NavLink to={href}>{label}</NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Programs & Contact */}
            <div>
              <h4>Our Programs</h4>
              {programs.map(({ label, age }) => (
                <div key={label} className="pro-program-item">
                  {label} ({age})
                </div>
              ))}

              <h4 style={{ marginTop: "25px" }}>Contact</h4>
              <div className="pro-contact">
                <p>Kanan Vihar Phase-II, Patia, Bhubaneswar</p>
                <p>+91 70088 44395</p>
                <p>kalingakidss@gmail.com</p>
              </div>
            </div>

          </div>

          <div className="pro-footer-bottom">
            © 2026 Kalinga Kids Play School. All Rights Reserved.
          </div>

        </div>
      </footer>
    </>
  );
}

export default Footer;