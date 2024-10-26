import React from "react";
import "./ArtDisplayPage.css";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import ArtDisplay from "../../components/ArtDisplay/ArtDisplay";
import { useState } from "react";
const ArtDisplayPage = () => {
  const [category, setCategory] = useState("All");
  return (
    <div>
      <ExploreMenu category={category} setCategory={setCategory} />
      <ArtDisplay category={category} />
    </div>
  );
};

export default ArtDisplayPage;
