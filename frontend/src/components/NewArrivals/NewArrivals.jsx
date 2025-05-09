import React, { useEffect } from "react";
import "./NewArrivals.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const NewArrivals = () => {
  const [new_collection, setNewCollection] = useState([]);
  useEffect(() => {
    fetch("https://flatheads-backend.onrender.com/newarrivals")
      .then((response) => response.json())
      .then((data) => {
        setNewCollection(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <>
      <h1 className="arrivals" style={{ textAlign: "center" }}>
        <span>New Arrivals</span>
      </h1>
      <div className="new-arrivals-container">
        {new_collection.map((item) => (
          <div key={item.id} className="card">
            <Link to={`/product/${item.id}`}>
              <img src={item.image} alt={item.title} className="card-image" />
            </Link>
            <div className="card-content">
              <div className="card-title">{item.name}</div>
              <div className="card-price">₹{item.old_price}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default NewArrivals;
