import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import { useState } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/a11y";

import "./Commissioned.css";
import { personalized_art } from "../../assets/assets";

const Commissioned = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [preferredMedium, setPreferredMedium] = useState("");
  const [budget, setBudget] = useState("");
  const [deliveryDeadline, setDeliveryDeadline] = useState("");
  const [referenceImageFile, setReferenceImageFile] = useState(null);

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("description", description);
    formData.append("preferredMedium", preferredMedium);
    formData.append("budget", budget);
    formData.append("deliveryDeadline", deliveryDeadline);
    formData.append("referenceImage", referenceImageFile); // The image file selected by the user
    console.log({
      name,
      email,
      description,
      preferredMedium,
      budget,
      deliveryDeadline,
      referenceImageFile,
    });

    try {
      const response = await fetch("http://localhost:4000/commission-request", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        alert("Commission request submitted successfully!");
      } else {
        alert("Error submitting commission request");
      }
    } catch (error) {
      console.error("Error submitting commission request", error);
    }
  };

  return (
    <>
      <div id="main-content">
        <h2 className="carousel-heading">
          Our <span>Commissioned Shoes</span>
        </h2>
        <div className="artwork-carousel-container">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, A11y]}
            spaceBetween={30}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            loop={true}
            a11y={{ enabled: true }}
            className="artwork-swiper"
          >
            {personalized_art.map((image) => (
              <SwiperSlide key={image.id} className="swiper-slide">
                <div className="slide-content">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="swiper-image"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="commission-section">
          <h3 className="commission-text">Wanna commission your own Shoes?!</h3>

          <form className="commission-form">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Artwork Description</label>
            <textarea
              placeholder="Describe your idea"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <label>Reference Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setReferenceImageFile(e.target.files[0])}
            />

            <label>Preferred Medium</label>
            <select
              onChange={(e) => setPreferredMedium(e.target.value)}
              required
            >
              <option value="" disabled selected>
                Select your preferred medium
              </option>
              <option value="Watercolor">Watercolor</option>
              <option value="Acrylic">Acrylic</option>
              <option value="Goauche">Goauche</option>
              <option value="Charcoal">Charcoal</option>
            </select>

            <label>Budget Range</label>
            <input
              type="number"
              placeholder="Enter your budget"
              required
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />

            <label>Delivery Deadline</label>
            <input
              type="date"
              min={today}
              required
              value={deliveryDeadline}
              onChange={(e) => setDeliveryDeadline(e.target.value)}
            />

            <button
              type="submit"
              className="commission-button"
              onClick={handleSubmit}
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Commissioned;
