import React, { useEffect, useState } from "react";
import "./ProductDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import { useContext } from "react";

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(StoreContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    review: "",
    rating: 0, // Add rating to form data
  });
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("https://mern-e-commerce-backend-jkse.onrender.com/allreviews") // Update to match your reviews API URL
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleRatingChange = (newRating) => {
    setFormData({ ...formData, rating: newRating });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("https://mern-e-commerce-backend-jkse.onrender.com/allreviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const newReview = await response.json();
      setReviews([...reviews, newReview]); // Update reviews state after submission
      alert("Review submitted successfully!");
    } catch (error) {
      console.log("Failed to submit review", error);
    }
  };

  return (
    <>
      <div className="product-display">
        <div className="product-display-left">
          <div className="product-display-img">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-display-img-list">
            <img src={product.image} alt={product.name} />
            <img src={product.image} alt={product.name} />
            <img src={product.image} alt={product.name} />
            <img src={product.image} alt={product.name} />
          </div>
        </div>
        <div className="product-display-right">
          <h1>{product.name}</h1>
          <h3 className="price">₹{product.old_price}</h3>
          <p>{product.description}</p>
          <p>
            <b>Shipping Info:</b> After placing an order, please expect the
            delivery in 25-30 days. As Art takes time.
          </p>
          <button onClick={() => addToCart(product.id)}>Add to cart</button>
          <button
            onClick={() => window.scrollTo({ top: 1050, behavior: "smooth" })}
          >
            Add a Review
          </button>
          <p>Category: {product.category}</p>
        </div>
      </div>

      <div className="review">
        <div className="review-form">
          <h1>Reviews</h1>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Your Name"
            required
          />
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Email"
          />
          <textarea
            name="review"
            value={formData.review}
            onChange={handleChange}
            placeholder="Write a review"
            rows={10}
          ></textarea>

          {/* Star Rating Component */}
          <div className="star-rating">
            <h3>Rating:</h3>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={formData.rating >= star ? "star selected" : "star"}
                onClick={() => handleRatingChange(star)}
              >
                ★
              </span>
            ))}
          </div>

          <button className="submit-btn" onClick={handleSubmit}>
            Submit Review
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductDisplay;
