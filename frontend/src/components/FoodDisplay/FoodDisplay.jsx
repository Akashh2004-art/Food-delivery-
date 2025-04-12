// src/components/FoodDisplay/FoodDisplay.jsx

// Import React and the context hook
import React, { useContext } from "react";

// Import styles for this component
import "./FoodDisplay.css";

// Import the child component that shows individual food items
import FoodItem from "../FoodItem/FoodItem";

// Import StoreContext to get global data like food list and base URL
import { StoreContext } from "../../context/StoreContext";


// Functional component that displays the list of food items based on category
const FoodDisplay = ({ category }) => {
  // Access shared data (food list and backend URL) from context
  const { food_list, url } = useContext(StoreContext);

  // Filter the food items based on selected category.
  // If category is "All", show everything. Else, only matching items.
  const filteredFood =
    category === "All"
      ? food_list // return full list
      : food_list.filter((item) => item.category === category); // filter by category

      return (
        <div className="food-display" id="food-display">
          {/* Title above the food list */}
          <h2>Top dishes near</h2>
    
          {/* Grid/list container for all food items */}
          <div className="food-display-list">
            {/* Loop through the filtered list and render each food item */}
            {filteredFood.map((food) => (
              <FoodItem
                key={food._id} // Unique key for React rendering
                id={food._id} // Pass food ID (used for cart logic)
                name={food.name} // Food name
                price={food.price} // Food price
                description={food.description} // Short description
                image={`${url}/uploads/${food.image}`} // Complete image URL with backend path
              />
            ))}
          </div>
        </div>
      );
    };
    

// Export the component to be used inside pages or other components
export default FoodDisplay;