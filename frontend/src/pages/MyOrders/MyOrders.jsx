// Import React and necessary hooks
import React, { useContext, useEffect, useState } from 'react';

// Import CSS specific to this component
import "./MyOrders.css";

// Import the context to get global state values like URL and token
import { StoreContext } from '../../context/StoreContext';

// Axios is used for making HTTP requests to the backend
import axios from 'axios';

// Import assets (icons/images)
import { assets } from '../../assets/assets';

// Functional component to show user's order history
const MyOrders = () => {
  // Destructure values from global StoreContext
  const { url, token } = useContext(StoreContext);

  // State to hold all the orders fetched from backend
  const [orders, setOrders] = useState([]);

  // Loading state to show spinner or message while fetching orders
  const [loading, setLoading] = useState(false);

  // Function to fetch orders of the currently logged-in user
  const fetchOrders = async () => {
    try {
      setLoading(true); // Start loading animation/message

      // Send POST request to backend with token for authentication
      const response = await axios.post(
        `${url}/api/order/userorders`, // API endpoint
        {},                            // No body content required
        {
          headers: {
            'token': token,           // Send token in header for auth
            'Content-Type': 'application/json'
          }
        }
      );

      // If response contains order data, store it in state
      if (response.data?.orders) {
        console.log("Orders loaded:", response.data.orders); 
        setOrders(response.data.orders);
      } else {
        // If no orders returned, show empty state
        setOrders([]);
      }

    } catch (error) {
      // Handle any API or network errors
      console.error("❌ Failed to fetch orders:", error.response?.data || error.message);
      setOrders([]); // Clear any previous orders if error
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  // Fetch orders on component mount (and if token changes)
  useEffect(() => {
    if (token) {
      fetchOrders(); // Only fetch if token is present (user is logged in)
    }
  }, [token]);

  // JSX to render the orders or show loading/empty message
  return (
    <div className="my-orders-page">
      <div className="my-orders">
        <h2>My Orders</h2>

        <div className="container">
          {loading ? (
            // Show loading message while fetching orders
            <p>Loading your orders...</p>
          ) : orders.length === 0 ? (
            // Show message if no orders found
            <p>No orders found</p>
          ) : (
            // Loop through each order and display it
            orders.map((order, index) => (
              <div key={index} className='my-orders-order'>
                {/* Parcel icon at the top */}
                <img src={assets.parcel_icon} alt="Parcel Icon" />

                {/* List all ordered items with quantity */}
                <p>
                  {order.items?.map((item, idx) => (
                    <span key={idx}>
                      {item.name} x {item.quantity}
                      {/* Add comma between items except last one */}
                      {idx !== order.items.length - 1 && ', '}
                    </span>
                  ))}
                </p>

                {/* Show total order amount */}
                <p><strong>Amount:</strong> ₹{order.amount}</p>

                {/* Show number of items in the order */}
                <p><strong>Items:</strong> {order.items?.length}</p>

                {/* Show order status (e.g., placed, delivered) with a dot icon */}
                <p><span>&#x25cf;</span> <b>{order.status}</b></p>

                {/* Button to refresh order list (simulate tracking) */}
                <button onClick={fetchOrders}>Track Order</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// Export this component to be used in routes/pages
export default MyOrders;
