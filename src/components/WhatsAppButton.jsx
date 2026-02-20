function WhatsAppButton() {
  return (
    <>
      <style>{`
        .pro-whatsapp {
          position: fixed;
          bottom: 25px;
          right: 25px;
          background: #25D366;
          color: #fff;
          border-radius: 50px;
          padding: 12px 20px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'Nunito', sans-serif;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          transition: all 0.3s ease;
          z-index: 1000;
        }

        .pro-whatsapp i {
          font-size: 20px;
        }

        .pro-whatsapp:hover {
          background: #1ebe5d;
          transform: translateY(-4px);
          box-shadow: 0 15px 40px rgba(0,0,0,0.2);
        }

        /* Subtle professional pulse */
        @keyframes softPulse {
          0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4); }
          70% { box-shadow: 0 0 0 12px rgba(37, 211, 102, 0); }
          100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }

        .pro-whatsapp {
          animation: softPulse 3s infinite;
        }

        /* Mobile version – icon only */
        @media (max-width: 600px) {
          .pro-whatsapp span {
            display: none;
          }

          .pro-whatsapp {
            border-radius: 50%;
            width: 55px;
            height: 55px;
            justify-content: center;
            padding: 0;
          }

          .pro-whatsapp i {
            font-size: 24px;
          }
        }
      `}</style>

      <a
        href="https://wa.me/917008844395?text=Hello%20I%20would%20like%20to%20know%20about%20admission%20at%20Kalinga%20Kids."
        className="pro-whatsapp"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="bi bi-whatsapp"></i>
        <span>Chat with Us</span>
      </a>
    </>
  );
}

export default WhatsAppButton;