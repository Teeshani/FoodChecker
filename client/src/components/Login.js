import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./Login.css";
import { handleError, handleSuccess } from "./utils";

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password) {
      return handleError("Email and password are required");
    }

    try {
      const url = `http://localhost:8080/auth/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();
      console.log("Login Response:", result);

      if (!result || typeof result !== "object") {
        return handleError("Invalid server response.");
      }

      const { success, message, error, userType, token, name, email } = result; // Get name & email
      console.log("userType from backend:", userType); // Log the userType

    if (success && token) {
      handleSuccess(message);
      localStorage.setItem("token", token);
      localStorage.setItem("userType", userType.trim()); // Store user type
      localStorage.setItem("userName", name); // Store user name
      localStorage.setItem("userEmail", email); // Store user email

        setTimeout(() => {
          if (userType.trim() === "Admin") { // Ensure correct comparison
            navigate("/adminhome"); // Redirect to Admin Home
          } else {
            navigate("/userhome"); // Redirect to User Home
          }
        }, 1000);
      } else {
        handleError(error?.details?.[0]?.message || message || "Login failed");
      }
    } catch (err) {
      handleError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-body">
      <div className="login-content">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter your email..."
              value={loginInfo.email}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Enter your password..."
              value={loginInfo.password}
            />
          </div>

          <button type="submit">Login</button>
          <span className="login-footer">
            Don't have an account?{" "}
            <Link to="/signup" className="login-link">
              Signup
            </Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;

