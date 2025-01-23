import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./Signup.css";
import { handleError, handleSuccess } from "./utils";

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
    userType: "", 
  });

  const [secretKey, setSecretKey] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUserTypeChange = (e) => {
    const value = e.target.value;
    setSignupInfo((prev) => ({
      ...prev,
      userType: value, 
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // Check for Admin validation
    if (signupInfo.userType === "Admin" && secretKey !== "MST") {
      alert("Invalid Admin");
      return;
    }

    // Validate required fields
    const { name, email, password, userType } = signupInfo;
    if (!name || !email || !password || !userType) {
      return handleError("All fields are required.");
    }

    console.log("Sending data to the backend:", signupInfo);

    try {
      const url = `http://localhost:8080/auth/signup`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });

      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (error) {
        const details = error?.details[0]?.message || "Unknown error occurred";
        handleError(details);
      } else {
        handleError(message);
      }
    } catch (err) {
      handleError(err.message);
    }
  };

  return (
    <div className="signup-body">
      <div className="signup-content">
        <h1>Signup</h1>

        <div className="user-type-container">      
  <label>
  Register As
    <input
      type="radio"
      name="userType"
      value="User"
      onChange={handleUserTypeChange}
    />
    User
  </label>
  <label>
    <input
      type="radio"
      name="userType"
      value="Admin"
      onChange={handleUserTypeChange}
    />
    Admin
  </label>
</div>

        {signupInfo.userType === "Admin" && (
          <div>
            <label htmlFor="secretKey">Secret Key</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter the secret key..."
              onChange={(e) => setSecretKey(e.target.value)}
            />
          </div>
        )}

        <form onSubmit={handleSignup}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              autoFocus
              placeholder="Enter your name..."
              value={signupInfo.name}
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter your email..."
              value={signupInfo.email}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Enter your password..."
              value={signupInfo.password}
            />
          </div>

          <button type="submit">Signup</button>
          <span className="signup-footer">
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Signup;


