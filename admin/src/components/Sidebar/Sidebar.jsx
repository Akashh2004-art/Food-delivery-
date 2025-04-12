// Importing React to create the component
import React from "react";

// Importing styling specific to Sidebar component
import "./Sidebar.css";

// Importing required image assets (icons)
import { assets } from "../../assets/assets";

// Importing NavLink from react-router-dom to enable navigation with active link highlighting
import { NavLink } from "react-router-dom";

// Functional component for Sidebar in admin dashboard
const Sidebar = () => {
  return (
    // Sidebar container
    <div className="sidebar">
      
      {/* Sidebar options container */}
      <div className="sidebar-options">

        {/* NavLink to the "Add Items" page */}
        <NavLink to="/add" className="sidebar-option">
          {/* Icon for Add */}
          <img src={assets.add_icon} alt="" />
          <p>Add Items</p>
        </NavLink>

        {/* NavLink to the "List Items" page */}
        <NavLink to="/list" className="sidebar-option">
          {/* Icon for List */}
          <img src={assets.order_icon} alt="" />
          <p>List Items</p>
        </NavLink>

        {/* NavLink to the "Orders" page */}
        <NavLink to="/orders" className="sidebar-option">
          {/* Reusing the same order icon */}
          <img src={assets.order_icon} alt="" />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

// Exporting the Sidebar component to be used in Admin layout
export default Sidebar;
