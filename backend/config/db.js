import mongoose from "mongoose"; // Importing mongoose for MongoDB interaction
import dotenv from "dotenv"; // Importing dotenv to manage environment variables

dotenv.config(); // Make sure dotenv loads the environment variables from .env file

// Connect to MongoDB Database
export const connectDB = async () => {
  // Attempt to connect to MongoDB using the URI from environment variables
  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: "food-del", // Database name (specific to your MongoDB setup)
  })
    .then(() => {
      // If the connection is successful, log "Database Connected" to the console
      console.log("Database Connected");
    })
    .catch((e) => {
      // If an error occurs during the connection, log the error to the console
      console.log(e);
    });
};
