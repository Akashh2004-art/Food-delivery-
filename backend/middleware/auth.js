import jwt from "jsonwebtoken"; // Importing the jsonwebtoken library to verify the JWT token

// Middleware to authenticate requests
const authMiddleware = (req, res, next) => {
  // Get token from the 'token' header
  const token = req.header('token');
  
  // If no token is provided in the request header, return an error response
  if (!token) {
    console.log("No token found in headers:", req.headers); // Debug log to check if token is missing
    return res.status(401).json({ 
      success: false, 
      message: "No token provided" // Error message when no token is provided
    });
  }

  try {
    // Verify the token using the JWT_SECRET key from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach the decoded information (user data) to the request object for later use
    req.user = decoded;
    console.log("Token verified, user:", decoded); // Debug log to check if token is verified and to see decoded user info
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    // If token verification fails (invalid token), log the error and return an error response
    console.error("Token verification failed:", error); // Log the error for debugging purposes
    return res.status(401).json({ 
      success: false, 
      message: "Invalid token" // Error message for invalid token
    });
  }
};

export default authMiddleware; // Exporting the middleware to be used in routes
