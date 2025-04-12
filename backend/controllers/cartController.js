import userModel from "../models/userModel.js"; // Importing the user model to interact with the user data in MongoDB

// Add items to the user's cart
const addToCart = async (req, res) => {
    try {
        // Find the user data by userId, either using findOne or findById (both work)
        let userData = await userModel.findById(req.body.userId);

        // Get the current cart data for the user
        let cartData = await userData.cartData;

        // If the item is not in the cart, add it with a quantity of 1, otherwise increment the quantity
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        // Update the user's cart data in the database
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});

        // Send a success response back to the client
        res.json({success: true, message: "Added To Cart"});
    } catch (error) {
        // If an error occurs, log the error and send a failure response
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}

// Remove items from the user's cart
const removeFromCart = async (req, res) => {
    try {
        // Find the user data by userId
        let userData = await userModel.findById(req.body.userId);

        // Get the current cart data for the user
        let cartData = await userData.cartData;

        // If the item is in the cart, decrement the quantity by 1
        if(cartData[req.body.itemId] > 0){
            cartData[req.body.itemId] -= 1;
        }

        // Update the user's cart data in the database
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});

        // Send a success response back to the client
        res.json({success: true, message: "Removed From Cart"});
    } catch (error) {
        // If an error occurs, log the error and send a failure response
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}

// Fetch the user's cart data
const getCart = async (req, res) => {
    try {
        // Find the user data by userId
        let userData = await userModel.findById(req.body.userId);

        // Get the current cart data for the user
        let cartData = await userData?.cartData;

        // Send the cart data back to the client
        res.json({success: true, cartData});
    } catch (error) {
        // If an error occurs, log the error and send a failure response
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}

// Export the functions to be used in routes
export {addToCart, removeFromCart, getCart};
