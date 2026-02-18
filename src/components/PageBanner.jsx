import { Link } from "react-router-dom";

function PageBanner({ title }) {
  return (
    <section className="page-banner">
      <div className="container text-center">
        <h1 className="page-banner-title">{title}</h1>

        <div className="breadcrumb-custom">
          <Link to="/">Home</Link>
          <span className="mx-2">/</span>
          <span>{title}</span>
        </div>
      </div>
    </section>
  );
}

export default PageBanner;
