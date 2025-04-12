import userModel from "../models/userModel.js"; // Importing the user model to interact with user data in the database
import jwt from "jsonwebtoken"; // Importing jsonwebtoken to create and verify JWT tokens for user authentication
import bcrypt from "bcrypt"; // Importing bcrypt for hashing and comparing user passwords
import validator from "validator"; // Importing validator to validate email format and other input fields

// Login user (authentication)
const loginUser = async (req, res) => {
  const { email, password } = req.body; // Extracting email and password from the request body
  try {
    // Check if user with the provided email exists in the database
    const user = await userModel.findOne({ email });

    // If no user is found with the email, return an error message
    if (!user) {
      return res.json({ success: false, message: "User Doesn't exist" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    // If the password doesn't match, return an error message
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    // Create a JWT token for the user after successful authentication
    const token = createToken(user._id);
    // Send the token as a response
    res.json({ success: true, token });
  } catch (error) {
    // If an error occurs, log it and send an error response
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Function to create a JWT token for the user
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET); // Sign a JWT token with the user ID and the secret key from environment variables
};

// Register user (sign-up)
const registerUser = async (req, res) => {
  const { name, email, password } = req.body; // Extracting name, email, and password from the request body
  try {
    // Check if a user with the provided email already exists in the database
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Validate the provided email format
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // Validate the password to ensure it's strong (at least 8 characters)
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password with more than 7 characters",
      });
    }

    // Hash the password before storing it in the database (for security)
    const salt = await bcrypt.genSalt(10); // Generate salt for hashing
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password with the salt

    // Create a new user object
    const newUser = new userModel({
      name: name, // User's name
      email: email, // User's email
      password: hashedPassword, // Hashed password
    });

    // Save the new user to the database
    const user = await newUser.save();
    // Create a JWT token for the newly registered user
    const token = createToken(user._id);

    // Send the token as a response to the client
    res.json({ success: true, token });
  } catch (error) {
    // If an error occurs, log it and send an error response
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Export the functions to be used in routes
export { loginUser, registerUser };
