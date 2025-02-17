import React from 'react';
import "./PackingGuidelines.css";
import Navbar from './Navbar';
import { useNavigate } from "react-router-dom";
import fruitImg from "../assets/images/fruits.jpg";
import vegetableImg from "../assets/images/vegetables.jpg";
import fishImg from "../assets/images/fish.jpeg";
import snackImg from "../assets/images/snacks.jpg";
import grainImg from "../assets/images/grains.jpg";
import Footer from './Footer';


const guidelinesData = [
    {
      category: "Fruits",
      image: fruitImg,  
      guideline: "Wrap fruits individually in soft paper and place them in a sturdy, ventilated box to prevent bruising."
    },
    {
      category: "Vegetables",
      image: vegetableImg,
      guideline: "Store fresh vegetables in breathable mesh bags and avoid sealing them in airtight containers to prevent moisture buildup."
    },
    {
      category: "Fish or Meats",
      image: fishImg,
      guideline: "Vacuum-seal fresh or frozen meats and store them in insulated coolers with ice packs to maintain proper temperature."
    },
    {
      category: "Snacks",
      image: snackImg,
      guideline: "Use resealable bags or airtight containers to keep snacks fresh and prevent spills during travel."
    },
    {
      category: "Grains",
      image: grainImg,
      guideline: "Pack grains like rice and lentils in thick plastic or fabric pouches to prevent contamination and leakage."
    }
];

  const PackingGuidelines = () => {
    const navigate = useNavigate();
    
  
    return (
      <>
        <Navbar />
  
        <h1 className="main-header">
        <span>General</span> Packing <span> Guidelines</span>
        </h1>

        <p className="page-description">
            Proper packing ensures that food items remain fresh, safe, and compliant with travel regulations. 
            Below are general packing guidelines categorized for different types of food items. 
            Follow these tips to prevent spoilage, leakage, and damage during your journey.</p>
  
          <div className="guidelines-grid">
            {guidelinesData.map((item, index) => (
              <div key={index} className="guideline-card">
                <img src={item.image} alt={item.category} className="card-image" />
                <h3 className="card-title">{item.category}</h3>
                <p className="card-description">{item.guideline}</p>
              </div>
            ))}
          </div>
  
          {/* Logout Button */}
        <button className="finish-button" onClick={() => navigate("/")}>Logout</button>
        
  
        <Footer />
      </>
    );
  };
  
  export default PackingGuidelines;
