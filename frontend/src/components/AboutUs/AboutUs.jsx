import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="third-section" id="about">
      <h1 className="collab">
        More<span> About Us</span>
      </h1>
      <div className="third">
        <div className="text">
          <h1>Commissioned Artworks 🎨</h1>
          <p>
            Whether you're an art collector, a home decorator, or someone
            looking for the perfect gift, 'The Artful Touch' has something
            special to offer. Our art can transform your space, evoke powerful
            emotions, and become a conversation starter. If you have a specific
            vision in mind, we are pleased to offer commissioned artworks.
            Collaborate with our artist to bring your unique ideas to life,
            ensuring that your art piece truly speaks to your heart.
          </p>
          <h1>Join Our Journey ✨</h1>
          <p>
            'The Artful Touch' is more than just an art business; it's a
            community of art enthusiasts and creators. We invite you to join our
            journey, explore our collection, and be a part of a world where art
            knows no boundaries. Thank you for visiting 'The Artful Touch.' We
            look forward to sharing our passion for art with you and helping you
            find the perfect piece that resonates with your soul. Explore our
            gallery and let 'The Artful Touch' be the inspiration that brings a
            touch of artistry into your life. Discover, appreciate, and embrace
            the world of art with us.
          </p>
        </div>
        <div className="image">
          <img
            src="https://png.pngtree.com/png-clipart/20231019/original/pngtree-paint-brush-with-palette-png-image_13362310.png"
            alt="Paint Brush and Palette"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
