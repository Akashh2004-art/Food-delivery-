// Importing necessary hooks and libraries
import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios"; // For making API requests
import { toast } from "react-toastify"; // For showing success/error popups

// The Add component receives `url` as a prop to make backend API requests
const Add = ({ url }) => {
  // State to hold the selected image file
  const [image, setImage] = useState(false);

  // State to hold form input values
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad", // Default category
  });

  // Handles input change for name, description, price, and category
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    // Update the corresponding field in the `data` state
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Form submission handler
  const onSubmitHandler = async (event) => {
    event.preventDefault(); // Prevent default page reload behavior

    // Creating a FormData object to send form fields along with the image
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      // Sending form data to backend API endpoint
      const response = await axios.post(`${url}/api/food/add`, formData);

      if (response.data.success) {
        // If successful, reset form fields and show success toast
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad",
        });
        setImage(false);
        toast.success(response.data.message);
      } else {
        // If server responds with error, show error toast
        toast.error(response.data.message);
      }
    } catch (error) {
      // Catch block for network/server error
      toast.error("Something went wrong!");
    }
  };

  // JSX returned by the component
  return (
    <div className="add">
      {/* Form container */}
      <form className="flex-col" onSubmit={onSubmitHandler}>

        {/* Image upload section */}
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              // If image is selected, show preview using URL.createObjectURL()
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => {
              setImage(e.target.files[0]); // Set selected image
            }}
            type="file"
            id="image"
            hidden
            required
          />
        </div>

        {/* Input for product name */}
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
            required
          />
        </div>

        {/* Input for product description */}
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write content here"
            required
          />
        </div>

        {/* Dropdown for category and input for price */}
        <div className="add-category-price">

          {/* Category selector */}
          <div className="add-category flex-col">
            <p>Product category</p>
            <select
              onChange={onChangeHandler}
              name="category"
              value={data.category}
              required
            >
              {/* All available options */}
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          {/* Input for product price */}
          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="Number"
              name="price"
              placeholder="₹20"
              required
            />
          </div>
        </div>

        {/* Submit button to trigger API call */}
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

// Exporting the Add component to be used in routes
export default Add;
