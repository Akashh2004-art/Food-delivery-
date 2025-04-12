import express from "express"; // Importing express library to create the router
import { addToCart, removeFromCart, getCart } from "../controllers/cartController.js"; // Importing controller functions for cart operations
import authMiddleware from "../middleware/auth.js"; // Importing the authentication middleware to protect the routes

const cartRouter = express.Router(); // Creating a new router instance for cart-related routes

// Route to add an item to the cart
cartRouter.post("/add", authMiddleware, addToCart); // First, the authMiddleware checks if the user is authenticated, then calls the addToCart controller function

// Route to remove an item from the cart
cartRouter.post("/remove", authMiddleware, removeFromCart); // First, the authMiddleware checks if the user is authenticated, then calls the removeFromCart controller function

// Route to get the user's cart data
cartRouter.post("/get", authMiddleware, getCart); // First, the authMiddleware checks if the user is authenticated, then calls the getCart controller function

export default cartRouter; // Exporting the cart router to be used in the main app (server)
