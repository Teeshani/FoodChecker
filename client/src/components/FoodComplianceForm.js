import React, { useState } from "react";
import axios from "axios";
import './FoodComplianceForm.css';


const FoodComplianceForm = () => {
  const [formData, setFormData] = useState({
    category: "",
    foodItem: "",
    travelTime: "",
    cookingStatus: "",
    quantity: "",
  });

  const categories = ["Vegetables", "Fruits", "Fish or Meats", "Grains", "Snacks", "Others"];
  const foodItems = [
    "Carrot", "Broccoli", "Spinach", "Tomato", "Onion", "Potato", "Capsicum", "Lettuce",
    "Fresh Peppers", "Dried Mushrooms", "Sweet Corn", "Zucchini", "Cabbage", "Garlic",
    "Chilies", "Pumpkin", "Leeks", "Cauliflower", "Pickles", "Eggplant", "Radish",
    "Ginger", "Okra (Ladies’ Fingers)", "Bitter Gourd", "Drumsticks", "Beetroot",
    "Green Beans", "Curry Leaves", "Snake Gourd", "Yam (Kiri Ala)", "Breadfruit",
    "Apple", "Mango", "Banana", "Grapes", "Orange", "Papaya", "Pineapple",
    "Frozen Berries", "Pomegranates", "Watermelon", "Strawberry", "Pear", "Guava",
    "Dragon Fruit", "Jackfruit (Fresh)", "Woodapple", "Rambutan", "Mangosteen",
    "Star Fruit", "Jackfruit Seeds", "Passion Fruit", "Chicken", "Turkey", "Beef",
    "Fish", "Pork", "Mutton", "Salmon", "Shrimp", "Tuna", "Crab", "Lobster", "Lamb",
    "Frozen Fish", "Duck", "Anchovies", "Clams", "Dried Fish", "Sardines", "Goat Meat",
    "Prawns (Dry)", "Dried Sprats (Hal Messo)", "Cuttlefish", "Crayfish", "Maldive Fish Chips",
    "Quinoa", "Rice", "Wheat", "Oats", "Barley", "Corn", "Buckwheat", "Pasta", "Millet",
    "Couscous", "Lentils", "Buckwheat Flour", "Rye", "Chickpeas", "Red Rice",
    "Roasted Gram", "Black Gram (Urad Dal)", "Cowpeas (Ma Karal)", "Fenugreek Seeds",
    "Nuts", "Granola Bars", "Cookies", "Potato Chips", "Trail Mix", "Chocolate",
    "Crackers", "Biscuits", "Sunflower Seeds", "Pretzels", "Popcorn", "Protein Bars",
    "Dried Fruits", "Rice Crackers", "Roti", "Wafers", "Puffed Rice", "Coconut Sweets",
    "Jaggery", "Palmyrah Jaggery", "Kithul Treacle", "Coconut Toffee", "Murukku",
    "Rulang Aluwa", "Kokis", "Kalu Dodol", "Aggala (Jaggery Balls)", "Banana Chips",
    "Dried Mango Strips", "Dried Jackfruit Chips", "Papadam", "Sesame Rolls",
    "Lunu Miris (Chili Paste)", "Pol Sambol (Desiccated Coconut Mix)", "Seeni Sambol",
    "Curry Powder", "Roasted Curry Powder", "Ceylon Tea (Loose-Leaf or Bags)",
    "Herbal Teas (e.g., Gotu Kola, Belimal)", "Fresh King Coconut Water", "Ceylon Cinnamon Sticks",
    "Dried Red Chilies", "Batu Moju", "Tea (Loose Leaves)", "Ambul Thiyal", "Mango Pickle",
    "Lunu Dehi", "Katta Sambol (Chili Paste)", "Wandu Appa", "Gotu Kola Powder",
    "Polos Ambula (Jackfruit Curry Paste)", "Wood Apple Jam"
  ];

  const travelTimes = ["3–5 hours", "6–8 hours", "9–12 hours", "13–18 hours", "Above 18 hours"];
  const cookingStatuses = ["Cooked", "Uncooked", "Not applicable"];
  const quantities = ["1kg", "2kg", "3kg", "4kg", "5kg", "More than 5kg"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/check-food", formData);
      console.log(response.data);
    } catch (err) {
      console.error("Error submitting form", err);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "100px auto" }}>
      <h2>Food Compliance Checker</h2>
      <form onSubmit={handleSubmit}>
        <label>Category:</label>
        <select name="category" onChange={handleChange} required>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <label>Food Item:</label>
        <select name="foodItem" onChange={handleChange} required>
          {foodItems.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>

        <label>Travel Time:</label>
        <select name="travelTime" onChange={handleChange} required>
          {travelTimes.map((time) => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>

        <label>Cooking Status:</label>
        <select name="cookingStatus" onChange={handleChange} required>
          {cookingStatuses.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>

        <label>Quantity:</label>
        <select name="quantity" onChange={handleChange} required>
          {quantities.map((qty) => (
            <option key={qty} value={qty}>{qty}</option>
          ))}
        </select>

        <button type="submit">Check Compliance</button>
      </form>
    </div>
  );
};

export default FoodComplianceForm;
