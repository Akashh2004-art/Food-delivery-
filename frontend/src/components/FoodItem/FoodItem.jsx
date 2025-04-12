// Importing necessary dependencies
import React, { useContext } from "react";
import "./FoodItem.css"; // Importing the component's CSS styles
import { assets } from "../../assets/assets"; // Importing icons and images from assets
import { StoreContext } from "../../context/StoreContext"; // Importing shared context for cart management


// FoodItem is a reusable component to display a single food item's information and controls
const FoodItem = ({ id, name, price, description, image }) => {
  // Extract cart-related data and functions from global context
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  return (
    <div className="food-item">
      {/* Image + cart buttons section */}
      <div className="food-item-img-container">
        {/* Display the food image */}
        <img src={image} alt={name} className="food-item-image" />

        {/* If the item is NOT in the cart, show a simple add button */}
        {!cartItems?.[id] ? (
          <img
            onClick={() => addToCart(id)} // On click, add the item to cart
            src={assets.add_icon_white}
            alt="Add"
            className="add"
          />
        ) : (
          // If item exists in the cart, show counter with + and - buttons
          <div className="food-item-counter">
            {/* Remove one item from cart on click */}
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt="Remove"
            />
            {/* Show the number of items in the cart */}
            <p>{cartItems[id]}</p>
            {/* Add one more item to cart on click */}
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt="Add"
            />
          </div>
        )}
      </div>

      {/* Information section: name, rating, description, and price */}
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p> {/* Display name of the food */}
          <img src={assets.rating_starts} alt="rating" /> {/* Static star rating */}
        </div>

        {/* Short description about the dish */}
        <p className="food-item-desc">{description}</p>

        {/* Display price in Indian Rupees */}
        <p className="food-item-price">₹{price}</p>
      </div>
    </div>
  );
};

// Exporting the component so it can be used inside food list or display components
export default FoodItem;

