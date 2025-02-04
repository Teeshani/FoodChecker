import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserHome.css";
import Navbar from './Navbar';
import PackingGuidelinesCard from "./PackingGuidelinesCard"; // Import guidelines card
import Footer from "./Footer";

const UserHome = () => {
  const [userData, setUserData] = useState({ name: "", email: "" });
  const navigate = useNavigate();

  useEffect(() => {
    // Get user details from localStorage
    const storedName = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("userEmail");

    // If user data is found, set it to state
    if (storedName && storedEmail) {
      setUserData({ name: storedName, email: storedEmail });
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
  <Navbar />
    <div className="user-home">
      <div className="home-container">
        <h1>👋 Welcome, {userData.name ? userData.name : "Traveler"}!</h1>
        <p>✉ Email: {userData.email ? userData.email : "Not Available"}</p>

        {/* Packing Guidelines Card */}
        <PackingGuidelinesCard />

        {/* Buttons */}
        <button className="start-btn" onClick={() => navigate("/foodcomplianceform")}>
          Start Compliance Check
        </button>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>

      </div>
    </div>
    
    <Footer />
    </>
  );
};

export default UserHome;



