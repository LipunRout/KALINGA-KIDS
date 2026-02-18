function Home() {
  return (
    <>
{/* HERO SECTION */}
<section className="hero-section position-relative">
  <div className="container section-padding">
    <div className="row align-items-center">

      {/* Left Content */}
      <div className="col-lg-6 mb-4 mb-lg-0">
        <div className="hero-content" data-aos="fade-right">
          <h1 className="hero-title mb-4">
            Where Little Minds Begin Big Journeys
          </h1>

          <p className="hero-subtitle mb-4">
            At Kalinga Kids Play School, we nurture creativity,
            confidence and curiosity in every child.
          </p>

          <a href="/admission" className="primary-btn hero-btn">
            Enroll Now
          </a>
        </div>
      </div>

      {/* Right Image */}
      <div className="col-lg-6 text-center" data-aos="fade-left">
        <div className="hero-img-wrapper">
          <img
            src="https://images.unsplash.com/photo-1588072432836-e10032774350"
            className="img-fluid hero-img shadow"
            alt="Students"
          />
        </div>
      </div>

    </div>
  </div>
</section>
{/* PROGRAMS SLIDER */}
<section className="section-padding programs-section">
  <div className="container">

    <h2 className="section-title text-center mb-5">
      Our Programs
    </h2>

    <div
      id="programCarousel"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
      data-bs-interval="3000"
    >

      <div className="carousel-inner">

        {/* PLAY GROUP */}
        <div className="carousel-item active">
          <div className="program-card text-center">
            <div className="program-icon">🎨</div>
            <h4>Play Group</h4>
            <span className="program-age">Age: 2 – 3 Years</span>
            <p>
              A joyful introduction to structured learning through play,
              music, storytelling and sensory activities.
            </p>
          </div>
        </div>

        {/* NURSERY */}
        <div className="carousel-item">
          <div className="program-card text-center">
            <div className="program-icon">📚</div>
            <h4>Nursery</h4>
            <span className="program-age">Age: 3 – 4 Years</span>
            <p>
              Encouraging curiosity and confidence through interactive
              lessons, creative expression and foundational skills.
            </p>
          </div>
        </div>

        {/* LKG */}
        <div className="carousel-item">
          <div className="program-card text-center">
            <div className="program-icon">✏️</div>
            <h4>LKG</h4>
            <span className="program-age">Age: 4 – 5 Years</span>
            <p>
              Developing early literacy, numeracy and social skills in
              a nurturing and structured classroom environment.
            </p>
          </div>
        </div>

        {/* UKG */}
        <div className="carousel-item">
          <div className="program-card text-center">
            <div className="program-icon">🎓</div>
            <h4>UKG</h4>
            <span className="program-age">Age: 5 – 6 Years</span>
            <p>
              Preparing children confidently for primary schooling with
              academic readiness and independent thinking skills.
            </p>
          </div>
        </div>

      </div>

      {/* Controls */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#programCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon"></span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#programCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon"></span>
      </button>

    </div>

  </div>
</section>



      {/* GALLERY SECTION */}
      <section className="section-padding gallery-section">
        <div className="container text-center">
          <h2 className="section-title">Moments at Kalinga Kids</h2>

          <div
            id="galleryCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
            data-bs-interval="3000"
            data-bs-pause="false"
          >
            {/* INDICATORS */}
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#galleryCarousel"
                data-bs-slide-to="0"
                className="active"
              ></button>
              <button
                type="button"
                data-bs-target="#galleryCarousel"
                data-bs-slide-to="1"
              ></button>
            </div>

            {/* INNER */}
            <div className="carousel-inner">
              {/* Slide 1 */}
              <div className="carousel-item active">
                <div className="row g-4">
                  <div className="col-md-4">
                    <img
                      src="https://images.unsplash.com/photo-1588072432836-e10032774350"
                      className="img-fluid gallery-img"
                      alt="kids1"
                    />
                  </div>
                  <div className="col-md-4">
                    <img
                      src="https://images.unsplash.com/photo-1509062522246-3755977927d7"
                      className="img-fluid gallery-img"
                      alt="kids2"
                    />
                  </div>
                  <div className="col-md-4">
                    <img
                      src="https://images.unsplash.com/photo-1577896851231-70ef18881754"
                      className="img-fluid gallery-img"
                      alt="kids3"
                    />
                  </div>
                </div>
              </div>

              {/* Slide 2 */}
              <div className="carousel-item">
                <div className="row g-4">
                  <div className="col-md-4">
                    <img
                      src="https://images.unsplash.com/photo-1596495577886-d920f1fb7238"
                      className="img-fluid gallery-img"
                      alt="kids4"
                    />
                  </div>
                  <div className="col-md-4">
                    <img
                      src="https://images.unsplash.com/photo-1603575448361-4ef76f84f75d"
                      className="img-fluid gallery-img"
                      alt="kids5"
                    />
                  </div>
                  <div className="col-md-4">
                    <img
                      src="https://images.unsplash.com/photo-1587614203976-365c74645e83"
                      className="img-fluid gallery-img"
                      alt="kids6"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* PREVIOUS BUTTON */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#galleryCarousel"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon"></span>
            </button>

            {/* NEXT BUTTON */}
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#galleryCarousel"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon"></span>
            </button>
          </div>
        </div>
      </section>
      {/* FACILITIES SLIDER */}
      <section className="section-padding facility-section">
        <div className="container text-center">
          <h2 className="section-title">Our Facilities</h2>

          <div
            id="facilityCarousel"
            className="carousel carousel-fade slide"
            data-bs-ride="carousel"
            data-bs-interval="3000"
            data-bs-pause="false"
          >
            {/* INDICATORS */}
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#facilityCarousel"
                data-bs-slide-to="0"
                className="active"
              ></button>
              <button
                type="button"
                data-bs-target="#facilityCarousel"
                data-bs-slide-to="1"
              ></button>
              <button
                type="button"
                data-bs-target="#facilityCarousel"
                data-bs-slide-to="2"
              ></button>
            </div>

            {/* INNER */}
            <div className="carousel-inner rounded-4 shadow-lg">
              {/* Slide 1 */}
              <div className="carousel-item active">
                <div className="facility-img-wrapper">
                  <img
                    src="https://images.unsplash.com/photo-1596495577886-d920f1fb7238"
                    className="d-block w-100 facility-img"
                    alt="Classroom"
                  />
                  <div className="facility-overlay">
                    <h4>Safe Classrooms</h4>
                    <p>Secure and child-friendly learning spaces.</p>
                  </div>
                </div>
              </div>

              {/* Slide 2 */}
              <div className="carousel-item">
                <div className="facility-img-wrapper">
                  <img
                    src="https://images.unsplash.com/photo-1603575448361-4ef76f84f75d"
                    className="d-block w-100 facility-img"
                    alt="Play Area"
                  />
                  <div className="facility-overlay">
                    <h4>Indoor & Outdoor Play Area</h4>
                    <p>Balanced fun and physical development.</p>
                  </div>
                </div>
              </div>

              {/* Slide 3 */}
              <div className="carousel-item">
                <div className="facility-img-wrapper">
                  <img
                    src="https://images.unsplash.com/photo-1577896851231-70ef18881754"
                    className="d-block w-100 facility-img"
                    alt="Security"
                  />
                  <div className="facility-overlay">
                    <h4>Learning Toys & CCTV Security</h4>
                    <p>Safe environment with smart learning tools.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* PREV BUTTON */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#facilityCarousel"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon"></span>
            </button>

            {/* NEXT BUTTON */}
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#facilityCarousel"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon"></span>
            </button>
          </div>
        </div>
      </section>

      {/* ADMISSIONS SECTION */}
      <section
        className="section-padding text-center"
        style={{ background: "#6EC1E4", color: "white" }}
      >
        <div className="container">
          <h2 className="fw-bold">Admissions Open</h2>
          <p>Play Group, Nursery, LKG & UKG</p>
          <a href="/admission" className="btn btn-light rounded-pill px-4">
            Apply Now
          </a>
        </div>
      </section>
      {/* ABOUT SECTION
      <section className="section-padding text-center">
        <div className="container">
          <h2 className="section-title">About Kalinga Kids</h2>
          <p>
            Located in Kanan Vihar Phase-II, Patia, Bhubaneswar, Kalinga Kids
            focuses on activity-based learning, creativity and overall
            development.
          </p>
          <p>
            <strong>We Care Like Home.</strong>
          </p>
        </div>
      </section> */}
    </>
  );
}

export default Home;
