import React from "react";
import "./assets/css/style.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Review from "./components/Review";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UserHome from "./components/UserHome";
import AdminHome from "./components/AdminHome";
import FoodComplianceForm from "./components/FoodComplianceForm";
import PackingGuidelines from "./components/PackingGuidelines";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/review" element={<Review />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/userhome" element={<UserHome />} />
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/foodcomplianceform" element={<FoodComplianceForm />} />
        <Route path="/packingguidelines" element={<PackingGuidelines />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} /> 
        
      </Routes>
    </div>
  );
}

export default App;
