// Importing necessary modules and components
import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";

const App = () => {
  // State to control whether the login popup should be shown or not
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {/* Conditional rendering: show the LoginPopup component if showLogin is true */}
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}

      {/* Main layout of the app */}
      <div className="app-layout">
        <div className="app-content">
          <div className="app">
            {/* Navbar is always visible and receives setShowLogin to toggle login popup */}
            <Navbar setShowLogin={setShowLogin} />

            {/* Defining different routes for the application */}
            <Routes>
              <Route path="/" element={<Home />} />                  {/* Home page route */}
              <Route path="/cart" element={<Cart />} />              {/* Cart page route */}
              <Route path="/order" element={<PlaceOrder />} />       {/* Place order page route */}
              <Route path="/verify" element={<Verify />} />          {/* Email verification page */}
              <Route path="/myorders" element={<MyOrders />} />      {/* User's orders history page */}
            </Routes>
          </div>
        </div>

        {/* Footer is always visible at the bottom */}
        <Footer />
      </div>
    </>
  );
};

export default App;
