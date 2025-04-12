// src/components/ExploreMenu/ExploreMenu.jsx

// Import necessary libraries
import React from "react";

// Import CSS specific to this component
import "./ExploreMenu.css";

// Import the menu list which contains categories and their icons/images
import { menu_list } from "../../assets/assets";


// ExploreMenu component receives the current 'category' and 'setCategory' to update it
const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="explore-menu" id="explore-menu">
      
      {/* Title of the menu section */}
      <h1>Explore our menu</h1>

      {/* Introductory text for the menu section */}
      <p className="explore-menu-text">
        Choose from a diverse menu featuring a delectable array of dishes
        crafted with the finest ingredients and culinary expertise. Our mission
        is to satisfy your cravings and elevate your dining experience, one
        delicious meal at a time.
      </p>

      {/* Menu categories are listed here with icons and names */}
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div
              // Toggle selection: if clicked category is already selected, switch to "All"
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
              key={index}
              className="explore-menu-list-item"
            >
              {/* Category image (with 'active' class if it's selected) */}
              <img
                className={category === item.menu_name ? "active" : ""}
                src={item.menu_image}
                alt=""
              />
              {/* Category name */}
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>

      {/* A horizontal line to separate this section from the next */}
      <hr />
    </div>
  );
};


// Export the component for use in the homepage or other parent components
export default ExploreMenu;

