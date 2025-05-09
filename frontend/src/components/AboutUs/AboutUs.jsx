import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="third-section" id="about">
      <h1 className="collab">More About Us</h1>
      <div className="third">
        <div className="text">
          <h1>Designed for Comfort & Style 👟</h1>
          <p>
            At FlatHeads, we believe that the perfect pair of shoes is more than
            just footwear—it's a statement. Our collection is crafted with
            precision, ensuring that every step you take blends **style,
            comfort, and durability**. Whether you're looking for **trendy
            sneakers, classic formals, or everyday casuals**, we have something
            just for you.
          </p>
          <h1>Join Our Journey ✨</h1>
          <p>
            Our brand isn't just about selling shoes—it's about creating a
            **community of sneaker lovers and trendsetters**. We invite you to
            explore our collection, find the perfect pair that matches your
            personality, and experience footwear that **enhances your confidence
            with every step**. Thank you for choosing **FlatHeads**—where
            comfort meets fashion.
          </p>
        </div>
        <div className="image">
          <img
            src="https://www.pngarts.com/files/4/Brown-Shoes-PNG-Download-Image.png "
            alt="Stylish Sneakers"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
