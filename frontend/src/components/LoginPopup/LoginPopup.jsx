// Import React and necessary hooks
import React, { useContext, useState } from "react";

// Import component-specific styles
import "./LoginPopup.css";

// Import icons/assets used in the popup
import { assets } from "../../assets/assets";

// Import global StoreContext to get/set token and URL
import { StoreContext } from "../../context/StoreContext";

// Import axios to make API calls
import axios from "axios";

// LoginPopup component receives setShowLogin as a prop to control visibility
const LoginPopup = ({ setShowLogin }) => {
  // Get backend URL and setToken function from global context
  const { url, setToken } = useContext(StoreContext);

  // Maintain the current mode: either "Login" or "Sign Up"
  const [currState, setCurrState] = useState("Login");

  // Form data for name, email, and password (state)
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  // Update form data when user types into input fields
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data)=>({ ...data, [name]: value }));
  }

  // Handles form submission (login or signup)
  const onLogin = async (event) => {
    event.preventDefault(); // Prevent default form refresh
    
    let newUrl = url;

    // Choose the API endpoint based on current mode
    if (currState === "Sign Up") {
      newUrl += "/api/user/register"; // Backend signup route
    } else {
      newUrl += "/api/user/login"; // Backend login route
    }

    // Send the form data to the appropriate endpoint
    const response = await axios.post(newUrl, data);

    // If login/signup is successful, store token and close popup
    if (response.data.success) {
      setToken(response.data.token); // Save in context
      localStorage.setItem("token", response.data.token); // Also save in browser
      setShowLogin(false); // Close login popup
    } else {
      // Show error message if any
      alert(response.data.message);
    }
  };

  // JSX: main login/signup popup UI
  return (
    <div className="login-popup">
      {/* Form container */}
      <form onSubmit={onLogin} className="login-popup-container">
        {/* Title and close button */}
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)} // Close the popup
            src={assets.cross_icon}
            alt=""
          />
        </div>

        {/* Input fields */}
        <div className="login-popup-inputs">
          {/* Only show name input in Sign Up mode */}
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              type="text"
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              placeholder="Your name"
              required
            />
          )}

          {/* Common email and password inputs */}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
          />
        </div>

        {/* Submit button changes text based on mode */}
        <button type="submit">{currState === "Sign Up" ? "Create account" : "Login"}</button>

        {/* Terms and conditions checkbox */}
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>

        {/* Link to switch between login and sign up */}
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

// Export this component for use in the app
export default LoginPopup;
