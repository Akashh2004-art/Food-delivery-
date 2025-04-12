import React from "react";
import "./Footer.css"; // Importing the corresponding CSS file for styling
import { assets } from "../../assets/assets"; // Importing all static assets like images and icons
import { Link } from "react-router-dom"; // For client-side navigation links

// This is a functional React component named 'Footer'
const Footer = () => {
  return (
    // Main container of the footer section
    <div className="footer" id="footer">

      {/* These two empty divs could be reserved for future layout usage or just for design symmetry */}
      <div className="footer-content"></div>
      <div className="footer-content"></div>

      {/* This is the actual content of the footer, divided into three sections: left, center, right */}
      <div className="footer-content">

        {/* ----------- LEFT SECTION ------------ */}
        <div className="footer-content-left">
          {/* Logo of the brand */}
          <img src={assets.logo} alt="" />

          {/* A short and friendly promotional paragraph */}
          <p>
            🍕 Hungry? We've got you covered! From spicy noodles 🍜 to soft cakes 🎂 —
            your cravings end here. Fast delivery, big smiles, and tasty bites 😋.
          </p>

          {/* Social media icons for brand presence */}
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="Facebook" />
            <img src={assets.twitter_icon} alt="Twitter" />
            <img src={assets.linkedin_icon} alt="LinkedIn" />
          </div>
        </div>

        {/* ----------- CENTER SECTION ------------ */}
        <div className="footer-content-center">
          <h2>📌 COMPANY</h2>
          <ul>
            {/* Link to home page */}
            <li><Link to="/">🏠 Home</Link></li>

            {/* Informational menu items - These are not linked here but can be extended */}
            <li>ℹ️ About us</li>
            <li>🚚 Delivery</li>
            <li>🔒 Privacy Policy</li>
          </ul>
        </div>

        {/* ----------- RIGHT SECTION ------------ */}
        <div className="footer-content-right">
          <h2>📞 GET IN TOUCH</h2>
          <ul>
            {/* Static contact information */}
            <li>📱 9083339598</li>
            <li>📱 7439597938</li>
            <li>📧 debjanichowdhury2004@gmail.com</li>
            <li>📧 pramaniksourav825@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Divider line for visual separation */}
      <hr/>

      {/* Copyright line with auto-updated year */}
      <p className="footer-copyright">
        🍅 Copyright {new Date().getFullYear()} © Tomato.com —
        All Rights Reserved.
      </p>
    </div>
  );
};


// Exporting the Footer component so it can be used in other parts of the app
export default Footer;
