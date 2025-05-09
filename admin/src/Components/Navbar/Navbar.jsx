import React from "react";
import "./Navbar.css";
import TheArtfulTouch from "../../assets/TheArtfulTouch.png";
import navProfile from "../../assets/nav-profile.svg";
const Navbar = () => {
  return (
    <div className="navbar">
      <img
        src="https://i.pinimg.com/originals/70/71/3d/70713de479955be2e7cbcc520ed84e66.jpg"
        className="nav-logo"
        alt=""
      />
      <img src={navProfile} className="nav-profile" alt="" />
    </div>
  );
};

export default Navbar;
