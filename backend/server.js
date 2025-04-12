import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Routes
import foodRoute from "./routes/foodRoute.js";
import cartRoute from "./routes/cartRoute.js";
import userRoute from "./routes/userRoute.js";
import orderRoute from "./routes/orderRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// CORS configuration
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5173"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "token"],
  exposedHeaders: ["token"]
}));

// Pre-flight requests
app.options('*', cors());

// Body Parser Middleware
app.use(express.json());

// ✅ Static folder for uploaded images
app.use('/uploads', express.static('uploads')); // 👈 এই লাইনটা add করতে হবে

// API Routes
app.use("/api/food", foodRoute);
app.use("/api/cart", cartRoute);
app.use("/api/user", userRoute);
app.use("/api/order", orderRoute);

// Health Check Route
app.get("/", (req, res) => {
  res.send("🚀 Food Delivery API is running...");
});

// Test endpoint
app.get("/api/test", (req, res) => {
  res.json({ success: true, message: "API is working!" });
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
