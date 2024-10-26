import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/Place Order/PlaceOrder";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import Footer from "./components/Footer/Footer";
import Artist from "./pages/Artist/Artist";
import ArtDisplayPage from "./pages/ArtDisplayPage/ArtDisplayPage";
import Collaborations from "./pages/Collaborations/Collaborations";
import LoginPopUp from "./components/LoginPopUp/LoginPopUp";
import Commissioned from "./pages/Commissioned/Commissioned";
import Verify from "./pages/Verify/Verify";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      {showLogin ? <LoginPopUp setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artist" element={<Artist />} />
          <Route path="/commissioned" element={<Commissioned />}></Route>
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />

          <Route path="/artdisplaypage" element={<ArtDisplayPage />}></Route>
        </Routes>
      </div>

      <Footer />
    </>
  );
};

export default App;
