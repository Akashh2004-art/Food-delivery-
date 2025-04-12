import orderModel from "../models/orderModel.js"; // Importing the order model to interact with the orders in the database
import userModel from "../models/userModel.js"; // Importing the user model to interact with the user data in the database

// ✅ Stripe disabled version - can be added later
// import Stripe from "stripe"; // Stripe payment module (currently commented out)
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Initializing Stripe with the secret key

// Placing an order for the user (without Stripe integration)
const placeOrder = async (req, res) => {
    try {
        // Log the order details received from the frontend
        console.log("Received order request:", {
            userId: req.user.id,
            items: req.body.items,
            amount: req.body.amount
        });

        // Create a new order document with the user's details
        const newOrder = new orderModel({
            userId: req.user.id, // Assigning the userId from the authenticated user
            items: req.body.items, // Items being ordered
            amount: req.body.amount, // Total order amount
            address: req.body.address, // Shipping address
            payment: true // Marking payment as true (since it's not using Stripe, assuming payment is completed)
        });

        // Save the new order to the database
        await newOrder.save();
        console.log("Order saved:", newOrder);

        // Clear the user's cart after placing the order
        await userModel.findByIdAndUpdate(req.user.id, { cartData: {} });

        // Send a success response back with the order ID
        res.json({
            success: true,
            message: "Order placed successfully",
            orderId: newOrder._id
        });
    } catch (error) {
        // If an error occurs, log it and send an error response
        console.error("Order placement error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Error placing order" 
        });
    }
};

// Verifying the order after payment (manual verification)
const verifyorder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        // If payment was successful, mark the order as paid
        if (success == "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Payment verified (manual)" });
        } else {
            // If payment failed, delete the order
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Payment failed, order removed" });
        }
    } catch (error) {
        // If an error occurs, log it and send an error response
        console.log(error);
        res.json({ success: false, message: "Error verifying payment" });
    }
};

// Fetching the orders placed by the authenticated user
const userOrders = async (req, res) => {
    try {
        console.log("Fetching orders for user:", req.user.id); // Debug log for user orders
        
        // Fetch orders from the database where the userId matches the authenticated user's ID
        const orders = await orderModel.find({ userId: req.user.id });
        console.log("Found orders:", orders); // Debug log for found orders
        
        // Send the orders back in the response
        res.json({ 
            success: true, 
            orders 
        });
    } catch (error) {
        // If an error occurs, log it and send an error response
        console.error("Error fetching user orders:", error);
        res.status(500).json({ 
            success: false, 
            message: "Error fetching user orders" 
        });
    }
};

// Fetching all orders from the database (admin view)
const listOrders = async (req, res) => {
    try {
        // Fetch all orders from the database
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        // If an error occurs, log it and send an error response
        console.log(error);
        res.json({ success: false, message: "Error fetching orders" });
    }
};

// Updating the status of an order (e.g., pending, shipped, delivered)
const updateStatus = async (req, res) => {
    try {
        // Update the status of the specified order
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Order status updated" });
    } catch (error) {
        // If an error occurs, log it and send an error response
        console.log(error);
        res.json({ success: false, message: "Error updating status" });
    }
};

// Exporting all functions to be used in the routes
export { placeOrder, verifyorder, userOrders, listOrders, updateStatus };
