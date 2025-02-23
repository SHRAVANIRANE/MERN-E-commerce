import React, { useState, useEffect } from "react";
import "./CustomerReview.css";

const CustomerReview = () => {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Fetch reviews from the server
    fetch("http://localhost:4000/allreviews") // Update the URL to your reviews API
      .then((response) => response.json())
      .then((data) => {
        setReviews(data); // Set the fetched reviews
        console.log("Fetched reviews:", data);
      })
      .catch((error) => console.error("Failed to fetch reviews:", error));
  }, []);

  const goBack = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? reviews.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goNext = () => {
    const isLastSlide = currentIndex === reviews.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // Function to render star icons based on the rating value
  const renderStars = (rating) => {
    const fullStar = "★";
    const emptyStar = "☆";
    const stars = [];

    // Ensure rating is treated as a number
    const ratingNumber = Number(rating);

    for (let i = 1; i <= 5; i++) {
      stars.push(i <= ratingNumber ? fullStar : emptyStar);
    }
    return stars.join(" ");
  };

  if (reviews.length === 0) {
    return <div>Loading reviews...</div>; // Handle empty state or loading
  }

  return (
    <div className="review-section">
      <h1 className="collab">
        Our <span>Customers Reviews</span>
      </h1>

      <div className="review-container">
        <div className="arrow" onClick={goBack}>
          <i className="fa-solid fa-backward"></i>
        </div>

        <div className="slider-container">
          <div className="card">
            <div className="content">
              <p className="review-text">"{reviews[currentIndex].review}"</p>
              <div className="review-details">
                <span className="name">~ {reviews[currentIndex].name}</span>
                <br />
                <span className="rating">
                  Rating: {renderStars(reviews[currentIndex].rating)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="arrow" onClick={goNext}>
          <i className="fa-solid fa-forward"></i>
        </div>
      </div>
    </div>
  );
};

export default CustomerReview;
