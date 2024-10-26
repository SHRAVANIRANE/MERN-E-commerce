import React from "react";
import "./LoginPopUp.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { assets } from "../../assets/assets";

const LoginPopUp = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState("Login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // Initialize navigate

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { name, email, password } = formData;
    const nameRegex = /^[a-zA-Z\s]*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Validate name
    if (currentState === "Sign Up" && !nameRegex.test(name)) {
      alert("Name should only contain letters and spaces.");
      return false;
    }

    // Validate email
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }

    // Validate password
    if (password.length < 8 || !passwordRegex.test(password)) {
      alert(
        "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character."
      );
      return false;
    }

    return true;
  };

  const login = async (e) => {
    e.preventDefault(); // Prevent page refresh
    console.log("LOGIN EXECUTED", formData);

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch("https://mern-e-commerce-backend-jkse.onrender.com/login", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      console.log("Response Data: ", responseData);
      console.log("User ID: ", responseData.userId);

      if (responseData.success) {
        alert("Successfully logged in");

        // Store token and userId in localStorage
        localStorage.setItem("token", responseData.token);
        localStorage.setItem("userId", responseData.userId);

        setShowLogin(false); // Close login popup
      } else {
        // Handle errors here
        alert("Login failed: " + responseData.errors);
      }
    } catch (error) {
      console.error("LOGIN FAILED", error);
      alert("An error occurred during login.");
    }
  };

  const signup = async (e) => {
    e.preventDefault();
    console.log("SIGNUP EXECUTED", formData);

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch("https://mern-e-commerce-backend-jkse.onrender.com/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      console.log("Response Data: ", responseData);

      if (responseData.success) {
        alert("Successfully signed up");
        localStorage.setItem("token", responseData.token);
        localStorage.setItem("userId", responseData.userId); // Store userId in localStorage
        setShowLogin(false); // Close login popup
      } else {
        // Handle errors here
        alert("Signup failed: " + responseData.errors);
      }
    } catch (error) {
      console.error("SIGNUP FAILED", error);
      alert("An error occurred during signup.");
    }
  };

  return (
    <div className="login-popup">
      <form action="" className="login-popup-container">
        <div className="login-popup-title">
          <h1>{currentState}</h1>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currentState === "Login" ? (
            <></>
          ) : (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={changeHandler}
              placeholder="Username"
              required
            />
          )}
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={changeHandler}
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
            placeholder="Password"
            required
          />
        </div>
        <button onClick={currentState === "Login" ? login : signup}>
          {currentState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" />
          <p>By continuing, I agree to the terms of use and privacy policy</p>
        </div>
        {currentState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span
              onClick={() => {
                setCurrentState("Sign Up");
              }}
            >
              Click Here
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => {
                setCurrentState("Login");
              }}
            >
              Login Here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopUp;
