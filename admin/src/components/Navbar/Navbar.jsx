// Importing React library to use JSX and component features
import React from "react";

// Importing the CSS file for styling the Navbar component
import "./Navbar.css";

// Importing required assets like logo and profile image
import { assets } from "../../assets/assets";

// Functional component definition for the Admin Navbar
const Navbar = () => {
  return (
    // Main container for the navbar
    <div className="navbar">
      {/* Logo image on the left side */}
      <img className="logo" src={assets.logo} alt="" />

      {/* Profile image on the right side */}
      <img className="profile" src={assets.profile_image} alt="" />
    </div>
  );
};

// Exporting the Navbar component so it can be used in other parts of the app
export default Navbar;
