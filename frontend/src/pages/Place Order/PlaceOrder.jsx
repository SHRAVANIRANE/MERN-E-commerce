import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";

const PlaceOrder = () => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState("");
  const { getTotalCartAmount, cartItems, all_products } =
    useContext(StoreContext);
  const [data, setData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phoneNumber: "",
  });

  // Load Razorpay Script once on component load
  useEffect(() => {
    const loadRazorpayScript = () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => {
        console.log("Razorpay script loaded successfully");
      };
      document.body.appendChild(script);
    };
    loadRazorpayScript();
  }, []);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");

    let orderItems = [];
    all_products.map((item) => {
      if (cartItems[item.id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item.id] };
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      userId: userId,
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 50, // Assuming 50 is delivery charge
    };

    try {
      const response = await fetch("http://localhost:4000/order/place", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(orderData),
      });

      const responseData = await response.json();

      if (responseData.success) {
        // Razorpay frontend integration
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: orderData.amount * 100, // In paise (multiply by 100)
          currency: "INR",
          name: "The Artful Touch",
          description: "Purchase Description",
          order_id: responseData.orderId,
          handler: async (response) => {
            const {
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
            } = response;
            const verifyResponse = await fetch(
              "http://localhost:4000/verify-payment",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                  razorpay_payment_id,
                  razorpay_order_id,
                  razorpay_signature,
                }),
              }
            );
            const verifyData = await verifyResponse.json();
            console.log("Verify Data: ", verifyData);
            if (verifyData.success) {
              setPaymentSuccess(true);
              setPaymentMessage(
                "Payment successful. Thank you for shopping with us."
              );
              localStorage.removeItem("cartItems");
            } else {
              setPaymentMessage("Payment failed. Please try again.");
              alert("Payment failed. Please try again.");
            }
          },
          prefill: {
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            contact: data.phoneNumber,
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
        console.log("Payment modal opened with options:", options);
      } else {
        console.error("Error during submission:", responseData);
        alert("Something went wrong, order not placed.");
      }
    } catch (error) {
      console.error("Error during submission:", error);
      alert("There was an error. Please try again.");
    }
  };

  return (
    <>
      <form className="place-order" onSubmit={handleSubmit}>
        <div className="place-order-left">
          <p className="place-order-title">Delivery Information</p>
          <div className="multi-fields">
            <input
              type="text"
              name="firstName"
              value={data.firstName}
              onChange={onChangeHandler}
              placeholder="First Name"
              required
            />
            <input
              type="text"
              name="lastName"
              value={data.lastName}
              onChange={onChangeHandler}
              placeholder="Last Name"
              required
            />
          </div>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            placeholder="Email Address"
            required
          />
          <input
            type="text"
            name="street"
            value={data.street}
            onChange={onChangeHandler}
            placeholder="Street"
            required
          />
          <div className="multi-fields">
            <input
              type="text"
              name="city"
              value={data.city}
              onChange={onChangeHandler}
              placeholder="City"
              required
            />
            <input
              type="text"
              name="state"
              value={data.state}
              onChange={onChangeHandler}
              placeholder="State"
              required
            />
          </div>
          <div className="multi-fields">
            <input
              type="text"
              name="zipCode"
              value={data.zipCode}
              onChange={onChangeHandler}
              placeholder="Zip Code"
              required
            />
            <input
              type="text"
              name="country"
              value={data.country}
              onChange={onChangeHandler}
              placeholder="Country"
              required
            />
          </div>
          <input
            type="text"
            name="phoneNumber"
            value={data.phoneNumber}
            onChange={onChangeHandler}
            placeholder="Phone Number"
            required
          />
        </div>
        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>{50}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>{getTotalCartAmount() + 50}</b>
              </div>
            </div>
            <button type="submit">PROCEED TO Payment</button>
          </div>
        </div>
      </form>
      {paymentSuccess && (
        <div className="modal">
          <div className="modal-content">
            <h2>Payment Successful!</h2>
            <p>{paymentMessage}</p>
            <button onClick={() => setPaymentSuccess(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default PlaceOrder;
