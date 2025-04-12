// Importing necessary hooks and context
import React, { useContext } from "react";

// Importing the CSS file for styling the Cart component
import "./Cart.css";

// Importing the global store context to access cart and food data
import { StoreContext } from "../../context/StoreContext";

// Hook from React Router to navigate to other pages
import { useNavigate } from "react-router-dom";

// Functional component definition for Cart page
const Cart = () => {
  // Destructuring necessary state and functions from the global store context
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } =
    useContext(StoreContext);

  // useNavigate allows us to programmatically redirect the user
  const navigate = useNavigate();

  // JSX structure of the Cart page
  return (
    <div className="cart">
      {/* Left section: list of items in the cart */}
      <div className="cart-items">
        {/* Table headers for cart item list */}
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />

        {/* Looping through food_list to display only the items that are in the cart */}
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div className="cart-items-title cart-items-item">
                  {/* Displaying item image from backend uploads folder */}
                  <img src={`${url}/uploads/` + item.image} alt="" />

                  {/* Displaying item name */}
                  <p>{item.name}</p>

                  {/* Showing unit price */}
                  <p>₹{item.price}</p>

                  {/* Showing quantity of that item in the cart */}
                  <p>{cartItems[item._id]}</p>

                  {/* Total price for that item (price x quantity) */}
                  <p>₹{item.price * cartItems[item._id]}</p>

                  {/* Cross button to remove item from cart */}
                  <p onClick={() => removeFromCart(item._id)} className="cross">
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>

      {/* Bottom section of cart: total price and promocode input */}
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            {/* Showing subtotal from cart */}
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />

            {/* Showing delivery fee - free if cart is empty */}
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />

            {/* Grand total = subtotal + delivery */}
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>

          {/* Button to move to checkout page */}
          <button onClick={() => navigate("/order")}>
            PROCEED TO CHECKOUT
          </button>
        </div>

        {/* Right section: promo code input field (not functional yet) */}
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Exporting Cart component so it can be used in routing (App.jsx)
export default Cart;
