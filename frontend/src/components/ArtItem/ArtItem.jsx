import React, { useContext } from "react";
import "./ArtItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { Link } from "react-router-dom";

const ArtItem = ({ id, name, price, image, category }) => {
  const { cartItems, addToCart, removeFromCart, BASE_URL } =
    useContext(StoreContext);

  return (
    <div className="art-item">
      <div className="art-item-image-container">
        <Link to={`/product/${id}`}>
          <img className="art-item-image" src={image} alt={name} />
        </Link>

        {!cartItems[id] ? (
          <img
            className="add"
            onClick={() => {
              console.log("Adding to cart:", id);
              addToCart(id);
            }}
            src={assets.add_icon_white}
            alt="Add"
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt="Remove"
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt="Add"
            />
          </div>
        )}
      </div>
      <div className="art-item-info">
        <p className="art-item-name">{name}</p>
        <p className="art-item-price">₹{price}</p>
        <p className="art-item-category">Category: {category}</p>
      </div>
    </div>
  );
};

export default ArtItem;
