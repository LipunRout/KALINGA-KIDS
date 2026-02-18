function Footer() {
  return (
    <footer className="luxury-footer">

      <div className="container text-center">

        <h4 className="footer-title">
          Kalinga Kids Play School
        </h4>

        <p className="footer-tagline">
          We Care Like Home <span className="heart">❤</span>
        </p>

        {/* Social Icons */}
        <div className="footer-social mt-3">
          <a href="https://www.facebook.com/kalingakidss" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-facebook"></i>
          </a>

          <a href="https://www.instagram.com/kalingakidss/" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-instagram"></i>
          </a>

          <a href="https://www.linkedin.com/company/kalinga-kids/posts/?feedView=all" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-linkedin"></i>
          </a>
        </div>

        <div className="footer-contact mt-4">
          <p>Kanan Vihar Phase-II, Patia, Bhubaneswar – 751024</p>
          <p>Phone: 7008844395 | Email: Kalingakidss@gmail.com</p>
        </div>

        <div className="footer-bottom mt-4">
          <small>© 2026 Kalinga Kids. All rights reserved.</small>
        </div>

      </div>

    </footer>
  );
}

export default Footer;
