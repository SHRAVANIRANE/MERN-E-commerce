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
            src="https://png.pngtree.com/png-clipart/20230417/original/pngtree-green-transparent-sports-shoes-png-image_9062733.png"
            alt=""
          />
        </div>
        <div className="main-text">
          <h1>Flatheads</h1>
          <p>
            Flatheads is a modern lifestyle brand from India that designs
            stylish, lightweight, and breathable shoes for everyday wear. Known
            for their innovative use of materials like bamboo and banana fiber,
            Flatheads creates footwear that blends comfort with contemporary
            aesthetics. The brand focuses on sleek, minimalistic designs that
            suit both casual and professional settings. With an emphasis on
            quality craftsmanship and durability, Flatheads aims to provide a
            perfect balance of fashion and functionality. Their shoes are
            designed to handle India’s diverse climate while offering all-day
            comfort. Targeting urban professionals and trend-conscious
            consumers, the brand has gained popularity for its unique approach
            to footwear. Flatheads represents a fusion of innovation,
            sustainability, and modern design, making it a go-to choice for
            those seeking stylish yet practical shoes.
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
