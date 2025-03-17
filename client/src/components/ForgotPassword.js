import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "./utils";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleResetRequest = async (e) => {
    e.preventDefault();

    if (!email) {
      return handleError("Please enter your email.");
    }

    try {
      const response = await fetch("http://localhost:8080/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (result.success) {
        handleSuccess("Password reset link sent to your email.");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        handleError(result.message || "Something went wrong.");
      }
    } catch (error) {
      handleError("Failed to send password reset link.");
    }
  };

  return (
    <div className="forgot-password-body">
      <div className="forgot-password-content">
        <h1>Forgot Password</h1>
        <p>Enter your email to receive a password reset link.</p>
        <form onSubmit={handleResetRequest}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Send Reset Link</button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ForgotPassword;

