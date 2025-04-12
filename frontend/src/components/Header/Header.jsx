// Import React library to create the component
import React from "react";

// Import CSS file for styling this component
import "./Header.css";

// Functional React component named Header
const Header = () => {
  return (
    // Root container with class 'header', used for styling
    <div className="header">
      
      {/* Inner content container */}
      <div className="header-contents">

        {/* Heading text to grab user attention */}
        <h2>Order your favourite food here</h2>

        {/* Supporting paragraph that describes what the site offers */}
        <p>
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and culinary expertise. Our
          mission is to satisfy your cravings and elevate your dining
          experience, one delicious meal at a time.
        </p>

        {/* Button to direct users to the food menu */}
        <button>View Menu</button>
      </div>
    </div>
  );
};

// Export the Header component so it can be used in other parts of the app
export default Header;
