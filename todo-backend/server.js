import express from "express";
import dbConnection from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import path from "path";

// Initialize app
const app = express();

// Database connection
dbConnection();

const PORT = process.env.PORT;

// Middleware
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://todolist-gdc.onrender.com"
        : "http://localhost:5173",
    credentials: true,
  })
);

const __dirname = path.resolve();

app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.use(express.static(path.join(__dirname, "/todo-frontend/dist")));

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "todo-frontend", "dist", "index.html"))
);

app.set("trust proxy", 1);

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
