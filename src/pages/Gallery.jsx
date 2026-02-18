import { useState } from "react";

function Gallery() {
  const images = [
    "https://images.unsplash.com/photo-1588072432836-e10032774350",
    "https://images.unsplash.com/photo-1509062522246-3755977927d7",
    "https://images.unsplash.com/photo-1577896851231-70ef18881754",
    "https://images.unsplash.com/photo-1596495577886-d920f1fb7238",
    "https://images.unsplash.com/photo-1588072432836-e10032774350",
    "https://images.unsplash.com/photo-1587614203976-365c74645e83",
  ];

  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="section-padding gallery-section">
      <div className="container text-center">
        <h2 className="section-title mb-5">Moments at Kalinga Kids</h2>

        <div className="row g-4">
          {images.map((img, index) => (
            <div className="col-lg-4 col-md-6 col-12" key={index}>
              <div
                className="gallery-card"
                onClick={() => setSelectedImage(img)}
              >
                <img
                  src={img}
                  alt="School Activity"
                  className="img-fluid gallery-img"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Modal Preview */}
        {selectedImage && (
          <div className="gallery-modal" onClick={() => setSelectedImage(null)}>
            <img src={selectedImage} alt="Preview" />
          </div>
        )}
      </div>
    </section>
  );
}

export default Gallery;
