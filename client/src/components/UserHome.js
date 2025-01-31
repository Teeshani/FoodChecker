import React from "react";
import "./UserHome.css"; 

export default function UserHome({ userData }) {
  console.log("User data received:", userData); // Debugging

  if (!userData) {
    return <h1>Loading...</h1>; // Prevent errors before data loads
  }

  return (
    <div className="userhome-container">
      <div className="userhome-card">
        <h1>Welcome, {userData.name ? userData.name : "User"}!</h1>
        <p>Email: {userData.email}</p>
        <button className="logout-button" onClick={() => { 
          localStorage.clear();
          window.location.href = "./login"; 
        }}>Log Out</button>
      </div>
    </div>
  );
}



    
  