import express from "express";
import Feedback from "../Models/FeedbackModel.js";

const router = express.Router();

// Route to submit feedback (POST)
router.post("/", async (req, res) => {
    try {
        const { name, message } = req.body;
        if (!name || !message) {
            return res.status(400).json({ error: "Name and message are required." });
        }

        const newFeedback = new Feedback({ name, message });
        await newFeedback.save();
        res.status(201).json({ message: "Feedback submitted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Error saving feedback." });
    }
});

// Route to get all feedback (GET)
router.get("/", async (req, res) => {
    try {
        const feedbacks = await Feedback.find().sort({ createdAt: -1 });
        res.status(200).json(feedbacks); // Ensure that you're returning the correct data
    } catch (error) {
        res.status(500).json({ error: "Error fetching feedback." });
    }
});

// Route to delete feedback (DELETE)
router.delete("/:id", async (req, res) => {
    try {
        await Feedback.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Feedback deleted successfully." });
    } catch (error) {
        res.status(500).json({ error: "Error deleting feedback." });
    }
});

export default router;
