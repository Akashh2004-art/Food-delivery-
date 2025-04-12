// Importing necessary React modules and other libraries
import React from 'react';
import "./Orders.css";
import { useState } from 'react'; // For managing local component state
import { toast } from 'react-toastify'; // For showing toast notifications
import { useEffect } from 'react'; // For side effects like data fetching
import axios from 'axios'; // For making HTTP requests
import { assets } from '../../assets/assets'; // Importing assets like icons/images

// Orders component receives 'url' as a prop
const Orders = ({ url }) => {
  // State to store all orders
  const [orders, setOrders] = useState([]);

  // Function to fetch all orders from the server
  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");

    if (response.data.success) {
      // Update orders state with data from backend
      setOrders(response.data.data);
    } else {
      toast.error("Error"); // Show error toast
    }
  };

  // Function to handle order status change
  const statusHandler = async (event, orderId) => {
    // Send updated status to backend
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: event.target.value,
    });

    if (response.data.success) {
      // Refresh order list after status update
      await fetchAllOrders();
    }
  };

  // useEffect to fetch all orders when component is first mounted
  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>

      {/* Main container for order list */}
      <div className="order-list">
        {
          orders?.map((order, index) => (
            <div key={index} className="order-item">
              {/* Order item layout starts here */}
              <img src={assets.parcel_icon} alt="" />

              <div>
                {/* List of food items in the order */}
                <p className="order-item-food">
                  {
                    order?.items?.map((item, index) => {
                      // Add comma between items except the last one
                      if (index === order.items.length - 1) {
                        return item.name + " x " + item.quantity;
                      } else {
                        return item.name + " x " + item.quantity + ", ";
                      }
                    })
                  }
                </p>

                {/* Customer full name */}
                <p className="order-item-name">
                  {order.address.firstName + "  " + order.address.lastName}
                </p>

                {/* Customer address details */}
                <div className="order-item-address">
                  <p>{order.address.street + ","}</p>
                  <p>
                    {order.address.city + "," + order.address.state + "," +
                      order.address.country + ", " + order.address.zipcode}
                  </p>
                </div>

                {/* Customer phone number */}
                <p className="order-item-phone">
                  {order.address.phone}
                </p>
              </div>

              {/* Number of items in the order */}
              <p>Items: {order.items.length}</p>

              {/* Total price of the order */}
              <p>₹{order.amount}</p>

              {/* Dropdown to update order status */}
              <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        }
      </div>
    </div>
  );
};

// Exporting Orders component as default
export default Orders;
