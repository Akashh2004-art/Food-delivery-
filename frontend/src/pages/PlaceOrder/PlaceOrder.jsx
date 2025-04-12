// Import necessary hooks and modules from React
import React, { useContext, useEffect, useState } from "react";

// Import component-specific styles
import "./PlaceOrder.css";

// Import StoreContext for global state access
import { StoreContext } from "../../context/StoreContext";

// Axios is used to make HTTP requests to the backend
import axios from "axios";

// For programmatic navigation between routes
import { useNavigate } from "react-router-dom";

// Functional component to place an order
const PlaceOrder = () => {
  // Destructuring values from global context
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  // State to track if the order is being processed
  const [processing, setProcessing] = useState(false);

  // State to check if the order has been successfully placed
  const [orderPlaced, setOrderPlaced] = useState(false);

  // State to store user input for delivery details
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  // Navigation hook from React Router
  const navigate = useNavigate();

  // This function updates delivery info state as user types
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    // Copying previous state and updating the changed field
    setData(data => ({ ...data, [name]: value }));
  };

  // This function is called when the user submits the order form
  const placeholder = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      // If no token is available, redirect user to cart (unauthorized)
      if (!token) {
        navigate("/cart");
        return;
      }

      setProcessing(true); // Show loading state

      let orderItems = [];

      // Create an array of items in the cart with their quantities
      food_list.forEach((item) => {
        if (cartItems[item._id] > 0) {
          orderItems.push({
            ...item,
            quantity: cartItems[item._id]
          });
        }
      });

      // Construct the order payload
      let orderData = {
        address: data,
        items: orderItems,
        amount: getTotalCartAmount() + 2, // Add fixed delivery fee
      };

      // Make POST request to backend to place the order
      const response = await axios.post(
        `${url}/api/order/place`,
        orderData,
        {
          headers: {
            'token': token, // Auth token from context
            'Content-Type': 'application/json'
          }
        }
      );

      // If backend confirms success, show order success UI
      if (response.data.success) {
        setOrderPlaced(true);
        setProcessing(false);
      } else {
        // If backend returns failure message
        throw new Error(response.data.message || 'Failed to place order');
      }

    } catch (error) {
      // Log and alert user if error occurs
      console.error("Order placement failed:", error);
      alert(error.response?.data?.message || "Error placing order. Please try again.");
      setProcessing(false); // Hide loader
    }
  };

  // If no token or empty cart, redirect user to cart page
  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token]);

  // UI shown after successful order placement
  if (orderPlaced) {
    return (
      <div className="order-success">
        <h2>🎉 Order Confirmed!</h2>
        <p>Your order has been placed successfully.</p>
        <p>🧾 You can check your orders in the <b>“My Orders”</b> section.</p>
        <button onClick={() => navigate("/myorders")}>Go to My Orders</button>
      </div>
    );
  }

  // UI shown when order is processing (spinner/text)
  if (processing) {
    return (
      <div className="processing-screen">
        <h2>Processing your order...</h2>
        <p>Please wait...</p>
      </div>
    );
  }

  // Main UI: order form + cart summary
  return (
    <form onSubmit={placeholder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        {/* First and last name inputs */}
        <div className="multi-fields">
          <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First name" />
          <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last name" />
        </div>

        {/* Email and street address */}
        <input required name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Email address" />
        <input required name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder="Street" />

        {/* City and state fields */}
        <div className="multi-fields">
          <input required name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder="City" />
          <input required name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder="State" />
        </div>

        {/* Zipcode and country fields */}
        <div className="multi-fields">
          <input required name="zipcode" onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="Zip code" />
          <input required name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder="Country" />
        </div>

        {/* Phone number field */}
        <input required name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder="Phone" />
      </div>

      {/* Cart totals shown on right side */}
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            {/* Subtotal without delivery */}
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            {/* Fixed delivery fee (₹2 if subtotal > 0) */}
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() <= 0 ? 0 : 2}</p>
            </div>
            <hr />
            {/* Final total */}
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          {/* Submit button to place order */}
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

// Export the component so it can be used in routes
export default PlaceOrder;
