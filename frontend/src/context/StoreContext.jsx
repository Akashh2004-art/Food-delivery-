// src/context/StoreContext.jsx

// Importing required modules and hooks
import { createContext, useEffect, useState } from "react";
import axios from "axios";

// Creating an axios instance with base URL from environment variable
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Creating a React context to be used across the application
export const StoreContext = createContext(null);

// StoreContextProvider component will wrap around the app to provide context values
const StoreContextProvider = (props) => {
  // State to store cart items (key: item ID, value: quantity)
  const [cartItems, setCartItems] = useState({});
  // State to store authentication token
  const [token, setToken] = useState("");
  // State to store all available food items
  const [food_list, setFoodList] = useState([]);
  const url = import.meta.env.VITE_API_URL;

  // Function to add an item to the cart
  const addToCart = async (itemId) => {
    try {
      // Update cart state locally
      if (!cartItems[itemId]) {
        setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
      } else {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
      }

      // If user is logged in, sync cart to backend
      if (token) {
        const tokenData = JSON.parse(atob(token.split('.')[1])); // Decode token to get user ID
        const userId = tokenData.id;

        await axiosInstance.post(
          '/api/cart/add',
          { itemId, userId },
          { 
            headers: { 
              'Authorization': `Bearer ${token}`,
              'token': token
            } 
          }
        );
      }
    } catch (err) {
      // If error occurs, rollback local cart state
      console.error("❌ Error adding to cart:", err.response?.data || err.message);
      if (!cartItems[itemId]) {
        setCartItems((prev) => {
          const newCart = { ...prev };
          delete newCart[itemId];
          return newCart;
        });
      } else {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
      }
    }
  };

  // Function to remove an item from the cart
  const removeFromCart = async (itemId) => {
    if (cartItems[itemId] === undefined || cartItems[itemId] === 0) return;

    const previousCount = cartItems[itemId];

    // Optimistically update the cart UI
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    // Sync with backend if token is present
    if (token) {
      try {
        const tokenData = JSON.parse(atob(token.split('.')[1]));
        const userId = tokenData.id;

        await axiosInstance.post(
          '/api/cart/remove',
          { itemId, userId },
          { 
            headers: { 
              'Authorization': `Bearer ${token}`,
              'token': token
            } 
          }
        );
      } catch (err) {
        // If error occurs, revert to previous count
        console.error("❌ Error removing from cart:", err.response?.data || err.message);
        setCartItems((prev) => ({ ...prev, [itemId]: previousCount }));
      }
    }
  };

  // Function to calculate the total amount in the cart
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  // Function to fetch all food items from the backend
  const fetchFoodList = async () => {
    try {
      const response = await axiosInstance.get('/api/food/list');
      if (response.data?.data) {
        setFoodList(response.data.data);
      }
    } catch (err) {
      console.error("❌ fetchFoodList error:", err.message);
    }
  };

  // Function to load cart data for the logged-in user
  const loadCartData = async (token) => {
    if (!token) {
      console.log("No token available, skipping cart load");
      setCartItems({});
      return;
    }

    try {
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      const userId = tokenData.id;

      const response = await axiosInstance.post(
        '/api/cart/get',
        { userId },
        { 
          headers: { 
            'Authorization': `Bearer ${token}`,  
            'token': token  
          } 
        }
      );

      if (response.data?.cartData) {
        setCartItems(response.data.cartData);
      } else {
        setCartItems({});
      }
    } catch (err) {
      console.error("❌ Cart loading error:", err.response?.data || err.message);
      setCartItems({});
    }
  };

  // useEffect to run once on component mount
  useEffect(() => {
    const loadData = async () => {
      const localToken = localStorage.getItem("token");
      console.log("Local storage token:", localToken); 

      if (localToken) {
        setToken(localToken);
        await loadCartData(localToken); // Load cart from backend
        await fetchFoodList(); // Fetch food items
      }
    };
    loadData();
  }, []);

  // useEffect to update axios headers when token changes
  useEffect(() => {
    if (token) {
      console.log("Setting token in axios headers:", token); 
      axiosInstance.defaults.headers.common['token'] = token;
    } else {
      delete axiosInstance.defaults.headers.common['token'];
    }
  }, [token]);

  // Context value containing states and methods to be used globally
  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  // Returning the context provider wrapping its children
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
