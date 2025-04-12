import foodModel from "../models/foodModel.js"; // Importing the food model to interact with the food data in MongoDB
import fs from "fs"; // Importing file system module to handle file operations like deleting food images

// Add a new food item to the database
const addFood = async (req, res) => {
  // Get the uploaded image filename from the request
  let image_filename = `${req?.file?.filename}`;

  // Create a new food object with the details provided in the request body
  const food = new foodModel({
    name: req.body.name, // Food name from the request body
    description: req.body.description, // Food description from the request body
    price: req.body.price, // Food price from the request body
    category: req.body.category, // Food category from the request body
    image: image_filename, // Food image filename (from the uploaded file)
  });

  try {
    // Save the new food item to the database
    await food.save();
    // Send a success response to the client
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    // If an error occurs, log it and send a failure response
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Get the list of all food items
const listFood = async (req, res) => {
  try {
    // Fetch all the food items from the database
    const foods = await foodModel.find({});
    // Send the food items as a response to the client
    res.json({ success: true, data: foods });
  } catch (error) {
    // If an error occurs, log it and send a failure response
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Remove a food item from the database
const removeFood = async (req, res) => {
  try {
    // Find the food item by its ID from the request body
    const food = await foodModel.findById(req.body.id);
    
    // Delete the image file associated with the food item
    fs.unlink(`uploads/${food.image}`, () => {});

    // Delete the food item from the database
    await foodModel.findByIdAndDelete(req.body.id);
    // Send a success response after deleting the food item
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    // If an error occurs, log it and send a failure response
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Export the functions to be used in routes
export { addFood, listFood, removeFood };
