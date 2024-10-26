import React from "react";
import "./Breadcrums.css";
const Breadcrums = (props) => {
  const { product } = props;
  return (
    <div className="breadcrums">
      HOME <i className="fa-solid fa-greater-than"></i>
      SHOP <i className="fa-solid fa-greater-than"></i> {product.category}
      <i className="fa-solid fa-greater-than"></i> {product.name}
    </div>
  );
};

export default Breadcrums;
