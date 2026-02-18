function Contact() {
  return (
    <section className="section-padding">
      <div className="container">
        <h2 className="section-title text-center">Contact Us</h2>

        <div className="text-center mb-4">
          <p><strong>Address:</strong> Kanan Vihar Phase-II, Patia, Bhubaneswar – 751024</p>
          <p><strong>Phone:</strong> 7008844395</p>
          <p><strong>Email:</strong> Kalingakidss@gmail.com</p>
          <p><strong>Admission Contact:</strong> Jyothsna Mam, Sunita Mam</p>
        </div>

        <form className="row g-3">
          <div className="col-md-6">
            <input type="text" className="form-control" placeholder="Your Name" />
          </div>

          <div className="col-md-6">
            <input type="email" className="form-control" placeholder="Your Email" />
          </div>

          <div className="col-12">
            <textarea className="form-control" rows="4" placeholder="Your Message"></textarea>
          </div>

          <div className="col-12 text-center">
            <button type="submit" className="primary-btn">Send Message</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Contact;
