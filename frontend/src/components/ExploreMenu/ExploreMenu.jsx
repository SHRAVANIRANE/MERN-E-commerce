import React, { useEffect } from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

const ExploreMenu = ({ category, setCategory }) => {
  const { all_products } = useContext(StoreContext);
  return (
    <div>
      <div className="explore-menu" id="explore-menu">
        <h1 className="collab">
          Our<span>Collections</span>
        </h1>
        <div className="explore-menu-list">
          {menu_list.map((item, index) => {
            return (
              <div
                onClick={() =>
                  setCategory((prevCategory) =>
                    prevCategory === item.menu_name ? "All" : item.menu_name
                  )
                }
                key={index}
                className="explore-menu-list-item"
              >
                <img
                  className={category === item.menu_name ? "active" : ""}
                  src={item.menu_image}
                  alt={item.menu_name}
                />
                <p>{item.menu_name}</p>
              </div>
            );
          })}
        </div>
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
