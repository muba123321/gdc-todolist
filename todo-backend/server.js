import express from "express";
import dbConnection from "./config/db.js";
import cors from "cors";

// Intialize app with express,
// use cors for Frontend and Backend Connection
// Initialize database connection
// Use express.json for json format responses
// Initialized app on port to start listening

const app = express();
app.use(cors());

dbConnection();

const PORT = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to todolist!");
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
