import express from "express";
import dbConnection from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

// Initialize app
const app = express();

// Database connection
dbConnection();

const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    status: false,
    statusCode,
    message,
  });
});

// Start server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
