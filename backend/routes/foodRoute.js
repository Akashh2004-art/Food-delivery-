import express from "express"; // Importing express library to create the router
import {
  addFood,
  listFood,
  removeFood,
} from "../controllers/foodController.js"; // Importing the controller functions for food operations
import multer from "multer"; // Importing multer for handling file uploads (for food image)

const foodRouter = express.Router(); // Creating a new router instance for food-related routes

// Image Storage Engine configuration using multer
const storage = multer.diskStorage({
  destination: "uploads", // Specifies the folder where uploaded images will be stored
  filename: (req, file, cb) => {
    // Generate a unique filename for each uploaded image by appending current timestamp
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage }); // Multer instance to handle file uploads with the defined storage configuration

// Route to add a new food item (requires an image to be uploaded)
foodRouter.post("/add", upload.single("image"), addFood); 
// 'upload.single("image")' is middleware that processes the uploaded image file (with key "image") before calling the addFood controller

// Route to list all food items
foodRouter.get("/list", listFood); // Calls listFood controller to return all food items

// Route to remove a food item
foodRouter.post("/remove", removeFood); // Calls removeFood controller to remove a food item

export default foodRouter; // Exporting the food router to be used in the main app (server)
