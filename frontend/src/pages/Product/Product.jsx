import React, { useContext } from "react";
import "./Product.css";
import Breadcrums from "../../components/Breadcrums/Breadcrums";
import ProductDisplay from "../../components/ProductDisplay/ProductDisplay";
import { StoreContext } from "../../context/StoreContext";
import { useParams } from "react-router-dom";

const Product = () => {
  const { all_products } = useContext(StoreContext);
  const { productId } = useParams();
  const product = all_products.find((item) => item.id === Number(productId));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <Breadcrums product={product} />
      <ProductDisplay product={product} />
    </div>
  );
};

export default Product;
