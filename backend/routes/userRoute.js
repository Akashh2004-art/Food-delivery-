import express from "express"; // Importing express library to create the router
import { loginUser, registerUser } from "../controllers/userController.js"; // Importing the controller functions for user authentication (login and register)

const userRouter = express.Router(); // Creating a new router instance for user-related routes

// Route to register a new user
userRouter.post("/register", registerUser); // Calls registerUser controller to handle new user registration

// Route to login an existing user
userRouter.post("/login", loginUser); // Calls loginUser controller to handle user login

export default userRouter; // Exporting the user router to be used in the main app (server)
