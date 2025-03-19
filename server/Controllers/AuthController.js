const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const UserModel = require("../Models/User");

const signup = async (req, res) => {
    try {
        console.log("Request Body:", req.body);
        const { name, email, password, userType } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: 'User is already exist, you can login', success: false });
        }
        const userModel = new UserModel({ name, email, password, userType });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
            .json({
                message: "Signup successfully",
                success: true
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errorMsg = 'Auth failed email or password is wrong';
        if (!user) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.status(200)
            .json({
                message: "Login Success",
                success: true,
                token: jwtToken,
                userType: user.userType,
                email,
                name: user.name
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}

// Forgot Password Function
const forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await UserModel.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      // Generate a reset token (valid for 1 hour)
      const resetToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      // Create nodemailer transporter
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASSWORD },
      });
  
      // Email content
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Password Reset Request",
        html: `<p>Click <a href="http://localhost:3000/reset-password/${resetToken}">here</a> to reset your password.</p>`,
      };
  
      await transporter.sendMail(mailOptions);
  
      res.json({ success: true, message: "Password reset link sent to your email" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error sending email" });
    }
  };
  
  // Reset Password Function
  const resetPassword = async (req, res) => {
    try {
      const { token } = req.params;
      const { newPassword } = req.body;
  
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await UserModel.findOne({ email: decoded.email });
  
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      // Hash the new password and update
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
  
      res.json({ success: true, message: "Password reset successfully" });
    } catch (error) {
      res.status(400).json({ success: false, message: "Invalid or expired token" });
    }
  };


module.exports = {
    signup,
    login,
    forgotPassword,
    resetPassword,
}