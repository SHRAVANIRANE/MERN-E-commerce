import React from "react";
import "./Navbar.css";
import TheArtfulTouch from "../../assets/TheArtfulTouch.png";
import navProfile from "../../assets/nav-profile.svg";
const Navbar = () => {
  return (
    <div className="navbar">
      <img src={TheArtfulTouch} className="nav-logo" alt="" />
      <img src={navProfile} className="nav-profile" alt="" />
    </div>
  );
};

export default Navbar;
