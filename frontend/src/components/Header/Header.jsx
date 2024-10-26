import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <section>
      <marquee behavior="scroll" direction="">
        Get free delivery on orders over ₹599
      </marquee>
      <div className="main-section">
        <div className="image">
          <img
            src="https://png.pngtree.com/png-clipart/20230914/original/pngtree-painting-supply-vector-png-image_12160914.png"
            alt=""
          />
        </div>
        <div className="main-text">
          <h1>The Artful Touch</h1>
          <p>
            Art is a language spoken without words, conveying feelings that
            words often fail to express. It's a journey of discovery, where each
            piece holds a unique narrative, inviting viewers to immerse
            themselves in its beauty. At The Artful Touch, we believe in the
            transformative power of art, igniting imagination and sparking
            conversations that resonate deeply within us all. Join us in our
            appreciation of the boundless creativity that enriches our lives.Let
            us be your guide through the vast landscapes of creativity, where
            every stroke tells a story and every color evokes a feeling. Welcome
            to The Artful Touch, where art is not just observed, but experienced
            in its fullest essence.
          </p>
          <button>
            <Link to={"/ArtDisplayPage"}>Shop Now</Link>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Header;
