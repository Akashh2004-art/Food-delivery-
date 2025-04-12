// Importing necessary modules and hooks
import React, { useContext, useState } from "react";
import "./Navbar.css"; // Importing CSS for styling the navbar
import { assets } from "../../assets/assets"; // Importing image and asset references
import { Link, useNavigate } from "react-router-dom"; // For navigation between pages
import { StoreContext } from "../../context/StoreContext"; // Global state management context

// Navbar component accepts setShowLogin as a prop to control login popup
const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("menu"); // Local state to track which menu is active

  // Accessing global states and functions from context
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const navigate = useNavigate(); // Hook for programmatic navigation

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    setToken(""); // Clear token from global context
    navigate("/"); // Redirect user to homepage
  };

  return (
    <div className="navbar">
      {/* Logo that navigates to home when clicked */}
      <Link to="/">
        <img src={assets.logo} alt="logo" className="logo" />
      </Link>

      {/* Navbar links for different sections */}
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")} // Set active menu on click
          className={menu === "home" ? "active" : ""} // Add 'active' class if selected
        >
          home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact us")}
          className={menu === "contact us" ? "active" : ""}
        >
          contact us
        </a>
      </ul>

      {/* Right section of navbar */}
      <div className="navbar-right">
        {/* Search icon */}
        <img src={assets.search_icon} alt="search-icon" />

        {/* Basket icon with cart notification dot */}
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="basket-icon" />
          </Link>
          {/* Show red dot if cart is not empty */}
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {/* If user is not logged in, show 'Sign In' button */}
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          // If user is logged in, show profile icon with dropdown
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="profile-icon" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="orders-icon" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="logout-icon" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar; // Exporting the Navbar component
