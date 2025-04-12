// Importing necessary hooks and libraries
import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios"; // Used for making API requests
import { toast } from "react-toastify"; // For showing notification popups

// List component receives `url` as a prop
const List = ({ url }) => {
  // State to store the list of food items
  const [list, setList] = useState([]);

  // Function to fetch all food items from the backend
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      // If successful, update the list state with received data
      setList(response.data.data);
    } else {
      // Show error toast if something goes wrong
      toast.error("Error");
    }
  };

  // Function to remove a food item by its ID
  const removeFood = async (foodId) => {
    // Send POST request to delete a specific food item
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });

    // Refresh the list after removing the item
    await fetchList();

    if (response.data.success) {
      toast.success(response.data.message); // Show success message
    } else {
      toast.error("Error"); // Show error message
    }
  };

  // useEffect is called once when the component is mounted
  useEffect(() => {
    fetchList(); // Initial fetch of food list
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>

      {/* Table to display list of food items */}
      <div className="list-table">
        {/* Header row for the table */}
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {/* Map through the list and render each food item */}
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              {/* Food image */}
              <img src={`${url}/uploads/` + item.image} alt="" />

              {/* Food name */}
              <p>{item.name}</p>

              {/* Food category */}
              <p>{item.category}</p>

              {/* Food price */}
              <p>₹{item.price}</p>

              {/* "X" button to delete the food item */}
              <p onClick={() => removeFood(item._id)} className="cursor">
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Exporting the List component
export default List;
