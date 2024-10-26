import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.TheArtfulTouch} alt="" />
          <p>
            Explore a unique collection of hand-crafted artworks, stylish tote
            bags, creative keychains, and personalized gifts. At The Artful
            Touch, we blend artistry and utility, offering products that
            celebrate creativity and individuality. Whether you're looking for a
            stunning painting, a trendy accessory, or a custom portrait, we've
            got something special for everyone.
          </p>

          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMAPNY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+91 7738271241</li>
            <li>theartfultouch@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        © 2024 The Artful Touch. All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
