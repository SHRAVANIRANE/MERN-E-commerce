import React, { useState } from "react";
import { artworks, assets } from "../../assets/assets";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.replace("/"); // Redirect to home page after logout
  };
  const toggleMobileMenu = () => {
    setMenu(!menu);
  };
  const closeMobileMenu = () => {
    setMenu(false); // Close the menu when a link is clicked

    if (window.innerWidth < 900) {
      setMenu(false);
    }
  };

  return (
    <nav id="home">
      <div className="navbar">
        <div className="logo">
          <Link to="/">
            <img
              src="https://i.pinimg.com/originals/70/71/3d/70713de479955be2e7cbcc520ed84e66.jpg"
              alt="The Artful Touch Logo"
            />
          </Link>
        </div>

        {/* Hamburger Icon */}
        <div className="hamburger" onClick={toggleMobileMenu}>
          <i className="fa-solid fa-bars"></i>
        </div>

        {/* Navigation Links */}
        <div className={`nav-text ${menu ? "mobile" : ""}`}>
          <ul>
            <li onClick={closeMobileMenu}>
              <Link to="/">Home</Link>
            </li>
            <li onClick={closeMobileMenu}>
              <Link to="/artist">Artist</Link>
            </li>
            <li onClick={closeMobileMenu}>
              <Link to="/commissioned">Commissioned</Link>
            </li>
          </ul>
        </div>

        <div className="buttons">
          <div className="cart">
            <Link to="/cart">
              <i className="fa-solid fa-cart-shopping"></i>
            </Link>
          </div>
          <div className="login-signup">
            {localStorage.getItem("token") ? (
              <button onClick={handleLogout}>Log Out</button>
            ) : (
              <button onClick={() => setShowLogin(true)}>Log In</button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
