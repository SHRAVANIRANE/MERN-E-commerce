import React from "react";
import "./Artist.css";
import { assets } from "../../assets/assets";

const Artist = () => {
  return (
    <div className="fourth-section" id="artist">
      <div className="fourth">
        <div className="image">
          <img src="https://res.cloudinary.com/dvq8qukci/image/upload/v1750779781/pexels-valeriiamiller-3547625_2_rvtc1e.jpg" alt="" />
        </div>
        <div className="text">
          <h1 className="bottom-h1">
            About <b>Shravani Rane</b>
          </h1>
          <br />I am Shravani Rane, a passionate and self-taught artist on an
          extraordinary journey through the realm of art. With a deep love for
          self-expression and an unquenchable thirst for artistic exploration, I
          have harnessed my raw talent and unique vision to establish a thriving
          art business. My deep love for the art form of anime has not only
          shaped my creative journey but also fuels my artistic endeavors. My
          artistic journey is a testament to the power of self-discovery. With
          no formal training, I have cultivated my skills through sheer
          dedication, relentless practice, and an unbreakable spirit. My work
          reflects a genuine passion for the craft and a commitment to
          continuous growth.
          <h1 className="bottom-h1">
            Translating <b>Anime Magic</b> onto Shoes
          </h1>
          My art is a visual celebration of my favorite anime moments. With
          every brushstroke and pencil mark, I put life into the iconic
          characters' art pieces. My creations resonate with the same emotions
          that fans of anime experience while watching their favorite series.
          Dedicated to the craft, I have made it a mission to share the magic of
          anime with the world through my art. This business is a testament to
          her talent and dedication, encompassing a wide range of anime styles
          and themes that cater to the diverse tastes of anime enthusiasts.
        </div>
      </div>
    </div>
  );
};

export default Artist;
