import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/dbCon.js";
import AuthRouter from "./Routes/AuthRouter.js";
import MLRouter from "./Routes/MLRouter.js";
import FeedbackRouter from "./Routes/FeedbackRouter.js"; // Import Feedback Router

dotenv.config();

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json()); // Handle JSON payload
app.use(cors({
    origin: process.env.CORS_ORIGIN || "*", // Restrict CORS in production
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/ping', (req, res) => res.send('PONG'));
app.use('/auth', AuthRouter);
app.use('/ml', MLRouter);
app.use('/api/feedback', FeedbackRouter); // Add Feedback Routes

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

// Server setup
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

