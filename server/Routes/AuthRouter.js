const { signup, login, forgotPassword, resetPassword } = require('../Controllers/AuthController');
const User = require("../Models/User");
const ensureAuthenticated = require('../Middlewares/Auth');
const router = require('express').Router();

// Authentication Routes
router.post('/login', login);
router.post('/signup', signup);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// ✅ GET all users (Admin only)
router.get("/users",  async (req, res) => {
    try {
        const users = await User.find({}, "name email userType"); // Changed 'role' to 'userType'
        res.json(users);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ message: "Server Error" });
    }
});

// ✅ Add a new user (Admin only)
router.post("/users",  async (req, res) => {
    try {
        const { name, email, userType, password } = req.body; // Changed 'role' to 'userType'
        if (!name || !email || !userType || !password) { // Changed 'role' to 'userType'
            return res.status(400).json({ message: "All fields are required" });
        }

        const newUser = new User({ name, email, userType, password }); // Changed 'role' to 'userType'
        await newUser.save();
        res.json({ success: true, message: "User added successfully", user: newUser });
    } catch (err) {
        console.error("Error adding user:", err);
        res.status(500).json({ message: "Error adding user" });
    }
});

// ✅ Update user details (Admin only)
router.put("/users/:id",  async (req, res) => {
    try {
        const { name, email, userType } = req.body; // Changed 'role' to 'userType'
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { name, email, userType }, { new: true }); // Changed 'role' to 'userType'
        res.json({ success: true, message: "User updated successfully", user: updatedUser });
    } catch (err) {
        console.error("Error updating user:", err);
        res.status(500).json({ message: "Error updating user" });
    }
});

// ✅ Delete a user (Admin only)
router.delete("/users/:id",  async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "User deleted successfully" });
    } catch (err) {
        console.error("Error deleting user:", err);
        res.status(500).json({ message: "Error deleting user" });
    }
});

module.exports = router;

