import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserHome from "./UserHome";
import AdminHome from "./AdminHome";

export default function UserDetails() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Unauthorized access. Please login.");
      navigate("/login");
      return;
    }

    fetch("http://localhost:5000/userData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched user data:", data); // Debugging

        if (!data || typeof data !== "object" || !data.data) {
          alert("Invalid response from server.");
          localStorage.clear();
          navigate("/login");
          return;
        }

        if (data.data === "token expired") {
          alert("Session expired. Please login again.");
          localStorage.clear();
          navigate("/login");
          return;
        }

        setUserData(data.data); // Ensure `userData` is properly set
        localStorage.setItem("userType", data.data.userType);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        alert("Failed to load user data.");
        localStorage.clear();
        navigate("/login");
      });
  }, [navigate]);

  if (!userData) return <h1>Loading...</h1>;

  return userData.userType === "Admin" ? (
    <AdminHome userData={userData} />
  ) : (
    <UserHome userData={userData} />
  );
}





    
