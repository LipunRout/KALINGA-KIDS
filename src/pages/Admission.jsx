function Admission() {
  return (
    <section className="section-padding">
      <div className="container">
        <h2 className="section-title text-center">Admission Enquiry</h2>
        <form className="row g-3">
          <div className="col-md-6">
            <input type="text" className="form-control" placeholder="Child Name" />
          </div>

          <div className="col-md-6">
            <input type="text" className="form-control" placeholder="Parent Name" />
          </div>

          <div className="col-md-6">
            <input type="tel" className="form-control" placeholder="Contact Number" />
          </div>

          <div className="col-md-6">
            <select className="form-select">
              <option>Select Program</option>
              <option>Play Group</option>
              <option>Nursery</option>
              <option>LKG</option>
              <option>UKG</option>
            </select>
          </div>

          <div className="col-12 text-center">
            <button type="submit" className="primary-btn">Submit</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Admission;
