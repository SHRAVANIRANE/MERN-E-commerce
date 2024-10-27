import { createContext, useEffect, useState } from "react";
import { art_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [all_products, setAllProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});

  const BASE_URL = "https://mern-e-commerce-backend-jkse.onrender.com";

  useEffect(() => {
    fetch(`${BASE_URL}/allproducts`)
      .then((response) => response.json())
      .then((data) => setAllProducts(data))
      .catch((err) => console.log(err));

    if (localStorage.getItem("token")) {
      fetch(`${BASE_URL}/getcart`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          token: `${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: "",
      })
        .then((response) => response.json())
        .then((data) => setCartItems(data))
        .catch((err) => console.log(err));
    }
  }, []);

  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] ? prev[itemId] + 1 : 1,
    }));
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      fetch(`${BASE_URL}/addtocart`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          token: `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      if (prev[itemId] <= 1) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      } else {
        return {
          ...prev,
          [itemId]: prev[itemId] - 1,
        };
      }
    });

    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${BASE_URL}/removefromcart`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          token: `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_products.find((product) => product.id == item);
        if (itemInfo) {
          totalAmount += itemInfo.old_price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const contextValue = {
    art_list,
    BASE_URL,
    all_products,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
