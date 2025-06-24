import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./ArtDisplay.css";
import ArtItem from "../ArtItem/ArtItem";

const ArtDisplay = ({ category }) => {
  const { all_products } = useContext(StoreContext);

  if (!all_products) {
    return <div>Loading...</div>;
  }

  if (!Array.isArray(all_products)) {
    return <div>Data error: Products could not be loaded.</div>;
  }

  if (all_products.length === 0) {
    return <div>Loading...Please Wait</div>;
  }

  // Filter products based on category
  const filteredProducts =
    category === "All"
      ? all_products
      : all_products.filter(
          (product) => product.category.toLowerCase() === category.toLowerCase()
        );

  return (
    <div className="art-display" id="art-display">
      <h2>
        Showing {filteredProducts.length} products in "{category}" category
      </h2>
      <div className="art-display-list">
        {filteredProducts.map((item, index) => (
          <ArtItem
            key={index}
            id={item.id}
            title={item.title}
            description={item.description}
            image={item.image}
            price={item.old_price}
            category={item.category}
          />
        ))}
      </div>
    </div>
  );
};

export default ArtDisplay;
