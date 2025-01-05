import React from "react";
import "./assets/css/style.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Review from "./components/Review";
import Contact from "./components/Contact";



function App() {
  return (
    <Router>
      <div className="App">

      
        <Routes>
  
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/review" element={<Review />} />
      <Route path="/contact" element={<Contact />} />
    

      </Routes>
      </div>
    </Router>
   
  );
};

export default App;
