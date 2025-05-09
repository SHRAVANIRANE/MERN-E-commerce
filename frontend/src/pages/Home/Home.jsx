import React, { useState, useEffect } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import AboutUs from "../../components/AboutUs/AboutUs";
import CustomerReview from "../../components/CustomerReview/CustomerReview";
import NewArrivals from "../../components/NewArrivals/NewArrivals";

const Home = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  // Fetch reviews from the backend
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("https://flatheads-backend.onrender.com/allreviews"); // Update the port if necessary
        const data = await response.json(); // Parse JSON response
        setReviews(data); // Set the fetched reviews to state
        setLoading(false); // Stop loading once data is fetched
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setLoading(false); // Stop loading even if there is an error
      }
    };

    fetchReviews();
  }, []);

  const containerStyles = {
    width: "100%",
    height: "580px",
    margin: "0 auto",
    padding: "20px",
  };

  return (
    <div>
      <Header />
      <hr />
      <NewArrivals />
      <hr />
      <AboutUs />
      <hr />
      <div style={containerStyles}>
        {loading ? (
          <p>Loading reviews...</p>
        ) : reviews.length > 0 ? (
          <CustomerReview slides={reviews} /> // Pass the reviews as slides
        ) : (
          <p>No reviews available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
