function Programs() {
  return (
    <section className="section-padding">
      <div className="container text-center">
        <h2 className="section-title">Our Programs</h2>
        <div className="row">
          {["Play Group", "Nursery", "LKG", "UKG"].map((program, index) => (
            <div className="col-md-3 mb-4" key={index}>
              <div className="card p-3 shadow-sm">
                <h5>{program}</h5>
                <p>Age appropriate learning and fun-based activities.</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Programs;
