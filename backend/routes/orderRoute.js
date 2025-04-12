import express from "express"; // Importing express library to create the router
import authMiddleware from "../middleware/auth.js"; // Importing the authentication middleware to protect certain routes
import { 
  listOrders, 
  placeOrder, 
  updateStatus, 
  userOrders, 
  verifyorder 
} from "../controllers/orderController.js"; // Importing the controller functions for order operations

const orderRouter = express.Router(); // Creating a new router instance for order-related routes

// Route to place a new order
orderRouter.post("/place", authMiddleware, placeOrder); 
// authMiddleware checks if the user is authenticated, then calls placeOrder controller to handle placing the order

// Route to verify an order (e.g., after payment verification)
orderRouter.post("/verify", verifyorder); // Calls verifyorder controller to handle order verification

// Route to fetch orders placed by the authenticated user
orderRouter.post("/userorders", authMiddleware, userOrders); 
// authMiddleware checks if the user is authenticated, then calls userOrders controller to fetch the user's orders

// Route to list all orders (admin can access this to view all orders)
orderRouter.get("/list", listOrders); // Calls listOrders controller to fetch all orders from the database

// Route to update the status of an order (admin functionality)
orderRouter.post("/status", updateStatus); // Calls updateStatus controller to update the status of an order

export default orderRouter; // Exporting the order router to be used in the main app (server)
