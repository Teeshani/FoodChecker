import React, { useState } from "react";
import axios from "axios";
import './FoodComplianceForm.css';
import Navbar from './Navbar';
import Footer from "./Footer";


const FoodComplianceForm = () => {
  const [formData, setFormData] = useState({
    category: "",
    food_item: "",
    travel_time: "",
    cooking_status: "",
    quantity: "",
  });

  const [result, setResult] = useState({});

  const categories = ["Vegetables", "Fruits", "Fish or Meats", "Grains", "Snacks", "Others"];

  const foodItemsList = {
    Vegetables: ["Carrot", "Broccoli", "Spinach", "Tomato", "Onion", "Potato", "Capsicum", "Lettuce",
    "Fresh Peppers", "Dried Mushrooms", "Sweet Corn", "Zucchini", "Cabbage", "Garlic",
    "Chilies", "Pumpkin", "Leeks", "Cauliflower", "Pickles", "Eggplant", "Radish",
    "Ginger", "Okra (Ladies’ Fingers)", "Bitter Gourd", "Drumsticks", "Beetroot",
    "Green Beans", "Curry Leaves", "Snake Gourd", "Yam (Kiri Ala)", "Breadfruit"],
    Fruits: ["Apple", "Mango", "Banana", "Grapes", "Orange", "Papaya", "Pineapple",
    "Frozen Berries", "Pomegranates", "Watermelon", "Strawberry", "Pear", "Guava",
    "Dragon Fruit", "Jackfruit (Fresh)", "Woodapple", "Rambutan", "Mangosteen",
    "Star Fruit", "Jackfruit Seeds", "Passion Fruit"],
    "Fish or Meats": ["Chicken", "Turkey", "Beef",
    "Fish", "Pork", "Mutton", "Salmon", "Shrimp", "Tuna", "Crab", "Lobster", "Lamb",
    "Frozen Fish", "Duck", "Anchovies", "Clams", "Dried Fish", "Sardines", "Goat Meat",
    "Prawns (Dry)", "Dried Sprats (Hal Messo)", "Cuttlefish", "Crayfish", "Maldive Fish Chips"],
    Grains: ["Quinoa", "Rice", "Wheat", "Oats", "Barley", "Corn", "Buckwheat", "Pasta", "Millet",
    "Couscous", "Lentils", "Buckwheat Flour", "Rye", "Chickpeas", "Red Rice",
    "Roasted Gram", "Black Gram (Urad Dal)", "Cowpeas (Ma Karal)", "Fenugreek Seeds"],
    Snacks: ["Nuts", "Granola Bars", "Cookies", "Potato Chips", "Trail Mix", "Chocolate",
    "Crackers", "Biscuits", "Sunflower Seeds", "Pretzels", "Popcorn", "Protein Bars",
    "Dried Fruits", "Rice Crackers", "Roti", "Wafers", "Puffed Rice", "Coconut Sweets",
    "Jaggery", "Palmyrah Jaggery", "Kithul Treacle", "Coconut Toffee", "Murukku",
    "Rulang Aluwa", "Kokis", "Kalu Dodol", "Aggala (Jaggery Balls)", "Banana Chips",
    "Dried Mango Strips", "Dried Jackfruit Chips", "Papadam", "Sesame Rolls"],
    Others: ["Lunu Miris (Chili Paste)", "Pol Sambol (Desiccated Coconut Mix)", "Seeni Sambol",
    "Curry Powder", "Roasted Curry Powder", "Ceylon Tea (Loose-Leaf or Bags)",
    "Herbal Teas (e.g., Gotu Kola, Belimal)", "Fresh King Coconut Water", "Ceylon Cinnamon Sticks",
    "Dried Red Chilies", "Batu Moju", "Tea (Loose Leaves)", "Ambul Thiyal", "Mango Pickle",
    "Lunu Dehi", "Katta Sambol (Chili Paste)", "Wandu Appa", "Gotu Kola Powder",
    "Polos Ambula (Jackfruit Curry Paste)", "Wood Apple Jam"]
  };

  const cookingStatusOptions = {
    Vegetables: ["Cooked", "Uncooked"],
    Fruits: ["Not applicable"],
    "Fish or Meats": ["Cooked", "Uncooked"],
    Grains: ["Cooked", "Uncooked"],
    Snacks: ["Cooked", "Uncooked", "Not applicable"],
    Others: ["Not applicable"]
  };

  const travelTimes = ["3–5 hours", "6–8 hours", "9–12 hours", "13–18 hours", "Above 18 hours"];
  const quantities = ["1kg", "2kg", "3kg", "4kg", "5kg", "More than 5kg"];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      let updatedData = { ...prev, [name]: value };

      // Reset dependent fields when category changes
      if (name === "category") {
        updatedData.food_item = "";
        updatedData.cooking_status = "";
      }

      return updatedData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8080/ml/predict", formData);

      const formattedData = {
        ...response.data.data,
        Image_URL: response.data.data.Image_URL?.replace(/\\/g, '/')
      };

      setResult(formattedData);
    } catch (err) {
      console.error("Error submitting form", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken"); // Example: Remove authentication token
    sessionStorage.clear(); // Clear session data if needed
    window.location.href = "/"; // Redirect to login page
  };
  

  return (
    <>
  <Navbar />

    <div className="form-body">
    <div className="food-compliance-container" style={{ padding: "20px", maxWidth: "500px", margin: "100px auto" }}>
      <h2 className="food-compliance-title">Food Compliance Checker</h2>
      <form onSubmit={handleSubmit} className="food-compliance-form">
        
        {/* Category Selection */}
        <div className="form-group category-group">
          <label className="form-label">Category:</label>
          <select name="category" value={formData.category} onChange={handleChange} required className="form-select">
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
  
        {/* Food Item Selection */}
        <div className="form-group food-item-group">
          <label className="form-label">Food Item:</label>
          <select name="food_item" value={formData.food_item} onChange={handleChange} required disabled={!formData.category} className="form-select">
            <option value="">Select Food Item</option>
            {formData.category && foodItemsList[formData.category].map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>
  
        {/* Travel Time Selection */}
        <div className="form-group travel-time-group">
          <label className="form-label">Travel Time:</label>
          <select name="travel_time" value={formData.travel_time} onChange={handleChange} required className="form-select">
            <option value="">Select Travel Time</option>
            {travelTimes.map((time) => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>
  
        {/* Cooking Status Selection */}
        <div className="form-group cooking-status-group">
          <label className="form-label">Cooking Status:</label>
          <select name="cooking_status" value={formData.cooking_status} onChange={handleChange} required disabled={!formData.category} className="form-select">
            <option value="">Select Cooking Status</option>
            {formData.category && cookingStatusOptions[formData.category].map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
  
        {/* Quantity Selection */}
        <div className="form-group quantity-group">
          <label className="form-label">Quantity:</label>
          <select name="quantity" value={formData.quantity} onChange={handleChange} required className="form-select">
            <option value="">Select Quantity</option>
            {quantities.map((qty) => (
              <option key={qty} value={qty}>{qty}</option>
            ))}
          </select>
        </div>
  
        <button type="submit" className="submit-button">Check Compliance</button>
      </form>
  
      {/* Displaying Results */}
      {result && (
        <div className="compliance-result">
          <h1 className="result-status">Compliance Status - {result?.Compliance_Status}</h1>
          <h1 className="result-packing">Special Packing Required - {result?.Special_Packing_Required}</h1>
          <h1 className="result-guidelines">Packing Guideline - {result?.Packing_Guidelines}</h1>
          {result?.Image_URL && <img src={`${result?.Image_URL}`} alt="Packing Guideline" className="result-image" />}
        </div>
      )}

      {/* Logout Button */}
      <button className="end-button" onClick={handleLogout}>Logout</button>

    </div>
    
    <Footer />
    </div>

    </>
    
  );
  
};

export default FoodComplianceForm;

