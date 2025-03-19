import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ResetPassword.css";
import Navbar from './Navbar';
import resetImg from "../assets/images/reset-img.jpg"
import Footer from './Footer';

const ResetPassword = () => {
  const { token } = useParams(); // Get token from URL
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/auth/reset-password/${token}`,
        { newPassword }
      );

      if (response.data.success) {
        setMessage(response.data.message);
        setError("");

        // Redirect to login after 3 seconds
        setTimeout(() => navigate("/login"), 3000);
      } else {
        setError(response.data.message || "Something went wrong.");
        setMessage("");
      }
    } catch (err) {
      // Improved error logging to capture exact error from backend
      console.error("Error resetting password:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Something went wrong.");
      setMessage("");
    }
  };

  return (
    <>
        <Navbar />
    <div className="ResetPassword-wrapper">
    <img src={resetImg} alt="Reset Password" className="ResetPassword-img" />
      <div className="ResetPassword-box">
        <h2 className="ResetPassword-title">Reset Your Password</h2>
  
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
  
        <form onSubmit={handleSubmit} className="ResetPassword-form">
          <div>
            <label className="ResetPassword-label">New Password</label>
            <input
              type="password"
              className="input"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
  
          <div>
            <label className="ResetPassword-label">Confirm Password</label>
            <input
              type="password"
              className="input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
  
          <button type="submit" className="ResetPassword-btn">
            Reset Password
          </button>
        </form>
      </div>
      
    </div>
    <Footer />
    </>
  );
  
};

export default ResetPassword;




