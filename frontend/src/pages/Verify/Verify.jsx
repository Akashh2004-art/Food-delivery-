// Importing necessary React hooks and context
import React, { useContext, useEffect } from 'react';

// Importing CSS for styling the verify page
import "./Verify.css";

// Importing routing hooks to access URL params and redirect
import { useNavigate, useSearchParams } from 'react-router-dom';

// Importing global state from StoreContext
import { StoreContext } from '../../context/StoreContext';

// Axios is used for making HTTP requests
import axios from 'axios';

// Functional component definition
const Verify = () => {
    // Extracting query parameters from the URL (like success and orderId)
    const [searchParams, setSearchParams] = useSearchParams();

    // Getting specific query values from the URL
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");

    // Getting API base URL from context
    const {url} = useContext(StoreContext);

    // Hook to redirect user to other pages
    const navigate = useNavigate();

    // Function to verify payment using backend API
    const verifyPayment = async () => {
      // Sending POST request to backend /api/order/verify with success and orderId
      const response = await axios.post(url+"/api/order/verify", { success, orderId });

      // If backend confirms verification, redirect to "My Orders" page
      if(response.data.success){
        navigate("/myorders");
      } else {
        // Otherwise redirect to home page
        navigate("/");
      }
    }

    // useEffect ensures the verifyPayment runs when component mounts
    useEffect(() => {
      verifyPayment();
    }, []);

    // Return a loading spinner while verification is happening
    return (
      <div className='verify'>
        <div className="spinner"></div>
      </div>
    );
}

// Exporting the Verify component so it's available to the router
export default Verify;
